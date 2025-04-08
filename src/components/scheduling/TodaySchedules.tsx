
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ScheduleItem from './ScheduleItem';
import { Schedule } from '@/types/schedule';
import { Clock } from 'lucide-react';

interface TodaySchedulesProps {
  todaySchedules: Schedule[];
  onViewDetails: (schedule: Schedule) => void;
  onCompleted: (id: string) => void;
  onCanceled: (id: string) => void;
  onEdit?: (schedule: Schedule) => void;
}

const TodaySchedules: React.FC<TodaySchedulesProps> = ({
  todaySchedules,
  onViewDetails,
  onCompleted,
  onCanceled,
  onEdit
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Hoje</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {todaySchedules.length > 0 ? (
          <div className="space-y-3">
            {todaySchedules.map(schedule => (
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
            <Clock className="mx-auto h-10 w-10 mb-2 opacity-20" />
            <p>Nenhum agendamento para hoje</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaySchedules;
