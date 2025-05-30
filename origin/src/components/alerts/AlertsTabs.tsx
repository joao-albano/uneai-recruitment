
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AlertItem from './AlertItem';
import AlertsEmptyState from './AlertsEmptyState';
import { AlertItem as AlertItemType } from '@/types/data';

interface AlertsTabsProps {
  unreadAlerts: AlertItemType[];
  readAlerts: AlertItemType[];
  filteredAlerts: AlertItemType[];
  onViewDetails: (alertId: string) => void;
  onScheduleMeeting: (alertId: string, studentId: string, studentName: string) => void;
  onMarkAsResolved: (alertId: string) => void;
}

const AlertsTabs: React.FC<AlertsTabsProps> = ({ 
  unreadAlerts, 
  readAlerts, 
  filteredAlerts, 
  onViewDetails, 
  onScheduleMeeting, 
  onMarkAsResolved 
}) => {
  return (
    <Tabs defaultValue="unread">
      <TabsList className="mb-4">
        <TabsTrigger value="unread">
          Não lidos
          {unreadAlerts.length > 0 && (
            <Badge
              variant="secondary"
              className="ml-2 h-5 px-1.5 text-xs font-medium"
            >
              {unreadAlerts.length}
            </Badge>
          )}
        </TabsTrigger>
        <TabsTrigger value="all">Todos os alertas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="unread">
        {unreadAlerts.length > 0 ? (
          <div className="space-y-4">
            {unreadAlerts.map(alert => (
              <AlertItem 
                key={alert.id}
                alert={alert} 
                onViewDetails={onViewDetails}
                onScheduleMeeting={onScheduleMeeting}
                onMarkAsResolved={onMarkAsResolved}
              />
            ))}
          </div>
        ) : (
          <AlertsEmptyState type="unread" />
        )}
      </TabsContent>
      
      <TabsContent value="all">
        {filteredAlerts.length > 0 ? (
          <div className="space-y-4">
            {unreadAlerts.map(alert => (
              <AlertItem 
                key={alert.id}
                alert={alert} 
                onViewDetails={onViewDetails}
                onScheduleMeeting={onScheduleMeeting}
                onMarkAsResolved={onMarkAsResolved}
              />
            ))}
            
            {readAlerts.length > 0 && (
              <>
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-2 text-sm text-muted-foreground">
                      Alertas anteriores
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {readAlerts.map(alert => (
                    <AlertItem 
                      key={alert.id}
                      alert={alert} 
                      onViewDetails={onViewDetails}
                      onScheduleMeeting={onScheduleMeeting}
                      onMarkAsResolved={onMarkAsResolved}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <AlertsEmptyState type="filtered" />
        )}
      </TabsContent>
    </Tabs>
  );
};

export default AlertsTabs;
