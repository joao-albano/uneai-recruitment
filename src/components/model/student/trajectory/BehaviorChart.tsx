
import React from 'react';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
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
  return (
    <div className="flex flex-col items-center space-y-1">
      <h3 className="font-medium text-lg">Comportamento</h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={trajectoryData} 
            margin={{ top: 10, right: 20, left: 5, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 11 }}
              tickMargin={10}
            />
            <YAxis 
              domain={[0, 5]} 
              tick={{ fontSize: 11 }}
              tickCount={6}
              tickMargin={8}
            />
            <Tooltip content={renderTooltip} />
            <Bar 
              dataKey="behavior" 
              fill="#8b5cf6" 
              radius={[4, 4, 0, 0]}
              name="Comportamento (1-5)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BehaviorChart;
