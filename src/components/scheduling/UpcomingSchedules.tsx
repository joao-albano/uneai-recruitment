
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScheduleItem from './ScheduleItem';
import { Schedule } from '@/types/schedule';
import { Calendar } from 'lucide-react';

interface UpcomingSchedulesProps {
  upcomingSchedules: Schedule[];
  onViewDetails: (schedule: Schedule) => void;
  onCompleted: (id: string) => void;
  onCanceled: (id: string) => void;
  onEdit?: (schedule: Schedule) => void;
}

const UpcomingSchedules: React.FC<UpcomingSchedulesProps> = ({
  upcomingSchedules,
  onViewDetails,
  onCompleted,
  onCanceled,
  onEdit
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Próximos Agendamentos</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {upcomingSchedules.length > 0 ? (
          <div className="space-y-3">
            {upcomingSchedules.map(schedule => (
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
                onEdit={() => onEdit && onEdit(schedule)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="mx-auto h-10 w-10 mb-2 opacity-20" />
            <p>Nenhum agendamento futuro</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingSchedules;
