
import React from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SchoolSegment } from '@/types/data';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuCheckboxItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface SegmentFilterProps {
  selectedSegment: SchoolSegment | null;
  setSelectedSegment: (segment: SchoolSegment | null) => void;
  availableSegments: SchoolSegment[];
  setCurrentPage: (page: number) => void;
}

const SegmentFilter: React.FC<SegmentFilterProps> = ({
  selectedSegment,
  setSelectedSegment,
  availableSegments,
  setCurrentPage,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          {selectedSegment ? `Segmento: ${selectedSegment}` : 'Filtrar por segmento'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Segmento Escolar</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableSegments.map((segment) => (
          <DropdownMenuCheckboxItem
            key={segment}
            checked={selectedSegment === segment}
            onCheckedChange={() => {
              setSelectedSegment(selectedSegment === segment ? null : segment);
              setCurrentPage(1); // Reset to first page on filter change
            }}
          >
            {segment}
          </DropdownMenuCheckboxItem>
        ))}
        {selectedSegment && (
          <>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full text-xs"
                onClick={() => setSelectedSegment(null)}
              >
                Limpar filtro
              </Button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SegmentFilter;
