
import React, { useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/types/schedule';
import { Badge } from '@/components/ui/badge';

interface EditScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Schedule | null;
  onSubmit: (formData: FormData) => void;
  currentUserEmail: string | null;
}

const EditScheduleDialog: React.FC<EditScheduleDialogProps> = ({
  open,
  onOpenChange,
  schedule,
  onSubmit,
  currentUserEmail
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  // Reset form when schedule changes
  useEffect(() => {
    if (open && schedule && formRef.current) {
      const dateInput = formRef.current.querySelector('[name="date"]') as HTMLInputElement;
      const timeInput = formRef.current.querySelector('[name="time"]') as HTMLInputElement;
      const notesInput = formRef.current.querySelector('[name="notes"]') as HTMLTextAreaElement;
      const agentInput = formRef.current.querySelector('[name="agentName"]') as HTMLInputElement;
      
      if (dateInput && timeInput && notesInput) {
        const date = new Date(schedule.date);
        
        // Format date as YYYY-MM-DD
        const formattedDate = date.toISOString().split('T')[0];
        dateInput.value = formattedDate;
        
        // Format time as HH:MM
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        timeInput.value = `${hours}:${minutes}`;
        
        // Set notes
        notesInput.value = schedule.notes || '';
        
        // Set agent name if field exists
        if (agentInput) {
          agentInput.value = schedule.agentName || '';
        }
      }
    }
  }, [schedule, open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || !schedule) return;
    
    const formData = new FormData(formRef.current);
    
    // Adicionar ID do estudante ao formData (não está no formulário)
    formData.append('studentId', schedule.studentId);
    
    onSubmit(formData);
  };

  if (!schedule) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar atendimento</DialogTitle>
          <DialogDescription className="flex items-center">
            Edite os detalhes do atendimento para <span className="ml-1"><Badge variant="outline">{schedule.studentName}</Badge></span>
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Horário</Label>
                <Input type="time" name="time" id="time" required />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="agentName">Responsável</Label>
              <Input
                type="text"
                name="agentName"
                id="agentName"
                defaultValue={schedule.agentName || currentUserEmail || ""}
                className="bg-muted/30"
                readOnly
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Anotações</Label>
              <Textarea
                name="notes"
                id="notes"
                placeholder="Detalhes sobre o atendimento..."
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar alterações</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditScheduleDialog;
