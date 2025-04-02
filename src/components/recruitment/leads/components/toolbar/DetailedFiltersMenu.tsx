
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
import { useToast } from '@/components/ui/use-toast';

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
  const { toast } = useToast();

  const toggleFilter = (filterType: keyof LeadFilterOptions, value: string) => {
    const isActive = filters[filterType] === value;
    const newFilters = {
      ...filters,
      [filterType]: isActive ? '' : value
    };
    setFilters(newFilters);
    
    if (!isActive) {
      toast({
        title: "Filtro aplicado",
        description: `Filtro de ${getFilterLabel(filterType)}: "${value}" foi aplicado.`,
        duration: 2000,
      });
    }
  };
  
  const getFilterLabel = (filterType: string): string => {
    const labels: {[key: string]: string} = {
      'channel': 'Canal',
      'course': 'Curso',
      'stage': 'Etapa',
      'status': 'Status',
    };
    return labels[filterType] || filterType;
  };

  // Count active filter categories
  const getActiveFilterCategoryCount = () => {
    let count = 0;
    if (filters.channel) count++;
    if (filters.course) count++;
    if (filters.stage) count++;
    if (filters.status) count++;
    return count;
  };
  
  const activeCategoryCount = getActiveFilterCategoryCount();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className={`gap-2 ${activeCategoryCount > 0 ? 'bg-primary/10 border-primary/30 text-primary' : ''}`}
            >
              <ListFilter className="h-4 w-4" />
              <span>Filtros</span>
              {activeCategoryCount > 0 && (
                <span className="rounded-full bg-primary w-5 h-5 flex items-center justify-center text-[10px] text-primary-foreground font-medium">
                  {activeCategoryCount}
                </span>
              )}
              <ChevronDown className="h-4 w-4 opacity-70" />
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
                  onClick={() => toggleFilter('channel', channel)}
                  className={filters.channel === channel ? 'bg-primary/10' : ''}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-2 h-4 w-4 flex items-center justify-center text-primary">
                      {filters.channel === channel && <Check className="h-3.5 w-3.5" />}
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
                  onClick={() => toggleFilter('course', course)}
                  className={filters.course === course ? 'bg-primary/10' : ''}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-2 h-4 w-4 flex items-center justify-center text-primary">
                      {filters.course === course && <Check className="h-3.5 w-3.5" />}
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
                  onClick={() => toggleFilter('stage', stage)}
                  className={filters.stage === stage ? 'bg-primary/10' : ''}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-2 h-4 w-4 flex items-center justify-center text-primary">
                      {filters.stage === stage && <Check className="h-3.5 w-3.5" />}
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
                  onClick={() => toggleFilter('status', status)}
                  className={filters.status === status ? 'bg-primary/10' : ''}
                >
                  <div className="flex items-center w-full">
                    <div className="mr-2 h-4 w-4 flex items-center justify-center text-primary">
                      {filters.status === status && <Check className="h-3.5 w-3.5" />}
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
        <p>Filtros detalhados {activeCategoryCount > 0 ? `(${activeCategoryCount} categorias)` : ''}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default DetailedFiltersMenu;
