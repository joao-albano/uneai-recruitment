
import React from 'react';
import { Button } from '@/components/ui/button';
import { ListFilter, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LeadFilterOptions } from '../../types/leadFilters';

interface DetailedFiltersMenuProps {
  filters: LeadFilterOptions;
  setFilters: (filters: LeadFilterOptions) => void;
}

const DetailedFiltersMenu: React.FC<DetailedFiltersMenuProps> = ({ filters, setFilters }) => {
  // Available filter options
  const channels = ['Site', 'Facebook', 'Instagram', 'Google', 'WhatsApp', 'Indicação'];
  const courses = ['Ensino Fundamental', 'Ensino Médio', 'Educação Infantil'];
  const stages = ['Contato Inicial', 'Agendamento', 'Visita', 'Matrícula'];
  const statuses = ['Novo', 'Em Andamento', 'Aguardando', 'Finalizado'];

  return (
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
          <DropdownMenuItem
            key={channel}
            onClick={() => setFilters({
              ...filters,
              channel: filters.channel === channel ? '' : channel
            })}
          >
            <div className="flex items-center w-full">
              <div className="mr-2 h-4 w-4 flex items-center justify-center">
                {filters.channel === channel && "✓"}
              </div>
              {channel}
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal">Curso</DropdownMenuLabel>
        {courses.map(course => (
          <DropdownMenuItem
            key={course}
            onClick={() => setFilters({
              ...filters,
              course: filters.course === course ? '' : course
            })}
          >
            <div className="flex items-center w-full">
              <div className="mr-2 h-4 w-4 flex items-center justify-center">
                {filters.course === course && "✓"}
              </div>
              {course}
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal">Etapa</DropdownMenuLabel>
        {stages.map(stage => (
          <DropdownMenuItem
            key={stage}
            onClick={() => setFilters({
              ...filters,
              stage: filters.stage === stage ? '' : stage
            })}
          >
            <div className="flex items-center w-full">
              <div className="mr-2 h-4 w-4 flex items-center justify-center">
                {filters.stage === stage && "✓"}
              </div>
              {stage}
            </div>
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal">Status</DropdownMenuLabel>
        {statuses.map(status => (
          <DropdownMenuItem
            key={status}
            onClick={() => setFilters({
              ...filters,
              status: filters.status === status ? '' : status
            })}
          >
            <div className="flex items-center w-full">
              <div className="mr-2 h-4 w-4 flex items-center justify-center">
                {filters.status === status && "✓"}
              </div>
              {status}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DetailedFiltersMenu;
