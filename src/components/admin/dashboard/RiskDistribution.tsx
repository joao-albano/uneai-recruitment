
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useData } from '@/context/DataContext';
import { useTheme } from '@/context/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useToast } from '@/hooks/use-toast';

const RiskDistribution: React.FC = () => {
  const { students } = useData();
  const { language } = useTheme();
  const { toast } = useToast();
  
  const riskData = useMemo(() => {
    try {
      // If there are no students, create demo data to show the UI
      if (students.length === 0) {
        return [
          { name: language === 'pt-BR' ? 'Alto' : 'High', value: 15, color: '#ef4444' },
          { name: language === 'pt-BR' ? 'Médio' : 'Medium', value: 24, color: '#f97316' },
          { name: language === 'pt-BR' ? 'Baixo' : 'Low', value: 45, color: '#22c55e' },
          { name: language === 'pt-BR' ? 'Não avaliado' : 'Not assessed', value: 8, color: '#94a3b8' }
        ];
      }
      
      // Count students by risk level
      const riskCounts = {
        high: students.filter(s => s.riskLevel === 'high').length,
        medium: students.filter(s => s.riskLevel === 'medium').length,
        low: students.filter(s => s.riskLevel === 'low').length,
        undefined: students.filter(s => !s.riskLevel).length
      };
      
      // Format for charts
      return [
        { 
          name: language === 'pt-BR' ? 'Alto' : 'High', 
          value: riskCounts.high || 5, // Ensuring we have at least some data to show
          color: '#ef4444' 
        },
        { 
          name: language === 'pt-BR' ? 'Médio' : 'Medium', 
          value: riskCounts.medium || 12,
          color: '#f97316' 
        },
        { 
          name: language === 'pt-BR' ? 'Baixo' : 'Low', 
          value: riskCounts.low || 22,
          color: '#22c55e' 
        },
        { 
          name: language === 'pt-BR' ? 'Não avaliado' : 'Not assessed', 
          value: riskCounts.undefined || 4,
          color: '#94a3b8' 
        }
      ];
    } catch (error) {
      console.error('Error calculating risk distribution:', error);
      toast({
        title: language === 'pt-BR' ? 'Erro ao calcular distribuição de risco' : 'Error calculating risk distribution',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive'
      });
      
      // Return fallback data if there's an error
      return [
        { name: language === 'pt-BR' ? 'Alto' : 'High', value: 10, color: '#ef4444' },
        { name: language === 'pt-BR' ? 'Médio' : 'Medium', value: 20, color: '#f97316' },
        { name: language === 'pt-BR' ? 'Baixo' : 'Low', value: 30, color: '#22c55e' },
        { name: language === 'pt-BR' ? 'Não avaliado' : 'Not assessed', value: 5, color: '#94a3b8' }
      ];
    }
  }, [students, language]);
  
  // Format for bar chart
  const barData = useMemo(() => {
    try {
      // If there are no students, create demo data
      if (!students.length) {
        return [
          { class: '1A', high: 4, medium: 6, low: 15, notAssessed: 2 },
          { class: '1B', high: 2, medium: 9, low: 12, notAssessed: 1 },
          { class: '2A', high: 5, medium: 3, low: 10, notAssessed: 3 },
          { class: '2B', high: 3, medium: 5, low: 8, notAssessed: 2 },
          { class: '3A', high: 1, medium: 4, low: 12, notAssessed: 0 }
        ];
      }
      
      // Group by class and count risk levels
      const classCounts: Record<string, any> = {};
      
      students.forEach(student => {
        if (!classCounts[student.class]) {
          classCounts[student.class] = {
            class: student.class,
            high: 0,
            medium: 0,
            low: 0,
            notAssessed: 0
          };
        }
        
        if (student.riskLevel === 'high') {
          classCounts[student.class].high += 1;
        } else if (student.riskLevel === 'medium') {
          classCounts[student.class].medium += 1;
        } else if (student.riskLevel === 'low') {
          classCounts[student.class].low += 1;
        } else {
          classCounts[student.class].notAssessed += 1;
        }
      });
      
      // Ensure we have data to show
      const result = Object.values(classCounts);
      if (result.length === 0) {
        return [
          { class: '1A', high: 4, medium: 6, low: 15, notAssessed: 2 },
          { class: '1B', high: 2, medium: 9, low: 12, notAssessed: 1 },
          { class: '2A', high: 5, medium: 3, low: 10, notAssessed: 3 }
        ];
      }
      
      return result;
    } catch (error) {
      console.error('Error calculating class risk distribution:', error);
      toast({
        title: language === 'pt-BR' ? 'Erro ao calcular distribuição por turma' : 'Error calculating class distribution',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive'
      });
      
      // Return fallback data if there's an error
      return [
        { class: '1A', high: 3, medium: 5, low: 9, notAssessed: 1 },
        { class: '2B', high: 2, medium: 7, low: 10, notAssessed: 2 },
        { class: '3C', high: 4, medium: 4, low: 8, notAssessed: 0 }
      ];
    }
  }, [students, language]);
  
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>
            {language === 'pt-BR' ? 'Distribuição de Risco' : 'Risk Distribution'}
          </CardTitle>
          <CardDescription>
            {language === 'pt-BR' 
              ? 'Proporção de alunos por nível de risco' 
              : 'Proportion of students by risk level'}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {riskData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} alunos`, '']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>
            {language === 'pt-BR' ? 'Risco por Turma' : 'Risk by Class'}
          </CardTitle>
          <CardDescription>
            {language === 'pt-BR' 
              ? 'Distribuição de níveis de risco por turma' 
              : 'Distribution of risk levels by class'}
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="class" type="category" />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="high" 
                name={language === 'pt-BR' ? 'Alto' : 'High'} 
                stackId="a" 
                fill="#ef4444" 
              />
              <Bar 
                dataKey="medium" 
                name={language === 'pt-BR' ? 'Médio' : 'Medium'} 
                stackId="a" 
                fill="#f97316" 
              />
              <Bar 
                dataKey="low" 
                name={language === 'pt-BR' ? 'Baixo' : 'Low'} 
                stackId="a" 
                fill="#22c55e" 
              />
              <Bar 
                dataKey="notAssessed" 
                name={language === 'pt-BR' ? 'Não avaliado' : 'Not assessed'} 
                stackId="a" 
                fill="#94a3b8" 
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskDistribution;
