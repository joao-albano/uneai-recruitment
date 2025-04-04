
import React from 'react';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import CampaignsList from './list/CampaignsList';
import { Campaign } from '@/types/recruitment';

interface CampaignsListContainerProps {
  showArchived?: boolean;
}

const CampaignsListContainer: React.FC<CampaignsListContainerProps> = ({ showArchived = false }) => {
  // These are placeholder functions - they will be overridden by the props passed from the parent
  const handleOpenDetails = (campaign: Campaign) => {
    console.log('Details opened for campaign', campaign.id);
  };
  
  const handleOpenEdit = (campaign: Campaign) => {
    console.log('Edit opened for campaign', campaign.id);
  };

  return (
    <CampaignsList 
      showArchived={showArchived} 
      onOpenDetails={handleOpenDetails}
      onOpenEdit={handleOpenEdit}
    />
  );
};

export default CampaignsListContainer;
