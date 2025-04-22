
import React from 'react';
import OpportunityTable from './radar/OpportunityTable';
import { useOpportunityRadar } from './radar/hooks/useOpportunityRadar';
import SuggestedActions from './radar/SuggestedActions';

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <OpportunityTable
            opportunities={opportunities}
            filteredOpportunities={filteredOpportunities}
            filter={filter}
            setFilter={setFilter}
            onCreateCampaign={handleCreateCampaign}
            onDetailedAnalysis={handleDetailedAnalysis}
          />
        </div>
        <div className="md:col-span-1">
          <SuggestedActions 
            opportunities={opportunities.slice(0, 3)} 
            onCreateCampaign={handleCreateCampaign}
          />
        </div>
      </div>
    </div>
  );
};

export default OpportunityRadar;
