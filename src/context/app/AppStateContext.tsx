
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { generateDemoStudents, generateDemoAlerts, generateDemoSchedules } from '@/data/demoData';

interface AppStateContextType {
  isLoading: boolean;
  generateDemoData: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const generateDemoData = () => {
    setIsLoading(true);
    
    // Use a timeout to simulate loading, then set loading to false
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
