
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { channelData } from './channelPerformanceData';
import { ChannelPerformance } from '@/types/recruitment/predictions';

const ChannelPerformanceTable: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho Detalhado por Canal</CardTitle>
        <CardDescription>
          Métricas de desempenho e previsões para cada canal de captação
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Canal</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Leads</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Conversão</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Custo/Lead</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Meta</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Previsão</th>
                <th className="px-4 py-3 text-center text-sm font-medium">% Atingimento</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Confiança</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {channelData.map((item: ChannelPerformance, index) => {
                const percentage = item.targetEnrollment && item.predictedEnrollment 
                  ? (item.predictedEnrollment / item.targetEnrollment) * 100 
                  : 0;
                return (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-muted/30'}>
                    <td className="px-4 py-3 text-sm">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-center">{item.leads}</td>
                    <td className="px-4 py-3 text-sm text-center">{item.conversionRate.toFixed(1)}%</td>
                    <td className="px-4 py-3 text-sm text-center">R$ {item.costPerLead.toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-center">{item.targetEnrollment}</td>
                    <td className="px-4 py-3 text-sm text-center">{item.predictedEnrollment}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <div className="flex items-center justify-center">
                        <span className={percentage >= 100 
                          ? 'text-green-600' 
                          : percentage >= 80 
                            ? 'text-amber-600' 
                            : 'text-red-600'
                        }>
                          {percentage.toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-center">
                      {item.confidence && (
                        <Badge
                          variant="outline"
                          className={
                            item.confidence === 'alta' 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }
                        >
                          {item.confidence}
                        </Badge>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelPerformanceTable;
