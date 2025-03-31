
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DatePicker } from '@/components/ui/date-picker';
import { LeadFilterOptions } from '../../types/leadFilters';

interface DateFilterPopoverProps {
  filters: LeadFilterOptions;
  setFilters: (filters: LeadFilterOptions) => void;
}

const DateFilterPopover: React.FC<DateFilterPopoverProps> = ({ filters, setFilters }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(filters.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(filters.endDate);

  const handleDateChange = () => {
    setFilters({
      ...filters,
      startDate,
      endDate
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          <span>Data</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="end">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Data Inicial</h4>
            <DatePicker
              date={startDate}
              setDate={setStartDate}
            />
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm">Data Final</h4>
            <DatePicker
              date={endDate}
              setDate={setEndDate}
            />
          </div>
          <Button size="sm" className="w-full" onClick={handleDateChange}>
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilterPopover;
