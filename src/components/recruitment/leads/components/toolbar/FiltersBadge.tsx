
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface FiltersBadgeProps {
  activeFilterCount: number;
}

const FiltersBadge: React.FC<FiltersBadgeProps> = ({ activeFilterCount }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="relative bg-teal-50 border-teal-200 hover:bg-teal-100 hover:border-teal-300 transition-colors"
        >
          <Filter className="h-4 w-4 text-teal-600" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>Filtros rápidos ({activeFilterCount} {activeFilterCount === 1 ? 'filtro ativo' : 'filtros ativos'})</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FiltersBadge;
