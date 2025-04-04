import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const ChannelsTabContent: React.FC = () => {
  // Dados fictícios para análise de canais
  const channelData = [
    { name: 'WhatsApp', count: 450, percentage: 32, color: '#25D366', conversion: 24.5 },
    { name: 'Facebook', count: 320, percentage: 23, color: '#1877F2', conversion: 18.2 },
    { name: 'Google', count: 280, percentage: 20, color: '#4285F4', conversion: 22.7 },
    { name: 'Email', count: 175, percentage: 12, color: '#DB4437', conversion: 15.3 },
    { name: 'Eventos', count: 110, percentage: 8, color: '#8B5CF6', conversion: 26.4 },
    { name: 'Instagram', count: 70, percentage: 5, color: '#E1306C', conversion: 19.8 },
  ];

  // Dados de performance semanal
  const weeklyData = [
    { name: 'Seg', whatsapp: 45, facebook: 32, google: 28 },
    { name: 'Ter', whatsapp: 52, facebook: 38, google: 30 },
    { name: 'Qua', whatsapp: 48, facebook: 35, google: 25 },
    { name: 'Qui', whatsapp: 65, facebook: 42, google: 32 },
    { name: 'Sex', whatsapp: 72, facebook: 48, google: 38 },
    { name: 'Sáb', whatsapp: 38, facebook: 25, google: 20 },
    { name: 'Dom', whatsapp: 30, facebook: 20, google: 18 },
  ];

  const totalLeads = channelData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLeads}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Últimos 30 dias
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Canal Mais Efetivo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">WhatsApp</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                +12.5% 
              </Badge>
              <span className="text-xs text-muted-foreground">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversão Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">21.3%</div>
            <Progress 
              value={21.3} 
              max={100}
              className="h-2 mt-2"
            />
            <div className="text-xs text-muted-foreground mt-1">
              Meta: 25%
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos de distribuição e desempenho */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Leads por Canal</CardTitle>
            <CardDescription>
              Porcentagem de leads captados por cada canal
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                leads: { color: "#8b5cf6" },
              }}
              className="w-full aspect-[4/3]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={channelData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {channelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip
                    content={
                      <ChartTooltipContent 
                        formatter={(value: any) => [`${value} leads`, 'Volume']} 
                        labelFormatter={(value: any) => `Canal: ${value}`}
                      />
                    }
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Desempenho Semanal dos Principais Canais</CardTitle>
            <CardDescription>
              Volume de leads captados por dia da semana
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80 overflow-hidden">
            <ChartContainer
              config={{
                whatsapp: { color: "#25D366" },
                facebook: { color: "#1877F2" },
                google: { color: "#4285F4" },
              }}
              className="w-full h-full max-w-full"
            >
              <ResponsiveContainer width="99%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={weeklyData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 10,
                    bottom: 25, 
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    height={30}
                    tick={{ fontSize: 12 }}
                    tickMargin={10}
                  />
                  <YAxis 
                    width={30}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent 
                        formatter={(value: any) => [`${value} leads`, '']} 
                      />
                    }
                  />
                  <Legend 
                    wrapperStyle={{ 
                      paddingTop: 10,
                      fontSize: '12px',
                      width: '90%'
                    }} 
                  />
                  <Bar dataKey="whatsapp" name="WhatsApp" fill="#25D366" />
                  <Bar dataKey="facebook" name="Facebook" fill="#1877F2" />
                  <Bar dataKey="google" name="Google" fill="#4285F4" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabela de performance dos canais */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Detalhada por Canal</CardTitle>
          <CardDescription>
            Métricas de volume e conversão para cada canal de captação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Canal</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Leads</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">% do Total</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Taxa de Conversão</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">CPA</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Tendência</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {channelData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-muted/30'}>
                    <td className="px-4 py-3 text-sm font-medium flex items-center">
                      <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">{item.count}</td>
                    <td className="px-4 py-3 text-sm text-center">{item.percentage}%</td>
                    <td className="px-4 py-3 text-sm text-center">{item.conversion}%</td>
                    <td className="px-4 py-3 text-sm text-center">R$ {(Math.random() * 100 + 50).toFixed(2)}</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Badge 
                        variant="outline"
                        className={index % 3 === 0 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : index % 3 === 1 
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-red-50 text-red-700 border-red-200"
                        }
                      >
                        {index % 3 === 0 ? "↑ Em alta" : index % 3 === 1 ? "→ Estável" : "↓ Em queda"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelsTabContent;
