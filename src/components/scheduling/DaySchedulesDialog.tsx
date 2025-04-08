
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ScheduleItem from './ScheduleItem';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import { ProductType } from '@/context/product/types';
import { Schedule } from '@/types/schedule';
import { Calendar } from 'lucide-react';

interface DaySchedulesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  day: Date | null;
  productContext?: ProductType;
  onViewDetails?: (schedule: Schedule) => void;
  onCompleted?: (id: string) => void;
  onCanceled?: (id: string) => void;
  onEdit?: (schedule: Schedule) => void;
}

const DaySchedulesDialog: React.FC<DaySchedulesDialogProps> = ({
  open,
  onOpenChange,
  day,
  productContext,
  onViewDetails,
  onCompleted,
  onCanceled,
  onEdit
}) => {
  const { visibleSchedules } = useSchedules();

  if (!day) return null;
  
  const formattedDate = format(day, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR });
  
  // Filter schedules for the selected day
  const schedulesForDay = visibleSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.date);
    return scheduleDate.getDate() === day.getDate() &&
           scheduleDate.getMonth() === day.getMonth() &&
           scheduleDate.getFullYear() === day.getFullYear() &&
           // Filter by product context if provided
           (!productContext || schedule.productContext === productContext ||
            // For backward compatibility
            (!schedule.productContext && 
             ((productContext === 'retention' && !schedule.studentId.startsWith('lead-')) ||
              (productContext === 'recruitment' && schedule.studentId.startsWith('lead-'))))
           );
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">{formattedDate}</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {schedulesForDay.length > 0 ? (
            <div className="space-y-3">
              {schedulesForDay.map(schedule => (
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
                  onDetailsClick={() => onViewDetails && onViewDetails(schedule)}
                  onEdit={() => onEdit && onEdit(schedule)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Calendar className="mx-auto h-10 w-10 mb-2 opacity-20" />
              <p>Nenhum agendamento para este dia</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DaySchedulesDialog;
