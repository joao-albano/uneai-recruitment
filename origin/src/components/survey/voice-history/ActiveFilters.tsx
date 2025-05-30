
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SchoolSegment } from '@/types/data';

interface ActiveFiltersProps {
  selectedSegment: SchoolSegment | null;
  setSelectedSegment: (segment: SchoolSegment | null) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedSegment,
  setSelectedSegment
}) => {
  const { language } = useTheme();
  
  if (!selectedSegment) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <div className="text-sm text-muted-foreground mt-1">
        {language === 'pt-BR' ? 'Filtros ativos:' : 'Active filters:'}
      </div>
      
      {selectedSegment && (
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 text-xs"
          onClick={() => setSelectedSegment(null)}
        >
          {language === 'pt-BR' ? 'Segmento' : 'Segment'}: {selectedSegment}
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};

export default ActiveFilters;
