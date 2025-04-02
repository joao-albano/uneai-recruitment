
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for channel conversion rates
const data = [
  { name: 'WhatsApp', conversionRate: 20.2, color: '#25D366' },
  { name: 'Facebook', conversionRate: 14.9, color: '#1877F2' },
  { name: 'Google', conversionRate: 25.0, color: '#4285F4' },
  { name: 'Email', conversionRate: 12.2, color: '#DB4437' },
  { name: 'SMS', conversionRate: 12.6, color: '#7E8A97' },
  { name: 'Eventos', conversionRate: 29.2, color: '#8B5CF6' },
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
          data={data}
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
          <Bar dataKey="conversionRate" name="conversionRate">
            {data.map((entry, index) => (
              <Bar key={`cell-${index}`} dataKey="conversionRate" fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
