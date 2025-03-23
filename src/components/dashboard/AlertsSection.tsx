
import React from 'react';
import { Alert } from '@/types/alert';
import { AlertTriangle, BookOpen, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AlertsSectionProps {
  alerts: Alert[];
  onViewAlertDetails: (alertId: string) => void;
}

const AlertsSection: React.FC<AlertsSectionProps> = ({ alerts, onViewAlertDetails }) => {
  return (
    <Card className="shadow-md transition-all duration-300 hover:shadow-lg card-glow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Últimos Alertas</CardTitle>
        <CardDescription>Alertas recentes que precisam de atenção</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-72 pr-4">
          {alerts.length > 0 ? (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className="flex-shrink-0">
                    {alert.type === 'high-risk' ? (
                      <div className="rounded-full bg-red-100 p-1">
                        <AlertTriangle className="h-5 w-5 text-red-500" />
                      </div>
                    ) : alert.type === 'medium-risk' ? (
                      <div className="rounded-full bg-yellow-100 p-1">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-blue-100 p-1">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">
                        {alert.studentName}
                        <Badge 
                          variant="outline" 
                          className="ml-2 text-xs font-normal"
                        >
                          {alert.studentClass}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(alert.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {alert.type === 'high-risk' 
                        ? `${alert.studentName} possui múltiplos fatores de risco: notas baixas, frequência abaixo de 80% e problemas comportamentais.`
                        : alert.type === 'medium-risk'
                        ? `${alert.studentName} possui problemas de frequência (${Math.floor(Math.random() * 20) + 70}%) e notas limítrofes.`
                        : `${alert.studentName} precisa de atenção para melhorar seu desempenho acadêmico.`
                      }
                    </p>
                    <div className="mt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onViewAlertDetails(alert.id)}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-56 text-center">
              <CheckCircle2 className="h-10 w-10 text-muted-foreground/40 mb-2" />
              <p className="text-muted-foreground">Nenhum alerta pendente</p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlertsSection;
