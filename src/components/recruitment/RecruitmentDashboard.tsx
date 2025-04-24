
import React from 'react';
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardTabs from './dashboard/DashboardTabs';

const RecruitmentDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-2 md:px-4 lg:px-6 py-2 md:py-4 lg:py-6 max-w-screen-2xl w-full">
      <DashboardHeader />
      <DashboardTabs />
    </div>
  );
};

export default RecruitmentDashboard;
