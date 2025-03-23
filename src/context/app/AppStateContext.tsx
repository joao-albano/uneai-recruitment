
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateDemoStudents, generateDemoAlerts, generateDemoSchedules } from '@/data/demoData';
import { useStudents } from '../students/StudentsContext';
import { useAlerts } from '../alerts/AlertsContext';
import { useSchedules } from '../schedules/SchedulesContext';
import { useUploads } from '../uploads/UploadsContext';

interface AppStateContextType {
  isLoading: boolean;
  generateDemoData: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const generateDemoData = () => {
    setIsLoading(true);
    
    // We'll implement a simplified version since the hooks may not be available here
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const value = {
    isLoading,
    generateDemoData,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
