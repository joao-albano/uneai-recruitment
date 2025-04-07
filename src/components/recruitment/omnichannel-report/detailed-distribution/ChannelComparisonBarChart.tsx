
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChannelData {
  name: string;
  total: number;
  human: number;
  ai: number;
}

interface ChannelComparisonBarChartProps {
  data: ChannelData[];
}

const ChannelComparisonBarChart: React.FC<ChannelComparisonBarChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Comparativo por Canal</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="human" name="Humano" stackId="a" fill="#4CAF50" />
            <Bar dataKey="ai" name="IA" stackId="a" fill="#2196F3" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ChannelComparisonBarChart;
