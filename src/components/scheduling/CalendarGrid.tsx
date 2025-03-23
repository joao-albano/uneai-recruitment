
import React from 'react';
import { Badge } from '@/components/ui/badge';

interface CalendarGridProps {
  firstDayOfMonth: number;
  daysInMonth: number;
  today: Date;
  selectedDate: Date;
  hasSchedulesOnDay: (day: number) => boolean;
  getScheduleCountForDay: (day: number) => number;
  getScheduleStatusForDay: (day: number) => string | null;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  firstDayOfMonth,
  daysInMonth,
  today,
  selectedDate,
  hasSchedulesOnDay,
  getScheduleCountForDay,
  getScheduleStatusForDay,
}) => {
  const weekdays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  
  return (
    <div className="grid grid-cols-7 gap-1">
      {weekdays.map(day => (
        <div key={day} className="text-center text-sm font-medium p-2">
          {day}
        </div>
      ))}
      
      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
        <div key={`empty-${i}`} className="p-2 text-center text-muted-foreground" />
      ))}
      
      {Array.from({ length: daysInMonth }).map((_, i) => {
        const day = i + 1;
        const isToday = 
          day === today.getDate() && 
          selectedDate.getMonth() === today.getMonth() && 
          selectedDate.getFullYear() === today.getFullYear();
        
        const hasSchedules = hasSchedulesOnDay(day);
        const scheduleCount = getScheduleCountForDay(day);
        const scheduleStatus = getScheduleStatusForDay(day);
        
        let dayClasses = `
          relative p-2 text-center transition-colors hover:bg-muted/50 rounded-lg
          ${isToday ? 'font-bold' : ''}
        `;
        
        let badgeClasses = "text-[10px] h-4 min-w-4 flex items-center justify-center";
        
        if (hasSchedules) {
          if (isToday) {
            dayClasses += ' bg-primary/15 hover:bg-primary/20';
          } else {
            dayClasses += ' bg-primary/5 hover:bg-primary/10';
          }
          
          if (scheduleStatus === 'scheduled') {
            badgeClasses += ' bg-blue-100 text-blue-700 border border-blue-300';
          } else if (scheduleStatus === 'completed') {
            badgeClasses += ' bg-green-100 text-green-700 border border-green-300';
          } else if (scheduleStatus === 'canceled') {
            badgeClasses += ' bg-red-100 text-red-700 border border-red-300';
          }
        } else if (isToday) {
          dayClasses += ' bg-muted/30';
        }
        
        return (
          <div 
            key={`day-${day}`} 
            className={dayClasses}
          >
            <span className={`${isToday ? 'text-primary' : ''}`}>{day}</span>
            
            {hasSchedules && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                <Badge variant="outline" className={badgeClasses}>
                  {scheduleCount}
                </Badge>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CalendarGrid;
