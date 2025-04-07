
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface HumanVsAIPieChartProps {
  humanValue: number;
  aiValue: number;
}

const HumanVsAIPieChart: React.FC<HumanVsAIPieChartProps> = ({ humanValue, aiValue }) => {
  const data = [
    {
      name: 'Atendimento Humano',
      value: humanValue
    },
    {
      name: 'Atendimento IA',
      value: aiValue
    }
  ];

  const COLORS = ['#4CAF50', '#2196F3'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Distribuição por Tipo de Atendimento</CardTitle>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value} atendimentos`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default HumanVsAIPieChart;
