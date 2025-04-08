
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EnhancedFunnelChart from '../../../components/EnhancedFunnelChart';
import { EnhancedFunnelStage } from '../hooks/useConversionData';

interface ConversionFunnelCardProps {
  funnelData: EnhancedFunnelStage[];
}

export const ConversionFunnelCard: React.FC<ConversionFunnelCardProps> = ({ funnelData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Funil de Conversão</CardTitle>
        <CardDescription>Taxa de conversão em cada etapa do processo de captação</CardDescription>
      </CardHeader>
      <CardContent>
        <EnhancedFunnelChart data={funnelData} />
      </CardContent>
    </Card>
  );
};
