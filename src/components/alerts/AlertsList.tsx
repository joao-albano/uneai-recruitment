
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import AlertsFilter from './AlertsFilter';
import AlertsTabs from './AlertsTabs';
import { useAlerts } from '@/context/alerts/AlertsContext';
import { useAppState } from '@/context/app/AppStateContext';
import { useSchedules } from '@/context/schedules/SchedulesContext';

const AlertsList: React.FC = () => {
  const { alerts, markAlertAsRead, markAlertActionTaken } = useAlerts();
  const { addSchedule } = useSchedules();
  const { generateDemoData } = useAppState();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTypes, setFilterTypes] = useState<Record<string, boolean>>({
    'high-risk': true,
    'medium-risk': true,
    'low-risk': true,
    'survey-requested': true,
    'meeting-scheduled': true
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (alerts.length === 0) {
      console.log("Carregando dados de demonstração para a lista de alertas");
      generateDemoData();
    }
  }, [alerts.length, generateDemoData]);
  
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = 
      alert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterTypes[alert.type];
    
    return matchesSearch && matchesType;
  });
  
  const unreadAlerts = filteredAlerts.filter(alert => !alert.read);
  const readAlerts = filteredAlerts.filter(alert => alert.read);
  
  const handleScheduleMeeting = (alertId: string, studentId: string, studentName: string) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    addSchedule({
      id: `schedule-${Date.now()}`,
      studentId,
      studentName,
      date: tomorrow,
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Acompanhamento para prevenção de evasão'
    });
    
    markAlertActionTaken(alertId);
    
    toast({
      title: 'Atendimento agendado',
      description: `Agendado para ${tomorrow.toLocaleDateString()} às ${tomorrow.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`
    });
  };
  
  const handleViewDetails = (alertId: string) => {
    markAlertAsRead(alertId);
    navigate(`/alerts?id=${alertId}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Alertas</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie alertas de riscos e ações necessárias
        </p>
      </div>
      
      <AlertsFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterTypes={filterTypes}
        setFilterTypes={setFilterTypes}
      />
      
      <AlertsTabs 
        unreadAlerts={unreadAlerts}
        readAlerts={readAlerts}
        filteredAlerts={filteredAlerts}
        onViewDetails={handleViewDetails}
        onScheduleMeeting={handleScheduleMeeting}
        onMarkAsResolved={markAlertActionTaken}
      />
    </div>
  );
};

export default AlertsList;
