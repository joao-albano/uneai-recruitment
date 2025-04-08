
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { filterRecruitmentAlerts, filterRetentionAlerts } from '../utils/alertUtils';
import { Alert } from '@/types/alert';
import { useProduct } from '@/context/product';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export const useAlertsManagement = () => {
  const { alerts, markAlertAsRead, markAlertActionTaken, addSchedule, generateDemoData } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentProduct } = useProduct();
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [scheduledDetails, setScheduledDetails] = useState<{
    alertId: string;
    scheduleId: string;
    leadName: string;
  } | null>(null);
  
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
      notes: currentProduct === 'recruitment' ? 'Acompanhamento de lead potencial' : 'Acompanhamento de aluno em risco',
      productContext: currentProduct
    });
    
    markAlertActionTaken(alertId);
    
    // Em vez de usar confirm, usamos o estado para mostrar o AlertDialog
    setScheduledDetails({
      alertId,
      scheduleId,
      leadName
    });
    setShowScheduleDialog(true);
  };
  
  const handleViewSchedule = () => {
    if (scheduledDetails) {
      const route = currentProduct === 'recruitment' 
        ? `/recruitment/schedule?id=${scheduledDetails.scheduleId}`
        : `/schedule?id=${scheduledDetails.scheduleId}`;
      
      navigate(route);
      setShowScheduleDialog(false);
    }
  };
  
  const handleCancelDialog = () => {
    setShowScheduleDialog(false);
    toast({
      title: "Agendamento criado",
      description: "Você pode visualizar o agendamento na página de Agenda mais tarde.",
    });
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

  // Componente de diálogo para confirmação de agendamento
  const ScheduleConfirmationDialog = () => {
    if (!showScheduleDialog || !scheduledDetails) return null;
    
    return (
      <AlertDialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl">Agendamento criado com sucesso</AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              O agendamento para <span className="font-semibold">{scheduledDetails.leadName}</span> foi criado para amanhã às 10:00.
              <br /><br />
              Deseja visualizar este agendamento agora na página de Agenda?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 mt-4">
            <AlertDialogCancel onClick={handleCancelDialog} className="flex-1">
              Fechar
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleViewSchedule} className="flex-1 bg-primary">
              Ver agendamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
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
    markAlertActionTaken,
    ScheduleConfirmationDialog
  };
};
