
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle2, PieChart as PieChartIcon, TrendingDown, TrendingUp } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RiskDistributionCard: React.FC = () => {
  const { students } = useData();
  
  const highRiskCount = students.filter(s => s.riskLevel === 'high').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'medium').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'low').length;
  const totalStudents = students.length;
  
  const highRiskPercentage = totalStudents > 0 ? (highRiskCount / totalStudents) * 100 : 0;
  const mediumRiskPercentage = totalStudents > 0 ? (mediumRiskCount / totalStudents) * 100 : 0;
  const lowRiskPercentage = totalStudents > 0 ? (lowRiskCount / totalStudents) * 100 : 0;
  
  // Mock data for demonstration - in a real app this would come from historical data
  const prevHighRiskPercentage = highRiskPercentage * 1.2; // Assuming 20% reduction from previous period
  const highRiskTrend = highRiskPercentage < prevHighRiskPercentage ? 'down' : 'up';
  
  const data = [
    { name: 'Alto Risco', value: highRiskCount, percentage: parseFloat(highRiskPercentage.toFixed(1)), color: '#EF4444' },
    { name: 'Médio Risco', value: mediumRiskCount, percentage: parseFloat(mediumRiskPercentage.toFixed(1)), color: '#F59E0B' },
    { name: 'Baixo Risco', value: lowRiskCount, percentage: parseFloat(lowRiskPercentage.toFixed(1)), color: '#10B981' },
  ];
  
  // Custom tooltip for pie chart
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
    <Card className="md:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-medium">Distribuição de Risco</CardTitle>
            <CardDescription>
              Classificação dos alunos por nível de risco
            </CardDescription>
          </div>
          <PieChartIcon className="h-5 w-5 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="mb-4 w-full grid grid-cols-2">
            <TabsTrigger value="chart">Gráfico</TabsTrigger>
            <TabsTrigger value="bars">Barras de Progresso</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chart" className="mt-0">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
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
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="bars" className="mt-0 space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
                    <span>Alto Risco</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium mr-2">{highRiskCount} alunos ({highRiskPercentage.toFixed(1)}%)</span>
                    {highRiskTrend === 'down' ? (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>
                <Progress value={highRiskPercentage} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
                    <span>Médio Risco</span>
                  </div>
                  <span className="font-medium">{mediumRiskCount} alunos ({mediumRiskPercentage.toFixed(1)}%)</span>
                </div>
                <Progress value={mediumRiskPercentage} className="h-2 bg-muted" indicatorClassName="bg-orange-500" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                    <span>Baixo Risco</span>
                  </div>
                  <span className="font-medium">{lowRiskCount} alunos ({lowRiskPercentage.toFixed(1)}%)</span>
                </div>
                <Progress value={lowRiskPercentage} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
              </div>
            </div>
            
            <div className="pt-3 mt-2 border-t text-sm text-muted-foreground">
              <p>
                {highRiskTrend === 'down' ? (
                  <span className="flex items-center text-green-600">
                    <TrendingDown className="h-4 w-4 mr-1 inline" />
                    Redução de {((prevHighRiskPercentage - highRiskPercentage) / prevHighRiskPercentage * 100).toFixed(1)}% em alunos de alto risco desde o último período.
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <TrendingUp className="h-4 w-4 mr-1 inline" />
                    Aumento de {((highRiskPercentage - prevHighRiskPercentage) / prevHighRiskPercentage * 100).toFixed(1)}% em alunos de alto risco desde o último período.
                  </span>
                )}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RiskDistributionCard;
