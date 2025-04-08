
import React from 'react';
import { Schedule } from '@/types/schedule';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow, format } from 'date-fns';
import { CheckCircle, XCircle, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductType } from '@/context/product/types';
import { ptBR } from 'date-fns/locale';

interface ScheduleHistoryViewProps {
  completedSchedules: Schedule[];
  canceledSchedules: Schedule[];
  onViewDetails: (schedule: Schedule) => void;
  productContext?: ProductType;
}

const ScheduleHistoryView: React.FC<ScheduleHistoryViewProps> = ({
  completedSchedules,
  canceledSchedules,
  onViewDetails,
  productContext
}) => {
  // Helper function to render a schedule item
  const renderScheduleItem = (schedule: Schedule) => {
    const isBasicEd = schedule.educationType === 'basic';
    const dateFormatted = format(new Date(schedule.date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
    const relativeTime = formatDistanceToNow(new Date(schedule.date), { 
      addSuffix: true, 
      locale: ptBR 
    });
    
    return (
      <div key={schedule.id} className="border p-4 rounded-md mb-3 bg-white">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-medium">
              {schedule.studentName}
              {schedule.educationType && (
                <Badge variant="outline" className="ml-2">
                  {schedule.educationType === 'basic' ? 'Educação Básica' : 'Ensino Superior'}
                </Badge>
              )}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              {dateFormatted} ({relativeTime})
            </div>
            {isBasicEd && schedule.parentName && (
              <div className="text-sm mt-1">
                <span className="text-muted-foreground">Responsável:</span> {schedule.parentName}
              </div>
            )}
            {!isBasicEd && schedule.course && (
              <div className="text-sm mt-1">
                <span className="text-muted-foreground">Curso:</span> {schedule.course}
              </div>
            )}
          </div>
          <div className="flex items-center">
            {schedule.status === 'completed' ? (
              <Badge variant="default" className="flex items-center bg-green-500 hover:bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Concluído
              </Badge>
            ) : (
              <Badge variant="destructive" className="flex items-center">
                <XCircle className="h-3 w-3 mr-1" />
                Cancelado
              </Badge>
            )}
          </div>
        </div>
        
        {schedule.notes && (
          <div className="mt-2 text-sm bg-slate-50 p-2 rounded">
            <span className="text-muted-foreground">Observações:</span> {schedule.notes}
          </div>
        )}
        
        <div className="mt-3 flex justify-end">
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center gap-1"
            onClick={() => onViewDetails(schedule)}
          >
            <Info className="h-4 w-4" />
            Detalhes
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Histórico de Agendamentos
            {productContext === 'recruitment' ? ' - Captação' : 
             productContext === 'retention' ? ' - Retenção' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="completed" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="completed">
                Concluídos ({completedSchedules.length})
              </TabsTrigger>
              <TabsTrigger value="canceled">
                Cancelados ({canceledSchedules.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="completed" className="space-y-4">
              {completedSchedules.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum agendamento concluído encontrado.
                </div>
              ) : (
                completedSchedules.map(renderScheduleItem)
              )}
            </TabsContent>
            
            <TabsContent value="canceled" className="space-y-4">
              {canceledSchedules.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum agendamento cancelado encontrado.
                </div>
              ) : (
                canceledSchedules.map(renderScheduleItem)
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleHistoryView;
