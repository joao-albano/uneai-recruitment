
import React from 'react';
import { Button } from '@/components/ui/button';
import { SchoolSegment } from '@/types/data';
import SearchBar from './SearchBar';
import DateFilterPopover from './DateFilterPopover';
import SegmentFilter from './SegmentFilter';

interface FilterToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  selectedSegment: SchoolSegment | null;
  setSelectedSegment: (segment: SchoolSegment | null) => void;
  availableSegments: SchoolSegment[];
  setCurrentPage: (page: number) => void;
  clearAllFilters: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const FilterToolbar: React.FC<FilterToolbarProps> = ({
  searchQuery,
  setSearchQuery,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  selectedSegment,
  setSelectedSegment,
  availableSegments,
  setCurrentPage,
  clearAllFilters,
  open,
  setOpen,
}) => {
  const hasActiveFilters = searchQuery || startDate || endDate || selectedSegment;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <div className="flex gap-2">
        <DateFilterPopover 
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          open={open}
          setOpen={setOpen}
        />

        <SegmentFilter 
          selectedSegment={selectedSegment}
          setSelectedSegment={setSelectedSegment}
          availableSegments={availableSegments}
          setCurrentPage={setCurrentPage}
        />

        {/* Clear all filters button - only show if there are active filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="icon" onClick={clearAllFilters} title="Limpar todos os filtros">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterToolbar;
