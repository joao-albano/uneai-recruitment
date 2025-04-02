
import React, { useState } from 'react';
import DashboardHeader from './dashboard/DashboardHeader';
import PeriodSelector from './dashboard/PeriodSelector';
import DashboardTabs from './dashboard/DashboardTabs';

const PredictiveReportingDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2024.2');
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <DashboardHeader 
          title="Relatórios Preditivos" 
          description="Painel estratégico com análises preditivas e métricas de desempenho" 
        />
        <PeriodSelector 
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          periods={['2023.2', '2024.1', '2024.2']}
        />
      </div>
      
      <DashboardTabs selectedPeriod={selectedPeriod} />
    </div>
  );
};

export default PredictiveReportingDashboard;
