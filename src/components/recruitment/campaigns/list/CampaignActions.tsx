
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Campaign } from '@/types/recruitment';
import { Archive, Edit, MoreVertical, Pause, Play } from 'lucide-react';

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
  if (!campaign) return null;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="opacity-70 group-hover:opacity-100">
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
              <Pause className="mr-2 h-4 w-4" />
              <span>Pausar</span>
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              <span>Ativar</span>
            </>
          )}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          onClick={() => onArchive(campaign)}
          className="text-destructive focus:text-destructive"
        >
          <Archive className="mr-2 h-4 w-4" />
          <span>Arquivar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CampaignActions;
