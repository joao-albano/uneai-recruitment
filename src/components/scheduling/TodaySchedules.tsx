
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ScheduleItem from './ScheduleItem';
import EmptyScheduleState from './EmptyScheduleState';

interface Schedule {
  id: string;
  studentId: string;
  studentName: string;
  date: Date;
  agentName: string;
  status: 'scheduled' | 'completed' | 'canceled';
  notes?: string;
}

interface TodaySchedulesProps {
  todaySchedules: Schedule[];
  onMarkCompleted: (id: string) => void;
  onCancelSchedule: (id: string) => void;
  onNewSchedule: () => void;
}

const TodaySchedules: React.FC<TodaySchedulesProps> = ({
  todaySchedules,
  onMarkCompleted,
  onCancelSchedule,
  onNewSchedule,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Atendimentos de hoje</CardTitle>
        <CardDescription>
          {todaySchedules.length === 0 
            ? 'Não há atendimentos agendados para hoje.'
            : `${todaySchedules.length} atendimento(s) hoje.`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {todaySchedules.length > 0 ? (
          <div className="space-y-3">
            {todaySchedules.map(schedule => (
              <ScheduleItem
                key={schedule.id}
                id={schedule.id}
                studentName={schedule.studentName}
                date={schedule.date}
                agentName={schedule.agentName}
                notes={schedule.notes}
                onMarkCompleted={onMarkCompleted}
                onCancelSchedule={onCancelSchedule}
              />
            ))}
          </div>
        ) : (
          <EmptyScheduleState 
            message="Não há atendimentos agendados para hoje"
            buttonText="Agendar atendimento"
            onAction={onNewSchedule}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TodaySchedules;
