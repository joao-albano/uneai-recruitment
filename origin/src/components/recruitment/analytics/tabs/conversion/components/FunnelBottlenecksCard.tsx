
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Bottleneck {
  stage: string;
  dropoff: number;
  reason: string;
}

interface FunnelBottlenecksCardProps {
  bottlenecks: Bottleneck[];
}

export const FunnelBottlenecksCard: React.FC<FunnelBottlenecksCardProps> = ({ bottlenecks }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gargalos do Funil</CardTitle>
        <CardDescription>Principais pontos de perda de conversão</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bottlenecks.map((bottleneck, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-medium text-lg">{bottleneck.stage}</h4>
                  <p className="text-muted-foreground text-sm">{bottleneck.reason}</p>
                </div>
                <div className="text-right">
                  <span className="text-red-600 font-bold text-lg">-{bottleneck.dropoff}%</span>
                </div>
              </div>
              <Progress value={100 - bottleneck.dropoff} className="h-2 bg-red-200" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
