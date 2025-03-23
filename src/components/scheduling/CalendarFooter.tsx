
import React from 'react';
import { CardFooter } from '@/components/ui/card';

const CalendarFooter: React.FC = () => {
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
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-100 border border-green-300" />
          <span className="text-xs text-muted-foreground">Concluído</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-100 border border-red-300" />
          <span className="text-xs text-muted-foreground">Cancelado</span>
        </div>
      </div>
    </CardFooter>
  );
};

export default CalendarFooter;
