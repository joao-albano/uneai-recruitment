
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TaskFilter } from '@/types/recruitment/tasks';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { X, Filter } from 'lucide-react';

interface TasksFilterPanelProps {
  filters: TaskFilter;
  setFilters: (filters: TaskFilter) => void;
  clearFilters: () => void;
}

const TasksFilterPanel: React.FC<TasksFilterPanelProps> = ({
  filters,
  setFilters,
  clearFilters
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Update search term
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, searchTerm: e.target.value });
  };
  
  // Update status filter
  const handleStatusChange = (value: string) => {
    setFilters({
      ...filters,
      status: value === 'all' ? undefined : [value as any]
    });
  };
  
  // Update priority filter
  const handlePriorityChange = (value: string) => {
    setFilters({
      ...filters,
      priority: value === 'all' ? undefined : [value as any]
    });
  };
  
  return (
    <div className="border rounded-md p-4 mt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <div className="relative w-full md:w-1/3">
          <Input
            placeholder="Buscar por nome, email ou ID..."
            value={filters.searchTerm || ''}
            onChange={handleSearchChange}
            className="pl-8"
          />
          <Filter className="h-4 w-4 absolute top-3 left-2 text-muted-foreground" />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Filtros avançados
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            <span>Limpar</span>
          </Button>
        </div>
      </div>
      
      {isExpanded && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="status">
            <AccordionTrigger>Status da Tarefa</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={filters.status && filters.status.length > 0 ? filters.status[0] : 'all'}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                      <SelectItem value="em_andamento">Em andamento</SelectItem>
                      <SelectItem value="concluída">Concluída</SelectItem>
                      <SelectItem value="agendada">Agendada</SelectItem>
                      <SelectItem value="cancelada">Cancelada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="priority">Prioridade</Label>
                  <Select 
                    value={filters.priority && filters.priority.length > 0 ? filters.priority[0] : 'all'}
                    onValueChange={handlePriorityChange}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                      <SelectItem value="média">Média</SelectItem>
                      <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default TasksFilterPanel;
