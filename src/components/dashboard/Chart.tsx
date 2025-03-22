
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { StudentData } from '@/context/DataContext';

interface ChartProps {
  students: StudentData[];
  title: string;
  description?: string;
}

const Chart: React.FC<ChartProps> = ({ students, title, description }) => {
  // Count students by risk level
  const lowRisk = students.filter(student => student.riskLevel === 'low').length;
  const mediumRisk = students.filter(student => student.riskLevel === 'medium').length;
  const highRisk = students.filter(student => student.riskLevel === 'high').length;
  
  const data = [
    { name: 'Baixo Risco', value: lowRisk, color: '#10B981' },
    { name: 'Médio Risco', value: mediumRisk, color: '#F59E0B' },
    { name: 'Alto Risco', value: highRisk, color: '#EF4444' },
  ];
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-2 shadow-md rounded-md border text-xs">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value} alunos`}</p>
          <p className="text-muted-foreground">{`${((payload[0].value / students.length) * 100).toFixed(1)}% do total`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="shadow-md transition-all duration-300 hover:shadow-lg card-glow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={3}
              stroke="rgba(255, 255, 255, 0.2)"
              animationBegin={200}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ paddingTop: '20px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
