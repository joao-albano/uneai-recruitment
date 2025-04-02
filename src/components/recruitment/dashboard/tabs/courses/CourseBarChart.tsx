
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CourseBarChartProps {
  chartData: {
    name: string;
    Leads: number;
    Matrículas: number;
  }[];
}

const CourseBarChart: React.FC<CourseBarChartProps> = ({ chartData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads por Curso</CardTitle>
        <CardDescription>
          Distribuição de leads por curso
        </CardDescription>
      </CardHeader>
      <CardContent className="h-80">
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
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Leads" fill="#8884d8" />
            <Bar dataKey="Matrículas" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CourseBarChart;
