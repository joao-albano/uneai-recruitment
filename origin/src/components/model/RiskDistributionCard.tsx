
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';

const RiskDistributionCard: React.FC = () => {
  const { students } = useData();
  const navigate = useNavigate();
  
  // Calculate risk distribution
  const highRiskCount = students.filter(student => student.riskLevel === 'high').length;
  const mediumRiskCount = students.filter(student => student.riskLevel === 'medium').length;
  const lowRiskCount = students.filter(student => student.riskLevel === 'low').length;
  
  const totalStudents = students.length;
  const highRiskPercentage = totalStudents > 0 ? Math.round((highRiskCount / totalStudents) * 100) : 0;
  const mediumRiskPercentage = totalStudents > 0 ? Math.round((mediumRiskCount / totalStudents) * 100) : 0;
  const lowRiskPercentage = totalStudents > 0 ? Math.round((lowRiskCount / totalStudents) * 100) : 0;
  
  const data = [
    { name: 'Alto Risco', value: highRiskCount, color: '#ef4444', percentage: highRiskPercentage },
    { name: 'Médio Risco', value: mediumRiskCount, color: '#f59e0b', percentage: mediumRiskPercentage },
    { name: 'Baixo Risco', value: lowRiskCount, color: '#10b981', percentage: lowRiskPercentage },
  ];
  
  const handleViewStudents = (riskLevel: string) => {
    navigate(`/students?risk=${riskLevel}`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Distribuição de Risco</CardTitle>
        <CardDescription>
          Análise dos níveis de risco entre os alunos
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                label={({ percentage }) => `${percentage}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} alunos`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-red-500 mr-1"></div>
              <span className="text-sm font-medium">{highRiskCount}</span>
            </div>
            <span className="text-xs text-muted-foreground">Alto Risco</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-1"></div>
              <span className="text-sm font-medium">{mediumRiskCount}</span>
            </div>
            <span className="text-xs text-muted-foreground">Médio Risco</span>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
              <span className="text-sm font-medium">{lowRiskCount}</span>
            </div>
            <span className="text-xs text-muted-foreground">Baixo Risco</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full mt-4"
          onClick={() => navigate('/students')}
        >
          Ver todos os alunos
        </Button>
      </CardContent>
    </Card>
  );
};

export default RiskDistributionCard;
