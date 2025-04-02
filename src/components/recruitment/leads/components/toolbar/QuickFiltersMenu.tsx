
import React from 'react';
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
import FiltersBadge from './FiltersBadge';
import { FilterX, Check } from 'lucide-react';

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
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Filtros Ativos</span>
          <span className="text-xs bg-muted px-2 py-1 rounded-full">{activeFilterCount} filtros</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {activeFilterCount === 0 && (
          <DropdownMenuItem disabled className="text-muted-foreground text-center py-3">
            Nenhum filtro ativo no momento
          </DropdownMenuItem>
        )}
        
        <DropdownMenuGroup>
          {filters.channel && (
            <DropdownMenuItem 
              onClick={() => setFilters({...filters, channel: ''})}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Canal: <span className="font-semibold">{filters.channel}</span></span>
              </div>
              <FilterX className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </DropdownMenuItem>
          )}
          
          {filters.course && (
            <DropdownMenuItem 
              onClick={() => setFilters({...filters, course: ''})}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Curso: <span className="font-semibold">{filters.course}</span></span>
              </div>
              <FilterX className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </DropdownMenuItem>
          )}
          
          {filters.stage && (
            <DropdownMenuItem 
              onClick={() => setFilters({...filters, stage: ''})}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Etapa: <span className="font-semibold">{filters.stage}</span></span>
              </div>
              <FilterX className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </DropdownMenuItem>
          )}
          
          {filters.status && (
            <DropdownMenuItem 
              onClick={() => setFilters({...filters, status: ''})}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Status: <span className="font-semibold">{filters.status}</span></span>
              </div>
              <FilterX className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </DropdownMenuItem>
          )}
          
          {(filters.startDate || filters.endDate) && (
            <DropdownMenuItem 
              onClick={() => setFilters({...filters, startDate: undefined, endDate: undefined})}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Período: <span className="font-semibold">
                  {filters.startDate?.toLocaleDateString('pt-BR') || '∞'} - {filters.endDate?.toLocaleDateString('pt-BR') || '∞'}
                </span></span>
              </div>
              <FilterX className="h-4 w-4 text-muted-foreground hover:text-destructive" />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        
        {activeFilterCount > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={clearFilters} className="flex items-center justify-center text-destructive font-medium">
              <FilterX className="h-4 w-4 mr-2" />
              Limpar todos os filtros
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickFiltersMenu;
