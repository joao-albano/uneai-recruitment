
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart2, PieChart, LineChart, TrendingUp } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DetailedAnalysisPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the opportunities from the location state, if available
  const { opportunities = [], analyticsSource = 'generic' } = 
    (location.state as { opportunities?: any[], analyticsSource?: string }) || {};
  
  // Set the current product to 'recruitment'
  useEffect(() => {
    setCurrentProduct('recruitment');
  }, [setCurrentProduct]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold">Análise Detalhada</h1>
        <p className="text-muted-foreground mt-1">
          {analyticsSource === 'opportunity-radar' 
            ? 'Visão aprofundada das oportunidades de captação identificadas' 
            : 'Análise de dados e métricas de recrutamento'}
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="trends">Tendências</TabsTrigger>
          <TabsTrigger value="segments">Segmentação</TabsTrigger>
          <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Oportunidades
                </CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{opportunities.length || '38'}</div>
                <p className="text-xs text-muted-foreground">
                  +12% em relação ao mês anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Conversão Prevista
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23%</div>
                <p className="text-xs text-muted-foreground">
                  +5% em relação à média histórica
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Impacto Financeiro Estimado
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 85.400</div>
                <p className="text-xs text-muted-foreground">
                  Baseado em conversão de 23% dos leads
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Oportunidades</CardTitle>
              <CardDescription>
                Distribuição por categoria e impacto previsto
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <PieChart className="mx-auto h-16 w-16 mb-4" />
                <p>Gráfico de distribuição de oportunidades</p>
                <p className="text-sm mt-2">
                  Dados sendo carregados ou visualização em desenvolvimento
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendências de Interesse</CardTitle>
              <CardDescription>
                Evolução do interesse por categorias ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <LineChart className="mx-auto h-16 w-16 mb-4" />
                <p>Gráfico de tendências temporais</p>
                <p className="text-sm mt-2">
                  Dados sendo carregados ou visualização em desenvolvimento
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Segmentos</CardTitle>
              <CardDescription>
                Distribuição de interesses por perfil demográfico
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart2 className="mx-auto h-16 w-16 mb-4" />
                <p>Gráfico de análise por segmentos</p>
                <p className="text-sm mt-2">
                  Dados sendo carregados ou visualização em desenvolvimento
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recomendações Estratégicas</CardTitle>
              <CardDescription>
                Sugestões baseadas em análise preditiva de conversão
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 py-2">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Intensificar captação para Medicina Veterinária</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Estabelecer parceria com instituição especializada para oferecer curso de extensão ou pós-graduação
                    em Medicina Veterinária, aproveitando o alto interesse no tema.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Solução de mobilidade para Zona Leste</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Implementar serviço de transporte dedicado ou aumentar oferta de cursos híbridos/EAD para atender
                    a demanda da Zona Leste, onde existe dificuldade de deslocamento.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">Programa de bolsas e financiamento</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Criar campanha específica de bolsas parciais e opções flexíveis de pagamento para
                    endereçar a preocupação com valores de mensalidade.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default DetailedAnalysisPage;
