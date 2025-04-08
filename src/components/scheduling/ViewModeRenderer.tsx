
import React from 'react';
import { Schedule } from '@/types/schedule';
import CalendarView from './CalendarView';
import TodaySchedules from './TodaySchedules';
import UpcomingSchedules from './UpcomingSchedules';
import ScheduleStats from './ScheduleStats';

interface ViewModeRendererProps {
  viewMode: string;
  todaySchedules: Schedule[];
  upcomingSchedules: Schedule[];
  calendarState: any;
  today: Date;
  handleViewDetails: (schedule: Schedule) => void;
  handleCompleted: (id: string) => void;
  handleCanceled: (id: string) => void;
  handleEditSchedule: (schedule: Schedule) => void;
  handleNewSchedule: () => void;
  handleViewReminders: () => void;
  setDialogState: React.Dispatch<React.SetStateAction<any>>;
}

const ViewModeRenderer: React.FC<ViewModeRendererProps> = ({
  viewMode,
  todaySchedules,
  upcomingSchedules,
  calendarState,
  today,
  handleViewDetails,
  handleCompleted,
  handleCanceled,
  handleEditSchedule,
  handleNewSchedule,
  handleViewReminders,
  setDialogState
}) => {
  
  switch(viewMode) {
    case 'day':
      return (
        <div className="grid grid-cols-1 gap-8">
          <TodaySchedules 
            todaySchedules={todaySchedules}
            onViewDetails={handleViewDetails}
            onCompleted={handleCompleted}
            onCanceled={handleCanceled}
            onEdit={handleEditSchedule}
          />
        </div>
      );
    case 'week':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TodaySchedules 
            todaySchedules={todaySchedules}
            onViewDetails={handleViewDetails}
            onCompleted={handleCompleted}
            onCanceled={handleCanceled}
            onEdit={handleEditSchedule}
          />
          <UpcomingSchedules 
            upcomingSchedules={upcomingSchedules}
            onViewDetails={handleViewDetails}
            onCompleted={handleCompleted}
            onCanceled={handleCanceled}
            onEdit={handleEditSchedule}
          />
        </div>
      );
    case 'month':
    default:
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <CalendarView 
              formattedMonthYear={calendarState.formattedMonthYear}
              firstDayOfMonth={calendarState.firstDayOfMonth}
              daysInMonth={calendarState.daysInMonth}
              today={today}
              selectedDate={calendarState.selectedDate}
              previousMonth={calendarState.previousMonth}
              nextMonth={calendarState.nextMonth}
              hasSchedulesOnDay={calendarState.hasSchedulesOnDay}
              getScheduleCountForDay={calendarState.getScheduleCountForDay}
              getScheduleStatusForDay={calendarState.getScheduleStatusForDay}
              onDayClick={(day) => {
                setDialogState(prev => ({
                  ...prev,
                  daySchedulesDialogOpen: true,
                  selectedDay: new Date(
                    calendarState.selectedDate.getFullYear(),
                    calendarState.selectedDate.getMonth(),
                    day
                  )
                }));
              }}
            />
          </div>
          
          <div className="space-y-8">
            <TodaySchedules 
              todaySchedules={todaySchedules}
              onViewDetails={handleViewDetails}
              onCompleted={handleCompleted}
              onCanceled={handleCanceled}
              onEdit={handleEditSchedule}
            />
            
            <UpcomingSchedules 
              upcomingSchedules={upcomingSchedules}
              onViewDetails={handleViewDetails}
              onCompleted={handleCompleted}
              onCanceled={handleCanceled}
              onEdit={handleEditSchedule}
            />
            
            {/* ScheduleStats component has been removed */}
          </div>
        </div>
      );
  }
};

export default ViewModeRenderer;
