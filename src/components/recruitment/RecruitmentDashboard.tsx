
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { UserPlus, ChevronRight, BarChart, Filter, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import RecruitmentStats from './dashboard/RecruitmentStats';

const RecruitmentDashboard: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Captação de Alunos</h1>
          <p className="text-muted-foreground">
            Painel de controle e visualização operacional da captação
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="gap-2"
            onClick={() => navigate('/recruitment/leads')}
          >
            <UserPlus className="h-4 w-4" />
            <span>Gerenciar Leads</span>
          </Button>
          <Button 
            className="gap-2"
            onClick={() => navigate('/recruitment/funnel')}
          >
            <Filter className="h-4 w-4" />
            <span>Funil de Captação</span>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
          <TabsTrigger value="courses">Cursos</TabsTrigger>
          <TabsTrigger value="locations">Localidades</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="pt-4">
          <RecruitmentStats />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Funil de Captação</CardTitle>
                <CardDescription>
                  Visão geral do processo de captação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center border rounded">
                  <p className="text-muted-foreground">Gráfico de funil em desenvolvimento</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium">Leads Recentes</CardTitle>
                  <CardDescription>
                    Últimos contatos cadastrados
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1">
                  <span>Ver Todos</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-2 rounded-md hover:bg-muted">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <UserPlus className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Lead Exemplo #{i}</p>
                        <p className="text-sm text-muted-foreground">
                          Curso de exemplo • Canal: Site
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">Há 2h</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="channels" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Canais</CardTitle>
              <CardDescription>
                Análise de leads por canal de captação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded">
                <p className="text-muted-foreground">Estatísticas por canal em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="courses" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Cursos</CardTitle>
              <CardDescription>
                Análise de leads por curso de interesse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded">
                <p className="text-muted-foreground">Estatísticas por curso em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="locations" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Localidade</CardTitle>
              <CardDescription>
                Análise de leads por região geográfica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center border rounded">
                <p className="text-muted-foreground">Estatísticas por localidade em desenvolvimento</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Visualização Operacional</CardTitle>
            <CardDescription>
              Leads cadastrados por etapa no funil
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span>Exportar CSV</span>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center border rounded">
            <p className="text-muted-foreground">Painel operacional em desenvolvimento</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecruitmentDashboard;
