
import { useState } from 'react';
import { AlertItem } from '../types/data';

export const useAlertsState = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);

  const addAlert = (alert: AlertItem) => {
    setAlerts([alert, ...alerts]);
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
