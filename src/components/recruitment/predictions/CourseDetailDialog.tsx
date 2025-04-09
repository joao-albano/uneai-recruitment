
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, 
  BarChart3, 
  Target, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  Clock,
  Percent
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CourseDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: any | null;
}

const CourseDetailDialog: React.FC<CourseDetailDialogProps> = ({
  open,
  onOpenChange,
  course,
}) => {
  if (!course) return null;
  
  const getProgressColor = (percent: number) => {
    if (percent >= 100) return 'bg-green-500';
    if (percent >= 85) return 'bg-green-400';
    if (percent >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {course.name} - Análise Detalhada
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1 pr-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="stages" className="gap-2">
                <LineChart className="h-4 w-4" />
                Etapas do Funil
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="gap-2">
                <Target className="h-4 w-4" />
                Recomendações
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground">Previsão</div>
                  <div className="text-3xl font-bold mt-1 flex items-center">
                    {course.predicted}
                    <span className="text-sm font-normal text-muted-foreground ml-2">/ {course.target}</span>
                    {course.trend === 'aumento' ? (
                      <TrendingUp className="h-4 w-4 text-green-600 ml-2" />
                    ) : course.trend === 'queda' ? (
                      <TrendingDown className="h-4 w-4 text-red-600 ml-2" />
                    ) : null}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {((course.predicted / course.target) * 100).toFixed(1)}% da meta
                  </div>
                  <Progress 
                    value={(course.predicted / course.target) * 100}
                    className={`h-1.5 mt-2 ${getProgressColor((course.predicted / course.target) * 100)}`}
                  />
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground">Confiança</div>
                  <div className="text-3xl font-bold mt-1 capitalize">{course.confidence}</div>
                  <div className="text-xs text-muted-foreground">
                    Baseado em {course.leadCount} leads
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-1" />
                    <span className="text-amber-700">±5.8% margem de erro</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground">Tempo Restante</div>
                  <div className="text-3xl font-bold mt-1">{course.daysLeft} dias</div>
                  <div className="text-xs text-muted-foreground">
                    Para atingir 100% da meta
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-muted-foreground">Final do período: 12/07/2024</span>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Distribuição de Leads</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground mt-2">
                      Visualização de gráfico em desenvolvimento
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Métricas Adicionais</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium">Tempo Médio de Decisão</div>
                      <div className="text-xl font-bold mt-1">18 dias</div>
                      <div className="text-xs text-muted-foreground">
                        Do primeiro contato até a matrícula
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium">Canais de Aquisição</div>
                      <div className="text-xl font-bold mt-1">3 principais</div>
                      <div className="text-xs text-muted-foreground">
                        Google, Facebook, Instagram
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium">Segmento Principal</div>
                      <div className="text-xl font-bold mt-1">Jovens Adultos</div>
                      <div className="text-xs text-muted-foreground">
                        78% das matrículas previstas
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium">Satisfação Prévia</div>
                      <div className="text-xl font-bold mt-1">4.2/5.0</div>
                      <div className="text-xs text-muted-foreground">
                        Baseado em avaliações do curso
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stages" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Projeção por Etapa do Funil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.stages && course.stages.map((stage: any, index: number) => (
                      <div key={index} className="border rounded-md p-3">
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
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Pontos de Atenção no Funil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3 bg-amber-50">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-medium">Taxa de conversão abaixo da média na etapa "Agendamento"</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            A taxa está 8% abaixo da média institucional para esta etapa
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3 bg-green-50">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <div className="font-medium">Conversão acima da média na etapa "Matrícula"</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            95% dos candidatos que chegam à etapa final concluem a matrícula
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Ações Recomendadas pelo Sistema</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 border rounded-lg bg-primary/5">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Campanha específica para {course.name}</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Crie uma campanha direcionada para aumentar o número de leads qualificados para este curso. Considere incentivos específicos para o perfil da persona principal.
                        </p>
                        <Button variant="secondary" size="sm" className="mt-2">
                          Criar Campanha
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <div className="font-medium">Revisar script de abordagem para este curso</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          O script atual pode não estar destacando os diferenciais mais valorizados pelo público-alvo deste curso.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                        <Target className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">Aumentar investimento em canais digitais</div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Dados mostram que 65% dos leads deste curso vêm de canais digitais com bom ROI.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          Ajustar Investimento
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CourseDetailDialog;
