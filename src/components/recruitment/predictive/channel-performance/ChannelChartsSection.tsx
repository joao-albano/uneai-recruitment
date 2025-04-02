
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChannelDistributionChart } from '../charts/ChannelDistributionChart';
import { ChannelConversionChart } from '../charts/ChannelConversionChart';

const ChannelChartsSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Distribuição de Leads por Canal</CardTitle>
          <CardDescription>
            Volume de leads captados por cada canal de marketing
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ChannelDistributionChart />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Taxa de Conversão por Canal</CardTitle>
          <CardDescription>
            Percentual de conversão de leads para matrículas por canal
          </CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ChannelConversionChart />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelChartsSection;
