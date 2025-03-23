
import { useState } from 'react';
import { ScheduleItem } from '../types/data';

export const useSchedulesState = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

  const addSchedule = (schedule: ScheduleItem) => {
    setSchedules([...schedules, schedule]);
  };

  const updateScheduleStatus = (id: string, status: 'scheduled' | 'completed' | 'canceled') => {
    setSchedules(
      schedules.map((schedule) => (schedule.id === id ? { ...schedule, status } : schedule))
    );
  };

  const updateSchedule = (updatedSchedule: ScheduleItem) => {
    setSchedules(
      schedules.map((schedule) => 
        schedule.id === updatedSchedule.id ? updatedSchedule : schedule
      )
    );
  };

  const clearAllSchedules = () => {
    setSchedules([]);
  };

  return {
    schedules,
    setSchedules,
    addSchedule,
    updateScheduleStatus,
    updateSchedule,
    clearAllSchedules
  };
};
