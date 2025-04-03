
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useScheduleOperations } from '@/hooks/schedule/useScheduleOperations';
import { ProductType } from '@/context/product/types';

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableStudents: any[];
  productContext?: ProductType;
}

const ScheduleDialog: React.FC<ScheduleDialogProps> = ({ 
  open, 
  onOpenChange,
  availableStudents,
  productContext
}) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [notes, setNotes] = useState('');
  const [agentName, setAgentName] = useState('');
  
  const { handleScheduleSubmit } = useScheduleOperations();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('studentId', selectedStudent);
    formData.append('date', scheduleDate);
    formData.append('time', scheduleTime);
    formData.append('notes', notes);
    formData.append('agentName', agentName);
    
    if (productContext) {
      formData.append('productContext', productContext);
    }
    
    const success = handleScheduleSubmit(formData);
    
    if (success) {
      // Reset form and close dialog
      setSelectedStudent('');
      setScheduleDate('');
      setScheduleTime('');
      setNotes('');
      setAgentName('');
      onOpenChange(false);
    }
  };
  
  // Filter students based on product context if specified
  const filteredStudents = productContext 
    ? availableStudents.filter(student => 
        (productContext === 'recruitment' && student.id.startsWith('lead-')) ||
        (productContext === 'retention' && !student.id.startsWith('lead-')))
    : availableStudents;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {productContext === 'recruitment' 
              ? 'Agendar Atendimento de Lead' 
              : productContext === 'retention'
                ? 'Agendar Atendimento de Aluno'
                : 'Agendar Atendimento'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="student">
              {productContext === 'recruitment' ? 'Lead' : 'Aluno'}
            </Label>
            <Select 
              value={selectedStudent} 
              onValueChange={setSelectedStudent}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder={
                  productContext === 'recruitment' 
                    ? 'Selecione um lead' 
                    : 'Selecione um aluno'
                } />
              </SelectTrigger>
              <SelectContent>
                {filteredStudents.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name || `${productContext === 'recruitment' ? 'Lead' : 'Aluno'} ${student.id}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <Input 
                id="date" 
                type="date" 
                value={scheduleDate} 
                onChange={(e) => setScheduleDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Hora</Label>
              <Input 
                id="time" 
                type="time" 
                value={scheduleTime} 
                onChange={(e) => setScheduleTime(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="agent">Responsável</Label>
            <Input 
              id="agent" 
              type="text" 
              placeholder="Nome do responsável"
              value={agentName} 
              onChange={(e) => setAgentName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea 
              id="notes" 
              placeholder="Detalhes do atendimento"
              value={notes} 
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
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
