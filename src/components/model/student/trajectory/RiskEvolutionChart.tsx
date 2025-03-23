
import React from 'react';
import { 
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
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
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl text-center">Evolução do Nível de Risco</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full px-2 md:px-4">
          <ChartContainer config={{
            riskScore: { theme: { light: "#ef4444", dark: "#ef4444" } },
          }}>
            <LineChart 
              data={trajectoryData} 
              margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
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
                  position: "right",
                  fill: "#4ade80",
                  fontSize: 12,
                  fontWeight: "bold"
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
                  fontWeight: "bold"
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
