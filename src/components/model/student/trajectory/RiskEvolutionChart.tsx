
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
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface RiskEvolutionChartProps {
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

const RiskEvolutionChart: React.FC<RiskEvolutionChartProps> = ({ trajectoryData }) => {
  // Define chart config for ChartContainer
  const chartConfig = {
    riskScore: { 
      color: '#ef4444',
      label: 'Nível de Risco'
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-center">Evolução do Nível de Risco</CardTitle>
      </CardHeader>
      <CardContent className="p-2 sm:p-4">
        <div className="h-[350px] w-full">
          <ChartContainer config={chartConfig}>
            <LineChart 
              data={trajectoryData} 
              margin={{ top: 10, right: 40, left: 10, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }}
                tickMargin={8}
                tickCount={6}
              />
              <Tooltip content={renderTooltip} />
              <ReferenceLine 
                y={40} 
                stroke="#4ade80" 
                strokeDasharray="3 3" 
                label={{ 
                  value: "Baixo", 
                  position: "insideRight",
                  fill: "#4ade80",
                  fontSize: 12,
                  fontWeight: "bold",
                  offset: 10
                }} 
              />
              <ReferenceLine 
                y={70} 
                stroke="#fbbf24" 
                strokeDasharray="3 3" 
                label={{ 
                  value: "Médio", 
                  position: "insideRight",
                  fill: "#fbbf24",
                  fontSize: 12,
                  fontWeight: "bold",
                  offset: 10
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="riskScore" 
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ r: 6, fill: "#ef4444", strokeWidth: 2, stroke: "#ffffff" }}
                activeDot={{ r: 8, fill: "#ef4444", stroke: "#ffffff", strokeWidth: 2 }}
                name="Nível de Risco"
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskEvolutionChart;
