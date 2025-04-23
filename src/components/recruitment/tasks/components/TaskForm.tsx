
import React from 'react';
import { Task } from '@/types/recruitment/tasks';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface TaskFormProps {
  formData: Partial<Task>;
  onFormChange: (data: Partial<Task>) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ formData, onFormChange }) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Título da Tarefa</Label>
        <Input
          id="title"
          placeholder="Título da tarefa"
          value={formData.title || ''}
          onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
        />
      </div>
      
      <div className="grid gap-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Descreva a tarefa..."
          rows={3}
          value={formData.description || ''}
          onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="priority">Prioridade</Label>
          <Select
            value={formData.priority || 'média'}
            onValueChange={(value) => onFormChange({ ...formData, priority: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar prioridade" />
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
            onValueChange={(value) => onFormChange({ ...formData, status: value as any })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecionar status" />
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
        <Label>Data de Vencimento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.dueDate ? (
                format(new Date(formData.dueDate), 'PPP', { locale: ptBR })
              ) : (
                <span>Selecionar data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={formData.dueDate ? new Date(formData.dueDate) : undefined}
              onSelect={(date) => onFormChange({ ...formData, dueDate: date })}
              initialFocus
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default TaskForm;
