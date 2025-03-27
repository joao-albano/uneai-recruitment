
import React, { createContext, useContext, useState, useMemo } from 'react';
import { ScheduleItem } from '@/types/data';

interface SchedulesContextType {
  schedules: ScheduleItem[];
  visibleSchedules: ScheduleItem[]; // Added visibleSchedules
  setSchedules: (schedules: ScheduleItem[]) => void;
  addSchedule: (schedule: ScheduleItem) => void;
  updateScheduleStatus: (id: string, status: 'scheduled' | 'completed' | 'canceled') => void;
  updateSchedule: (updatedSchedule: ScheduleItem) => void;
}

const SchedulesContext = createContext<SchedulesContextType | undefined>(undefined);

export const SchedulesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  
  // Add computed property for visible schedules (currently showing all)
  const visibleSchedules = useMemo(() => schedules, [schedules]);

  const addSchedule = (schedule: ScheduleItem) => {
    setSchedules(prev => [...prev, schedule]);
  };
  
  const updateScheduleStatus = (id: string, status: 'scheduled' | 'completed' | 'canceled') => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === id 
          ? { ...schedule, status } 
          : schedule
      )
    );
  };
  
  const updateSchedule = (updatedSchedule: ScheduleItem) => {
    setSchedules(prev => 
      prev.map(schedule => 
        schedule.id === updatedSchedule.id 
          ? updatedSchedule 
          : schedule
      )
    );
  };

  return (
    <SchedulesContext.Provider value={{
      schedules,
      visibleSchedules, // Expose visibleSchedules
      setSchedules,
      addSchedule,
      updateScheduleStatus,
      updateSchedule
    }}>
      {children}
    </SchedulesContext.Provider>
  );
};

export const useSchedules = () => {
  const context = useContext(SchedulesContext);
  if (context === undefined) {
    throw new Error('useSchedules must be used within a SchedulesProvider');
  }
  return context;
};
