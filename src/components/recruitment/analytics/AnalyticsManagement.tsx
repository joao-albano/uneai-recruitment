
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AnalyticsManagement: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analíticos</h1>
        <p className="text-muted-foreground">
          Visualize métricas e desempenho da captação de alunos
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="conversion">Conversão</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Visão Geral da Captação</CardTitle>
              <CardDescription>
                Principais métricas e indicadores de desempenho
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                Gráficos e métricas serão exibidos aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="leads">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Análise de Leads</CardTitle>
              <CardDescription>
                Estatísticas detalhadas sobre seus leads
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                Análise de leads será exibida aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="conversion">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Taxas de Conversão</CardTitle>
              <CardDescription>
                Desempenho de conversão em cada etapa do funil
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                Taxas de conversão serão exibidas aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="channels">
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Desempenho por Canal</CardTitle>
              <CardDescription>
                Comparação de efetividade entre diferentes canais
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                Análise de canais será exibida aqui
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsManagement;
