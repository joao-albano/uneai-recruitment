
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DatePicker } from '@/components/ui/date-picker';
import { LeadFilterOptions } from '../../types/leadFilters';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface DateFilterPopoverProps {
  filters: LeadFilterOptions;
  setFilters: (filters: LeadFilterOptions) => void;
}

const DateFilterPopover: React.FC<DateFilterPopoverProps> = ({ filters, setFilters }) => {
  const [startDate, setStartDate] = useState<Date | undefined>(filters.startDate);
  const [endDate, setEndDate] = useState<Date | undefined>(filters.endDate);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  // Sync component state with prop filters
  useEffect(() => {
    setStartDate(filters.startDate);
    setEndDate(filters.endDate);
  }, [filters.startDate, filters.endDate]);

  // Format date for display
  const formatDateDisplay = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  const handleDateChange = (e: React.MouseEvent) => {
    // Prevent event propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    // Validate that end date is not before start date
    if (startDate && endDate && startDate > endDate) {
      toast({
        title: "Erro no filtro de data",
        description: "A data final não pode ser anterior à data inicial",
        variant: "destructive",
      });
      return;
    }
    
    setFilters({
      ...filters,
      startDate,
      endDate
    });
    
    // Show feedback to user
    toast({
      title: "Filtro de período aplicado",
      description: startDate && endDate 
        ? `Período: ${formatDateDisplay(startDate)} até ${formatDateDisplay(endDate)}`
        : startDate 
          ? `A partir de: ${formatDateDisplay(startDate)}` 
          : endDate 
            ? `Até: ${formatDateDisplay(endDate)}` 
            : "Período limpo",
      duration: 2000,
    });
    
    // Close the popover
    setOpen(false);
  };
  
  const handleClearDates = (e: React.MouseEvent) => {
    // Prevent event propagation
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    setStartDate(undefined);
    setEndDate(undefined);
    
    if (filters.startDate || filters.endDate) {
      setFilters({
        ...filters,
        startDate: undefined,
        endDate: undefined
      });
      
      toast({
        title: "Filtro de período removido",
        description: "O filtro de período foi removido.",
        duration: 2000,
      });
    }
    
    // Close the popover
    setOpen(false);
  };
  
  // Check if date filter is active
  const isDateFilterActive = Boolean(filters.startDate || filters.endDate);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
        <Button 
          variant="outline" 
          className={`gap-2 ${isDateFilterActive ? 'bg-primary/10 border-primary/30 text-primary' : ''}`}
        >
          <Calendar className="h-4 w-4" />
          <span>Data</span>
          {isDateFilterActive && (
            <span className="rounded-full bg-primary w-5 h-5 flex items-center justify-center text-[10px] text-primary-foreground font-medium">
              1
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="end" onClick={(e) => e.stopPropagation()}>
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
              fromDate={startDate} // Prevent selecting dates before start date
            />
          </div>
          <div className="flex gap-2">
            <Button size="sm" className="flex-1" onClick={handleDateChange} variant="default">
              Aplicar
            </Button>
            <Button size="sm" className="flex-1" onClick={handleClearDates} variant="outline">
              Limpar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateFilterPopover;
