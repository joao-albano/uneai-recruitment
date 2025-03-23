
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';

interface ClassFilterProps {
  classFilter: string | null;
  clearClassFilter: () => void;
}

const ClassFilter: React.FC<ClassFilterProps> = ({ classFilter, clearClassFilter }) => {
  if (!classFilter) return null;
  
  return (
    <div className="flex items-center space-x-2">
      <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
        <Filter size={12} />
        Turma {classFilter}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-4 w-4 ml-1 text-muted-foreground hover:text-foreground"
          onClick={clearClassFilter}
        >
          <X size={12} />
        </Button>
      </Badge>
    </div>
  );
};

export default ClassFilter;
