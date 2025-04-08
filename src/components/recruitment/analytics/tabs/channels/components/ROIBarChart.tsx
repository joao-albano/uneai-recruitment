
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ROIBarChartProps {
  channelPerformance: any[];
}

export const ROIBarChart: React.FC<ROIBarChartProps> = ({ channelPerformance }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>ROI por Canal</CardTitle>
        <CardDescription>Retorno sobre investimento de cada canal</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={channelPerformance}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip formatter={(value) => [`${value}x`, 'ROI']} />
            <Legend />
            <Bar dataKey="roi" name="ROI" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
