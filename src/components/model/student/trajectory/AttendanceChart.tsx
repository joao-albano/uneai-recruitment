
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
  return (
    <div className="flex flex-col items-center space-y-3">
      <h3 className="font-medium text-lg">Frequência</h3>
      <div className="h-[250px] w-full">
        <ChartContainer config={{
          attendance: { theme: { light: "#10b981", dark: "#34d399" } },
        }}>
          <BarChart 
            data={trajectoryData} 
            margin={{ top: 20, right: 20, left: 5, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 11 }}
              tickMargin={10}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fontSize: 11 }}
              tickMargin={8}
            />
            <Tooltip content={renderTooltip} />
            <ReferenceLine 
              y={75} 
              stroke="#ef4444" 
              strokeDasharray="3 3" 
              label={{ 
                value: "Mínimo", 
                position: "right",
                fontSize: 11,
                fill: "#ef4444"
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
