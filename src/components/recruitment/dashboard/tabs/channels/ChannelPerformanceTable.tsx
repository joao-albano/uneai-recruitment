
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChannelDataType } from './types';

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
      <CardContent>
        <div className="border rounded-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Canal</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Leads</th>
                <th className="px-4 py-3 text-center text-sm font-medium">% do Total</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Taxa de Conversão</th>
                <th className="px-4 py-3 text-center text-sm font-medium">CPA</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Tendência</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {channelData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-muted/30'}>
                  <td className="px-4 py-3 text-sm font-medium flex items-center">
                    <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-center">{item.count}</td>
                  <td className="px-4 py-3 text-sm text-center">{item.percentage}%</td>
                  <td className="px-4 py-3 text-sm text-center">{item.conversion}%</td>
                  <td className="px-4 py-3 text-sm text-center">R$ {(Math.random() * 100 + 50).toFixed(2)}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <Badge 
                      variant="outline"
                      className={index % 3 === 0 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : index % 3 === 1 
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {index % 3 === 0 ? "↑ Em alta" : index % 3 === 1 ? "→ Estável" : "↓ Em queda"}
                    </Badge>
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

export default ChannelPerformanceTable;
