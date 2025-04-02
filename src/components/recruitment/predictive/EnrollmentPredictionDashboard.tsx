
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, ArrowUp, ArrowDown, Check, Target, ChevronRight } from 'lucide-react';
import { EnrollmentPredictionChart } from './charts/EnrollmentPredictionChart';
import { CourseGoalChart } from './charts/CourseGoalChart';

// Mock prediction data
const predictions = [
  { 
    course: 'Administração', 
    target: 150, 
    predicted: 142, 
    confidence: 'alta',
    trend: 'stable',
    risk: 'medium'
  },
  { 
    course: 'Direito', 
    target: 180, 
    predicted: 195, 
    confidence: 'alta',
    trend: 'up',
    risk: 'low'
  },
  { 
    course: 'Psicologia', 
    target: 120, 
    predicted: 110, 
    confidence: 'média',
    trend: 'stable',
    risk: 'medium'
  },
  { 
    course: 'Engenharia Civil', 
    target: 90, 
    predicted: 65, 
    confidence: 'alta',
    trend: 'down',
    risk: 'high'
  },
  { 
    course: 'Ciência da Computação', 
    target: 100, 
    predicted: 115, 
    confidence: 'alta',
    trend: 'up',
    risk: 'low'
  }
];

const summaryData = {
  totalPredicted: predictions.reduce((sum, p) => sum + p.predicted, 0),
  totalTarget: predictions.reduce((sum, p) => sum + p.target, 0),
  atRiskCount: predictions.filter(p => p.risk === 'high').length,
  exceededCount: predictions.filter(p => p.predicted > p.target).length
};

interface EnrollmentPredictionDashboardProps {
  selectedPeriod: string;
}

const EnrollmentPredictionDashboard: React.FC<EnrollmentPredictionDashboardProps> = ({ selectedPeriod }) => {
  // Calculate overall achievement percentage
  const overallPercentage = (summaryData.totalPredicted / summaryData.totalTarget) * 100;
  
  // Get appropriate color for progress bar based on percentage
  const getProgressColor = (percentage: number) => {
    if (percentage >= 95) return 'bg-green-500';
    if (percentage >= 80) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  // Get badge for risk level
  const getRiskBadge = (risk: string) => {
    switch(risk) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800">Baixo Risco</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800">Médio Risco</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800">Alto Risco</Badge>;
      default:
        return null;
    }
  };
  
  // Get trend indicator
  const getTrendIndicator = (trend: string) => {
    switch(trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Matrículas Previstas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{summaryData.totalPredicted}</div>
            <div className="text-xs text-muted-foreground">
              Meta: {summaryData.totalTarget}
            </div>
            <Progress 
              value={overallPercentage} 
              className={`h-2 mt-2 ${getProgressColor(overallPercentage)}`} 
            />
            <div className="mt-1 text-xs">
              {overallPercentage.toFixed(1)}% da meta
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cursos em Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold">{summaryData.atRiskCount}</div>
              {summaryData.atRiskCount > 0 && 
                <AlertTriangle className="ml-2 h-5 w-5 text-amber-500" />
              }
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {summaryData.atRiskCount === 0 
                ? 'Todos os cursos estão no caminho certo'
                : `${summaryData.atRiskCount} cursos abaixo de 80% da meta`}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Cursos com Meta Excedida</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-3xl font-bold">{summaryData.exceededCount}</div>
              {summaryData.exceededCount > 0 && 
                <Check className="ml-2 h-5 w-5 text-green-500" />
              }
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {summaryData.exceededCount === 0 
                ? 'Nenhum curso superou a meta'
                : `${summaryData.exceededCount} cursos acima da meta`}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{selectedPeriod}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {selectedPeriod === '2024.2' 
                ? 'Previsão atual'
                : 'Dados históricos'}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Previsão vs Meta por Curso</CardTitle>
            <CardDescription>
              Análise comparativa entre matrículas previstas e metas estabelecidas
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <EnrollmentPredictionChart />
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Percentual de Atingimento</CardTitle>
            <CardDescription>
              Progresso percentual em relação à meta por curso
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <CourseGoalChart />
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Course Predictions */}
      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Curso</CardTitle>
          <CardDescription>
            Análise detalhada das previsões e metas por curso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Curso</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Meta</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Previsão</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">% Atingimento</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Confiança</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Risco</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {predictions.map((item, index) => {
                  const percentage = (item.predicted / item.target) * 100;
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-muted/30'}>
                      <td className="px-4 py-3 text-sm flex items-center">
                        <span>{item.course}</span>
                        {getTrendIndicator(item.trend)}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">{item.target}</td>
                      <td className="px-4 py-3 text-sm text-center">{item.predicted}</td>
                      <td className="px-4 py-3 text-sm text-center">
                        <div className="flex items-center justify-center">
                          <span className={percentage >= 100 
                            ? 'text-green-600' 
                            : percentage >= 80 
                              ? 'text-amber-600' 
                              : 'text-red-600'
                          }>
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <Badge
                          variant="outline"
                          className={
                            item.confidence === 'alta' 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }
                        >
                          {item.confidence}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        {getRiskBadge(item.risk)}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <Button variant="ghost" size="sm" className="gap-1">
                          <Target className="h-4 w-4" />
                          <span className="hidden sm:inline">Plano</span>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnrollmentPredictionDashboard;
