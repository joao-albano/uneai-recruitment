import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart, PieChart, CheckCircle, AlertTriangle, AlertCircle, Clock, ChevronRight, Target, ArrowUp, ArrowDown, TrendingUp, TrendingDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CourseDetailsDialog from './CourseDetailsDialog';
import { useToast } from '@/components/ui/use-toast';
import PeriodSelector from '../predictive/dashboard/PeriodSelector';

const StrategicDecisionDashboard: React.FC<StrategicDecisionDashboardProps> = ({
  selectedPeriod
}) => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const {
    toast
  } = useToast();

  const getProgressColor = (percent: number) => {
    if (percent >= 95) return 'bg-green-500';
    if (percent >= 85) return 'bg-green-400';
    if (percent >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'baixo':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Baixo risco</Badge>;
      case 'médio':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Médio risco</Badge>;
      case 'alto':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Alto risco</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getTrendBadge = (trend: string) => {
    switch (trend) {
      case 'aumento':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 gap-1">
            <TrendingUp className="h-3 w-3" />
            Em alta
          </Badge>;
      case 'queda':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 gap-1">
            <TrendingDown className="h-3 w-3" />
            Em queda
          </Badge>;
      case 'estável':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Estável
          </Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setDetailsDialogOpen(true);
  };

  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard Estratégico</h1>
          <p className="text-muted-foreground">
            Visualização estratégica para tomada de decisões
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PeriodSelector 
            selectedPeriod={selectedPeriod} 
            onPeriodChange={() => {}} 
          />
        </div>
      </div>

      {/* Visão Geral */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Previsão do Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold">{overallStats.totalPredicted}</div>
                <div className="text-xs text-muted-foreground">
                  de {overallStats.totalTarget} matrículas previstas
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-medium ${overallStats.totalPredicted / overallStats.totalTarget >= 0.9 ? 'text-green-600' : overallStats.totalPredicted / overallStats.totalTarget >= 0.7 ? 'text-amber-600' : 'text-red-600'}`}>
                  {(overallStats.totalPredicted / overallStats.totalTarget * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">da meta total</div>
              </div>
            </div>
            <Progress value={overallStats.totalPredicted / overallStats.totalTarget * 100} className={`h-2 mt-2 ${getProgressColor(overallStats.totalPredicted / overallStats.totalTarget * 100)}`} />
            <div className="mt-2 flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                {overallStats.confidence === 'alta' ? 'Alta confiança' : overallStats.confidence === 'média' ? 'Média confiança' : 'Baixa confiança'}
              </Badge>
              <div className="text-xs text-muted-foreground ml-auto flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>{overallStats.daysUntilEnd} dias restantes</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Distribuição de Risco</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded-md bg-red-50">
                <div className="text-2xl font-bold text-red-700">{overallStats.riskDistribution.high}</div>
                <div className="text-xs text-red-600">Alto Risco</div>
              </div>
              <div className="text-center p-2 rounded-md bg-amber-50">
                <div className="text-2xl font-bold text-amber-700">{overallStats.riskDistribution.medium}</div>
                <div className="text-xs text-amber-600">Médio Risco</div>
              </div>
              <div className="text-center p-2 rounded-md bg-green-50">
                <div className="text-2xl font-bold text-green-700">{overallStats.riskDistribution.low}</div>
                <div className="text-xs text-green-600">Baixo Risco</div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm">Taxa Média de Conversão</div>
              <div className="font-medium">{overallStats.averageConversion.toFixed(1)}%</div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm">Total de Leads</div>
              <div className="font-medium">{overallStats.totalLeads}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Ações Sugeridas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 text-red-500">
                <AlertCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">Revisar campanhas para Engenharia Civil</div>
                <p className="text-xs text-muted-foreground">Curso com maior desvio negativo da meta</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 text-amber-500">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">Reforçar qualificação de leads</div>
                <p className="text-xs text-muted-foreground">Taxa de conversão abaixo da média em 2 cursos</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-0.5 text-green-500">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-medium">Expandir vagas para Direito</div>
                <p className="text-xs text-muted-foreground">Previsão acima da meta com alta confiança</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabela de Cursos */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Previsões por Curso</CardTitle>
          <CardDescription>
            Análise de probabilidade de matrícula por curso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md divide-y">
            {coursePredictions.map((course, index) => <div key={index} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {course.name}
                      <div className="flex items-center gap-1">
                        {getRiskBadge(course.risk)}
                        {getTrendBadge(course.trend)}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {course.predicted} de {course.target} matrículas previstas ({(course.predicted / course.target * 100).toFixed(1)}%)
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1" onClick={() => handleViewDetails(course)}>
                    <span>Detalhes</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-2">
                  <Progress value={course.predicted / course.target * 100} className={`h-2 ${getProgressColor(course.predicted / course.target * 100)}`} />
                </div>
                
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-y-2 gap-x-4">
                  <div className="flex items-center justify-between text-sm">
                    <span>Conversão:</span>
                    <span className="font-medium">{course.metrics.conversionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Leads:</span>
                    <span className="font-medium">{course.metrics.leadCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Custo por lead:</span>
                    <span className="font-medium">R$ {course.metrics.costPerLead}</span>
                  </div>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="text-sm font-medium">Ações sugeridas:</div>
                  <ul className="space-y-1">
                    {course.actions.map((action, idx) => <li key={idx} className="text-sm flex items-start gap-2">
                        <Target className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{action}</span>
                      </li>)}
                  </ul>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
      
      {/* Gráficos e Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversão por Canal</CardTitle>
            <CardDescription>
              Taxa de conversão segmentada por canal de captação
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChannelConversionChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Distribuição de Leads</CardTitle>
            <CardDescription>
              Distribuição de leads por curso e estágio no funil
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChannelDistributionChart />
          </CardContent>
        </Card>
      </div>
      
      {/* Course Details Dialog */}
      <CourseDetailsDialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen} course={selectedCourse} />
    </div>;
};

export default StrategicDecisionDashboard;
