import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, BarChart3, ChevronRight, AlertTriangle, Clock, Filter, Download, Percent } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import CourseDetailDialog from './CourseDetailDialog';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
const mockCoursePredictions = [{
  id: '1',
  name: 'Administração',
  target: 100,
  predicted: 85,
  confidence: 'alta',
  trend: 'estável',
  lastUpdate: new Date(),
  daysLeft: 43,
  risk: 'médio',
  leadCount: 210,
  stages: [{
    name: 'Contato Inicial',
    count: 76,
    conversionRate: 0.35
  }, {
    name: 'Agendamento',
    count: 42,
    conversionRate: 0.65
  }, {
    name: 'Visita',
    count: 28,
    conversionRate: 0.80
  }, {
    name: 'Matrícula',
    count: 18,
    conversionRate: 0.95
  }]
}, {
  id: '2',
  name: 'Pedagogia',
  target: 120,
  predicted: 72,
  confidence: 'alta',
  trend: 'queda',
  lastUpdate: new Date(),
  daysLeft: 43,
  risk: 'alto',
  leadCount: 180,
  stages: [{
    name: 'Contato Inicial',
    count: 68,
    conversionRate: 0.30
  }, {
    name: 'Agendamento',
    count: 32,
    conversionRate: 0.55
  }, {
    name: 'Visita',
    count: 20,
    conversionRate: 0.70
  }, {
    name: 'Matrícula',
    count: 12,
    conversionRate: 0.95
  }]
}, {
  id: '3',
  name: 'Ciência da Computação',
  target: 80,
  predicted: 88,
  confidence: 'média',
  trend: 'aumento',
  lastUpdate: new Date(),
  daysLeft: 43,
  risk: 'baixo',
  leadCount: 240,
  stages: [{
    name: 'Contato Inicial',
    count: 93,
    conversionRate: 0.42
  }, {
    name: 'Agendamento',
    count: 54,
    conversionRate: 0.68
  }, {
    name: 'Visita',
    count: 35,
    conversionRate: 0.85
  }, {
    name: 'Matrícula',
    count: 25,
    conversionRate: 0.95
  }]
}, {
  id: '4',
  name: 'Enfermagem',
  target: 60,
  predicted: 71,
  confidence: 'média',
  trend: 'aumento',
  lastUpdate: new Date(),
  daysLeft: 43,
  risk: 'baixo',
  leadCount: 180,
  stages: [{
    name: 'Contato Inicial',
    count: 65,
    conversionRate: 0.45
  }, {
    name: 'Agendamento',
    count: 48,
    conversionRate: 0.72
  }, {
    name: 'Visita',
    count: 32,
    conversionRate: 0.88
  }, {
    name: 'Matrícula',
    count: 24,
    conversionRate: 0.96
  }]
}];
const EnrollmentPredictionEngine: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState(mockCoursePredictions[0]);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'baixo':
        return 'bg-green-500';
      case 'médio':
        return 'bg-amber-500';
      case 'alto':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'aumento':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'queda':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };
  const getProgressColor = (percent: number) => {
    if (percent >= 100) return 'bg-green-500';
    if (percent >= 85) return 'bg-green-400';
    if (percent >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };
  const handleViewDetails = (course: any) => {
    setSelectedCourse(course);
    setDetailsDialogOpen(true);
  };
  const handleCreateCampaign = () => {
    toast({
      title: "Iniciando criação de campanha",
      description: "Redirecionando para o módulo de campanhas..."
    });
    navigate('/recruitment/campaigns?new=true&course=' + selectedCourse.name);
  };
  const handleViewLeads = () => {
    toast({
      title: "Carregando leads",
      description: "Redirecionando para análise de leads na etapa de agendamento..."
    });
    navigate('/recruitment/leads?filter=stage:Agendamento');
  };
  const handleViewAnalysis = () => {
    toast({
      title: "Carregando análise de competitividade",
      description: "Redirecionando para o relatório de análise competitiva..."
    });
    navigate('/recruitment/analytics?tab=market');
  };
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold my-[9px]">Motor de Previsão de Matrículas</h1>
          <p className="text-muted-foreground">
            Previsões baseadas em análise de probabilidade e comportamento dos leads
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Visão Geral das Previsões</CardTitle>
              <CardDescription>
                Resumo das previsões de matrícula para o período atual
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">Total Previsto</div>
                  <Badge variant="outline">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +4.2%
                  </Badge>
                </div>
                <div className="text-3xl font-bold">316</div>
                <div className="text-xs text-muted-foreground">Meta: 360 (~87.8%)</div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">Confiança do Modelo</div>
                  <Badge className="bg-amber-500">Média</Badge>
                </div>
                <div className="text-base">Baseado em 812 leads ativos</div>
                <div className="text-xs text-muted-foreground">±6.3% margem de erro</div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="text-sm font-medium mb-2">Distribuição de Risco</div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="mb-1">
                      <Badge variant="outline" className="w-full py-1 bg-red-50 text-red-700 border-red-200">
                        Alto
                      </Badge>
                    </div>
                    <div className="text-lg font-bold">1</div>
                    <div className="text-xs text-muted-foreground">curso</div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <Badge variant="outline" className="w-full py-1 bg-amber-50 text-amber-700 border-amber-200">
                        Médio
                      </Badge>
                    </div>
                    <div className="text-lg font-bold">1</div>
                    <div className="text-xs text-muted-foreground">curso</div>
                  </div>
                  <div>
                    <div className="mb-1">
                      <Badge variant="outline" className="w-full py-1 bg-green-50 text-green-700 border-green-200">
                        Baixo
                      </Badge>
                    </div>
                    <div className="text-lg font-bold">2</div>
                    <div className="text-xs text-muted-foreground">cursos</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cursos</CardTitle>
              <CardDescription>
                Selecione um curso para análise detalhada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 p-2">
              {mockCoursePredictions.map(course => <div key={course.id} className={`p-3 rounded-lg transition-colors cursor-pointer ${selectedCourse.id === course.id ? 'bg-primary/10 border border-primary/30' : 'hover:bg-muted'}`} onClick={() => setSelectedCourse(course)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium flex items-center">
                        {course.name}
                        <Badge className={`ml-2 ${getRiskColor(course.risk)}`}>
                          {course.risk === 'baixo' ? 'Baixo risco' : course.risk === 'médio' ? 'Médio risco' : 'Alto risco'}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {course.predicted} / {course.target} previsão de matrículas
                      </div>
                    </div>
                    <div className="flex items-center">
                      {getTrendIcon(course.trend)}
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={e => {
                    e.stopPropagation();
                    handleViewDetails(course);
                  }}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <Progress value={course.predicted / course.target * 100} className={`h-1.5 ${getProgressColor(course.predicted / course.target * 100)}`} />
                  </div>
                </div>)}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{selectedCourse.name} - Análise Detalhada</CardTitle>
              <CardDescription>
                Dados detalhados e previsão para o curso selecionado
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
                <div className="md:col-span-4 border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground">Previsão</div>
                  <div className="text-3xl font-bold mt-1 flex items-center">
                    {selectedCourse.predicted}
                    <span className="text-sm font-normal text-muted-foreground ml-2">/ {selectedCourse.target}</span>
                    {getTrendIcon(selectedCourse.trend)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {(selectedCourse.predicted / selectedCourse.target * 100).toFixed(1)}% da meta
                  </div>
                  <Progress value={selectedCourse.predicted / selectedCourse.target * 100} className={`h-1.5 mt-2 ${getProgressColor(selectedCourse.predicted / selectedCourse.target * 100)}`} />
                </div>
                
                <div className="md:col-span-4 border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground">Confiança</div>
                  <div className="text-3xl font-bold mt-1 capitalize">{selectedCourse.confidence}</div>
                  <div className="text-xs text-muted-foreground">
                    Baseado em {selectedCourse.leadCount} leads
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="text-amber-700">±5.8% margem de erro</span>
                  </div>
                </div>
                
                <div className="md:col-span-4 border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground">Tempo Restante</div>
                  <div className="text-3xl font-bold mt-1">{selectedCourse.daysLeft} dias</div>
                  <div className="text-xs text-muted-foreground">
                    Para atingir 100% da meta
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-muted-foreground">Final do período: 12/07/2024</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-3">Projeção por Etapa do Funil</h3>
                  <div className="space-y-4">
                    {selectedCourse.stages.map((stage, index) => <div key={index} className="border rounded-md p-3">
                        <div className="flex justify-between items-center mb-1">
                          <div className="font-medium">{stage.name}</div>
                          <div className="flex items-center">
                            <Badge variant="outline" className="gap-1">
                              <Percent className="h-3 w-3" />
                              {(stage.conversionRate * 100).toFixed(0)}%
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          {stage.count} leads • {Math.round(stage.count * stage.conversionRate)} conversões esperadas
                        </div>
                        <Progress value={stage.conversionRate * 100} className="h-1.5" />
                      </div>)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Recomendações de Ação</CardTitle>
              <CardDescription>
                Ações sugeridas pelo sistema para melhorar as chances de atingir a meta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedCourse.risk !== 'baixo' && <>
                    <div className="flex items-start gap-3 p-3 border rounded-lg bg-primary/5">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Campanha específica para {selectedCourse.name}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Crie uma campanha direcionada para aumentar o número de leads qualificados para este curso. Considere incentivos específicos para o perfil da persona principal.
                        </p>
                        <Button variant="secondary" size="sm" className="mt-2" onClick={handleCreateCampaign}>
                          Criar Campanha
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-medium">Revisar taxa de conversão na etapa "{selectedCourse.stages[1].name}"</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          A taxa de conversão desta etapa está abaixo da média. Considere reforçar o contato com leads nesta etapa e melhorar a qualificação.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2" onClick={handleViewLeads}>
                          Ver Leads
                        </Button>
                      </div>
                    </div>
                  </>}
                
                <div className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <BarChart3 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium">Análise de competitividade do curso</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Compare as condições comerciais com concorrentes e identifique oportunidades de diferenciação para destacar o curso no mercado.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={handleViewAnalysis}>
                      Ver Análise
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <CourseDetailDialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen} course={selectedCourse} />
    </div>;
};
export default EnrollmentPredictionEngine;