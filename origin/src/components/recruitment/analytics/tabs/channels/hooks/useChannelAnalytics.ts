
import { useMemo } from 'react';
import { channelsData } from '../../../data/analyticsData';

export const useChannelAnalytics = () => {
  // Calculate totals for metrics
  const data = useMemo(() => {
    const totalLeads = channelsData.channelPerformance.reduce((sum, channel) => sum + channel.leads, 0);
    const totalCost = channelsData.channelPerformance.reduce((sum, channel) => sum + channel.cost, 0);
    const averageCostPerLead = totalLeads > 0 ? totalCost / totalLeads : 0;
    const averageConversion = channelsData.channelPerformance.length > 0 
      ? channelsData.channelPerformance.reduce((sum, channel) => sum + channel.conversion, 0) / channelsData.channelPerformance.length 
      : 0;
    
    return {
      totalLeads,
      totalCost,
      averageCostPerLead,
      averageConversion,
      channelCount: channelsData.channelPerformance.length,
      channelDistribution: channelsData.channelDistribution,
      weeklyDistribution: channelsData.weeklyDistribution,
      channelPerformance: channelsData.channelPerformance
    };
  }, []);

  return data;
};
