
import React from 'react';
import { useAlertsManagement } from './hooks/useAlertsManagement';
import AlertSearch from './components/AlertSearch';
import AlertTabs from './components/AlertTabs';

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

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Alertas de Captação</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie alertas de oportunidades e ações para captação de alunos
        </p>
      </div>
      
      <AlertSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <AlertTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        filteredAlerts={filteredAlerts}
        unreadAlerts={unreadAlerts}
        readAlerts={readAlerts}
        onViewDetails={handleViewDetails}
        onScheduleMeeting={handleScheduleMeeting}
        onMarkAsResolved={markAlertActionTaken}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default RecruitmentAlertsList;
