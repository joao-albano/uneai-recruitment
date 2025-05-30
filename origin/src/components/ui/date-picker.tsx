
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { pt } from 'date-fns/locale';

interface DatePickerProps {
  date?: Date;
  setDate: (date: Date | undefined) => void;
  fromDate?: Date; // Optional - minimum selectable date
  toDate?: Date;   // Optional - maximum selectable date
  placeholder?: string; // Optional - custom placeholder
  className?: string; // Optional - additional classes for the button
}

export function DatePicker({ 
  date, 
  setDate, 
  fromDate, 
  toDate, 
  placeholder = "Selecionar data",
  className
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  // Handler for date selection to ensure proper creation of date objects
  const handleSelect = React.useCallback((selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Create a new Date object to prevent reference issues
      const newDate = new Date(selectedDate);
      setDate(newDate);
    } else {
      setDate(undefined);
    }
    setOpen(false);
  }, [setDate]);
  
  // Handler to prevent event propagation when clicking on the date picker
  const handleClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild onClick={handleClick}>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal bg-white",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd/MM/yyyy", { locale: pt }) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-white z-50 shadow-md" onClick={handleClick}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          locale={pt}
          disabled={(date) => {
            // Ensure proper validation for disabled dates
            if (fromDate && date < new Date(fromDate.setHours(0, 0, 0, 0))) return true;
            if (toDate && date > new Date(toDate.setHours(23, 59, 59, 999))) return true;
            return false;
          }}
          className="pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  )
}
