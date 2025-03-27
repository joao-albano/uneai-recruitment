
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { SchoolSegment } from '@/types/data';
import { Input } from '@/components/ui/input';
import { Search, Calendar, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  setOpen
}) => {
  const { language } = useTheme();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSegmentChange = (value: string) => {
    setSelectedSegment(value as SchoolSegment);
    setCurrentPage(1);
  };

  const clearDateFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setCurrentPage(1);
  };

  const applyDateFilter = () => {
    setOpen(false);
    setCurrentPage(1);
  };

  const hasActiveFilters = !!searchQuery || !!startDate || !!endDate || !!selectedSegment;

  return (
    <div className="flex flex-col gap-3 mb-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={language === 'pt-BR' ? "Buscar ligações..." : "Search calls..."}
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-8"
          />
        </div>
        
        <div className="flex gap-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                {language === 'pt-BR' ? 'Data' : 'Date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <div className="p-3 space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {language === 'pt-BR' ? 'Data Inicial' : 'Start Date'}
                  </p>
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    {language === 'pt-BR' ? 'Data Final' : 'End Date'}
                  </p>
                  <CalendarComponent
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={(date) => startDate ? isBefore(date, startDate) : false}
                    className="rounded-md border"
                  />
                </div>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={clearDateFilter}>
                    {language === 'pt-BR' ? 'Limpar' : 'Clear'}
                  </Button>
                  <Button variant="default" size="sm" onClick={applyDateFilter}>
                    {language === 'pt-BR' ? 'Aplicar' : 'Apply'}
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <Select value={selectedSegment || ''} onValueChange={handleSegmentChange}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="truncate">
                  {selectedSegment || (language === 'pt-BR' ? 'Segmento' : 'Segment')}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">
                {language === 'pt-BR' ? 'Todos os segmentos' : 'All segments'}
              </SelectItem>
              {availableSegments.map((segment) => (
                <SelectItem key={segment} value={segment}>
                  {segment}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearAllFilters} className="gap-1">
              <X className="h-4 w-4" />
              {language === 'pt-BR' ? 'Limpar Filtros' : 'Clear Filters'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;
