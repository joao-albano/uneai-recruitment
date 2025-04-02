
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SegmentData {
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  aucRoc: number;
}

interface SegmentPerformanceTableProps {
  segments: SegmentData[];
  getBadgeColor: (value: number) => string;
}

const SegmentPerformanceTable: React.FC<SegmentPerformanceTableProps> = ({ segments, getBadgeColor }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho por Segmento</CardTitle>
        <CardDescription>Métricas do modelo divididas por tipo de curso</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium">Segmento</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Precisão</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Precision</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Recall</th>
                <th className="px-4 py-3 text-center text-sm font-medium">F1 Score</th>
                <th className="px-4 py-3 text-center text-sm font-medium">AUC-ROC</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {segments.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-muted/30'}>
                  <td className="px-4 py-3 text-sm">{item.name}</td>
                  <td className="px-4 py-3 text-sm text-center">
                    <Badge className={getBadgeColor(item.accuracy)}>
                      {item.accuracy}%
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <Badge className={getBadgeColor(item.precision)}>
                      {item.precision}%
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <Badge className={getBadgeColor(item.recall)}>
                      {item.recall}%
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <Badge className={getBadgeColor(item.f1Score)}>
                      {item.f1Score}%
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">
                    <Badge className={getBadgeColor(item.aucRoc)}>
                      {item.aucRoc}%
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

export default SegmentPerformanceTable;
