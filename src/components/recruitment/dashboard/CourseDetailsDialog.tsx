
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
  Users,
  Percent
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CourseDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: any | null;
}

const CourseDetailsDialog: React.FC<CourseDetailsDialogProps> = ({
  open,
  onOpenChange,
  course,
}) => {
  if (!course) return null;
  
  const getProgressColor = (percent: number) => {
    if (percent >= 95) return 'bg-green-500';
    if (percent >= 85) return 'bg-green-400';
    if (percent >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  const getTrendBadge = (trend: string) => {
    switch(trend) {
      case 'aumento': 
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 gap-1">
            <TrendingUp className="h-3 w-3" />
            Em alta
          </Badge>
        );
      case 'queda': 
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200 gap-1">
            <TrendingDown className="h-3 w-3" />
            Em queda
          </Badge>
        );
      case 'estável': 
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Estável
          </Badge>
        );
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };
  
  const getRiskBadge = (risk: string) => {
    switch(risk) {
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            {course.name}
            <div className="flex items-center gap-1 ml-2">
              {getRiskBadge(course.risk)}
              {getTrendBadge(course.trend)}
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="overflow-y-auto flex-1 pr-2">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview" className="gap-2">
                <BarChart3 className="h-4 w-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="trends" className="gap-2">
                <LineChart className="h-4 w-4" />
                Tendências
              </TabsTrigger>
              <TabsTrigger value="actions" className="gap-2">
                <Target className="h-4 w-4" />
                Ações Sugeridas
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground">Previsão</div>
                  <div className="text-3xl font-bold mt-1">{course.predicted}</div>
                  <div className="text-xs text-muted-foreground">
                    {((course.predicted / course.target) * 100).toFixed(1)}% da meta ({course.target})
                  </div>
                  <Progress 
                    value={(course.predicted / course.target) * 100}
                    className={`h-1.5 mt-2 ${getProgressColor((course.predicted / course.target) * 100)}`}
                  />
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground">Conversão</div>
                  <div className="text-3xl font-bold mt-1">{course.metrics.conversionRate}%</div>
                  <div className="text-xs text-muted-foreground">
                    Taxa de conversão geral
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <Percent className="h-4 w-4 text-primary" />
                    <span>{course.metrics.conversionRate > 15 ? 'Acima' : 'Abaixo'} da média institucional</span>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium text-muted-foreground">Leads Ativos</div>
                  <div className="text-3xl font-bold mt-1">{course.metrics.leadCount}</div>
                  <div className="text-xs text-muted-foreground">
                    Total de leads em processamento
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Custo por lead: R$ {course.metrics.costPerLead}</span>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Performance do Funil</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Contato Inicial</div>
                      <div className="text-sm text-muted-foreground">Conversão 35%</div>
                    </div>
                    <Progress value={35} className="h-2" />
                    
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Visita</div>
                      <div className="text-sm text-muted-foreground">Conversão 58%</div>
                    </div>
                    <Progress value={58} className="h-2" />
                    
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-sm font-medium">Matrícula</div>
                      <div className="text-sm text-muted-foreground">Conversão 82%</div>
                    </div>
                    <Progress value={82} className="h-2" />
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
                      <div className="text-sm font-medium">Tempo de Conversão</div>
                      <div className="text-xl font-bold mt-1">15 dias</div>
                      <div className="text-xs text-muted-foreground">
                        Média para conclusão do ciclo
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium">Turnos Mais Procurados</div>
                      <div className="text-xl font-bold mt-1">Noturno (62%)</div>
                      <div className="text-xs text-muted-foreground">
                        Seguido por matutino (28%)
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium">Perfil Predominante</div>
                      <div className="text-xl font-bold mt-1">Adultos 25-35</div>
                      <div className="text-xs text-muted-foreground">
                        65% dos leads ativos
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="text-sm font-medium">Canal Principal</div>
                      <div className="text-xl font-bold mt-1">Google Ads</div>
                      <div className="text-xs text-muted-foreground">
                        42% das conversões
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Tendência de Matrículas</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] flex items-center justify-center border rounded-md">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground mt-2">
                      Visualização de gráfico em desenvolvimento
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Comparação com Períodos Anteriores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div>
                        <div className="font-medium">2023.2</div>
                        <div className="text-sm text-muted-foreground">Período anterior</div>
                      </div>
                      <div>
                        <div className="text-lg font-medium text-right">
                          {Math.round(course.target * 0.92)} matrículas
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                          {(course.predicted > course.target * 0.92) ? '+' : ''}
                          {Math.round((course.predicted / (course.target * 0.92) - 1) * 100)}% em relação ao atual
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pb-2 border-b">
                      <div>
                        <div className="font-medium">2023.1</div>
                        <div className="text-sm text-muted-foreground">Dois períodos atrás</div>
                      </div>
                      <div>
                        <div className="text-lg font-medium text-right">
                          {Math.round(course.target * 0.85)} matrículas
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                          +{Math.round((course.predicted / (course.target * 0.85) - 1) * 100)}% em relação ao atual
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Indicadores de Tendência</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <TrendingUp className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                          <div className="font-medium">Crescimento de busca no Google</div>
                          <p className="text-sm text-muted-foreground">
                            Aumento de 23% nas pesquisas pelos termos relacionados ao curso nos últimos 30 dias
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <div className="font-medium">Aumento da concorrência</div>
                          <p className="text-sm text-muted-foreground">
                            Duas novas instituições começaram a oferecer o curso na região com preços competitivos
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="actions" className="space-y-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Ações Recomendadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {course.actions.map((action: string, idx: number) => (
                      <div key={idx} className="border rounded-md p-3">
                        <div className="flex items-start gap-2">
                          <div className="mt-0.5">
                            <Target className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{action}</div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {idx === 0 
                                ? 'Alta prioridade - impacto estimado de +15% nas conversões'
                                : 'Prioridade média - impacto estimado de +8% nas conversões'}
                            </p>
                            <Button variant="outline" size="sm" className="mt-2">
                              Implementar
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <Target className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">Revisar materiais de divulgação</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Atualizar conteúdo promocional com os diferenciais mais recentes do curso
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Implementar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Oportunidades de Segmentação</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium">Profissionais em transição de carreira</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Segmento com alta conversão (32%) e menor sensibilidade a preço
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Criar Campanha
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          <Users className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <div className="font-medium">Recém-formados no ensino médio</div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Segmento com volume alto mas conversão menor (18%)
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Criar Campanha
                          </Button>
                        </div>
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

export default CourseDetailsDialog;
