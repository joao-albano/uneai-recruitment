
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface FiltersBadgeProps {
  activeFilterCount: number;
  onClick?: () => void;
}

const FiltersBadge: React.FC<FiltersBadgeProps> = ({ activeFilterCount, onClick }) => {
  // Enhance visual indicators based on filter status
  const getBgColor = () => {
    return activeFilterCount > 0 
      ? "bg-primary/10 border-primary/30 hover:bg-primary/15 hover:border-primary/40" 
      : "bg-teal-50 border-teal-200 hover:bg-teal-100 hover:border-teal-300";
  };

  const getTextColor = () => {
    return activeFilterCount > 0 ? "text-primary" : "text-teal-600";
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={onClick}
          className={`relative ${getBgColor()} transition-colors`}
        >
          <Filter className={`h-4 w-4 ${getTextColor()}`} />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[11px] font-medium text-primary-foreground flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{activeFilterCount > 0 
          ? `${activeFilterCount} ${activeFilterCount === 1 ? 'filtro ativo' : 'filtros ativos'}`
          : 'Filtros rápidos'}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default FiltersBadge;
