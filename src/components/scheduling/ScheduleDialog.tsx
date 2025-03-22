
import React, { useRef } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Changed to match StudentData by making riskLevel optional
interface Student {
  id: string;
  name: string;
  riskLevel?: string;
}

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  students: Student[];
  studentsWithoutSchedules: Student[];
  preSelectedStudentId: string;
  onSubmit: (formData: FormData) => void;
}

const ScheduleDialog: React.FC<ScheduleDialogProps> = ({
  open,
  onOpenChange,
  students,
  studentsWithoutSchedules,
  preSelectedStudentId,
  onSubmit,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current) return;
    
    const formData = new FormData(formRef.current);
    
    const studentId = formData.get('studentId') as string;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    
    if (!studentId || !date || !time) {
      toast({
        title: 'Campos obrigatórios',
        description: 'Por favor, preencha todos os campos obrigatórios.',
        variant: 'destructive'
      });
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar atendimento</DialogTitle>
          <DialogDescription>
            Agende um atendimento para um aluno em risco
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="studentId">Aluno</Label>
              <Select name="studentId" defaultValue={preSelectedStudentId} required>
                <SelectTrigger id="studentId" className="w-full bg-background">
                  <SelectValue placeholder="Selecione um aluno" />
                </SelectTrigger>
                <SelectContent position="popper" className="w-full max-h-[200px] overflow-auto z-[100] bg-background">
                  {studentsWithoutSchedules.length > 0 ? (
                    studentsWithoutSchedules
                      .filter(student => student.riskLevel !== 'low')
                      .sort((a, b) => {
                        if (a.riskLevel === 'high' && b.riskLevel !== 'high') return -1;
                        if (a.riskLevel !== 'high' && b.riskLevel === 'high') return 1;
                        return a.name.localeCompare(b.name);
                      })
                      .map(student => (
                        <SelectItem key={student.id} value={student.id} className="flex items-center justify-between">
                          <span>{student.name}</span>
                          {student.riskLevel === 'high' && (
                            <Badge className="ml-2 bg-red-500 text-[10px]">
                              Alto risco
                            </Badge>
                          )}
                        </SelectItem>
                      ))
                  ) : (
                    <SelectItem value="loading" disabled>Carregando alunos...</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            
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
            <Button type="submit">Agendar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
