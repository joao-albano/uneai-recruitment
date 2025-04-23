
import React, { useState } from 'react';
import { TaskFilter } from '@/types/recruitment/tasks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter, X, Calendar, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';

interface TasksFiltersProps {
  filters: TaskFilter;
  onFilterChange: (filters: TaskFilter) => void;
  onClearFilters: () => void;
}

const TasksFilters: React.FC<TasksFiltersProps> = ({ 
  filters, 
  onFilterChange,
  onClearFilters
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchTerm: e.target.value });
  };
  
  const handlePriorityChange = (value: string) => {
    onFilterChange({ 
      ...filters, 
      priority: value ? [value as any] : undefined 
    });
  };
  
  const handleStatusChange = (value: string) => {
    onFilterChange({ 
      ...filters, 
      status: value ? [value as any] : undefined 
    });
  };
  
  const handleDueDateChange = (date: Date | undefined) => {
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      
      onFilterChange({
        ...filters,
        dueDate: { start, end }
      });
    } else {
      const { dueDate, ...restFilters } = filters;
      onFilterChange(restFilters);
    }
  };
  
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.priority) count++;
    if (filters.status) count++;
    if (filters.dueDate) count++;
    if (filters.region) count++;
    if (filters.course) count++;
    if (filters.source) count++;
    if (filters.interestLevel) count++;
    if (filters.assignedTo) count++;
    if (filters.tabulation) count++;
    if (filters.registrationDateRange) count++;
    return count;
  };
  
  const activeFiltersCount = getActiveFiltersCount();
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <Input
            placeholder="Pesquisar tarefas..."
            value={filters.searchTerm || ''}
            onChange={handleSearchChange}
            className="w-full"
          />
        </div>
        
        <Select
          value={filters.priority?.[0] || ''}
          onValueChange={handlePriorityChange}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas as prioridades</SelectItem>
            <SelectItem value="alta">Alta</SelectItem>
            <SelectItem value="média">Média</SelectItem>
            <SelectItem value="baixa">Baixa</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={filters.status?.[0] || ''}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="em_andamento">Em Andamento</SelectItem>
            <SelectItem value="agendada">Agendada</SelectItem>
            <SelectItem value="concluída">Concluída</SelectItem>
            <SelectItem value="cancelada">Cancelada</SelectItem>
          </SelectContent>
        </Select>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full md:w-[240px] justify-start">
              <Calendar className="mr-2 h-4 w-4" />
              {filters.dueDate ? (
                format(filters.dueDate.start, 'PPP', { locale: ptBR })
              ) : (
                "Data de vencimento"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarComponent
              mode="single"
              selected={filters.dueDate?.start}
              onSelect={handleDueDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Popover open={filtersOpen} onOpenChange={setFiltersOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="md:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-4" align="end">
            <div className="grid gap-4">
              <h4 className="font-medium leading-none mb-2">Filtros Avançados</h4>
              
              {/* Implementar filtros adicionais aqui */}
              <div className="grid gap-2">
                <label className="text-sm">Região</label>
                <Input placeholder="Filtrar por região" />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm">Curso</label>
                <Input placeholder="Filtrar por curso" />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm">Fonte de Captação</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar fonte" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="site">Site</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={onClearFilters} className="w-full mr-2">
                  <X className="mr-2 h-4 w-4" />
                  Limpar
                </Button>
                <Button onClick={() => setFiltersOpen(false)} className="w-full">
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={onClearFilters} className="md:w-auto">
            <X className="mr-2 h-4 w-4" />
            Limpar Filtros
          </Button>
        )}
      </div>
    </div>
  );
};

export default TasksFilters;
