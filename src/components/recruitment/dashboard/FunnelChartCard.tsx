
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FunnelChartComponent from './FunnelChart';

const FunnelChartCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Funil de Captação</CardTitle>
        <CardDescription>
          Visão geral do processo de captação
        </CardDescription>
      </CardHeader>
      <CardContent className="my-[14px] py-[27px] mx-0 px-[12px]">
        <div className="h-80">
          <FunnelChartComponent />
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelChartCard;
