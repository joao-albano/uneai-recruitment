
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ModelHistoryChart } from '../charts/ModelHistoryChart';

const HistoryChartCard: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução Histórica das Métricas</CardTitle>
        <CardDescription>Desempenho do modelo ao longo do tempo</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ModelHistoryChart />
      </CardContent>
    </Card>
  );
};

export default HistoryChartCard;
