
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, ChevronDown, Download, Filter, Plus, Target, TrendingUp } from 'lucide-react';
import { CourseEnrollmentProjection } from '@/types/recruitment';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

// Dados fictícios para simulação
const mockProjections: CourseEnrollmentProjection[] = [
  {
    courseId: '1',
    courseName: 'Ensino Médio',
    projectedEnrollments: 85,
    currentLeads: 110,
    conversionRate: 0.77,
    target: 100,
    lastUpdated: new Date(),
  },
  {
    courseId: '2',
    courseName: 'Ensino Fundamental II',
    projectedEnrollments: 64,
    currentLeads: 90,
    conversionRate: 0.71,
    target: 80,
    lastUpdated: new Date(),
  },
  {
    courseId: '3',
    courseName: 'Ensino Fundamental I',
    projectedEnrollments: 42,
    currentLeads: 65,
    conversionRate: 0.65,
    target: 50,
    lastUpdated: new Date(),
  },
  {
    courseId: '4',
    courseName: 'Educação Infantil',
    projectedEnrollments: 28,
    currentLeads: 40,
    conversionRate: 0.70,
    target: 30,
    lastUpdated: new Date(),
  },
];

const EnrollmentPredictionDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Previsão de Matrículas</h2>
          <p className="text-muted-foreground">
            Análise preditiva de conversão de leads em matrículas
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Exportar</span>
          </Button>
          <Button className="gap-2" onClick={() => navigate('/recruitment/campaigns/new')}>
            <Plus className="h-4 w-4" />
            <span>Criar Campanha</span>
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Projeção Total</CardTitle>
            <CardDescription>Todos os cursos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-5xl font-bold">219</div>
              <p className="text-sm text-muted-foreground mt-1">
                matrículas projetadas
              </p>
              <div className="flex justify-center items-center mt-4 text-sm">
                <Target className="h-4 w-4 mr-1 text-amber-500" />
                <span>Meta: 260</span>
                <span className="text-red-500 ml-2">-41 (-15.8%)</span>
              </div>
              <Progress value={84.2} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Taxa de Conversão</CardTitle>
            <CardDescription>Média geral</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-5xl font-bold">72%</div>
              <p className="text-sm text-muted-foreground mt-1">
                conversão lead para matriculado
              </p>
              <div className="flex justify-center items-center mt-4 text-sm">
                <TrendingUp className="h-4 w-4 mr-1 text-green-500" />
                <span className="text-green-500">+2.4% vs período anterior</span>
              </div>
              <Progress value={72} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Leads Ativos</CardTitle>
            <CardDescription>Todos os canais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <div className="text-5xl font-bold">305</div>
              <p className="text-sm text-muted-foreground mt-1">
                leads em processo de captação
              </p>
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div>
                  <div className="font-medium">Novos (7d)</div>
                  <div className="text-green-500">+42</div>
                </div>
                <div>
                  <div className="font-medium">Estagnados</div>
                  <div className="text-amber-500">28</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Por Curso</TabsTrigger>
          <TabsTrigger value="channels">Por Canal</TabsTrigger>
          <TabsTrigger value="regions">Por Região</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Projeção de Matrículas por Curso</CardTitle>
              <CardDescription>
                Análise comparativa entre projeção atual e metas estabelecidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="min-h-[350px] flex items-center justify-center border rounded-md">
                  <BarChart className="h-16 w-16 text-muted-foreground/40" />
                </div>
                <div className="mt-4 space-y-6">
                  {mockProjections.map((projection) => (
                    <div key={projection.courseId} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">{projection.courseName}</div>
                          <div className="text-sm text-muted-foreground">
                            {projection.currentLeads} leads ativos • {(projection.conversionRate * 100).toFixed(1)}% conversão
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">
                            {projection.projectedEnrollments} / {projection.target}
                          </div>
                          <div className={`text-sm ${projection.projectedEnrollments >= (projection.target || 0) ? 'text-green-500' : 'text-red-500'}`}>
                            {projection.projectedEnrollments >= (projection.target || 0) 
                              ? `+${projection.projectedEnrollments - (projection.target || 0)}`
                              : `-${(projection.target || 0) - projection.projectedEnrollments}`}
                            {" "}
                            ({((projection.projectedEnrollments / (projection.target || 1)) * 100).toFixed(1)}%)
                          </div>
                        </div>
                      </div>
                      <Progress
                        value={(projection.projectedEnrollments / (projection.target || 1)) * 100}
                        className="h-2"
                        indicatorClassName={
                          projection.projectedEnrollments >= (projection.target || 0)
                            ? 'bg-green-500'
                            : projection.projectedEnrollments >= (projection.target || 0) * 0.8
                              ? 'bg-amber-500'
                              : 'bg-red-500'
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="channels" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Projeção de Matrículas por Canal</CardTitle>
              <CardDescription>
                Eficiência dos canais de captação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Visualização por canal em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="regions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Projeção de Matrículas por Região</CardTitle>
              <CardDescription>
                Distribuição geográfica das projeções
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Visualização por região em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnrollmentPredictionDashboard;
