
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  ChevronDown, 
  ListFilter, 
  List, 
  LayoutGrid,
  Calendar
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DatePicker } from '@/components/ui/date-picker';
import { Badge } from '@/components/ui/badge';
import { LeadFilterOptions } from '../types/leadFilters';

interface LeadsToolbarProps {
  viewMode: 'table' | 'kanban';
  onViewModeChange: (mode: 'table' | 'kanban') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: LeadFilterOptions;
  setFilters: (filters: LeadFilterOptions) => void;
  clearFilters: () => void;
  exportLeads: () => void;
}

const LeadsToolbar: React.FC<LeadsToolbarProps> = ({ 
  viewMode, 
  onViewModeChange,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  clearFilters,
  exportLeads
}) => {
  const [startDate, setStartDate] = useState<Date | undefined>(filters.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(filters.endDate);

  // Available filter options
  const channels = ['Site', 'Facebook', 'Instagram', 'Google', 'WhatsApp', 'Indicação'];
  const courses = ['Ensino Fundamental', 'Ensino Médio', 'Educação Infantil'];
  const stages = ['Contato Inicial', 'Agendamento', 'Visita', 'Matrícula'];
  const statuses = ['Novo', 'Em Andamento', 'Aguardando', 'Finalizado'];

  const handleDateChange = () => {
    setFilters({
      ...filters,
      startDate,
      endDate
    });
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.channel) count++;
    if (filters.course) count++;
    if (filters.stage) count++;
    if (filters.status) count++;
    if (filters.startDate || filters.endDate) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar lead..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Filter className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filtros Rápidos</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {activeFilterCount > 0 && (
              <DropdownMenuItem onClick={clearFilters} className="justify-between text-destructive">
                Limpar Filtros
                <span className="ml-1 rounded-full bg-destructive/20 px-1.5 py-0.5 text-xs">
                  {activeFilterCount}
                </span>
              </DropdownMenuItem>
            )}
            
            {filters.channel && (
              <DropdownMenuItem onClick={() => setFilters({...filters, channel: ''})}>
                Canal: {filters.channel} <span className="ml-1">❌</span>
              </DropdownMenuItem>
            )}
            
            {filters.course && (
              <DropdownMenuItem onClick={() => setFilters({...filters, course: ''})}>
                Curso: {filters.course} <span className="ml-1">❌</span>
              </DropdownMenuItem>
            )}
            
            {filters.stage && (
              <DropdownMenuItem onClick={() => setFilters({...filters, stage: ''})}>
                Etapa: {filters.stage} <span className="ml-1">❌</span>
              </DropdownMenuItem>
            )}
            
            {filters.status && (
              <DropdownMenuItem onClick={() => setFilters({...filters, status: ''})}>
                Status: {filters.status} <span className="ml-1">❌</span>
              </DropdownMenuItem>
            )}
            
            {(filters.startDate || filters.endDate) && (
              <DropdownMenuItem onClick={() => setFilters({...filters, startDate: undefined, endDate: undefined})}>
                Data de filtro <span className="ml-1">❌</span>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="flex gap-2 ml-auto">
        <div className="flex items-center border rounded-md overflow-hidden">
          <Button 
            variant={viewMode === 'table' ? 'default' : 'ghost'} 
            size="sm" 
            className="rounded-none px-3"
            onClick={() => onViewModeChange('table')}
          >
            <List className="h-4 w-4 mr-1" />
            Lista
          </Button>
          <Button 
            variant={viewMode === 'kanban' ? 'default' : 'ghost'} 
            size="sm" 
            className="rounded-none px-3"
            onClick={() => onViewModeChange('kanban')}
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Kanban
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ListFilter className="h-4 w-4" />
              <span>Filtros</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel className="text-xs font-normal">Canal</DropdownMenuLabel>
            {channels.map(channel => (
              <DropdownMenuCheckboxItem
                key={channel}
                checked={filters.channel === channel}
                onCheckedChange={() => setFilters({
                  ...filters,
                  channel: filters.channel === channel ? '' : channel
                })}
              >
                {channel}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs font-normal">Curso</DropdownMenuLabel>
            {courses.map(course => (
              <DropdownMenuCheckboxItem
                key={course}
                checked={filters.course === course}
                onCheckedChange={() => setFilters({
                  ...filters,
                  course: filters.course === course ? '' : course
                })}
              >
                {course}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs font-normal">Etapa</DropdownMenuLabel>
            {stages.map(stage => (
              <DropdownMenuCheckboxItem
                key={stage}
                checked={filters.stage === stage}
                onCheckedChange={() => setFilters({
                  ...filters,
                  stage: filters.stage === stage ? '' : stage
                })}
              >
                {stage}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs font-normal">Status</DropdownMenuLabel>
            {statuses.map(status => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={filters.status === status}
                onCheckedChange={() => setFilters({
                  ...filters,
                  status: filters.status === status ? '' : status
                })}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Data</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4" align="end">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Data Inicial</h4>
                <DatePicker
                  date={startDate}
                  setDate={setStartDate}
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Data Final</h4>
                <DatePicker
                  date={endDate}
                  setDate={setEndDate}
                />
              </div>
              <Button size="sm" className="w-full" onClick={handleDateChange}>
                Aplicar
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <Button variant="outline" className="gap-2" onClick={exportLeads}>
          <Download className="h-4 w-4" />
          <span>Exportar</span>
        </Button>
      </div>
    </div>
  );
};

export default LeadsToolbar;
