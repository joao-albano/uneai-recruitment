
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, PieChart, LineChart, ArrowUp, ArrowDown, 
  AlertCircle, HelpCircle, Percent, TrendingUp, Users 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { EnrollmentPrediction } from '@/types/recruitment';

const mockPredictions: EnrollmentPrediction[] = [
  {
    id: '1',
    courseId: '101',
    courseName: 'Administração',
    period: '2024.1',
    targetCount: 100,
    predictedCount: 85,
    confidence: 'alta',
    variance: 5.2,
    riskLevel: 'medio',
    lastUpdated: new Date(),
    suggestedActions: ['Reforçar canal WhatsApp', 'Aumentar desconto para matricula antecipada'],
    leadsByStage: [
      { stageId: '1', stageName: 'Contato Inicial', count: 150, convertionProbability: 0.2 },
      { stageId: '2', stageName: 'Agendamento', count: 60, convertionProbability: 0.5 },
      { stageId: '3', stageName: 'Visita', count: 35, convertionProbability: 0.7 },
      { stageId: '4', stageName: 'Matrícula', count: 25, convertionProbability: 1.0 },
    ]
  },
  {
    id: '2',
    courseId: '102',
    courseName: 'Ciências Contábeis',
    period: '2024.1',
    targetCount: 80,
    predictedCount: 94,
    confidence: 'media',
    variance: 8.1,
    riskLevel: 'baixo',
    lastUpdated: new Date(),
    suggestedActions: ['Manter estratégia atual', 'Considerar aumento de meta'],
    leadsByStage: [
      { stageId: '1', stageName: 'Contato Inicial', count: 180, convertionProbability: 0.22 },
      { stageId: '2', stageName: 'Agendamento', count: 80, convertionProbability: 0.48 },
      { stageId: '3', stageName: 'Visita', count: 50, convertionProbability: 0.75 },
      { stageId: '4', stageName: 'Matrícula', count: 35, convertionProbability: 1.0 },
    ]
  },
  {
    id: '3',
    courseId: '103',
    courseName: 'Pedagogia',
    period: '2024.1',
    targetCount: 120,
    predictedCount: 72,
    confidence: 'alta',
    variance: 4.8,
    riskLevel: 'alto',
    lastUpdated: new Date(),
    suggestedActions: ['Criar campanha específica', 'Aumentar incentivos', 'Revisar processo de captação'],
    leadsByStage: [
      { stageId: '1', stageName: 'Contato Inicial', count: 120, convertionProbability: 0.18 },
      { stageId: '2', stageName: 'Agendamento', count: 40, convertionProbability: 0.45 },
      { stageId: '3', stageName: 'Visita', count: 20, convertionProbability: 0.68 },
      { stageId: '4', stageName: 'Matrícula', count: 12, convertionProbability: 1.0 },
    ]
  },
  {
    id: '4',
    courseId: '104',
    courseName: 'Sistemas de Informação',
    period: '2024.1',
    targetCount: 60,
    predictedCount: 65,
    confidence: 'media',
    variance: 7.2,
    riskLevel: 'baixo',
    lastUpdated: new Date(),
    suggestedActions: ['Manter estratégia atual'],
    leadsByStage: [
      { stageId: '1', stageName: 'Contato Inicial', count: 110, convertionProbability: 0.25 },
      { stageId: '2', stageName: 'Agendamento', count: 50, convertionProbability: 0.52 },
      { stageId: '3', stageName: 'Visita', count: 30, convertionProbability: 0.78 },
      { stageId: '4', stageName: 'Matrícula', count: 25, convertionProbability: 1.0 },
    ]
  }
];

