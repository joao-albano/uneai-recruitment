
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChannelDataType } from '../channels/types';

interface ChannelDistributionChartProps {
  channelData: ChannelDataType[];
}

const ChannelDistributionChart: React.FC<ChannelDistributionChartProps> = ({ channelData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribuição de Leads por Canal</CardTitle>
        <CardDescription>
          Porcentagem de leads captados por cada canal
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80 overflow-hidden">
        <ChartContainer
          config={{
            leads: { color: "#8b5cf6" },
          }}
          className="w-full h-full max-w-full"
        >
          <ResponsiveContainer width="99%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={65}
                fill="#8884d8"
                dataKey="count"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <ChartTooltip
                content={
                  <ChartTooltipContent 
                    formatter={(value: any) => [`${value} leads`, 'Volume']} 
                    labelFormatter={(value: any) => `Canal: ${value}`}
                  />
                }
              />
              <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{
                  paddingTop: 20,
                  fontSize: '11px',
                  width: '100%',
                  margin: '0 auto',
                  maxWidth: '90%',
                  overflowX: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default ChannelDistributionChart;
