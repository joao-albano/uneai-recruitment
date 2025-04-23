
import React from 'react';
import { Task } from '@/types/recruitment/tasks';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';

interface TaskFormProps {
  formData: Partial<Task>;
  onFormChange: (data: Partial<Task>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  formData,
  onFormChange
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange({ ...formData, title: e.target.value });
  };
  
  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onFormChange({ ...formData, description: e.target.value });
  };
  
  const handlePriorityChange = (value: string) => {
    onFormChange({ ...formData, priority: value as any });
  };
  
  const handleStatusChange = (value: string) => {
    onFormChange({ ...formData, status: value as any });
  };
  
  const handleDueDateChange = (date: Date | undefined) => {
    onFormChange({ ...formData, dueDate: date });
  };
  
  const handleSelectedLeadIdsChange = (value: string[]) => {
    onFormChange({ ...formData, selectedLeadIds: value });
  };
  
  return (
    <div className="space-y-4 py-2">
      <div className="grid gap-2">
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          value={formData.title || ''}
          onChange={handleTitleChange}
          placeholder="Digite o título da tarefa"
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description || ''}
          onChange={handleDescriptionChange}
          placeholder="Digite a descrição da tarefa"
          className="min-h-[100px]"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="priority">Prioridade</Label>
          <Select 
            value={formData.priority || 'média'} 
            onValueChange={handlePriorityChange}
          >
            <SelectTrigger id="priority">
              <SelectValue placeholder="Selecione uma prioridade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="média">Média</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select 
            value={formData.status || 'pendente'} 
            onValueChange={handleStatusChange}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="em_andamento">Em andamento</SelectItem>
              <SelectItem value="agendada">Agendada</SelectItem>
              <SelectItem value="concluída">Concluída</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="dueDate">Data de vencimento</Label>
        <DatePicker
          date={formData.dueDate ? new Date(formData.dueDate) : undefined}
          setDate={handleDueDateChange}
          placeholder="Selecione uma data"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TaskForm;
