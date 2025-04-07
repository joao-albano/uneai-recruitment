
import React from 'react';

type DateRange = '7d' | '30d' | '90d' | 'all';

interface DateRangeSelectorProps {
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({ 
  dateRange, 
  setDateRange 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <select 
        className="border rounded-md p-2 text-sm"
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value as DateRange)}
      >
        <option value="7d">Últimos 7 dias</option>
        <option value="30d">Últimos 30 dias</option>
        <option value="90d">Últimos 90 dias</option>
        <option value="all">Todo o período</option>
      </select>
    </div>
  );
};

export default DateRangeSelector;
