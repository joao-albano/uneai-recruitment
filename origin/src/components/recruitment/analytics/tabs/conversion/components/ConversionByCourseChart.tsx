
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, ResponsiveContainer, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ConversionByCourseChartProps {
  data: Array<{
    course: string;
    rate: number;
  }>;
}

export const ConversionByCourseChart: React.FC<ConversionByCourseChartProps> = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversão por Curso</CardTitle>
        <CardDescription>Taxa de conversão segmentada por curso</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="course" />
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
