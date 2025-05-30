
import React from 'react';
import { Check, Calendar, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import AlertIcon, { getAlertBgColor } from './AlertIcon';
import { AlertItem as AlertItemType } from '@/types/data';

interface AlertItemProps {
  alert: AlertItemType;
  onViewDetails: (alertId: string) => void;
  onScheduleMeeting: (alertId: string, studentId: string, studentName: string) => void;
  onMarkAsResolved: (alertId: string) => void;
}

const AlertItem: React.FC<AlertItemProps> = ({ 
  alert, 
  onViewDetails, 
  onScheduleMeeting, 
  onMarkAsResolved 
}) => {
  return (
    <div 
      key={alert.id} 
      className={`relative rounded-lg border p-4 transition-all duration-300 ${
        alert.read ? 'opacity-80' : 'shadow-md bg-background'
      }`}
      onClick={() => !alert.read && onMarkAsResolved(alert.id)}
    >
      <div className="flex items-start gap-4">
        <div className={`rounded-full p-2 ${getAlertBgColor(alert.type)}`}>
          <AlertIcon type={alert.type} />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="font-medium flex items-center gap-2">
              {alert.studentName}
              <Badge 
                variant="outline" 
                className="text-xs font-normal"
              >
                {alert.studentClass}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(alert.createdAt).toLocaleDateString()}
              {!alert.read && (
                <span className="ml-2 h-2 w-2 rounded-full bg-blue-500 inline-block"></span>
              )}
            </div>
          </div>
          
          <p className="mt-1 text-sm">{alert.message}</p>
          
          <div className="mt-3 flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline"
              className="relative overflow-hidden"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(alert.id);
              }}
            >
              Ver detalhes
            </Button>
            
            {!alert.actionTaken ? (
              <>
                <Button 
                  size="sm" 
                  className="relative overflow-hidden"
                  onClick={(e) => {
                    e.stopPropagation();
                    onScheduleMeeting(alert.id, alert.studentId, alert.studentName);
                  }}
                >
                  <Calendar className="mr-1 h-3.5 w-3.5" />
                  Agendar atendimento
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onMarkAsResolved(alert.id);
                  }}
                >
                  <Check className="mr-1 h-3.5 w-3.5" />
                  Marcar como resolvido
                </Button>
              </>
            ) : (
              <Badge variant="outline" className="bg-muted text-muted-foreground">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Ação tomada
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertItem;
