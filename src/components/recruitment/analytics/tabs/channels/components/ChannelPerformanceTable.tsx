
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ChannelPerformanceTableProps {
  channelPerformance: any[];
  channelDistribution: any[];
}

export const ChannelPerformanceTable: React.FC<ChannelPerformanceTableProps> = ({
  channelPerformance,
  channelDistribution
}) => {
  // Helper to determine the color of the trend
  const getTrendColor = (value: number) => {
    return value > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho por Canal</CardTitle>
        <CardDescription>Métricas detalhadas de cada canal de captação</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Canal</th>
                <th className="text-center py-3 px-4 font-medium">Leads</th>
                <th className="text-center py-3 px-4 font-medium">CPL</th>
                <th className="text-center py-3 px-4 font-medium">Conversão</th>
                <th className="text-center py-3 px-4 font-medium">ROI</th>
                <th className="text-center py-3 px-4 font-medium">Crescimento</th>
              </tr>
            </thead>
            <tbody>
              {channelPerformance.map((channel, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: channelDistribution.find(c => c.name === channel.name)?.color || '#ccc' }}></div>
                      {channel.name}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">{channel.leads}</td>
                  <td className="py-3 px-4 text-center">R$ {channel.costPerLead.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center">{channel.conversion}%</td>
                  <td className="py-3 px-4 text-center">{channel.roi}x</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center">
                      {channel.growth > 0 ? (
                        <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                      ) : (
                        <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                      )}
                      <span className={getTrendColor(channel.growth)}>
                        {Math.abs(channel.growth)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
