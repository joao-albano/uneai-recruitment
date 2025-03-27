
import React, { createContext, useContext, ReactNode } from 'react';
import { useSchedulesState } from '@/hooks/useSchedulesState';
import { ScheduleItem } from '@/types/data';
import { useAuth } from '@/context/auth';

interface SchedulesContextType {
  schedules: ScheduleItem[];
  setSchedules: (schedules: ScheduleItem[]) => void;
  addSchedule: (schedule: ScheduleItem) => void;
  updateScheduleStatus: (id: string, status: 'scheduled' | 'completed' | 'canceled') => void;
  updateSchedule: (updatedSchedule: ScheduleItem) => void;
  clearAllSchedules: () => void;
  visibleSchedules: ScheduleItem[];
}

const SchedulesContext = createContext<SchedulesContextType | undefined>(undefined);

export const SchedulesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { 
    schedules, 
    setSchedules, 
    addSchedule, 
    updateScheduleStatus, 
    updateSchedule,
    clearAllSchedules 
  } = useSchedulesState();
  const { isAdmin, userEmail } = useAuth();

  const visibleSchedules = isAdmin 
    ? schedules 
    : schedules.filter(schedule => schedule.agentName === userEmail || schedule.agentName === 'Coord. Mariana');

  const value = {
    schedules,
    setSchedules,
    addSchedule,
    updateScheduleStatus,
    updateSchedule,
    clearAllSchedules,
    visibleSchedules
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
