import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, BarChart2, PieChart, LineChart as LineChartIcon, TrendingUp, Users, MapPin } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

// Mock data for opportunities
const mockOpportunities = [
  {
    id: '1',
    name: 'Administração',
    type: 'course',
    count: 57,
    impact: 40800,
    urgency: 'high',
    trend: 'up',
    trendPercentage: 8.2,
    description: 'Aumento recente de interesse em Administração.',
    title: 'Alta demanda para Administração'
  },
  {
    id: '2',
    name: 'Pedagogia',
    type: 'course',
    count: 42,
    impact: 28700,
    urgency: 'medium',
    trend: 'down',
    trendPercentage: -4.3,
    description: 'Queda na taxa de conversão para Pedagogia.',
    title: 'Conversão baixa em Pedagogia'
  },
  {
    id: '3',
    name: 'Zona Leste',
    type: 'location',
    count: 31,
    impact: 21000,
    urgency: 'high',
    trend: 'up',
    trendPercentage: 5.8,
    description: 'Leads da Zona Leste aumentaram 15%.',
    title: 'Potencial de captação na Zona Leste'
  },
  {
    id: '4',
    name: 'Interesse em Saúde',
    type: 'interest',
    count: 28,
    impact: 15500,
    urgency: 'low',
    trend: 'stable',
    trendPercentage: 0,
    description: 'Interesse estável em cursos da área da Saúde.',
    title: 'Demanda constante em Saúde'
  },
  {
    id: '5',
    name: 'Medicina Veterinária',
    type: 'course',
    count: 19,
    impact: 14300,
    urgency: 'medium',
    trend: 'up',
    trendPercentage: 6.9,
    description: 'Campanhas recentes aumentaram o interesse em Medicina Veterinária.',
    title: 'Oportunidade em Medicina Veterinária'
  },
];

// Mock data for segmentation/bar chart (by type)
const mockSegments = [
  { name: 'Cursos', value: 118, color: '#6366F1', icon: <Users className="w-4 h-4 text-indigo-500" /> },
  { name: 'Localização', value: 31, color: '#16A34A', icon: <MapPin className="w-4 h-4 text-green-600" /> },
  { name: 'Interesses', value: 28, color: '#F59E42', icon: <PieChart className="w-4 h-4 text-yellow-500" /> },
];

// Mock time series for Tendências
const mockTrends = [
  { month: 'Jan', oportunidade: 78 },
  { month: 'Fev', oportunidade: 84 },
  { month: 'Mar', oportunidade: 97 },
  { month: 'Abr', oportunidade: 110 },
  { month: 'Mai', oportunidade: 118 },
];

// Mock recommendations
const mockRecommendations = [
  {
    title: 'Campanha para Administração',
    description: 'Inicie uma campanha de captação voltada para Administração, aproveitando o aumento de leads qualificados.',
  },
  {
    title: 'Reforço em Pedagogia',
    description: 'Revise o processo de triagem dos leads em Pedagogia e intensifique comunicações para aumentar a conversão.',
  },
  {
    title: 'Explorar Zona Leste',
    description: 'Considere ações específicas para leads da Zona Leste com ofertas de facilidades de deslocamento ou bolsas regionais.',
  },
  {
    title: 'Expandir Saúde',
    description: 'Fortaleça a presença digital para cursos da área da Saúde, com ênfase em Medicina Veterinária.',
  },
];

// Helper for segment bar colors
const SEGMENT_COLORS = ["#6366F1", "#16A34A", "#F59E42"];

const DetailedAnalysisPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  const navigate = useNavigate();
  const location = useLocation();

  // Use opportunities from navigation state or mock
  const { opportunities = mockOpportunities, analyticsSource = 'generic' } = 
    (location.state as { opportunities?: any[], analyticsSource?: string }) || {};

  useEffect(() => {
    setCurrentProduct('recruitment');
  }, [setCurrentProduct]);

  // Calculate some summary/mock stats
  const totalOportunidades = opportunities.length;
  const totalImpact = opportunities.reduce((acc, op) => acc + (op.impact || 0), 0);

  const sumSegments = mockSegments.reduce((acc, cur) => acc + cur.value, 0);

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

        {/* VISÃO GERAL */}
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
                <div className="text-3xl font-extrabold">{totalOportunidades}</div>
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
                <div className="text-3xl font-extrabold">
                  23%
                </div>
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
                <LineChartIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold">
                  {`R$ ${totalImpact.toLocaleString('pt-BR')}`}
                </div>
                <p className="text-xs text-muted-foreground">
                  Baseado em impacto estimado das oportunidades listadas
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
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {/* Segment Bar */}
                <div className="flex-1 flex items-center justify-center min-w-[260px]">
                  <div className="w-full">
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart 
                        data={mockSegments.map(seg => ({ name: seg.name, value: seg.value }))}
                        layout="vertical"
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => [`${value} leads`, 'Quantidade']} />
                        <Bar dataKey="value" fill="#6366F1" radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="flex-1 space-y-3">
                  {opportunities.slice(0, 3).map(op => (
                    <div key={op.id} className="mb-2">
                      <div className="font-medium text-sm">{op.title || op.name}</div>
                      <div className="text-xs text-muted-foreground">{op.description || 'Oportunidade relevante.'}</div>
                      <Progress value={Math.min(100, (op.count / 100) * 100)} className="h-2 bg-muted mb-1" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TENDÊNCIAS */}
        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tendências de Interesse</CardTitle>
              <CardDescription>
                Evolução do interesse por categorias ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full px-1 md:px-6">
              {/* Gráfico de linha usando recharts */}
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={mockTrends}
                    margin={{ top: 15, right: 40, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(v: any) => `${v} oportunidades`} />
                    <Legend />
                    <Line type="monotone" dataKey="oportunidade" name="Oportunidades" stroke="#6366F1" strokeWidth={3} activeDot={{ r: 7 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center text-xs mt-4 text-muted-foreground">Tendência geral crescente de oportunidades</div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEGMENTAÇÃO */}
        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análise por Segmentos</CardTitle>
              <CardDescription>
                Distribuição de interesses por perfil demográfico e categoria
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockSegments.map((seg, idx) => (
                  <div key={seg.name} className="border rounded-lg flex flex-col items-center bg-muted/70 p-4 gap-3 shadow-sm">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full" style={{ background: seg.color, opacity: 0.16 }}>
                      {seg.icon}
                    </div>
                    <div className="font-semibold text-sm">{seg.name}</div>
                    <div className="text-xs">{seg.value} leads</div>
                    <div className="w-full">
                      <div className="h-2 rounded bg-muted">
                        <div
                          className="h-2 rounded"
                          style={{
                            width: `${(seg.value / sumSegments) * 100}%`,
                            background: seg.color,
                            opacity: 0.9,
                            transition: 'width 0.5s',
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* RECOMENDAÇÕES */}
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
                {mockRecommendations.map((rec, i) => (
                  <div key={i} className="p-4 border rounded-lg bg-muted">
                    <h3 className="font-medium">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default DetailedAnalysisPage;
