
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ScheduleItem from './ScheduleItem';
import EmptyScheduleState from './EmptyScheduleState';
import { Schedule } from '@/types/schedule';

interface TodaySchedulesProps {
  todaySchedules: Schedule[];
  onCompleted: (id: string) => void;
  onCanceled: (id: string) => void;
  onDetailsClick: (schedule: Schedule) => void;
}

const TodaySchedules: React.FC<TodaySchedulesProps> = ({
  todaySchedules,
  onCompleted,
  onCanceled,
  onDetailsClick
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
                status={schedule.status}
                onMarkCompleted={onCompleted}
                onCancelSchedule={onCanceled}
                onDetailsClick={() => onDetailsClick(schedule)}
              />
            ))}
          </div>
        ) : (
          <EmptyScheduleState 
            message="Não há atendimentos agendados para hoje"
            buttonText="Agendar atendimento"
            onAction={() => {}}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TodaySchedules;
