
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PeriodSelectorProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  periods?: string[];
}

const PeriodSelector: React.FC<PeriodSelectorProps> = ({ 
  selectedPeriod, 
  onPeriodChange,
  periods = ['2023.2', '2024.1', '2024.2']
}) => {
  return (
    <Tabs value={selectedPeriod} onValueChange={onPeriodChange}>
      <TabsList>
        {periods.map((period) => (
          <TabsTrigger key={period} value={period}>{period}</TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default PeriodSelector;
