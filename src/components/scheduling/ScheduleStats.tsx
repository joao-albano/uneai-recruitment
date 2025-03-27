
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface ScheduleStatsProps {
  todayCount: number;
  upcomingCount: number;
}

const ScheduleStats: React.FC<ScheduleStatsProps> = ({ todayCount, upcomingCount }) => {
  const totalCount = todayCount + upcomingCount;

  const getPercentage = (count: number): string => {
    if (totalCount === 0 || count === 0) return '0%';
    return `${Math.round((count / totalCount) * 100)}%`;
  };

  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Estatísticas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">Atendimentos de hoje</span>
            <span className="font-medium">{todayCount}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: getPercentage(todayCount) }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">Próximos atendimentos</span>
            <span className="font-medium">{upcomingCount}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: getPercentage(upcomingCount) }}
            />
          </div>
        </div>
        
        <Separator className="my-2" />
        
        <div className="mt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Total de atendimentos</span>
            <span className="font-medium">{totalCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleStats;
