
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for the conversion chart
const conversionData = [
  { name: 'WhatsApp', conversionRate: 24.5, color: '#25D366' },
  { name: 'Facebook', conversionRate: 18.7, color: '#1877F2' },
  { name: 'Google', conversionRate: 22.3, color: '#4285F4' },
  { name: 'Email', conversionRate: 15.1, color: '#DB4437' },
  { name: 'SMS', conversionRate: 12.8, color: '#7E8A97' },
  { name: 'Eventos', conversionRate: 28.5, color: '#8B5CF6' },
];

export const ChannelConversionChart = () => {
  return (
    <ChartContainer
      config={{
        conversionRate: { color: "#8b5cf6" },
      }}
      className="w-full aspect-[4/3]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={conversionData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `${value}%`} />
          <ChartTooltip
            content={
              <ChartTooltipContent 
                formatter={(value) => [`${value}%`, 'Taxa de Conversão']} 
                labelFormatter={(value) => `Canal: ${value}`}
              />
            }
          />
          <Legend formatter={() => 'Taxa de Conversão'} />
          <Bar dataKey="conversionRate" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
