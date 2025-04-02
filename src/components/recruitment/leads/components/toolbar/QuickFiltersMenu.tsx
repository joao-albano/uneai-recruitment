
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
import { FilterX, Check, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface QuickFiltersMenuProps {
  filters: LeadFilterOptions;
  setFilters: (filters: LeadFilterOptions) => void;
  clearFilters: () => void;
  activeFilterCount: number;
  onClick?: (e: React.MouseEvent) => void;
}

const QuickFiltersMenu: React.FC<QuickFiltersMenuProps> = ({ 
  filters, 
  setFilters, 
  clearFilters,
  activeFilterCount,
  onClick 
}) => {
  const { toast } = useToast();

  const handleClearFilter = (e: React.MouseEvent, filterType: keyof LeadFilterOptions, value: string) => {
    e.stopPropagation(); // Impedir propagação do evento
    setFilters({...filters, [filterType]: ''});
    
    toast({
      title: "Filtro removido",
      description: `Filtro de ${getFilterLabel(filterType)}: "${value}" foi removido.`,
      duration: 2000,
    });
  };

  const handleClearAllFilters = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impedir propagação do evento
    clearFilters();
    
    toast({
      title: "Todos os filtros removidos",
      description: "Todos os filtros foram limpos com sucesso.",
      duration: 2000,
    });
  };

  const getFilterLabel = (filterType: string): string => {
    const labels: {[key: string]: string} = {
      'channel': 'Canal',
      'course': 'Curso',
      'stage': 'Etapa',
      'status': 'Status',
      'startDate': 'Data inicial',
      'endDate': 'Data final'
    };
    return labels[filterType] || filterType;
  };

  const handleClick = (e: React.MouseEvent) => {
    // Prevenindo a propagação do evento para evitar conflitos
    e.stopPropagation();
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div onClick={handleClick}>
          <FiltersBadge activeFilterCount={activeFilterCount} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64">
        <DropdownMenuLabel className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span>Filtros Ativos</span>
          </div>
          {activeFilterCount > 0 && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
              {activeFilterCount} {activeFilterCount === 1 ? 'filtro' : 'filtros'}
            </span>
          )}
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
              onClick={(e) => handleClearFilter(e, 'channel', filters.channel)}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Canal: <span className="font-semibold">{filters.channel}</span></span>
              </div>
              <FilterX className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
            </DropdownMenuItem>
          )}
          
          {filters.course && (
            <DropdownMenuItem 
              onClick={(e) => handleClearFilter(e, 'course', filters.course)}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Curso: <span className="font-semibold">{filters.course}</span></span>
              </div>
              <FilterX className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
            </DropdownMenuItem>
          )}
          
          {filters.stage && (
            <DropdownMenuItem 
              onClick={(e) => handleClearFilter(e, 'stage', filters.stage)}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Etapa: <span className="font-semibold">{filters.stage}</span></span>
              </div>
              <FilterX className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
            </DropdownMenuItem>
          )}
          
          {filters.status && (
            <DropdownMenuItem 
              onClick={(e) => handleClearFilter(e, 'status', filters.status)}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Status: <span className="font-semibold">{filters.status}</span></span>
              </div>
              <FilterX className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
            </DropdownMenuItem>
          )}
          
          {(filters.startDate || filters.endDate) && (
            <DropdownMenuItem 
              onClick={(e) => {
                e.stopPropagation();
                setFilters({...filters, startDate: undefined, endDate: undefined});
              }}
              className="flex items-center justify-between group"
            >
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-primary" />
                <span>Período: <span className="font-semibold">
                  {filters.startDate?.toLocaleDateString('pt-BR') || '∞'} - {filters.endDate?.toLocaleDateString('pt-BR') || '∞'}
                </span></span>
              </div>
              <FilterX className="h-4 w-4 text-muted-foreground group-hover:text-destructive transition-colors" />
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        
        {activeFilterCount > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={(e) => handleClearAllFilters(e)} 
              className="flex items-center justify-center text-destructive font-medium hover:bg-destructive/10"
            >
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
