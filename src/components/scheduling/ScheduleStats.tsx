
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Schedule {
  id: string;
  status: 'scheduled' | 'completed' | 'canceled';
}

interface ScheduleStatsProps {
  schedules: Schedule[];
  isMobile?: boolean;
}

const ScheduleStats: React.FC<ScheduleStatsProps> = ({ schedules, isMobile }) => {
  const scheduledCount = schedules.filter(s => s.status === 'scheduled').length;
  const completedCount = schedules.filter(s => s.status === 'completed').length;
  const canceledCount = schedules.filter(s => s.status === 'canceled').length;
  const totalCount = schedules.length;

  const getPercentage = (count: number): string => {
    if (totalCount === 0 || count === 0) return '0%';
    return `${(count / totalCount) * 100}%`;
  };

  return (
    <Card className="bg-muted/30">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Estatísticas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">Atendimentos agendados</span>
            <span className="font-medium">{scheduledCount}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: getPercentage(scheduledCount) }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">Atendimentos concluídos</span>
            <span className="font-medium">{completedCount}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: getPercentage(completedCount) }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm">Atendimentos cancelados</span>
            <span className="font-medium">{canceledCount}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-red-500 rounded-full"
              style={{ width: getPercentage(canceledCount) }}
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
