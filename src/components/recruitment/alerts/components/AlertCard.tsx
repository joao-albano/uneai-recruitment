
import React from 'react';
import { Alert } from '@/types/alert';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Check, Eye } from 'lucide-react';
import AlertIcon, { getAlertBgColor } from '@/components/alerts/AlertIcon';
import { getAlertTitle, getDefaultAlertMessage } from '../utils/alertUtils';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  
  const handleViewDetails = () => {
    onViewDetails(alert.id);
    toast({
      title: "Visualizando detalhes",
      description: `Detalhes do alerta para ${alert.studentName}`,
    });
  };
  
  const handleScheduleMeeting = () => {
    if (alert.studentId) {
      onScheduleMeeting(alert.id, alert.studentId, alert.studentName);
      toast({
        title: "Agendamento criado",
        description: "Um novo atendimento foi agendado. Acesse a página de Agenda para visualizar.",
      });
    }
  };
  
  const handleResolve = () => {
    onMarkAsResolved(alert.id);
    toast({
      title: "Alerta resolvido",
      description: "Este alerta foi marcado como resolvido e não aparecerá mais como pendente.",
    });
  };
  
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
              onClick={handleViewDetails}
            >
              <Eye className="mr-1 h-4 w-4" /> Detalhes
            </Button>
            {!alert.actionTaken && (
              <>
                {/* Mostra o botão de agendar apenas para alertas relacionados a leads específicos */}
                {(alert.type === 'lead-opportunity' || alert.type === 'stage-change' || 
                  alert.type === 'lead-assigned') && alert.studentId && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleScheduleMeeting}
                  >
                    <Calendar className="mr-1 h-4 w-4" /> Agendar
                  </Button>
                )}
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleResolve}
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
