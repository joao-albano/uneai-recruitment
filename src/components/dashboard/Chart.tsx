
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend
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
    { name: 'Baixo Risco', value: lowRisk, percentage: parseFloat(lowRiskPercentage.toFixed(1)), color: '#10B981' },
    { name: 'Médio Risco', value: mediumRisk, percentage: parseFloat(mediumRiskPercentage.toFixed(1)), color: '#F59E0B' },
    { name: 'Alto Risco', value: highRisk, percentage: parseFloat(highRiskPercentage.toFixed(1)), color: '#EF4444' },
  ];
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover p-3 shadow-md rounded-md border">
          <p className="font-medium text-sm">{`${payload[0].name}`}</p>
          <p className="text-muted-foreground text-xs">{`${payload[0].value} alunos (${payload[0].payload.percentage}%)`}</p>
        </div>
      );
    }
    return null;
  };
  
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, value }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    if (value === 0) return null;
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {value}
      </text>
    );
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
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
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
              wrapperStyle={{ paddingTop: '20px', fontSize: '12px' }}
              formatter={(value, entry, index) => {
                const { payload } = entry as any;
                return `${value} (${payload.percentage}%)`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Chart;
