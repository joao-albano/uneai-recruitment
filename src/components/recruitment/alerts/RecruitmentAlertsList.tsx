
import React, { useState } from 'react';
import AlertSearch from './components/AlertSearch';
import AlertTabs from './components/AlertTabs';
import { useAlertsManagement } from './hooks/useAlertsManagement';
import EmptyState from './components/EmptyState';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const RecruitmentAlertsList: React.FC = () => {
  const {
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
  } = useAlertsManagement();
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Função para abrir a agenda
  const goToSchedule = () => {
    navigate('/schedule');
    toast({
      title: "Agenda",
      description: "Aqui você pode visualizar e gerenciar todos os agendamentos."
    });
  };
  
  if (filteredAlerts.length === 0 && !searchTerm) {
    return <EmptyState />;
  }
  
  return (
    <div className="container animate-fade-in">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Alertas de Captação</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie e acompanhe os alertas relacionados aos leads
            </p>
          </div>
          <Button onClick={goToSchedule} variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Ver Agenda
          </Button>
        </div>
      </div>
      
      <AlertSearch 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      
      <AlertTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadAlerts={unreadAlerts}
        readAlerts={readAlerts}
        filteredAlerts={filteredAlerts}
        onViewDetails={handleViewDetails}
        onScheduleMeeting={handleScheduleMeeting}
        onMarkAsResolved={markAlertActionTaken}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default RecruitmentAlertsList;
