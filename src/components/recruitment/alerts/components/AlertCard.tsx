
import React from 'react';
import { Alert } from '@/types/alert';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Check, Eye } from 'lucide-react';
import AlertIcon, { getAlertBgColor } from '@/components/alerts/AlertIcon';
import { getAlertTitle, getDefaultAlertMessage } from '../utils/alertUtils';

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
              <h3 className="text-base font-medium">
                {getAlertTitle(alert)}
              </h3>
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

export default AlertCard;
