
import React from 'react';
import { format, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Calendar } from 'lucide-react';

interface DateFilterPopoverProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  setEndDate: (date: Date | undefined) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DateFilterPopover: React.FC<DateFilterPopoverProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  open,
  setOpen,
}) => {
  const clearDateFilter = () => {
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const applyDateFilter = () => {
    setOpen(false); // Close the popover when applying the filter
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          Filtrar por data
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="p-3 space-y-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Data Inicial
            </p>
            <CalendarComponent
              mode="single"
              selected={startDate}
              onSelect={setStartDate}
              className="rounded-md border pointer-events-auto"
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              Data Final
            </p>
            <CalendarComponent
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              disabled={(date) => startDate ? isBefore(date, startDate) : false}
              className="rounded-md border pointer-events-auto"
            />
          </div>
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={clearDateFilter}>
              Limpar
            </Button>
            <Button variant="default" size="sm" onClick={applyDateFilter}>
              Aplicar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilterPopover;
