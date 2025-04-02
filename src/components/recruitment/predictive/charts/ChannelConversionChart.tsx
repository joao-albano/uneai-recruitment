
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { channelData } from '../channel-performance/channelPerformanceData';

// Prepare data with colors for the conversion chart
const chartData = channelData.map((channel) => ({
  name: channel.name,
  conversionRate: channel.conversionRate,
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
          data={chartData}
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
