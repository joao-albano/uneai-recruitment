
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, User } from 'lucide-react';

// Import any necessary types
interface Student {
  id: string;
  name: string;
  riskLevel?: 'low' | 'medium' | 'high';
}

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (show: boolean) => void;
  students: Student[];
  onSubmit: (formData: FormData) => boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const ScheduleDialog: React.FC<ScheduleDialogProps> = ({
  open,
  onOpenChange,
  students,
  onSubmit,
  isOpen,
  onClose
}) => {
  const form = useForm();
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const success = onSubmit(formData);
    
    if (success) {
      // Reset form
      e.currentTarget.reset();
    }
  };
  
  const today = new Date().toISOString().split('T')[0];
  
  // Get current hour and minute for default time (nearest 30 min)
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  let defaultHour = currentHour;
  let defaultMinute = currentMinute < 30 ? 30 : 0;
  
  // If minutes are past 30, increment hour
  if (currentMinute >= 30) {
    defaultHour = (currentHour + 1) % 24;
  }
  
  const defaultTime = `${defaultHour.toString().padStart(2, '0')}:${defaultMinute.toString().padStart(2, '0')}`;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agendar atendimento</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 rounded-full bg-primary/10 p-2 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="w-full">
              <FormLabel>Aluno</FormLabel>
              <Select name="studentId" required>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um aluno" />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.name} 
                      {student.riskLevel && (
                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                          student.riskLevel === 'high' ? 'bg-red-100 text-red-700' :
                          student.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {student.riskLevel === 'high' ? 'Alto' :
                          student.riskLevel === 'medium' ? 'Médio' : 'Baixo'}
                        </span>
                      )}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 rounded-full bg-primary/10 p-2 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="w-full">
              <FormLabel>Data</FormLabel>
              <Input 
                type="date" 
                name="date" 
                defaultValue={today}
                required
              />
            </div>
          </div>
          
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 rounded-full bg-primary/10 p-2 flex items-center justify-center">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div className="w-full">
              <FormLabel>Hora</FormLabel>
              <Input 
                type="time" 
                name="time" 
                defaultValue={defaultTime}
                required
              />
            </div>
          </div>
          
          <div>
            <FormLabel>Observações</FormLabel>
            <Textarea 
              name="notes" 
              placeholder="Informe os detalhes do atendimento"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end pt-2">
            <Button variant="outline" type="button" className="mr-2" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Agendar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;
