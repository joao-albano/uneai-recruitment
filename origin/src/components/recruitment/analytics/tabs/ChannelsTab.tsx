
import React from 'react';
import { SummaryCards } from './channels/components/SummaryCards';
import { DistributionCharts } from './channels/components/DistributionCharts';
import { ChannelPerformanceTable } from './channels/components/ChannelPerformanceTable';
import { ROIBarChart } from './channels/components/ROIBarChart';
import { useChannelAnalytics } from './channels/hooks/useChannelAnalytics';

const ChannelsTab: React.FC = () => {
  const {
    totalLeads,
    totalCost,
    averageCostPerLead,
    averageConversion,
    channelCount,
    channelDistribution,
    weeklyDistribution,
    channelPerformance
  } = useChannelAnalytics();
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <SummaryCards 
        totalLeads={totalLeads}
        totalCost={totalCost}
        averageCostPerLead={averageCostPerLead}
        averageConversion={averageConversion}
        channelCount={channelCount}
      />
      
      {/* Distribution Charts */}
      <DistributionCharts 
        channelDistribution={channelDistribution}
        weeklyDistribution={weeklyDistribution}
        totalLeads={totalLeads}
      />
      
      {/* Channel Performance Table */}
      <ChannelPerformanceTable 
        channelPerformance={channelPerformance}
        channelDistribution={channelDistribution}
      />
      
      {/* ROI Metrics */}
      <ROIBarChart channelPerformance={channelPerformance} />
    </div>
  );
};

export default ChannelsTab;
