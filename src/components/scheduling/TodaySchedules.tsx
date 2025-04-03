
import React from 'react';
import { Schedule } from '@/types/schedule';
import ScheduleItem from './ScheduleItem';
import EmptyScheduleState from './EmptyScheduleState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TodaySchedulesProps {
  todaySchedules: Schedule[];
  onViewDetails: (schedule: Schedule) => void;
  onCompleted?: (id: string) => void;
  onCanceled?: (id: string) => void;
}

const TodaySchedules: React.FC<TodaySchedulesProps> = ({
  todaySchedules,
  onViewDetails,
  onCompleted,
  onCanceled
}) => {
  const scheduledAppointments = todaySchedules.filter(s => s.status === 'scheduled');
  
  if (scheduledAppointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Atendimentos para Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyScheduleState
            message="Não há atendimentos agendados para hoje"
            buttonText=""
            onAction={() => {}}
            showButton={false}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Atendimentos para Hoje</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {scheduledAppointments.map((schedule) => (
          <ScheduleItem
            key={schedule.id}
            id={schedule.id}
            studentName={schedule.studentName}
            date={new Date(schedule.date)}
            agentName={schedule.agentName}
            notes={schedule.notes}
            status={schedule.status}
            onMarkCompleted={onCompleted}
            onCancelSchedule={onCanceled}
            onDetailsClick={() => onViewDetails(schedule)}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default TodaySchedules;
