
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/types/schedule';
import { formatDateForDisplay, formatTimeForDisplay } from '@/data/schedules/scheduleUtils';
import { Calendar, User, FileText, CheckCircle, XCircle, Edit } from 'lucide-react';

interface ScheduleDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Schedule | null;
  onStatusChange: (id: string, status: 'scheduled' | 'completed' | 'canceled') => void;
  onEdit?: (schedule: Schedule) => void;
}

const ScheduleDetailsDialog: React.FC<ScheduleDetailsDialogProps> = ({
  open,
  onOpenChange,
  schedule,
  onStatusChange,
  onEdit
}) => {
  if (!schedule) return null;
  
  const formattedDate = formatDateForDisplay(new Date(schedule.date));
  const formattedTime = formatTimeForDisplay(new Date(schedule.date));
  
  const handleMarkCompleted = () => {
    onStatusChange(schedule.id, 'completed');
  };
  
  const handleCancelSchedule = () => {
    onStatusChange(schedule.id, 'canceled');
  };
  
  const handleEdit = () => {
    if (onEdit) {
      onEdit(schedule);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Detalhes do Agendamento</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-4 max-h-[50vh] overflow-y-auto pr-2">
          <div className="flex flex-col gap-2 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              <span className="font-medium text-lg">{schedule.studentName}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {formattedDate} às {formattedTime}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                Responsável: {schedule.agentName}
              </span>
            </div>
            
            {/* Display education type specific fields */}
            {schedule.productContext === 'recruitment' && (
              <div className="mt-2 border-t pt-2 border-muted-foreground/20">
                <p className="text-sm font-medium mb-1">
                  {schedule.educationType === 'basic' ? 'Educação Básica' : 'Ensino Superior (IES)'}
                </p>
                
                {schedule.educationType === 'basic' && schedule.parentName && (
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="text-muted-foreground">Responsável:</span> {schedule.parentName}
                    </p>
                    {schedule.parentPhone && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Telefone:</span> {schedule.parentPhone}
                      </p>
                    )}
                  </div>
                )}
                
                {schedule.educationType === 'higher' && (
                  <div className="space-y-1">
                    {schedule.studentPhone && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Telefone:</span> {schedule.studentPhone}
                      </p>
                    )}
                    {schedule.studentEmail && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Email:</span> {schedule.studentEmail}
                      </p>
                    )}
                    {schedule.course && (
                      <p className="text-sm">
                        <span className="text-muted-foreground">Curso de interesse:</span> {schedule.course}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          
          {schedule.notes && (
            <div className="space-y-2">
              <h3 className="font-medium flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>Observações</span>
              </h3>
              <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                {schedule.notes}
              </p>
            </div>
          )}
        </div>
        
        <DialogFooter className="flex flex-wrap sm:flex-row sm:justify-end gap-2 mt-4 pt-2 border-t">
          {schedule.status === 'scheduled' && (
            <>
              <Button 
                variant="outline"
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={handleCancelSchedule}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
              
              {onEdit && (
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none"
                  onClick={handleEdit}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
              
              <Button 
                size="sm"
                className="flex-1 sm:flex-none"
                onClick={handleMarkCompleted}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Marcar como Concluído
              </Button>
            </>
          )}
          
          {schedule.status !== 'scheduled' && (
            <>
              {onEdit && (
                <Button 
                  variant="outline"
                  size="sm"
                  className="flex-1 sm:flex-none"
                  onClick={handleEdit}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
              
              <Button 
                size="sm"
                onClick={() => onOpenChange(false)}
                className="flex-1 sm:flex-none"
              >
                Fechar
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDetailsDialog;
