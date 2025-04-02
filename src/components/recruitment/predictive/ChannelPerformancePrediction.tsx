
import React from 'react';
import ChannelSummaryCards from './channel-performance/ChannelSummaryCards';
import ChannelChartsSection from './channel-performance/ChannelChartsSection';
import ChannelPerformanceTable from './channel-performance/ChannelPerformanceTable';

interface ChannelPerformancePredictionProps {
  selectedPeriod: string;
}

const ChannelPerformancePrediction: React.FC<ChannelPerformancePredictionProps> = ({ selectedPeriod }) => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <ChannelSummaryCards />
      
      {/* Charts */}
      <ChannelChartsSection />
      
      {/* Detailed Channel Table */}
      <ChannelPerformanceTable />
    </div>
  );
};

export default ChannelPerformancePrediction;
