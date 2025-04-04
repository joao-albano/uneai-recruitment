
import React from 'react';
import { Campaign } from '@/types/recruitment';
import CampaignCard from './CampaignCard';
import CampaignActions from './CampaignActions';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CampaignCardWithActionsProps {
  campaign: Campaign;
  showArchived: boolean;
  onView?: (campaign: Campaign) => void;
  onViewDetails?: (campaign: Campaign) => void;
  onEdit?: (campaign: Campaign) => void;
  onToggleStatus?: (campaign: Campaign) => void;
  onArchive?: (campaign: Campaign) => void;
}

const CampaignCardWithActions: React.FC<CampaignCardWithActionsProps> = ({
  campaign,
  showArchived,
  onView,
  onViewDetails,
  onEdit,
  onToggleStatus,
  onArchive
}) => {
  if (!campaign) {
    return null; // Return null if campaign is not defined
  }
  
  // Normalize the view handler (support both onView and onViewDetails)
  const handleViewClick = () => {
    if (onViewDetails) {
      onViewDetails(campaign);
    } else if (onView) {
      onView(campaign);
    }
  };
  
  if (showArchived) {
    return <CampaignCard campaign={campaign} onViewDetails={handleViewClick} />;
  }
  
  return (
    <Card key={campaign.id} className="overflow-hidden">
      <div className="flex border-b">
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">{campaign.name}</h3>
              <Badge variant={campaign.status === 'active' ? 'default' : 'outline'}>
                {campaign.status === 'active' 
                  ? 'Ativa' 
                  : campaign.status === 'paused' 
                    ? 'Pausada' 
                    : campaign.status === 'completed' 
                      ? 'Arquivada' 
                      : 'Rascunho'}
              </Badge>
            </div>
            
            {!showArchived && onEdit && onToggleStatus && onArchive && (
              <CampaignActions 
                campaign={campaign}
                onEdit={() => onEdit(campaign)}
                onToggleStatus={() => onToggleStatus(campaign)}
                onArchive={() => onArchive(campaign)}
              />
            )}
          </div>
          
          <p className="mt-2 text-muted-foreground">{campaign.description}</p>
          
          <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Período</p>
              <div className="flex items-center mt-1">
                {/* Calendar icon and date range */}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Canais</p>
              <div className="flex items-center gap-1 mt-1">
                {/* Channel icons */}
              </div>
            </div>
            <div>
              <p className="text-muted-foreground">Desempenho</p>
              <div className="flex items-center mt-1">
                {/* Performance data */}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-muted p-6 w-64 flex flex-col justify-between border-l">
          <div>
            <h4 className="text-sm font-medium">Segmentação</h4>
            <div className="mt-2 flex flex-wrap gap-1">
              {/* Audience, location, and courses badges */}
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            {/* View details button */}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CampaignCardWithActions;
