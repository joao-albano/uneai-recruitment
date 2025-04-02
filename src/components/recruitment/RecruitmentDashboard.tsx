
import React from 'react';
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardTabs from './dashboard/DashboardTabs';
import OperationalVisualizationTable from './dashboard/OperationalVisualizationTable';

const RecruitmentDashboard: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <DashboardHeader />
      <DashboardTabs />
    </div>
  );
};

export default RecruitmentDashboard;
