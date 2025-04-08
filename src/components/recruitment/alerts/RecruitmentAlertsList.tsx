
import React from 'react';
import { useAlertsManagement } from './hooks/useAlertsManagement';
import AlertCard from './components/AlertCard';
import AlertTabs from './components/AlertTabs';
import AlertSearch from './components/AlertSearch';
import EmptyState from './components/EmptyState';

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
    markAlertActionTaken,
    ScheduleConfirmationDialog
  } = useAlertsManagement();

  // Renderizar a lista de alertas baseado na aba ativa
  const renderAlerts = () => {
    const alertsToShow = activeTab === 'unread' 
      ? unreadAlerts 
      : activeTab === 'read' 
        ? readAlerts 
        : filteredAlerts;

    if (alertsToShow.length === 0) {
      return <EmptyState />;
    }

    return (
      <div className="space-y-4">
        {alertsToShow.map(alert => (
          <AlertCard
            key={alert.id}
            alert={alert}
            onViewDetails={handleViewDetails}
            onScheduleMeeting={handleScheduleMeeting}
            onMarkAsResolved={markAlertActionTaken}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Alertas</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie alertas de leads e oportunidades no processo de captação
        </p>
      </div>
      
      <div className="mb-6">
        <AlertSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
      
      <AlertTabs 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadCount={unreadAlerts.length}
        readCount={readAlerts.length}
        totalCount={filteredAlerts.length}
      />
      
      <div className="mt-6">
        {renderAlerts()}
      </div>
      
      {/* Renderizar o diálogo de confirmação */}
      <ScheduleConfirmationDialog />
    </div>
  );
};

export default RecruitmentAlertsList;
