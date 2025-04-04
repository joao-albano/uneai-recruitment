
import React from 'react';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import CampaignsList from './list/CampaignsList';
import { Campaign } from '@/types/recruitment';

interface CampaignsListContainerProps {
  showArchived?: boolean;
  onOpenDetails?: (campaign: Campaign) => void;
  onOpenEdit?: (campaign: Campaign) => void;
}

const CampaignsListContainer: React.FC<CampaignsListContainerProps> = ({ 
  showArchived = false,
  onOpenDetails,
  onOpenEdit
}) => {
  // These are placeholder functions - they will be overridden by the props passed from the parent
  const handleOpenDetails = (campaign: Campaign) => {
    if (onOpenDetails) {
      onOpenDetails(campaign);
    } else {
      console.log('Details opened for campaign', campaign.id);
    }
  };
  
  const handleOpenEdit = (campaign: Campaign) => {
    if (onOpenEdit) {
      onOpenEdit(campaign);
    } else {
      console.log('Edit opened for campaign', campaign.id);
    }
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
