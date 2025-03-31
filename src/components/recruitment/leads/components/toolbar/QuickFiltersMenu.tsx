
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LeadFilterOptions } from '../../types/leadFilters';
import FiltersBadge from './FiltersBadge';

interface QuickFiltersMenuProps {
  filters: LeadFilterOptions;
  setFilters: (filters: LeadFilterOptions) => void;
  clearFilters: () => void;
  activeFilterCount: number;
}

const QuickFiltersMenu: React.FC<QuickFiltersMenuProps> = ({ 
  filters, 
  setFilters, 
  clearFilters,
  activeFilterCount 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <FiltersBadge activeFilterCount={activeFilterCount} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filtros Rápidos</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {activeFilterCount === 0 && (
          <DropdownMenuItem disabled className="text-muted-foreground">
            Nenhum filtro ativo
          </DropdownMenuItem>
        )}
        
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
  );
};

export default QuickFiltersMenu;
