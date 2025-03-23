
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/types/schedule';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, User } from 'lucide-react';

interface ScheduleDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Schedule;
  onMarkCompleted: (id: string) => void;
  onCancelSchedule: (id: string) => void;
}

const ScheduleDetailsDialog: React.FC<ScheduleDetailsDialogProps> = ({
  open,
  onOpenChange,
  schedule,
  onMarkCompleted,
  onCancelSchedule,
}) => {
  const formattedDate = format(schedule.date, "PPP", { locale: ptBR });
  const formattedTime = format(schedule.date, "HH:mm", { locale: ptBR });

  const handleMarkCompleted = () => {
    onMarkCompleted(schedule.id);
    onOpenChange(false);
  };

  const handleCancelSchedule = () => {
    onCancelSchedule(schedule.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Visualizando agendamento</DialogTitle>
          <DialogDescription>
            Detalhes do agendamento de {schedule.studentName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="font-medium">Aluno</h4>
              <p className="text-sm text-muted-foreground">{schedule.studentName}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="font-medium">Data</h4>
              <p className="text-sm text-muted-foreground">{formattedDate}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <h4 className="font-medium">Horário</h4>
              <p className="text-sm text-muted-foreground">{formattedTime}</p>
            </div>
          </div>
          
          {schedule.notes && (
            <div className="pt-2">
              <h4 className="font-medium mb-1">Anotações</h4>
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                {schedule.notes}
              </div>
            </div>
          )}
          
          <div className="pt-2">
            <h4 className="font-medium mb-1">Responsável</h4>
            <p className="text-sm text-muted-foreground">{schedule.agentName}</p>
          </div>
        </div>
        
        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="sm:order-1"
          >
            Fechar
          </Button>
          <Button 
            variant="destructive" 
            onClick={handleCancelSchedule}
            className="sm:order-2"
          >
            Cancelar Agendamento
          </Button>
          <Button 
            variant="default" 
            onClick={handleMarkCompleted}
            className="sm:order-3"
          >
            Marcar como Concluído
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDetailsDialog;
