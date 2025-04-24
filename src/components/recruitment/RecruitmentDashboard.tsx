
import React from 'react';
import DashboardHeader from './dashboard/DashboardHeader';
import DashboardTabs from './dashboard/DashboardTabs';

const RecruitmentDashboard: React.FC = () => {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      <DashboardHeader />
      <DashboardTabs />
    </div>
  );
};

export default RecruitmentDashboard;
