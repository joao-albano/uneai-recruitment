
import React from 'react';
import { LeadFilterOptions } from '../types/leadFilters';
import SearchInput from './toolbar/SearchInput';
import QuickFiltersMenu from './toolbar/QuickFiltersMenu';
import ViewToggle from './toolbar/ViewToggle';
import DetailedFiltersMenu from './toolbar/DetailedFiltersMenu';
import DateFilterPopover from './toolbar/DateFilterPopover';
import ExportButton from './toolbar/ExportButton';
import { Separator } from '@/components/ui/separator';

interface LeadsToolbarProps {
  viewMode: 'table' | 'kanban';
  onViewModeChange: (mode: 'table' | 'kanban') => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters: LeadFilterOptions;
  setFilters: (filters: LeadFilterOptions) => void;
  clearFilters: () => void;
  exportLeads: () => void;
}

const LeadsToolbar: React.FC<LeadsToolbarProps> = ({ 
  viewMode, 
  onViewModeChange,
  searchTerm,
  setSearchTerm,
  filters,
  setFilters,
  clearFilters,
  exportLeads
}) => {
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.channel) count++;
    if (filters.course) count++;
    if (filters.stage) count++;
    if (filters.status) count++;
    if (filters.startDate || filters.endDate) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-muted/30 p-3 rounded-lg border border-muted/50">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <QuickFiltersMenu 
          filters={filters} 
          setFilters={setFilters} 
          clearFilters={clearFilters}
          activeFilterCount={activeFilterCount}
        />
      </div>
      
      <div className="flex gap-2 ml-auto">
        <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
        <Separator orientation="vertical" className="h-8" />
        <DetailedFiltersMenu filters={filters} setFilters={setFilters} />
        <DateFilterPopover filters={filters} setFilters={setFilters} />
        <ExportButton exportLeads={exportLeads} />
      </div>
    </div>
  );
};

export default LeadsToolbar;
