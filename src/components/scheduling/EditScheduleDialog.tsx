
import React, { useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Schedule } from '@/types/schedule';
import { format } from 'date-fns';

interface EditScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: Schedule | null;
  onSubmit: (formData: FormData) => void;
}

const EditScheduleDialog: React.FC<EditScheduleDialogProps> = ({
  open,
  onOpenChange,
  schedule,
  onSubmit,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  // Format the date and time for the input fields
  const formattedDate = schedule ? format(new Date(schedule.date), 'yyyy-MM-dd') : '';
  const formattedTime = schedule ? format(new Date(schedule.date), 'HH:mm') : '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current || !schedule) return;
    
    const formData = new FormData(formRef.current);
    formData.append('studentId', schedule.studentId);
    
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    
    if (!date || !time) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive'
      });
      return;
    }
    
    onSubmit(formData);
  };
  
  const handleClose = () => {
    onOpenChange(false);
  };

  // Impedir que o componente seja renderizado sem um schedule
  if (!schedule) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar agendamento</DialogTitle>
          <DialogDescription>
            Editar agendamento para {schedule.studentName}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Aluno</Label>
              <div className="p-2 border rounded-md bg-muted/30">
                {schedule.studentName}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="date">Data</Label>
                <Input
                  type="date"
                  name="date"
                  id="date"
                  defaultValue={formattedDate}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Horário</Label>
                <Input 
                  type="time" 
                  name="time" 
                  id="time" 
                  defaultValue={formattedTime} 
                  required 
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes">Anotações</Label>
              <Textarea
                name="notes"
                id="notes"
                placeholder="Detalhes sobre o atendimento..."
                defaultValue={schedule.notes || ''}
                className="min-h-[80px]"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
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
