
import React from 'react';
import { useCampaigns } from '@/hooks/recruitment/useCampaigns';
import CampaignsList from './list/CampaignsList';

interface CampaignsListProps {
  showArchived?: boolean;
}

const CampaignsListContainer: React.FC<CampaignsListProps> = ({ showArchived = false }) => {
  return <CampaignsList showArchived={showArchived} />;
};

export default CampaignsListContainer;
