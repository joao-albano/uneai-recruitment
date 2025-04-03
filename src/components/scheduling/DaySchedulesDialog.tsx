
import React, { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Schedule } from '@/types/schedule';
import { useSchedules } from '@/context/schedules/SchedulesContext';
import ScheduleItem from './ScheduleItem';
import EmptyScheduleState from './EmptyScheduleState';
import { ProductType } from '@/context/product/types';

interface DaySchedulesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  day: Date | null;
  productContext?: ProductType;
}

const DaySchedulesDialog: React.FC<DaySchedulesDialogProps> = ({ 
  open, 
  onOpenChange,
  day,
  productContext
}) => {
  const { schedules } = useSchedules();
  
  const daySchedules = useMemo(() => {
    if (!day) return [];
    
    let filteredSchedules = schedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate.getDate() === day.getDate() &&
             scheduleDate.getMonth() === day.getMonth() &&
             scheduleDate.getFullYear() === day.getFullYear();
    });
    
    // Further filter by product context if specified
    if (productContext) {
      filteredSchedules = filteredSchedules.filter(schedule => 
        (schedule.productContext === productContext) ||
        // For backward compatibility with existing schedules that don't have productContext
        (!schedule.productContext && 
         ((productContext === 'retention' && !schedule.studentId.startsWith('lead-')) ||
          (productContext === 'recruitment' && schedule.studentId.startsWith('lead-'))))
      );
    }
    
    return filteredSchedules.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }, [day, schedules, productContext]);
  
  const formattedDate = day 
    ? day.toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    : '';
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="capitalize">
            Agendamentos para {formattedDate}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 max-h-[500px] overflow-y-auto">
          {daySchedules.length > 0 ? (
            <div className="space-y-4">
              {daySchedules.map(schedule => (
                <ScheduleItem 
                  key={schedule.id}
                  schedule={schedule}
                  showActions={true}
                />
              ))}
            </div>
          ) : (
            <EmptyScheduleState
              message={`Não há agendamentos para ${formattedDate}`}
              icon="calendar"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DaySchedulesDialog;
