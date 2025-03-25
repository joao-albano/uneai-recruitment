
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { StudentData } from '@/types/data';

interface ChartProps {
  students: StudentData[];
  title: string;
}

const Chart: React.FC<ChartProps> = ({ students, title }) => {
  const highRiskCount = students.filter(s => s.riskLevel === 'high').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'medium').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'low').length;
  
  const data = [
    { name: 'Alto Risco', value: highRiskCount, color: '#ef4444' },
    { name: 'Médio Risco', value: mediumRiskCount, color: '#f59e0b' },
    { name: 'Baixo Risco', value: lowRiskCount, color: '#10b981' },
  ];
  
  const totalStudents = students.length;
  
  const formatPercentage = (count: number) => {
    if (totalStudents === 0) return '0%';
    return `${Math.round((count / totalStudents) * 100)}%`;
  };
  
  const customTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-sm">{`${data.name}: ${data.value} alunos (${formatPercentage(data.value)})`}</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card className="h-full shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-full flex flex-col justify-center">
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                  const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
                  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                  return percent > 0 ? (
                    <text 
                      x={x} 
                      y={y} 
                      fill="#888" 
                      textAnchor={x > cx ? 'start' : 'end'} 
                      dominantBaseline="central"
                      fontSize={12}
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  ) : null;
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={customTooltip} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
              <span className="text-sm font-medium">{highRiskCount}</span>
            </div>
            <span className="text-xs text-muted-foreground">Alto Risco</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-1"></div>
              <span className="text-sm font-medium">{mediumRiskCount}</span>
            </div>
            <span className="text-xs text-muted-foreground">Médio Risco</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-1">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
              <span className="text-sm font-medium">{lowRiskCount}</span>
            </div>
            <span className="text-xs text-muted-foreground">Baixo Risco</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chart;
