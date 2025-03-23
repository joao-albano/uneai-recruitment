
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
  const { setStudents } = useStudents();
  const { setAlerts } = useAlerts();
  const { setSchedules } = useSchedules();
  const { addUploadRecord } = useUploads();

  const generateDemoData = () => {
    setIsLoading(true);
    
    const demoStudents = generateDemoStudents();
    const demoAlerts = generateDemoAlerts();
    const demoSchedules = generateDemoSchedules();
    
    setStudents(demoStudents);
    setAlerts(demoAlerts);
    setSchedules(demoSchedules);
    
    addUploadRecord({
      filename: 'demo_dados.csv',
      uploadDate: new Date(Date.now() - 86400000), // yesterday
      recordCount: demoStudents.length,
      status: 'success'
    });
    
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
