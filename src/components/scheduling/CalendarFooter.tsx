
import React from 'react';
import { Plus } from 'lucide-react';
import { CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CalendarFooterProps {
  onNewSchedule: () => void;
}

const CalendarFooter: React.FC<CalendarFooterProps> = ({ onNewSchedule }) => {
  return (
    <CardFooter className="justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-muted/50" />
          <span className="text-xs text-muted-foreground">Hoje</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-100 border border-blue-300" />
          <span className="text-xs text-muted-foreground">Agendado</span>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={onNewSchedule}>
        <Plus className="mr-1 h-3.5 w-3.5" />
        Novo atendimento
      </Button>
    </CardFooter>
  );
};

export default CalendarFooter;
