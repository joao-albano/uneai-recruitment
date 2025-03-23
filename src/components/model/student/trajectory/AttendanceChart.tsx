
import React from 'react';
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface AttendanceChartProps {
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

const AttendanceChart: React.FC<AttendanceChartProps> = ({ trajectoryData }) => {
  // Define chart config for ChartContainer
  const chartConfig = {
    attendance: { 
      color: '#10b981',
      label: 'Frequência (%)'
    }
  };

  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="font-medium text-lg">Frequência</h3>
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
              domain={[0, 100]} 
              tick={{ fontSize: 11 }}
              tickMargin={10}
            />
            <Tooltip content={renderTooltip} />
            <ReferenceLine 
              y={75} 
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
            <Bar 
              dataKey="attendance" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              name="Frequência (%)"
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default AttendanceChart;
