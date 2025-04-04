
import React from 'react';
import { Campaign } from '@/types/recruitment';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  MoreVertical, 
  PauseCircle, 
  Play, 
  Archive, 
  Edit 
} from 'lucide-react';

interface CampaignActionsProps {
  campaign: Campaign;
  onEdit: (campaign: Campaign) => void;
  onToggleStatus: (campaign: Campaign) => void;
  onArchive: (campaign: Campaign) => void;
}

const CampaignActions: React.FC<CampaignActionsProps> = ({
  campaign,
  onEdit,
  onToggleStatus,
  onArchive
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(campaign)}>
          <Edit className="mr-2 h-4 w-4" />
          <span>Editar</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onToggleStatus(campaign)}>
          {campaign.status === 'active' ? (
            <>
              <PauseCircle className="mr-2 h-4 w-4" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              <span>Ativar</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onArchive(campaign)}>
          <Archive className="mr-2 h-4 w-4" />
          <span>Arquivar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CampaignActions;
