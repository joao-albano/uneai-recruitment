
import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CalendarHeaderProps {
  formattedMonthYear: string;
  previousMonth: () => void;
  nextMonth: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  formattedMonthYear,
  previousMonth,
  nextMonth,
}) => {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl font-bold capitalize">
            {formattedMonthYear}
          </CardTitle>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="outline" size="icon" onClick={previousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};

export default CalendarHeader;
