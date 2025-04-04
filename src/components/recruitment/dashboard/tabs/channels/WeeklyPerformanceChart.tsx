
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { WeeklyDataType } from './types';

interface WeeklyPerformanceChartProps {
  weeklyData: WeeklyDataType[];
}

const WeeklyPerformanceChart: React.FC<WeeklyPerformanceChartProps> = ({ weeklyData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Desempenho Semanal dos Principais Canais</CardTitle>
        <CardDescription>
          Volume de leads captados por dia da semana
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80 overflow-hidden">
        <ChartContainer
          config={{
            whatsapp: { color: "#25D366" },
            facebook: { color: "#1877F2" },
            google: { color: "#4285F4" },
          }}
          className="w-full h-full max-w-full"
        >
          <ResponsiveContainer width="99%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={weeklyData}
              margin={{
                top: 20,
                right: 20,
                left: 10,
                bottom: 25, 
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                height={30}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <YAxis 
                width={30}
                tick={{ fontSize: 12 }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent 
                    formatter={(value: any) => [`${value} leads`, '']} 
                  />
                }
              />
              <Legend 
                wrapperStyle={{ 
                  paddingTop: 10,
                  fontSize: '12px',
                  width: '90%'
                }} 
              />
              <Bar dataKey="whatsapp" name="WhatsApp" fill="#25D366" />
              <Bar dataKey="facebook" name="Facebook" fill="#1877F2" />
              <Bar dataKey="google" name="Google" fill="#4285F4" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default WeeklyPerformanceChart;
