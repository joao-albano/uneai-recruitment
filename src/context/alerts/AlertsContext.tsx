
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AlertItem } from '@/types/data';

interface AlertsContextType {
  alerts: AlertItem[];
  setAlerts: (alerts: AlertItem[]) => void;
  addAlert: (alert: AlertItem) => void;
  markAsRead: (id: string) => void;
  markActionTaken: (id: string) => void;
  clearAll: () => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = (alert: AlertItem) => {
    setAlerts(prev => [alert, ...prev]);
  };

  const markAsRead = (id: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, read: true } : alert
      )
    );
  };

  const markActionTaken = (id: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, actionTaken: true } : alert
      )
    );
  };

  const clearAll = () => {
    setAlerts([]);
  };

  const value = {
    alerts,
    setAlerts,
    addAlert,
    markAsRead,
    markActionTaken,
    clearAll
  };

  return <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>;
};

export const useAlerts = () => {
  const context = useContext(AlertsContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertsProvider');
  }
  return context;
};
