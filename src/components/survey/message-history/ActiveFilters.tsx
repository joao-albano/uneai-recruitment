
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SchoolSegment } from '@/types/data';

interface ActiveFiltersProps {
  selectedSegment: SchoolSegment | null;
  setSelectedSegment: (segment: SchoolSegment | null) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({
  selectedSegment,
  setSelectedSegment,
}) => {
  if (!selectedSegment) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {selectedSegment && (
        <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
          Segmento: {selectedSegment}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-4 w-4 ml-1 text-muted-foreground hover:text-foreground"
            onClick={() => setSelectedSegment(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </Button>
        </Badge>
      )}
    </div>
  );
};

export default ActiveFilters;
