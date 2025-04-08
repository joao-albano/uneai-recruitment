
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ConversionBySourceChartProps {
  data: Array<{
    source: string;
    rate: number;
  }>;
}

export const ConversionBySourceChart: React.FC<ConversionBySourceChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversão por Canal</CardTitle>
        <CardDescription>Taxa de conversão por canal de captação</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="source" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
            <Legend />
            <Bar dataKey="rate" fill="#8884d8" name="Conversão" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
