
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ModelHistoryChart } from '../charts/ModelHistoryChart';

const HistoryChartCard: React.FC = () => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Evolução Histórica das Métricas</CardTitle>
        <CardDescription>Desempenho do modelo ao longo do tempo</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full">
          <ModelHistoryChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryChartCard;
