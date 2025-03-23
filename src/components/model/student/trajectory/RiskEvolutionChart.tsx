
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
      <CardContent className="p-2 sm:p-6">
        <div className="h-[320px] w-full">
          <ChartContainer config={chartConfig}>
            <LineChart 
              data={trajectoryData} 
              margin={{ top: 20, right: 60, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                tickMargin={18}
                interval={0}
                height={60}
              />
              <YAxis 
                domain={[0, 100]} 
                tick={{ fontSize: 12 }}
                tickMargin={10}
                tickCount={6}
              />
              <Tooltip content={renderTooltip} />
              <ReferenceLine 
                y={40} 
                stroke="#4ade80" 
                strokeDasharray="3 3" 
                label={{ 
                  value: "Baixo", 
                  position: "right",
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
                  position: "right",
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
