
import React, { createContext, useContext, ReactNode } from 'react';
import { useSchedulesState } from '@/hooks/useSchedulesState';
import { ScheduleItem } from '@/types/data';

interface SchedulesContextType {
  schedules: ScheduleItem[];
  setSchedules: (schedules: ScheduleItem[]) => void;
  addSchedule: (schedule: ScheduleItem) => void;
  updateScheduleStatus: (id: string, status: 'scheduled' | 'completed' | 'canceled') => void;
  updateSchedule: (updatedSchedule: ScheduleItem) => void;
}

const SchedulesContext = createContext<SchedulesContextType | undefined>(undefined);

export const SchedulesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    schedules, 
    setSchedules, 
    addSchedule, 
    updateScheduleStatus, 
    updateSchedule 
  } = useSchedulesState();

  const value = {
    schedules,
    setSchedules,
    addSchedule,
    updateScheduleStatus,
    updateSchedule
  };

  return <SchedulesContext.Provider value={value}>{children}</SchedulesContext.Provider>;
};

export const useSchedules = () => {
  const context = useContext(SchedulesContext);
  if (context === undefined) {
    throw new Error('useSchedules must be used within a SchedulesProvider');
  }
  return context;
};