const EnrollmentPredictionEngine: React.FC = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="dashboard">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="dashboard">Visão Geral</TabsTrigger>
          <TabsTrigger value="courses">Por Curso</TabsTrigger>
          <TabsTrigger value="channels">Por Canal</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  Previsão Geral
                  <Badge className="ml-2 bg-amber-500">Média Confiança</Badge>
                </CardTitle>
                <CardDescription>Consolidado de todos os cursos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">316 / 360</div>
                    <div className="text-sm text-muted-foreground">Previsão / Meta</div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center">
                    <Percent className="h-6 w-6 text-amber-700" />
                  </div>
                </div>
                <Progress 
                  value={87.8} 
                  className="h-2 mt-4" 
                />
                <div className="flex justify-between mt-1 text-sm">
                  <span>87.8%</span>
                  <span className="text-amber-600 flex items-center">
                    <ArrowDown className="h-3 w-3 mr-1" />
                    12.2% abaixo da meta
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  Confiança do Modelo
                </CardTitle>
                <CardDescription>Variação de previsão</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">±6.3%</div>
                    <div className="text-sm text-muted-foreground">Desvio médio</div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-blue-700" />
                  </div>
                </div>
                <div className="grid grid-cols-3 mt-4 gap-2">
                  <div className="text-center p-2 rounded bg-muted">
                    <div className="font-bold">1</div>
                    <div className="text-xs text-muted-foreground">Alta</div>
                  </div>
                  <div className="text-center p-2 rounded bg-amber-100">
                    <div className="font-bold">2</div>
                    <div className="text-xs text-amber-700">Média</div>
                  </div>
                  <div className="text-center p-2 rounded bg-muted">
                    <div className="font-bold">1</div>
                    <div className="text-xs text-muted-foreground">Baixa</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  Alertas e Riscos
                </CardTitle>
                <CardDescription>Cursos em alerta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">1 curso</div>
                    <div className="text-sm text-muted-foreground">Em risco alto</div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-red-700" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="text-sm font-medium">Pedagogia</div>
                  <div className="flex justify-between items-center mt-1">
                    <Progress 
                      value={60} 
                      className="h-2 flex-1" 
                    />
                    <span className="text-sm ml-2 text-red-600">60%</span>
                  </div>
                  <div className="text-xs mt-1 text-muted-foreground">72 / 120 matrículas previstas</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Previsão de Matrículas por Curso</CardTitle>
              <CardDescription>Período 2024.1</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded">
                <p className="text-muted-foreground">Gráfico de previsão por curso em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="space-y-6">
          {mockPredictions.map((prediction) => (
            <Card key={prediction.id} className={`
              border-l-4 
              ${prediction.riskLevel === 'alto' ? 'border-l-red-500' : 
               prediction.riskLevel === 'medio' ? 'border-l-amber-500' : 
               'border-l-green-500'}
            `}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      {prediction.courseName}
                      <Badge className={`ml-2 
                        ${prediction.confidence === 'alta' ? 'bg-green-500' : 
                         prediction.confidence === 'media' ? 'bg-amber-500' : 
                         'bg-red-500'}
                      `}>
                        {prediction.confidence === 'alta' ? 'Alta Confiança' : 
                         prediction.confidence === 'media' ? 'Média Confiança' : 
                         'Baixa Confiança'}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      Período {prediction.period} • Atualizado em {prediction.lastUpdated.toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      Meta: <span className="font-bold">{prediction.targetCount}</span>
                    </div>
                    <div className="text-sm font-medium">
                      Previsão: <span className="font-bold">{prediction.predictedCount}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Progresso para meta</span>
                      <span className="text-sm font-medium">
                        {Math.round((prediction.predictedCount / prediction.targetCount) * 100)}%
                      </span>
                    </div>
                    <Progress 
                      value={(prediction.predictedCount / prediction.targetCount) * 100} 
                      className="h-2" 
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-muted-foreground">0</span>
                      <span className="text-xs text-muted-foreground">{prediction.targetCount}</span>
                    </div>
                  </div>
                  
                  {prediction.leadsByStage && (
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium mb-2">Distribuição por Etapa do Funil</div>
                      <div className="space-y-2">
                        {prediction.leadsByStage.map(stage => (
                          <div key={stage.stageId}>
                            <div className="flex justify-between text-xs mb-1">
                              <span>{stage.stageName}</span>
                              <span>{Math.round(stage.count * stage.convertionProbability)} previstos de {stage.count}</span>
                            </div>
                            <div className="flex gap-1 h-2">
                              <div 
                                className="bg-primary rounded-l-sm" 
                                style={{ width: `${stage.convertionProbability * 100}%` }}
                              />
                              <div 
                                className="bg-muted rounded-r-sm" 
                                style={{ width: `${100 - (stage.convertionProbability * 100)}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {prediction.suggestedActions && prediction.suggestedActions.length > 0 && (
                    <div>
                      <div className="text-sm font-medium mb-2">Ações Recomendadas</div>
                      <div className="flex flex-wrap gap-2">
                        {prediction.suggestedActions.map((action, i) => (
                          <Badge key={i} variant="outline" className="cursor-pointer hover:bg-muted">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="channels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Efetividade por Canal</CardTitle>
              <CardDescription>
                Análise de conversão e custo por canal de captação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded">
                <p className="text-muted-foreground">Gráfico de efetividade por canal em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Canais mais Efetivos</CardTitle>
                <CardDescription>
                  Baseado na taxa de conversão
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="font-medium">Indicação</div>
                        <div className="text-xs text-muted-foreground">42 leads</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">28%</div>
                      <div className="text-xs text-muted-foreground">Taxa de conversão</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <MessageSquare className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <div className="font-medium">WhatsApp</div>
                        <div className="text-xs text-muted-foreground">125 leads</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">22%</div>
                      <div className="text-xs text-muted-foreground">Taxa de conversão</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <BarChart className="h-5 w-5 text-purple-700" />
                      </div>
                      <div>
                        <div className="font-medium">Eventos</div>
                        <div className="text-xs text-muted-foreground">87 leads</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">19%</div>
                      <div className="text-xs text-muted-foreground">Taxa de conversão</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Custo de Aquisição</CardTitle>
                <CardDescription>
                  Valor médio por lead convertido
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <LineChart className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <div className="font-medium">Facebook</div>
                        <div className="text-xs text-muted-foreground">15% conversão</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-red-600">R$ 420</div>
                      <div className="text-xs text-muted-foreground">Por matrícula</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                        <PieChart className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <div className="font-medium">Google</div>
                        <div className="text-xs text-muted-foreground">12% conversão</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-amber-600">R$ 380</div>
                      <div className="text-xs text-muted-foreground">Por matrícula</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <MessageSquare className="h-5 w-5 text-green-700" />
                      </div>
                      <div>
                        <div className="font-medium">WhatsApp</div>
                        <div className="text-xs text-muted-foreground">22% conversão</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">R$ 210</div>
                      <div className="text-xs text-muted-foreground">Por matrícula</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnrollmentPredictionEngine;
