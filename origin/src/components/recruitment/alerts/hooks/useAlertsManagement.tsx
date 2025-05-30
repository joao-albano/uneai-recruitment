import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { filterRecruitmentAlerts, filterRetentionAlerts, getAlertTitle, getDefaultAlertMessage } from '../utils/alertUtils';
import { Alert } from '@/types/alert';
import { useProduct } from '@/context/product';
import AlertIcon from '@/components/alerts/AlertIcon';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export const useAlertsManagement = () => {
  const { alerts, markAlertAsRead, markAlertActionTaken, addSchedule, generateDemoData } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();
  const { currentProduct } = useProduct();
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [scheduledDetails, setScheduledDetails] = useState<{
    alertId: string;
    scheduleId: string;
    leadName: string;
  } | null>(null);
  
  useEffect(() => {
    if (alerts.length === 0) {
      console.log(`Generating demo data for ${currentProduct === 'recruitment' ? 'recruitment' : 'retention'} alerts`);
      generateDemoData();
    } else {
      console.log(`Found ${alerts.length} alerts in total`);
    }
  }, [alerts.length, generateDemoData, currentProduct]);
  
  const filteredAlerts = currentProduct === 'recruitment' 
    ? filterRecruitmentAlerts(alerts, searchTerm)
    : filterRetentionAlerts(alerts, searchTerm);
  
  useEffect(() => {
    console.log(`Filtered alerts for ${currentProduct}: ${filteredAlerts.length}`);
    console.log(`Alert types present:`, filteredAlerts.map(a => a.type));
  }, [filteredAlerts, currentProduct]);
  
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
    
    const alertToView = alerts.find(a => a.id === alertId);
    
    if (alertToView) {
      setSelectedAlert(alertToView);
      setShowDetailsDialog(true);
    } else {
      toast({
        title: "Erro",
        description: "Alerta não encontrado",
        variant: "destructive"
      });
    }
  };
  
  const handleViewLeadDetails = () => {
    if (selectedAlert?.studentId) {
      navigate(`/recruitment/leads?view=${selectedAlert.studentId}`);
      setShowDetailsDialog(false);
    } else {
      toast({
        title: "Informação",
        description: "Este alerta não está associado a um lead específico.",
      });
      setShowDetailsDialog(false);
    }
  };

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

  const AlertDetailsDialog = () => {
    if (!showDetailsDialog || !selectedAlert) return null;
    
    const getAlertTypeSpecificDetails = () => {
      switch (selectedAlert.type) {
        case 'campaign-performance':
          return (
            <div className="space-y-3 mt-4">
              <h4 className="font-medium">Informações da Campanha:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Taxa de conversão atual: <span className="font-medium">4.8%</span></li>
                <li>Leads gerados: <span className="font-medium">42</span></li>
                <li>Investimento: <span className="font-medium">R$ 2.500,00</span></li>
                <li>ROI estimado: <span className="font-medium">2.4x</span></li>
              </ul>
              <p className="text-sm mt-2">Considere ampliar o orçamento para aproveitar o bom desempenho.</p>
            </div>
          );
        case 'lead-opportunity':
          return (
            <div className="space-y-3 mt-4">
              <h4 className="font-medium">Oportunidade Identificada:</h4>
              <p>Lead demonstrou interesse no curso de Medicina e possui alto potencial de conversão.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Score de qualificação: <span className="font-medium">87/100</span></li>
                <li>Visitou o campus: <span className="font-medium">Sim</span></li>
                <li>Histórico escolar: <span className="font-medium">Excelente</span></li>
              </ul>
            </div>
          );
        case 'stage-change':
          return (
            <div className="space-y-3 mt-4">
              <h4 className="font-medium">Mudança de Estágio:</h4>
              <p>
                O lead mudou de <span className="font-medium">{selectedAlert.message.includes('regrediu') ? 'estágio superior' : 'estágio inferior'}</span> para <span className="font-medium">{selectedAlert.message.includes('Avaliando') ? 'Avaliando Concorrentes' : 'outro estágio'}</span>.
              </p>
              <h4 className="font-medium mt-4">Ações Recomendadas:</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reengajamento imediato com conteúdo personalizado</li>
                <li>Oferecer conversa com coordenador do curso</li>
                <li>Enviar material comparativo com concorrentes</li>
              </ul>
            </div>
          );
        default:
          return (
            <div className="mt-4">
              <p>{selectedAlert.message}</p>
            </div>
          );
      }
    };
    
    return (
      <AlertDialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <AlertDialogContent className="sm:max-w-[550px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl flex items-center gap-2">
              <AlertIcon type={selectedAlert.type} /> 
              {getAlertTitle(selectedAlert)}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              {selectedAlert.message || getDefaultAlertMessage(selectedAlert)}
              {getAlertTypeSpecificDetails()}
              
              <div className="bg-muted p-3 rounded-md mt-6 text-xs">
                <p>Criado em: {new Date(selectedAlert.createdAt).toLocaleDateString('pt-BR')} às {' '}
                {new Date(selectedAlert.createdAt).toLocaleTimeString('pt-BR', {
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p>Status: {selectedAlert.actionTaken ? 'Resolvido' : 'Pendente'}</p>
                {selectedAlert.studentId && <p>ID do lead: {selectedAlert.studentId}</p>}
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2 mt-4">
            <AlertDialogCancel onClick={() => setShowDetailsDialog(false)} className="flex-1">
              Fechar
            </AlertDialogCancel>
            {selectedAlert.studentId && (
              <AlertDialogAction onClick={handleViewLeadDetails} className="flex-1 bg-primary">
                Ver Lead Completo
              </AlertDialogAction>
            )}
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
    ScheduleConfirmationDialog,
    AlertDetailsDialog
  };
};
