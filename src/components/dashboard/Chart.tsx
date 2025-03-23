
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Cell
} from 'recharts';
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
  
  const totalStudents = students.length;
  
  // Calculate percentages for each risk level
  const lowRiskPercentage = totalStudents > 0 ? (lowRisk / totalStudents) * 100 : 0;
  const mediumRiskPercentage = totalStudents > 0 ? (mediumRisk / totalStudents) * 100 : 0;
  const highRiskPercentage = totalStudents > 0 ? (highRisk / totalStudents) * 100 : 0;
  
  const data = [
    { name: 'Baixo Risco', value: parseFloat(lowRiskPercentage.toFixed(1)), count: lowRisk, color: '#10B981' },
    { name: 'Médio Risco', value: parseFloat(mediumRiskPercentage.toFixed(1)), count: mediumRisk, color: '#F59E0B' },
    { name: 'Alto Risco', value: parseFloat(highRiskPercentage.toFixed(1)), count: highRisk, color: '#EF4444' },
  ];
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-2 shadow-md rounded-md border text-xs">
          <p className="font-medium">{`${payload[0].name}: ${payload[0].value}%`}</p>
          <p className="text-muted-foreground">{`${payload[0].payload.count} alunos`}</p>
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
          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 40,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
              domain={[0, 100]}
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
            />
            <Bar 
              dataKey="value" 
              name="Porcentagem" 
              radius={[4, 4, 0, 0]} 
              barSize={50}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
