
import React from 'react';
import { Button } from '@/components/ui/button';
import { ListFilter, ChevronDown, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { LeadFilterOptions } from '../../types/leadFilters';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <ListFilter className="h-4 w-4" />
              <span>Filtros</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64">
            <DropdownMenuLabel>Filtros Detalhados</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground pt-2">Canal</DropdownMenuLabel>
              {channels.map(channel => (
                <DropdownMenuItem
                  key={channel}
                  onClick={() => setFilters({
                    ...filters,
                    channel: filters.channel === channel ? '' : channel
                  })}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-2 h-4 w-4 flex items-center justify-center text-primary">
                      {filters.channel === channel && <Check />}
                    </div>
                    {channel}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground pt-2">Curso</DropdownMenuLabel>
              {courses.map(course => (
                <DropdownMenuItem
                  key={course}
                  onClick={() => setFilters({
                    ...filters,
                    course: filters.course === course ? '' : course
                  })}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-2 h-4 w-4 flex items-center justify-center text-primary">
                      {filters.course === course && <Check />}
                    </div>
                    {course}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground pt-2">Etapa</DropdownMenuLabel>
              {stages.map(stage => (
                <DropdownMenuItem
                  key={stage}
                  onClick={() => setFilters({
                    ...filters,
                    stage: filters.stage === stage ? '' : stage
                  })}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-2 h-4 w-4 flex items-center justify-center text-primary">
                      {filters.stage === stage && <Check />}
                    </div>
                    {stage}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs font-normal text-muted-foreground pt-2">Status</DropdownMenuLabel>
              {statuses.map(status => (
                <DropdownMenuItem
                  key={status}
                  onClick={() => setFilters({
                    ...filters,
                    status: filters.status === status ? '' : status
                  })}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-2 h-4 w-4 flex items-center justify-center text-primary">
                      {filters.status === status && <Check />}
                    </div>
                    {status}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Filtros detalhados</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DetailedFiltersMenu;
