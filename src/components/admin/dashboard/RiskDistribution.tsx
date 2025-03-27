
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useData } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';

const RiskDistribution: React.FC = () => {
  const { students } = useData();
  const { language } = useTheme();
  
  // Calculate risk distribution
  const highRiskCount = students.filter(s => s.riskLevel === 'high').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'medium').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'low').length;
  
  const chartData = [
    { 
      name: language === 'pt-BR' ? 'Alto Risco' : 'High Risk', 
      value: highRiskCount,
      color: '#ef4444' 
    },
    { 
      name: language === 'pt-BR' ? 'Médio Risco' : 'Medium Risk', 
      value: mediumRiskCount,
      color: '#f59e0b' 
    },
    { 
      name: language === 'pt-BR' ? 'Baixo Risco' : 'Low Risk', 
      value: lowRiskCount,
      color: '#10b981' 
    },
  ];
  
  // Calculate percentages
  const totalStudents = students.length;
  const highRiskPercentage = totalStudents > 0 ? ((highRiskCount / totalStudents) * 100).toFixed(1) : '0';
  const mediumRiskPercentage = totalStudents > 0 ? ((mediumRiskCount / totalStudents) * 100).toFixed(1) : '0';
  const lowRiskPercentage = totalStudents > 0 ? ((lowRiskCount / totalStudents) * 100).toFixed(1) : '0';
  
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Distribuição de Risco' : 'Risk Distribution'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Análise da distribuição de alunos por nível de risco' 
            : 'Analysis of student distribution by risk level'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex flex-col space-y-4 mt-4 sm:mt-0">
            <div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2" />
                <span className="text-sm font-medium">
                  {language === 'pt-BR' ? 'Alto Risco' : 'High Risk'}
                </span>
              </div>
              <p className="text-2xl font-bold">{highRiskPercentage}%</p>
              <p className="text-xs text-muted-foreground">
                {highRiskCount} {language === 'pt-BR' ? 'alunos' : 'students'}
              </p>
            </div>
            
            <div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-amber-500 mr-2" />
                <span className="text-sm font-medium">
                  {language === 'pt-BR' ? 'Médio Risco' : 'Medium Risk'}
                </span>
              </div>
              <p className="text-2xl font-bold">{mediumRiskPercentage}%</p>
              <p className="text-xs text-muted-foreground">
                {mediumRiskCount} {language === 'pt-BR' ? 'alunos' : 'students'}
              </p>
            </div>
            
            <div>
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                <span className="text-sm font-medium">
                  {language === 'pt-BR' ? 'Baixo Risco' : 'Low Risk'}
                </span>
              </div>
              <p className="text-2xl font-bold">{lowRiskPercentage}%</p>
              <p className="text-xs text-muted-foreground">
                {lowRiskCount} {language === 'pt-BR' ? 'alunos' : 'students'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskDistribution;
