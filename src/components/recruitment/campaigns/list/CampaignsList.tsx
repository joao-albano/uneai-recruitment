
import React, { useState, useEffect } from 'react';
import { Campaign } from '@/types/recruitment';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import { toast } from '@/hooks/use-toast';
import CampaignCard from './CampaignCard';
import EmptyCampaignState from './EmptyCampaignState';
import CampaignActions from './CampaignActions';

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
    const campaignsToShow = showArchived ? getArchivedCampaigns() : getActiveCampaigns();
    setDisplayedCampaigns(campaignsToShow || []);
  }, [campaigns, showArchived, getArchivedCampaigns, getActiveCampaigns]);
  
  const handleToggleCampaignStatus = (campaign: Campaign) => {
    if (!campaign) return;
    
    const newStatus = campaign.status === 'active' ? 'paused' : 'active';
    updateCampaign(campaign.id, { status: newStatus });
    
    toast({
      title: newStatus === 'active' ? 'Campanha ativada' : 'Campanha pausada',
      description: `A campanha "${campaign.name}" foi ${newStatus === 'active' ? 'ativada' : 'pausada'} com sucesso.`
    });
  };
  
  const handleArchiveCampaign = (campaign: Campaign) => {
    if (!campaign) return;
    
    archiveCampaign(campaign.id);
    
    toast({
      title: 'Campanha arquivada',
      description: `A campanha "${campaign.name}" foi arquivada com sucesso.`
    });
  };
  
  if (!displayedCampaigns || displayedCampaigns.length === 0) {
    return <EmptyCampaignState showArchived={showArchived} />;
  }
  
  return (
    <div className="space-y-4">
      {displayedCampaigns.map(campaign => (
        campaign && (
          <div key={campaign.id} className="relative group">
            <CampaignCard
              campaign={campaign}
              onViewDetails={() => onOpenDetails(campaign)}
            />
            
            {!showArchived && (
              <div className="absolute top-4 right-4">
                <CampaignActions
                  campaign={campaign}
                  onEdit={() => onOpenEdit(campaign)}
                  onToggleStatus={handleToggleCampaignStatus}
                  onArchive={handleArchiveCampaign}
                />
              </div>
            )}
          </div>
        )
      ))}
    </div>
  );
};

export default CampaignsList;
