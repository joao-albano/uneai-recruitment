
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

// Mock data for channel distribution
const data = [
  { name: 'WhatsApp', value: 420, color: '#25D366' },
  { name: 'Facebook', value: 350, color: '#1877F2' },
  { name: 'Google', value: 280, color: '#4285F4' },
  { name: 'Email', value: 180, color: '#DB4437' },
  { name: 'SMS', value: 95, color: '#7E8A97' },
  { name: 'Eventos', value: 120, color: '#8B5CF6' },
];

export const ChannelDistributionChart = () => {
  return (
    <ChartContainer
      config={{
        leads: { color: "#8b5cf6" },
      }}
      className="w-full aspect-[4/3]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <ChartTooltip
            content={
              <ChartTooltipContent 
                formatter={(value) => [`${value} leads`, 'Volume']} 
                labelFormatter={(value) => `Canal: ${value}`}
              />
            }
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
