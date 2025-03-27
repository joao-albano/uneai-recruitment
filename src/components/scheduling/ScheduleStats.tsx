
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Clock, Check, X } from 'lucide-react';

interface ScheduleStatsProps {
  todayCount: number;
  upcomingCount: number;
  completedCount?: number;
  canceledCount?: number;
}

const ScheduleStats: React.FC<ScheduleStatsProps> = ({ 
  todayCount, 
  upcomingCount, 
  completedCount = 0, 
  canceledCount = 0 
}) => {
  const totalCount = todayCount + upcomingCount + completedCount + canceledCount;

  const getPercentage = (count: number): string => {
    if (totalCount === 0 || count === 0) return '0%';
    return `${Math.round((count / totalCount) * 100)}%`;
  };

  return (
    <Card className="bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Estatísticas de Atendimentos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm flex items-center gap-1">
              <Clock className="h-4 w-4 text-blue-500" />
              Hoje
            </span>
            <span className="font-medium">{todayCount}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-blue-500 rounded-full"
              style={{ width: getPercentage(todayCount) }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm flex items-center gap-1">
              <Calendar className="h-4 w-4 text-green-500" />
              Próximos
            </span>
            <span className="font-medium">{upcomingCount}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-green-500 rounded-full"
              style={{ width: getPercentage(upcomingCount) }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm flex items-center gap-1">
              <Check className="h-4 w-4 text-emerald-500" />
              Concluídos
            </span>
            <span className="font-medium">{completedCount}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div 
              className="h-full bg-emerald-500 rounded-full"
              style={{ width: getPercentage(completedCount) }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm flex items-center gap-1">
              <X className="h-4 w-4 text-red-500" />
              Cancelados
            </span>
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
            <span className="text-sm font-medium">Total de atendimentos</span>
            <span className="font-medium">{totalCount}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScheduleStats;
