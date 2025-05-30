
import React, { createContext, useContext, useState } from 'react';
import { AlertItem } from '@/types/data';

interface AlertsContextType {
  alerts: AlertItem[];
  setAlerts: (alerts: AlertItem[]) => void;
  addAlert: (alert: AlertItem) => void;
  markAlertAsRead: (id: string) => void;
  markAlertActionTaken: (id: string) => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = (alert: AlertItem) => {
    setAlerts(prev => [...prev, alert]);
  };
  
  const markAlertAsRead = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id 
          ? { ...alert, read: true } 
          : alert
      )
    );
  };
  
  const markAlertActionTaken = (id: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === id 
          ? { ...alert, actionTaken: true } 
          : alert
      )
    );
  };

  return (
    <AlertsContext.Provider value={{
      alerts,
      setAlerts,
      addAlert,
      markAlertAsRead,
      markAlertActionTaken
    }}>
      {children}
    </AlertsContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
};
