
import React, { useState, useEffect } from 'react';
import { Campaign } from '@/types/recruitment';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import { toast } from '@/hooks/use-toast';
import CampaignCard from './CampaignCard';
import EmptyCampaignState from './EmptyCampaignState';
import CampaignActions from './CampaignActions';
import CampaignDetailsDialog from '../CampaignDetailsDialog';
import CampaignEditDialog from '../CampaignEditDialog';

interface CampaignsListProps {
  showArchived?: boolean;
  onOpenDetails: (campaign: Campaign) => void;
  onOpenEdit: (campaign: Campaign) => void;
}

const CampaignsList: React.FC<CampaignsListProps> = ({ 
  showArchived = false,
  onOpenDetails,
  onOpenEdit
}) => {
  const { 
    campaigns,
    updateCampaign, 
    archiveCampaign, 
    getArchivedCampaigns, 
    getActiveCampaigns 
  } = useCampaigns();
  
  const [displayedCampaigns, setDisplayedCampaigns] = useState<Campaign[]>([]);
  
  // Update displayed campaigns whenever the campaigns list changes
  useEffect(() => {
    setDisplayedCampaigns(showArchived ? getArchivedCampaigns() : getActiveCampaigns());
  }, [campaigns, showArchived, getArchivedCampaigns, getActiveCampaigns]);
  
  const handleToggleCampaignStatus = (campaign: Campaign) => {
    const newStatus = campaign.status === 'active' ? 'paused' : 'active';
    updateCampaign(campaign.id, { status: newStatus });
    
    toast({
      title: newStatus === 'active' ? 'Campanha ativada' : 'Campanha pausada',
      description: `A campanha "${campaign.name}" foi ${newStatus === 'active' ? 'ativada' : 'pausada'} com sucesso.`
    });
  };
  
  const handleArchiveCampaign = (campaign: Campaign) => {
    archiveCampaign(campaign.id);
    
    toast({
      title: 'Campanha arquivada',
      description: `A campanha "${campaign.name}" foi arquivada com sucesso.`
    });
  };
  
  if (displayedCampaigns.length === 0) {
    return <EmptyCampaignState showArchived={showArchived} />;
  }
  
  return (
    <div className="space-y-4">
      {displayedCampaigns.map(campaign => (
        <div key={campaign.id} className="relative">
          <CampaignCard
            campaign={campaign}
            onViewDetails={() => onOpenDetails(campaign)}
          />
          
          {!showArchived && (
            <div className="absolute top-6 right-6">
              <CampaignActions
                campaign={campaign}
                onEdit={() => onOpenEdit(campaign)}
                onToggleStatus={handleToggleCampaignStatus}
                onArchive={handleArchiveCampaign}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CampaignsList;
