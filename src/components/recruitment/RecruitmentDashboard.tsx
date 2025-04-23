
import React from 'react';
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardTabs from './dashboard/DashboardTabs';

const RecruitmentDashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-6 lg:py-8 max-w-screen-2xl">
      <DashboardHeader />
      <DashboardTabs />
    </div>
  );
};

export default RecruitmentDashboard;
