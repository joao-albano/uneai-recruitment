
import React from 'react';
import { Schedule } from '@/types/schedule';
import ScheduleItem from './ScheduleItem';
import EmptyScheduleState from './EmptyScheduleState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UpcomingSchedulesProps {
  upcomingSchedules: Schedule[];
  onDetailsClick: (schedule: Schedule) => void;
  onCompleted?: (id: string) => void;
  onCanceled?: (id: string) => void;
}

const UpcomingSchedules: React.FC<UpcomingSchedulesProps> = ({
  upcomingSchedules,
  onDetailsClick,
  onCompleted,
  onCanceled
}) => {
  if (upcomingSchedules.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Próximos Atendimentos</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyScheduleState
            message="Não há atendimentos agendados para os próximos dias"
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
        <CardTitle className="text-lg">Próximos Atendimentos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {upcomingSchedules.map((schedule) => (
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
      </CardContent>
    </Card>
  );
};

export default UpcomingSchedules;
