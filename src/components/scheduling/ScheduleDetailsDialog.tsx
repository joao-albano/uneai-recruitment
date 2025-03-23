
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/types/schedule';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock, User, FileText, UserCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';

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
  const { language } = useTheme();
  const { toast } = useToast();
  const formattedDate = format(schedule.date, "PPP", { locale: ptBR });
  const formattedTime = format(schedule.date, "HH:mm", { locale: ptBR });

  const handleMarkCompleted = () => {
    try {
      // Close the dialog first to ensure it closes
      onOpenChange(false);
      
      // Then mark as completed
      onMarkCompleted(schedule.id);
      
      // Show confirmation toast
      toast({
        title: "Atendimento concluído",
        description: `O atendimento com ${schedule.studentName} foi marcado como concluído.`,
      });
    } catch (error) {
      console.error("Error marking as completed:", error);
    }
  };

  const handleCancelSchedule = () => {
    try {
      // Close the dialog first to ensure it closes
      onOpenChange(false);
      
      // Then cancel the schedule
      onCancelSchedule(schedule.id);
      
      // Show confirmation toast
      toast({
        title: "Atendimento cancelado",
        description: `O atendimento com ${schedule.studentName} foi cancelado.`,
        variant: "destructive"
      });
    } catch (error) {
      console.error("Error canceling schedule:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-6">
        <DialogHeader>
          <DialogTitle>Visualizando agendamento</DialogTitle>
          <DialogDescription>
            Detalhes do agendamento de {schedule.studentName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-5">
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h4 className="font-medium">Aluno</h4>
              <p className="text-sm text-muted-foreground">{schedule.studentName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium">Data</h4>
                <p className="text-sm text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium">Horário</h4>
                <p className="text-sm text-muted-foreground">{formattedTime}</p>
              </div>
            </div>
          </div>
          
          {schedule.notes && (
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <div className="flex-1">
                <h4 className="font-medium mb-1">Anotações</h4>
                <div className="bg-muted rounded-md p-3 text-sm text-foreground border border-border">
                  {language === 'pt-BR' && schedule.notes === 'Discuss attendance and academic performance' 
                    ? 'Discutir frequência e desempenho acadêmico' 
                    : language === 'pt-BR' && schedule.notes === 'Parent meeting to address attendance issues'
                    ? 'Reunião com os pais para tratar de problemas de frequência'
                    : schedule.notes}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex items-start gap-3">
            <UserCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div>
              <h4 className="font-medium">Responsável</h4>
              <p className="text-sm text-muted-foreground">{schedule.agentName}</p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-2">
          <div className="flex-1 flex gap-3">
            <Button 
              variant="destructive" 
              className="w-full"
              type="button"
              onClick={handleCancelSchedule}
            >
              Cancelar Agendamento
            </Button>
            <Button 
              variant="default" 
              className="w-full bg-accent text-white hover:bg-accent/90"
              type="button"
              onClick={handleMarkCompleted}
            >
              Marcar como Concluído
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDetailsDialog;
