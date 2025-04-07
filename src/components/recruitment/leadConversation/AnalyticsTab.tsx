
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChannelConversionChart } from '../predictive/charts/ChannelConversionChart';
import { ChannelDistributionChart } from '../predictive/charts/ChannelDistributionChart';

const AnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Conversão por Canal</CardTitle>
          <CardDescription>
            Taxa de conversão segmentada por canal de captação
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChannelConversionChart />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Leads</CardTitle>
          <CardDescription>
            Distribuição de leads por curso e estágio no funil
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ChannelDistributionChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsTab;
