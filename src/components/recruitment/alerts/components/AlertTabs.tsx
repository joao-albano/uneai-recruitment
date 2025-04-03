
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlertCard from './AlertCard';
import EmptyState from './EmptyState';
import { Alert } from '@/types/alert';

interface AlertTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  filteredAlerts: Alert[];
  unreadAlerts: Alert[];
  readAlerts: Alert[];
  onViewDetails: (id: string) => void;
  onScheduleMeeting: (id: string, studentId: string, studentName: string) => void;
  onMarkAsResolved: (id: string) => void;
  searchTerm: string;
}

const AlertTabs: React.FC<AlertTabsProps> = ({
  activeTab,
  setActiveTab,
  filteredAlerts,
  unreadAlerts,
  readAlerts,
  onViewDetails,
  onScheduleMeeting,
  onMarkAsResolved,
  searchTerm
}) => {
  const displayedAlerts = activeTab === 'unread' ? unreadAlerts : activeTab === 'read' ? readAlerts : filteredAlerts;

  return (
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
              onViewDetails={onViewDetails}
              onScheduleMeeting={onScheduleMeeting}
              onMarkAsResolved={onMarkAsResolved}
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
              onViewDetails={onViewDetails}
              onScheduleMeeting={onScheduleMeeting}
              onMarkAsResolved={onMarkAsResolved}
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
              onViewDetails={onViewDetails}
              onScheduleMeeting={onScheduleMeeting}
              onMarkAsResolved={onMarkAsResolved}
            />
          ))
        ) : (
          <EmptyState searchTerm={searchTerm} type="read" />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AlertTabs;
