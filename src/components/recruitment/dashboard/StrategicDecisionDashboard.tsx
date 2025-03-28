
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, TrendingDown, AlertTriangle, PieChart, 
  BarChart3, Users, Filter, Plus, ArrowRight, HelpCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const StrategicDecisionDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Painel de Decisão Estratégica</h1>
          <p className="text-muted-foreground">
            Acompanhe as metas, previsões e tendências para tomada de decisão
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtrar
          </Button>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Campanha
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <Card className="md:col-span-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Confiança do Modelo</CardTitle>
            <CardDescription>
              Grau de confiança nas projeções de matrícula
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center">
                <HelpCircle className="h-8 w-8 text-amber-600" />
              </div>
              <div>
                <div className="text-2xl font-bold">Média</div>
                <div className="text-sm text-muted-foreground">±6.3% variação</div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center p-2 rounded bg-muted">
                  <div className="text-sm font-medium">Alta</div>
                  <div className="font-bold">2</div>
                  <div className="text-xs text-muted-foreground">cursos</div>
                </div>
                <div className="text-center p-2 rounded bg-amber-100">
                  <div className="text-sm font-medium text-amber-800">Média</div>
                  <div className="font-bold text-amber-800">2</div>
                  <div className="text-xs text-amber-800">cursos</div>
                </div>
                <div className="text-center p-2 rounded bg-muted">
                  <div className="text-sm font-medium">Baixa</div>
                  <div className="font-bold">0</div>
                  <div className="text-xs text-muted-foreground">cursos</div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mt-2">
                O modelo está em fase de treinamento com dados recentes. A confiança tende a aumentar nas próximas semanas.
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-8">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Progresso da Meta Geral</CardTitle>
            <CardDescription>
              Período 2024.1 - Consolidado de todos os cursos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold">316 / 360</div>
                <div className="text-sm text-muted-foreground">Previsão / Meta de matrículas</div>
              </div>
              <div>
                <Badge className="bg-amber-500">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  12.2% abaixo
                </Badge>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Progresso</span>
                <span>87.8%</span>
              </div>
              <Progress value={87.8} className="h-2" />
              <div className="grid grid-cols-5 text-xs mt-1">
                <div className="text-muted-foreground">0%</div>
                <div className="text-muted-foreground text-center">25%</div>
                <div className="text-muted-foreground text-center">50%</div>
                <div className="text-muted-foreground text-center">75%</div>
                <div className="text-muted-foreground text-right">100%</div>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="border rounded-md p-3">
                <div className="text-sm font-medium mb-2">Matrículas Confirmadas</div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">235</div>
                  <Badge variant="outline" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    65.3%
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Do total previsto de 316
                </div>
              </div>
              
              <div className="border rounded-md p-3">
                <div className="text-sm font-medium mb-2">Tempo Restante</div>
                <div className="flex justify-between items-center">
                  <div className="text-2xl font-bold">43 dias</div>
                  <Badge variant="destructive" className="gap-1">
                    Crítico
                  </Badge>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Para atingir 100% da meta
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Cursos em Alerta</CardTitle>
              <CardDescription>
                Cursos com risco de não atingir a meta
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <span>Ver todos</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4 bg-red-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center mr-3">
                    <AlertTriangle className="h-4 w-4 text-red-700" />
                  </div>
                  <div>
                    <div className="font-medium flex items-center">
                      Pedagogia
                      <Badge className="ml-2 bg-red-500">Alto Risco</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      72 / 120 matrículas previstas • Confiança: Alta
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-red-700">60%</div>
                  <div className="text-xs text-muted-foreground">da meta</div>
                </div>
              </div>
              
              <Progress value={60} className="h-2" />
              
              <div className="mt-3">
                <div className="text-sm font-medium mb-1">Ações recomendadas:</div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" className="h-7 gap-1">
                    <Plus className="h-3 w-3" />
                    Campanha específica
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <Plus className="h-3 w-3" />
                    Aumentar incentivos
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <Plus className="h-3 w-3" />
                    Revisar captação
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4 bg-amber-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                    <AlertTriangle className="h-4 w-4 text-amber-700" />
                  </div>
                  <div>
                    <div className="font-medium flex items-center">
                      Administração
                      <Badge className="ml-2 bg-amber-500">Médio Risco</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      85 / 100 matrículas previstas • Confiança: Alta
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-700">85%</div>
                  <div className="text-xs text-muted-foreground">da meta</div>
                </div>
              </div>
              
              <Progress value={85} className="h-2" />
              
              <div className="mt-3">
                <div className="text-sm font-medium mb-1">Ações recomendadas:</div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="secondary" size="sm" className="h-7 gap-1">
                    <Plus className="h-3 w-3" />
                    Reforçar WhatsApp
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <Plus className="h-3 w-3" />
                    Desconto antecipado
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Projeção por Curso</CardTitle>
            <CardDescription>
              Progresso de cada curso em relação à meta
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full flex items-center justify-center border rounded">
              <p className="text-muted-foreground">Gráfico de barras com projeção por curso será implementado aqui</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Efetividade de Canais</CardTitle>
            <CardDescription>
              Taxa de conversão e volume por canal
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <div className="h-full flex items-center justify-center border rounded">
              <p className="text-muted-foreground">Gráfico de efetividade por canal será implementado aqui</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StrategicDecisionDashboard;
