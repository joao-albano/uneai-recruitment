
import React from 'react';
import SummaryCards from './channels/SummaryCards';
import ChannelDistributionChart from './channels/ChannelDistributionChart';
import WeeklyPerformanceChart from './channels/WeeklyPerformanceChart';
import ChannelPerformanceTable from './channels/ChannelPerformanceTable';
import { 
  channelData, 
  weeklyData, 
  calculateTotalLeads, 
  getMostEffectiveChannel, 
  getAverageConversion 
} from './channels/channelData';

const ChannelsTabContent: React.FC = () => {
  const totalLeads = calculateTotalLeads();
  const { name: mostEffectiveChannel, growth: channelGrowth } = getMostEffectiveChannel();
  const averageConversion = getAverageConversion();

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <SummaryCards 
        totalLeads={totalLeads}
        channelName={mostEffectiveChannel}
        channelGrowth={channelGrowth}
        averageConversion={averageConversion}
      />
      
      {/* Gráficos de distribuição e desempenho */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ChannelDistributionChart channelData={channelData} />
        <WeeklyPerformanceChart weeklyData={weeklyData} />
      </div>
      
      {/* Tabela de performance dos canais */}
      <ChannelPerformanceTable channelData={channelData} />
    </div>
  );
};

export default ChannelsTabContent;
