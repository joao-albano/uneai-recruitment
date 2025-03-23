
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { InterventionsTabProps, Intervention } from './types';
import { getInterventionIcon, formatDate } from './utils';

interface InterventionHistoryProps extends InterventionsTabProps {
  interventions: Intervention[];
}

const InterventionHistory: React.FC<InterventionHistoryProps> = ({ interventions }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Histórico de Intervenções</span>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Agendar atendimento
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {interventions.length > 0 ? (
          <div className="space-y-4">
            {interventions.map((intervention) => {
              const IconComponent = getInterventionIcon(intervention.interventionType);
              
              return (
                <div 
                  key={intervention.id} 
                  className="p-4 border rounded-md relative"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <IconComponent className="h-4 w-4" />
                      <span className="ml-2 font-medium">
                        {intervention.interventionType === 'meeting' ? 'Reunião' : 
                         intervention.interventionType === 'call' ? 'Contato Telefônico' :
                         intervention.interventionType === 'material' ? 'Material de Apoio' : 
                         'Monitoramento'}
                      </span>
                    </div>
                    <Badge 
                      variant={
                        intervention.status === 'completed' ? 'default' : 
                        intervention.status === 'scheduled' ? 'outline' : 'secondary'
                      }
                    >
                      {intervention.status === 'completed' ? 'Concluído' : 
                       intervention.status === 'scheduled' ? 'Agendado' : 'Cancelado'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <div>
                      <p className="text-sm text-muted-foreground">Data</p>
                      <p className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(intervention.date)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Responsável</p>
                      <p>{intervention.performedBy}</p>
                    </div>
                  </div>
                  
                  {intervention.notes && (
                    <div className="mb-2">
                      <p className="text-sm text-muted-foreground">Observações</p>
                      <p className="text-sm">{intervention.notes}</p>
                    </div>
                  )}
                  
                  {intervention.outcome && (
                    <div>
                      <p className="text-sm text-muted-foreground">Resultado</p>
                      <p className="text-sm">{intervention.outcome}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma intervenção registrada para este aluno.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InterventionHistory;
