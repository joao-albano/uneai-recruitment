
import React from 'react';
import SystemActivity from './SystemActivity';
import UserActivityChart from './UserActivityChart';

const ActivityTabContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <SystemActivity />
        <UserActivityChart />
      </div>
    </div>
  );
};

export default ActivityTabContent;
