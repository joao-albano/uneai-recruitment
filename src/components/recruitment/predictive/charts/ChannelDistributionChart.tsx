
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { channelData } from '../channel-performance/channelPerformanceData';

// Prepare data with colors for the distribution chart
const chartData = channelData.map((channel, index) => ({
  name: channel.name,
  value: channel.leads,
  color: getChannelColor(channel.name)
}));

// Function to get consistent colors for channels
function getChannelColor(channelName: string): string {
  switch (channelName) {
    case 'WhatsApp': return '#25D366';
    case 'Facebook': return '#1877F2';
    case 'Google': return '#4285F4';
    case 'Email': return '#DB4437';
    case 'SMS': return '#7E8A97';
    case 'Eventos': return '#8B5CF6';
    default: return '#6B7280';
  }
}

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
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((entry, index) => (
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
