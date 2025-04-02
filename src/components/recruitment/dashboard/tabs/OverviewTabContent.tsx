
import React from 'react';
import RecruitmentStats from '../RecruitmentStats';
import FunnelChartCard from '../FunnelChartCard';
import RecentLeadsCard from '../RecentLeadsCard';
import OperationalVisualizationTable from '../OperationalVisualizationTable';

const OverviewTabContent: React.FC = () => {
  return (
    <>
      <RecruitmentStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <FunnelChartCard />
        <RecentLeadsCard />
      </div>
      
      <div className="mt-6">
        <OperationalVisualizationTable />
      </div>
    </>
  );
};

export default OverviewTabContent;
