
import { useState } from 'react';
import { Schedule } from '@/types/schedule';

export const useCalendarState = (schedules: Schedule[]) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const formattedMonthYear = selectedDate.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });
  
  const daysInMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  ).getDay();
  
  const previousMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1)
    );
  };
  
  const nextMonth = () => {
    setSelectedDate(
      new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1)
    );
  };

  const currentMonthSchedules = schedules.filter(schedule => 
    schedule.date.getMonth() === selectedDate.getMonth() &&
    schedule.date.getFullYear() === selectedDate.getFullYear()
  );
  
  const hasSchedulesOnDay = (day: number) => {
    return currentMonthSchedules.some(schedule => 
      schedule.date.getDate() === day
    );
  };
  
  const getScheduleCountForDay = (day: number) => {
    return currentMonthSchedules.filter(schedule => 
      schedule.date.getDate() === day
    ).length;
  };
  
  const getScheduleStatusForDay = (day: number) => {
    const daySchedules = currentMonthSchedules.filter(schedule => 
      schedule.date.getDate() === day
    );
    
    if (daySchedules.some(s => s.status === 'scheduled')) {
      return 'scheduled';
    } else if (daySchedules.some(s => s.status === 'completed')) {
      return 'completed';
    } else if (daySchedules.some(s => s.status === 'canceled')) {
      return 'canceled';
    }
    
    return null;
  };

  return {
    selectedDate,
    formattedMonthYear,
    daysInMonth,
    firstDayOfMonth,
    previousMonth,
    nextMonth,
    hasSchedulesOnDay,
    getScheduleCountForDay,
    getScheduleStatusForDay
  };
};
