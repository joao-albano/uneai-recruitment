
import React from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CalendarViewProps {
  formattedMonthYear: string;
  firstDayOfMonth: number;
  daysInMonth: number;
  today: Date;
  selectedDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  hasSchedulesOnDay: (day: number) => boolean;
  getScheduleCountForDay: (day: number) => number;
  getScheduleStatusForDay: (day: number) => string | null;
  onNewSchedule: () => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  formattedMonthYear,
  firstDayOfMonth,
  daysInMonth,
  today,
  selectedDate,
  previousMonth,
  nextMonth,
  hasSchedulesOnDay,
  getScheduleCountForDay,
  getScheduleStatusForDay,
  onNewSchedule,
}) => {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <CardTitle className="text-xl font-bold capitalize">
              {formattedMonthYear}
            </CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
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
      </CardContent>
      <CardFooter className="justify-between">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted/50" />
            <span className="text-xs text-muted-foreground">Hoje</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-100 border border-blue-300" />
            <span className="text-xs text-muted-foreground">Agendado</span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={onNewSchedule}>
          <Plus className="mr-1 h-3.5 w-3.5" />
          Novo atendimento
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CalendarView;
