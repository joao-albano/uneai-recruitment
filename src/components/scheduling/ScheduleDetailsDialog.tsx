
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Schedule } from '@/types/schedule';
import { formatDateForDisplay, formatTimeForDisplay } from '@/data/schedules/scheduleUtils';

interface ScheduleDetailsDialogProps {
  open: boolean;
  onOpenChange: (show: boolean) => void;
  schedule: Schedule | null;
  onStatusChange: (id: string, status: 'scheduled' | 'completed' | 'canceled') => void;
}

const ScheduleDetailsDialog: React.FC<ScheduleDetailsDialogProps> = ({
  open,
  onOpenChange,
  schedule,
  onStatusChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editNotes, setEditNotes] = useState('');

  // Prepare edit form when dialog opens or schedule changes
  React.useEffect(() => {
    if (schedule) {
      const date = new Date(schedule.date);
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const formattedTime = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
      
      setEditDate(formattedDate);
      setEditTime(formattedTime);
      setEditNotes(schedule.notes || '');
    }
  }, [schedule, open]);

  const handleSaveEdit = () => {
    if (!schedule) return;
    
    const [year, month, day] = editDate.split('-').map(Number);
    const [hours, minutes] = editTime.split(':').map(Number);
    
    // Create a new date object
    const updatedDate = new Date(year, month - 1, day, hours, minutes);
    
    // Update the schedule with the new values
    const updatedSchedule = {
      ...schedule,
      date: updatedDate,
      notes: editNotes
    };
    
    // Call an update function from props
    onStatusChange(updatedSchedule.id, 'scheduled', updatedSchedule);
    setIsEditing(false);
    
    // Close the dialog
    onOpenChange(false);
  };

  if (!schedule) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Agendamento</DialogTitle>
          <DialogDescription>Visualize e edite informações do agendamento</DialogDescription>
        </DialogHeader>
        
        {isEditing ? (
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium">Data</label>
              <Input 
                type="date" 
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Hora</label>
              <Input 
                type="time" 
                value={editTime}
                onChange={(e) => setEditTime(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Observações</label>
              <Textarea 
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveEdit}>
                Salvar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Aluno</h3>
                <p>{schedule.studentName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Responsável</h3>
                <p>{schedule.agentName}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Data</h3>
                <p>{formatDateForDisplay(schedule.date)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Hora</h3>
                <p>{formatTimeForDisplay(schedule.date)}</p>
              </div>
            </div>
            
            {schedule.notes && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Observações</h3>
                <p className="mt-1">{schedule.notes}</p>
              </div>
            )}
            
            <div className="pt-4 border-t">
              <h3 className="text-sm font-medium">Status</h3>
              <div className="flex items-center space-x-2 mt-2">
                <div className={`px-2 py-1 rounded-full text-xs ${
                  schedule.status === 'scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300' :
                  schedule.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                }`}>
                  {schedule.status === 'scheduled' ? 'Agendado' :
                   schedule.status === 'completed' ? 'Concluído' : 'Cancelado'}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              {schedule.status === 'scheduled' && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(true)}
                  >
                    Editar
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300"
                    onClick={() => onStatusChange(schedule.id, 'completed')}
                  >
                    Marcar como Concluído
                  </Button>
                  <Button 
                    variant="outline" 
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    onClick={() => onStatusChange(schedule.id, 'canceled')}
                  >
                    Cancelar Agendamento
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDetailsDialog;
