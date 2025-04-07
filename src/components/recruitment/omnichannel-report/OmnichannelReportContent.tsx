
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OmnichannelOverview from './OmnichannelOverview';
import ChannelPerformance from './ChannelPerformance';
import EmotionAnalysis from './EmotionAnalysis';
import InteractionInsights from './InteractionInsights';
import DetailedChannelDistribution from './DetailedChannelDistribution';
import { omnichannelReportData } from './data/omnichannelReportData';

const OmnichannelReportContent: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Relatório Omnichannel</h2>
          <p className="text-muted-foreground">
            Análise completa dos atendimentos realizados por todos os canais
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <select 
            className="border rounded-md p-2 text-sm"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as '7d' | '30d' | '90d' | 'all')}
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="all">Todo o período</option>
          </select>
        </div>
      </div>

      <OmnichannelOverview data={omnichannelReportData} dateRange={dateRange} />
      
      <Tabs defaultValue="channel-performance" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="channel-performance">Desempenho por Canal</TabsTrigger>
          <TabsTrigger value="detailed-distribution">Humano vs IA</TabsTrigger>
          <TabsTrigger value="emotion-analysis">Análise de Emoções</TabsTrigger>
          <TabsTrigger value="interaction-insights">Insights de Interação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="channel-performance" className="space-y-4">
          <ChannelPerformance data={omnichannelReportData} dateRange={dateRange} />
        </TabsContent>
        
        <TabsContent value="detailed-distribution" className="space-y-4">
          <DetailedChannelDistribution data={omnichannelReportData} dateRange={dateRange} />
        </TabsContent>
        
        <TabsContent value="emotion-analysis" className="space-y-4">
          <EmotionAnalysis data={omnichannelReportData} dateRange={dateRange} />
        </TabsContent>
        
        <TabsContent value="interaction-insights" className="space-y-4">
          <InteractionInsights data={omnichannelReportData} dateRange={dateRange} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OmnichannelReportContent;
