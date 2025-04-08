
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ConversionTrendChartProps {
  data: Array<{
    month: string;
    rate: number;
  }>;
}

export const ConversionTrendChart: React.FC<ConversionTrendChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução da Taxa de Conversão</CardTitle>
        <CardDescription>Taxa de conversão ao longo do tempo</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="rate" 
              stroke="#8884d8" 
              name="Taxa de Conversão" 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
