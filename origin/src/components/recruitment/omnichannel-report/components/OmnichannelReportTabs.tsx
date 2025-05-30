
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChannelPerformance from '../ChannelPerformance';
import DetailedChannelDistribution from '../DetailedChannelDistribution';
import EmotionAnalysis from '../EmotionAnalysis';
import InteractionInsights from '../InteractionInsights';
import RegistryReport from '../registry/RegistryReport';
import CallsReport from '../calls/CallsReport';
import { OmnichannelReportData } from '../data/types';

interface OmnichannelReportTabsProps {
  data: OmnichannelReportData;
  dateRange: '7d' | '30d' | '90d' | 'all';
}

const OmnichannelReportTabs: React.FC<OmnichannelReportTabsProps> = ({ 
  data, 
  dateRange 
}) => {
  return (
    <Tabs defaultValue="channel-performance" className="w-full">
      <TabsList className="grid grid-cols-6 mb-4">
        <TabsTrigger value="channel-performance">Desempenho por Canal</TabsTrigger>
        <TabsTrigger value="detailed-distribution">Humano vs IA</TabsTrigger>
        <TabsTrigger value="emotion-analysis">Análise de Emoções</TabsTrigger>
        <TabsTrigger value="interaction-insights">Insights de Interação</TabsTrigger>
        <TabsTrigger value="registry-report">Tabulações</TabsTrigger>
        <TabsTrigger value="calls-report">Discagens</TabsTrigger>
      </TabsList>
      
      <TabsContent value="channel-performance" className="space-y-4">
        <ChannelPerformance data={data} dateRange={dateRange} />
      </TabsContent>
      
      <TabsContent value="detailed-distribution" className="space-y-4">
        <DetailedChannelDistribution data={data} dateRange={dateRange} />
      </TabsContent>
      
      <TabsContent value="emotion-analysis" className="space-y-4">
        <EmotionAnalysis data={data} dateRange={dateRange} />
      </TabsContent>
      
      <TabsContent value="interaction-insights" className="space-y-4">
        <InteractionInsights data={data} dateRange={dateRange} />
      </TabsContent>

      <TabsContent value="registry-report" className="space-y-4">
        <RegistryReport dateRange={dateRange} />
      </TabsContent>
      
      <TabsContent value="calls-report" className="space-y-4">
        <CallsReport dateRange={dateRange} />
      </TabsContent>
    </Tabs>
  );
};

export default OmnichannelReportTabs;
