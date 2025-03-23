
import React, { createContext, useContext, ReactNode } from 'react';
import { useAlertsState } from '@/hooks/useAlertsState';
import { AlertItem } from '@/types/data';

interface AlertsContextType {
  alerts: AlertItem[];
  setAlerts: (alerts: AlertItem[]) => void;
  addAlert: (alert: Omit<AlertItem, 'id' | 'date' | 'read' | 'actionTaken'>) => void;
  markAlertAsRead: (id: string) => void;
  markAlertActionTaken: (id: string) => void;
}

const AlertsContext = createContext<AlertsContextType | undefined>(undefined);

export const AlertsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { alerts, setAlerts, addAlert, markAlertAsRead, markAlertActionTaken } = useAlertsState();

  const value = {
    alerts,
    setAlerts,
    addAlert,
    markAlertAsRead,
    markAlertActionTaken,
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
