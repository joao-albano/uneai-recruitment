
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { filterRecruitmentAlerts, filterRetentionAlerts } from '../utils/alertUtils';
import { Alert } from '@/types/alert';
import { useProduct } from '@/context/ProductContext';

export const useAlertsManagement = () => {
  const { alerts, markAlertAsRead, markAlertActionTaken, addSchedule, generateDemoData } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentProduct } = useProduct();
  
  useEffect(() => {
    // Verificar se temos alertas, caso não, gerar dados demonstrativos
    if (alerts.length === 0) {
      console.log(`Carregando dados de demonstração para a lista de alertas de ${currentProduct === 'recruitment' ? 'captação' : 'retenção'}`);
      generateDemoData();
    }
  }, [alerts.length, generateDemoData, currentProduct]);
  
  // Filter alerts based on search term and product type
  const filteredAlerts = currentProduct === 'recruitment' 
    ? filterRecruitmentAlerts(alerts, searchTerm)
    : filterRetentionAlerts(alerts, searchTerm);
  
  // Divide alerts into unread and read
  const unreadAlerts = filteredAlerts.filter(alert => !alert.read);
  const readAlerts = filteredAlerts.filter(alert => alert.read);
  
  const handleScheduleMeeting = (alertId: string, leadId: string, leadName: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    const scheduleId = `schedule-${Date.now()}`;
    
    addSchedule({
      id: scheduleId,
      studentId: leadId,
      studentName: leadName,
      date: tomorrow,
      agentName: currentProduct === 'recruitment' ? 'Coord. Renata' : 'Prof. Carlos',
      status: 'scheduled',
      notes: currentProduct === 'recruitment' ? 'Acompanhamento de lead potencial' : 'Acompanhamento de aluno em risco'
    });
    
    markAlertActionTaken(alertId);
    
    // Navegação opcional para a página de agendamento
    if (confirm('Deseja visualizar o agendamento criado na página de Agenda?')) {
      navigate('/schedule?id=' + scheduleId);
    }
  };
  
  const handleViewDetails = (alertId: string) => {
    markAlertAsRead(alertId);
    
    // Para o módulo de recrutamento, navegamos para a página de detalhes específica
    if (currentProduct === 'recruitment') {
      // Verifica se o alerta existe antes de navegar
      const alertToView = alerts.find(a => a.id === alertId);
      
      if (alertToView && alertToView.studentId) {
        // Se o alerta estiver relacionado a um lead, redirecionar para os detalhes do lead
        navigate(`/recruitment/leads?view=${alertToView.studentId}`);
      } else {
        // Caso não tenha um lead específico, apenas marcar como lido
        toast({
          title: "Alerta visualizado",
          description: "Este alerta foi marcado como lido."
        });
      }
    } else {
      navigate(`/students?alertId=${alertId}`);
    }
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
