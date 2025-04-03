
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AlertIcon, { getAlertBgColor } from '@/components/alerts/AlertIcon';
import { Button } from '@/components/ui/button';
import { Calendar, Check, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useData } from '@/context/DataContext';
import { Alert } from '@/types/alert';

const RecruitmentAlertsList: React.FC = () => {
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
  
  // Filter alerts relevant to recruitment
  const recruitmentAlertTypes = ['lead-opportunity', 'stage-change', 'campaign-performance', 'lead-assigned'];
  
  const filteredAlerts = alerts.filter(alert => {
    // Include alerts of recruitment specific types or general alerts like 'info' or 'error'
    const isRecruitmentAlert = recruitmentAlertTypes.includes(alert.type) || ['info', 'error'].includes(alert.type);
    
    const matchesSearch = 
      alert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alert.message && alert.message.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return isRecruitmentAlert && matchesSearch;
  });
  
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

  const displayedAlerts = activeTab === 'unread' ? unreadAlerts : activeTab === 'read' ? readAlerts : filteredAlerts;

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Alertas de Captação</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie alertas de oportunidades e ações para captação de alunos
        </p>
      </div>
      
      {/* Search field */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar alertas..."
            className="w-full rounded-md border border-input px-4 py-2 pl-10 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </span>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">
            Todos ({filteredAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="unread">
            Não Lidos ({unreadAlerts.length})
          </TabsTrigger>
          <TabsTrigger value="read">
            Lidos ({readAlerts.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {displayedAlerts.length > 0 ? (
            displayedAlerts.map((alert) => (
              <AlertCard 
                key={alert.id} 
                alert={alert}
                onViewDetails={handleViewDetails}
                onScheduleMeeting={handleScheduleMeeting}
                onMarkAsResolved={markAlertActionTaken}
              />
            ))
          ) : (
            <EmptyState searchTerm={searchTerm} />
          )}
        </TabsContent>
        
        <TabsContent value="unread" className="space-y-4">
          {unreadAlerts.length > 0 ? (
            unreadAlerts.map((alert) => (
              <AlertCard 
                key={alert.id} 
                alert={alert}
                onViewDetails={handleViewDetails}
                onScheduleMeeting={handleScheduleMeeting}
                onMarkAsResolved={markAlertActionTaken}
              />
            ))
          ) : (
            <EmptyState searchTerm={searchTerm} type="unread" />
          )}
        </TabsContent>
        
        <TabsContent value="read" className="space-y-4">
          {readAlerts.length > 0 ? (
            readAlerts.map((alert) => (
              <AlertCard 
                key={alert.id} 
                alert={alert}
                onViewDetails={handleViewDetails}
                onScheduleMeeting={handleScheduleMeeting}
                onMarkAsResolved={markAlertActionTaken}
              />
            ))
          ) : (
            <EmptyState searchTerm={searchTerm} type="read" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface AlertCardProps {
  alert: Alert;
  onViewDetails: (id: string) => void;
  onScheduleMeeting: (id: string, studentId: string, studentName: string) => void;
  onMarkAsResolved: (id: string) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ 
  alert, 
  onViewDetails, 
  onScheduleMeeting,
  onMarkAsResolved
}) => {
  return (
    <Card className={`${!alert.read ? 'border-l-4 border-l-primary' : ''}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${getAlertBgColor(alert.type)}`}>
              <AlertIcon type={alert.type} />
            </div>
            <div>
              <CardTitle className="text-base font-medium">
                {getAlertTitle(alert)}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {alert.message || getDefaultAlertMessage(alert)}
              </p>
            </div>
          </div>
          <Badge variant={alert.actionTaken ? "outline" : "secondary"}>
            {alert.actionTaken ? "Resolvido" : "Pendente"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>
              {new Date(alert.createdAt).toLocaleDateString('pt-BR')} às{' '}
              {new Date(alert.createdAt).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(alert.id)}
            >
              <Eye className="mr-1 h-4 w-4" /> Detalhes
            </Button>
            {!alert.actionTaken && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onScheduleMeeting(alert.id, alert.studentId, alert.studentName)}
                >
                  <Calendar className="mr-1 h-4 w-4" /> Agendar
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onMarkAsResolved(alert.id)}
                >
                  <Check className="mr-1 h-4 w-4" /> Resolver
                </Button>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const EmptyState: React.FC<{ searchTerm?: string; type?: string }> = ({ searchTerm, type }) => {
  let message = "Nenhum alerta encontrado";
  
  if (searchTerm) {
    message = `Nenhum alerta encontrado para "${searchTerm}"`;
  } else if (type === "unread") {
    message = "Não há alertas não lidos";
  } else if (type === "read") {
    message = "Não há alertas lidos";
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted-foreground"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

const getAlertTitle = (alert: Alert): string => {
  switch(alert.type) {
    case 'lead-opportunity':
      return `Nova oportunidade: ${alert.studentName}`;
    case 'stage-change':
      return `Mudança de estágio: ${alert.studentName}`;
    case 'campaign-performance':
      return 'Performance de campanha';
    case 'lead-assigned':
      return `Lead designado: ${alert.studentName}`;
    default:
      return alert.studentName;
  }
};

const getDefaultAlertMessage = (alert: Alert): string => {
  switch(alert.type) {
    case 'lead-opportunity':
      return `Detectado interesse de ${alert.studentName} com alta probabilidade de conversão`;
    case 'stage-change':
      return `${alert.studentName} avançou para uma nova etapa do funil de captação`;
    case 'campaign-performance':
      return 'Uma campanha está performando acima do esperado';
    case 'lead-assigned':
      return `${alert.studentName} foi designado para você acompanhar`;
    default:
      return 'Alerta do sistema';
  }
};

export default RecruitmentAlertsList;
