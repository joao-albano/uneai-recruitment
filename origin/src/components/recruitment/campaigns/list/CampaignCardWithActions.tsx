
import React from 'react';
import { Campaign } from '@/types/recruitment';
import CampaignCard from './CampaignCard';
import CampaignActions from './CampaignActions';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, GraduationCap, ExternalLink } from 'lucide-react';

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
            <h4 className="text-sm font-medium mb-2">Segmentação</h4>
            <div className="space-y-3">
              {campaign.target?.audience && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">
                    <span className="font-medium">Público:</span> {campaign.target.audience}
                  </span>
                </div>
              )}
              
              {campaign.target?.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">
                    <span className="font-medium">Local:</span> {campaign.target.location}
                  </span>
                </div>
              )}
              
              {campaign.target?.courses && campaign.target.courses.length > 0 && (
                <div className="flex items-start gap-2">
                  <GraduationCap className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium mb-1">Cursos:</span>
                    <div className="flex flex-wrap gap-1">
                      {campaign.target.courses.map((course, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/10 text-xs">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {!campaign.target?.audience && !campaign.target?.location && 
               (!campaign.target?.courses || campaign.target.courses.length === 0) && (
                <p className="text-sm text-muted-foreground italic">
                  Nenhuma segmentação definida
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <Button 
              variant="ghost" 
              className="w-full flex items-center justify-center gap-2"
              onClick={handleViewClick}
            >
              <ExternalLink className="h-4 w-4" />
              Ver Detalhes
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CampaignCardWithActions;
