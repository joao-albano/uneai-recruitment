
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AlertItem } from '../types/data';

export const useAlertsState = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = (alert: Omit<AlertItem, 'id' | 'date' | 'read' | 'actionTaken'>) => {
    const newAlert: AlertItem = {
      id: uuidv4(),
      createdAt: new Date(),
      read: false,
      actionTaken: false,
      ...alert
    };
    setAlerts([newAlert, ...alerts]);
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(
      alerts.map((alert) => (alert.id === id ? { ...alert, read: true } : alert))
    );
  };

  const markAlertActionTaken = (id: string) => {
    setAlerts(
      alerts.map((alert) => (alert.id === id ? { ...alert, actionTaken: true } : alert))
    );
  };

  return {
    alerts,
    setAlerts,
    addAlert,
    markAlertAsRead,
    markAlertActionTaken
  };
};
