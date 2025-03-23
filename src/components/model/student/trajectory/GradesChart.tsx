
import React from 'react';
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface GradesChartProps {
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

const GradesChart: React.FC<GradesChartProps> = ({ trajectoryData }) => {
  // Define chart config for ChartContainer
  const chartConfig = {
    grade: { 
      color: '#3b82f6',
      label: 'Nota'
    }
  };

  return (
    <div className="flex flex-col items-center space-y-1">
      <h3 className="font-medium text-lg">Notas</h3>
      <div className="h-[250px] w-full">
        <ChartContainer config={chartConfig}>
          <LineChart 
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
              domain={[0, 10]} 
              tick={{ fontSize: 11 }}
              tickMargin={8}
            />
            <Tooltip content={renderTooltip} />
            <ReferenceLine 
              y={6} 
              stroke="#ef4444" 
              strokeDasharray="3 3" 
              label={{ 
                value: "Mínimo", 
                position: "right", 
                fontSize: 11,
                fill: "#ef4444"
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="grade" 
              stroke="#3b82f6" 
              strokeWidth={2} 
              dot={{ r: 4, fill: "#3b82f6", stroke: "#ffffff", strokeWidth: 1 }}
              activeDot={{ r: 6, stroke: "#ffffff", strokeWidth: 1 }}
              name="Nota"
            />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default GradesChart;
