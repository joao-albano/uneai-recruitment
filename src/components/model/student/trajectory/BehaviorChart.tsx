
import React from 'react';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface BehaviorChartProps {
  trajectoryData: any[];
}

// Tooltip renderer for the charts
const renderTooltip = (props: any) => {
  const { active, payload } = props;
  if (active && payload && payload.length) {
    return <ChartTooltipContent {...props} />;
  }
  return null;
};

const BehaviorChart: React.FC<BehaviorChartProps> = ({ trajectoryData }) => {
  // Define chart config for ChartContainer
  const chartConfig = {
    behavior: { 
      color: '#8b5cf6',
      label: 'Comportamento (1-5)'
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="font-medium text-lg">Comportamento</h3>
      <div className="h-[220px] w-full">
        <ChartContainer config={chartConfig}>
          <BarChart 
            data={trajectoryData} 
            margin={{ top: 15, right: 20, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 11 }}
              tickMargin={10}
              interval={0}
              height={40}
            />
            <YAxis 
              domain={[0, 5]} 
              tick={{ fontSize: 11 }}
              tickMargin={10}
              tickCount={6}
            />
            <Tooltip content={renderTooltip} />
            <Bar 
              dataKey="behavior" 
              fill="#8b5cf6" 
              radius={[4, 4, 0, 0]}
              name="Comportamento (1-5)"
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default BehaviorChart;
