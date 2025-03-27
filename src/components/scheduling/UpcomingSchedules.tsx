
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Schedule } from '@/types/schedule';
import ScheduleItem from './ScheduleItem';
import EmptyScheduleState from './EmptyScheduleState';

interface UpcomingSchedulesProps {
  upcomingSchedules: Schedule[];
  onDetailsClick: (schedule: Schedule) => void;
}

const UpcomingSchedules: React.FC<UpcomingSchedulesProps> = ({ 
  upcomingSchedules, 
  onDetailsClick 
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Próximos atendimentos</CardTitle>
        <CardDescription>
          {upcomingSchedules.length === 0 
            ? 'Não há atendimentos agendados para os próximos dias.' 
            : `${upcomingSchedules.length} atendimento(s) nos próximos dias.`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {upcomingSchedules.length > 0 ? (
          <div className="space-y-3">
            {upcomingSchedules.map(schedule => (
              <div key={schedule.id} className="pb-2 border-b last:border-0 last:pb-0">
                <div className="text-xs text-muted-foreground mb-1">
                  {formatDate(schedule.date)}
                </div>
                <ScheduleItem
                  id={schedule.id}
                  studentName={schedule.studentName}
                  date={schedule.date}
                  agentName={schedule.agentName}
                  notes={schedule.notes}
                  status={schedule.status}
                  onMarkCompleted={() => {}}
                  onCancelSchedule={() => {}}
                  onDetailsClick={() => onDetailsClick(schedule)}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyScheduleState 
            message="Não há atendimentos agendados para os próximos dias"
            buttonText="Agendar atendimento"
            onAction={() => {}}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingSchedules;
