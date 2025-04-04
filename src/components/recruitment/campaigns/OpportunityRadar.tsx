
import React from 'react';
import OpportunityTable from './radar/OpportunityTable';
import SuggestedActions from './radar/SuggestedActions';
import { useOpportunityRadar } from './radar/hooks/useOpportunityRadar';

const OpportunityRadar: React.FC = () => {
  const {
    opportunities,
    filteredOpportunities,
    filter,
    setFilter,
    handleCreateCampaign,
    handleDetailedAnalysis
  } = useOpportunityRadar();
  
  return (
    <div className="space-y-6">
      <OpportunityTable
        opportunities={opportunities}
        filteredOpportunities={filteredOpportunities}
        filter={filter}
        setFilter={setFilter}
        onCreateCampaign={handleCreateCampaign}
        onDetailedAnalysis={handleDetailedAnalysis}
      />
      
      <SuggestedActions
        opportunities={opportunities}
        onCreateCampaign={handleCreateCampaign}
      />
    </div>
  );
};

export default OpportunityRadar;
