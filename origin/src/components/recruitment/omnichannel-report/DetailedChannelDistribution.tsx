
import React from 'react';
import { OmnichannelReportData } from './data/types';
import { prepareChannelComparisonData, calculateTotalsByType } from './detailed-distribution/utils';
import HumanVsAIPieChart from './detailed-distribution/HumanVsAIPieChart';
import ChannelComparisonBarChart from './detailed-distribution/ChannelComparisonBarChart';
import ChannelDistributionTable from './detailed-distribution/ChannelDistributionTable';

interface DetailedChannelDistributionProps {
  data: OmnichannelReportData;
  dateRange: '7d' | '30d' | '90d' | 'all';
}

const DetailedChannelDistribution: React.FC<DetailedChannelDistributionProps> = ({ data, dateRange }) => {
  // Prepare data for components
  const channelComparisonData = prepareChannelComparisonData(data);
  const totals = calculateTotalsByType(channelComparisonData);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <HumanVsAIPieChart 
          humanValue={totals.human} 
          aiValue={totals.ai} 
        />
        <ChannelComparisonBarChart 
          data={channelComparisonData} 
        />
      </div>

      <ChannelDistributionTable 
        data={channelComparisonData} 
      />
    </div>
  );
};

export default DetailedChannelDistribution;
