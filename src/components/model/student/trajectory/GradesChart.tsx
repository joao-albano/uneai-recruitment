
import React from 'react';
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
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
    <div className="flex flex-col items-center space-y-2">
      <h3 className="font-medium text-lg">Notas</h3>
      <div className="h-[220px] w-full">
        <ChartContainer config={chartConfig}>
          <LineChart 
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
                value: "Min", 
                position: "right", 
                fontSize: 10,
                fill: "#ef4444",
                offset: 0
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
