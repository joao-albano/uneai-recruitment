
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import CalendarFooter from './CalendarFooter';

interface CalendarViewProps {
  formattedMonthYear: string;
  firstDayOfMonth: number;
  daysInMonth: number;
  today: Date;
  selectedDate: Date;
  previousMonth: () => void;
  nextMonth: () => void;
  hasSchedulesOnDay: (day: number) => boolean;
  getScheduleCountForDay: (day: number) => number;
  getScheduleStatusForDay: (day: number) => string | null;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  formattedMonthYear,
  firstDayOfMonth,
  daysInMonth,
  today,
  selectedDate,
  previousMonth,
  nextMonth,
  hasSchedulesOnDay,
  getScheduleCountForDay,
  getScheduleStatusForDay,
}) => {
  return (
    <Card className="shadow-md">
      <CalendarHeader
        formattedMonthYear={formattedMonthYear}
        previousMonth={previousMonth}
        nextMonth={nextMonth}
      />
      <CardContent>
        <CalendarGrid
          firstDayOfMonth={firstDayOfMonth}
          daysInMonth={daysInMonth}
          today={today}
          selectedDate={selectedDate}
          hasSchedulesOnDay={hasSchedulesOnDay}
          getScheduleCountForDay={getScheduleCountForDay}
          getScheduleStatusForDay={getScheduleStatusForDay}
        />
      </CardContent>
      <CalendarFooter />
    </Card>
  );
};

export default CalendarView;
