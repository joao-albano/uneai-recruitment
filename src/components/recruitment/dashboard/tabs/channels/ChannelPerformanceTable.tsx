
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChannelDataType } from './types';
import ChannelTable from './table/ChannelTable';

interface ChannelPerformanceTableProps {
  channelData: ChannelDataType[];
}

const ChannelPerformanceTable: React.FC<ChannelPerformanceTableProps> = ({ channelData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Detalhada por Canal</CardTitle>
        <CardDescription>
          Métricas de volume e conversão para cada canal de captação
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <ChannelTable channelData={channelData} />
      </CardContent>
    </Card>
  );
};

export default ChannelPerformanceTable;
