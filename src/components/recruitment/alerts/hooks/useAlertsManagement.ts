
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { filterRecruitmentAlerts } from '../utils/alertUtils';
import { Alert } from '@/types/alert';

export const useAlertsManagement = () => {
  const { alerts, markAlertAsRead, markAlertActionTaken, addSchedule, generateDemoData } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (alerts.length === 0) {
      console.log("Carregando dados de demonstração para a lista de alertas de recrutamento");
      generateDemoData();
    }
  }, [alerts.length, generateDemoData]);
  
  // Filter alerts based on search term
  const filteredAlerts = filterRecruitmentAlerts(alerts, searchTerm);
  
  // Divide alerts into unread and read
  const unreadAlerts = filteredAlerts.filter(alert => !alert.read);
  const readAlerts = filteredAlerts.filter(alert => alert.read);
  
  const handleScheduleMeeting = (alertId: string, leadId: string, leadName: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    addSchedule({
      id: `schedule-${Date.now()}`,
      studentId: leadId,
      studentName: leadName,
      date: tomorrow,
      agentName: 'Coord. Renata',
      status: 'scheduled',
      notes: 'Acompanhamento de lead potencial'
    });
    
    markAlertActionTaken(alertId);
    
    toast({
      title: 'Atendimento agendado',
      description: `Agendado para ${tomorrow.toLocaleDateString()} às ${tomorrow.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
    });
  };
  
  const handleViewDetails = (alertId: string) => {
    markAlertAsRead(alertId);
    navigate(`/recruitment/alerts?id=${alertId}`);
  };

  return {
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    filteredAlerts,
    unreadAlerts,
    readAlerts,
    handleScheduleMeeting,
    handleViewDetails,
    markAlertActionTaken
  };
};
