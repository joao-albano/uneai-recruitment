
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FiltersBadgeProps {
  activeFilterCount: number;
}

const FiltersBadge: React.FC<FiltersBadgeProps> = ({ activeFilterCount }) => {
  return (
    <Button variant="outline" size="icon" className="relative">
      <Filter className="h-4 w-4" />
      {activeFilterCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center">
          {activeFilterCount}
        </span>
      )}
    </Button>
  );
};

export default FiltersBadge;
