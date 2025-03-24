
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
  Cell
} from 'recharts';
import { StudentData } from '@/context/DataContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface ChartProps {
  students: StudentData[];
  title: string;
  description?: string;
}

const Chart: React.FC<ChartProps> = ({ students, title, description }) => {
  const isMobile = useIsMobile();
  
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
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow h-full">
      <CardHeader className={isMobile ? "p-3 pb-2" : "p-4 pb-2"}>
        <CardTitle className={`${isMobile ? "text-base" : "text-lg"} font-semibold`}>{title}</CardTitle>
        {description && <CardDescription className={isMobile ? "text-xs" : "text-sm"}>{description}</CardDescription>}
      </CardHeader>
      <CardContent className={`${isMobile ? "p-2" : "p-4"} h-56 sm:h-64 md:h-72`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ 
              top: 5, 
              right: isMobile ? 5 : 30, 
              left: isMobile ? 50 : 60, 
              bottom: 5 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              type="category" 
              dataKey="name"
              width={isMobile ? 50 : 60}
              tickLine={false}
              fontSize={isMobile ? 10 : 12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill="#8884d8"
              radius={[0, 4, 4, 0]}
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
