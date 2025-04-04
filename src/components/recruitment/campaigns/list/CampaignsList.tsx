
import React, { useState } from 'react';
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
}

const CampaignsList: React.FC<CampaignsListProps> = ({ showArchived = false }) => {
  const { 
    updateCampaign, 
    archiveCampaign, 
    getArchivedCampaigns, 
    getActiveCampaigns 
  } = useCampaigns();
  
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  
  // Filtramos as campanhas de acordo com o parâmetro showArchived
  const displayedCampaigns = showArchived ? getArchivedCampaigns() : getActiveCampaigns();
  
  const handleViewDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDetailsOpen(true);
  };
  
  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setEditOpen(true);
  };
  
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

  const handleSaveCampaign = (updatedCampaign: Campaign) => {
    updateCampaign(updatedCampaign.id, updatedCampaign);
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
            onViewDetails={handleViewDetails}
          />
          
          {!showArchived && (
            <div className="absolute top-6 right-6">
              <CampaignActions
                campaign={campaign}
                onEdit={handleEditCampaign}
                onToggleStatus={handleToggleCampaignStatus}
                onArchive={handleArchiveCampaign}
              />
            </div>
          )}
        </div>
      ))}
      
      {selectedCampaign && (
        <>
          <CampaignDetailsDialog 
            open={detailsOpen} 
            onOpenChange={setDetailsOpen} 
            campaign={selectedCampaign}
          />
          
          <CampaignEditDialog 
            open={editOpen} 
            onOpenChange={setEditOpen} 
            campaign={selectedCampaign}
            onSave={handleSaveCampaign}
          />
        </>
      )}
    </div>
  );
};

export default CampaignsList;
