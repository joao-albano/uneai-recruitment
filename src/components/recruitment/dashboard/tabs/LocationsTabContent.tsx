
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const LocationsTabContent: React.FC = () => {
  // Dados fictícios para análise por localidades
  const locationData = [
    { name: 'Zona Sul', count: 520, percentage: 35, conversion: 23.8, color: '#8B5CF6' },
    { name: 'Zona Norte', count: 380, percentage: 25, conversion: 19.5, color: '#EC4899' },
    { name: 'Zona Leste', count: 280, percentage: 18, conversion: 21.2, color: '#F97316' },
    { name: 'Zona Oeste', count: 180, percentage: 12, conversion: 17.3, color: '#10B981' },
    { name: 'Centro', count: 150, percentage: 10, conversion: 22.7, color: '#3B82F6' },
  ];

  // Dados de comparação com o período anterior
  const comparisonData = [
    { name: 'Zona Sul', atual: 520, anterior: 470 },
    { name: 'Zona Norte', atual: 380, anterior: 360 },
    { name: 'Zona Leste', atual: 280, anterior: 310 },
    { name: 'Zona Oeste', atual: 180, anterior: 150 },
    { name: 'Centro', atual: 150, anterior: 120 },
  ];

  // Dados de distância média
  const distanceData = [
    { name: 'Zona Sul', distance: 4.2 },
    { name: 'Zona Norte', distance: 6.8 },
    { name: 'Zona Leste', distance: 7.5 },
    { name: 'Zona Oeste', distance: 5.3 },
    { name: 'Centro', distance: 3.1 },
  ];

  const totalLeads = locationData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total por Localidade</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLeads}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Distribuídos em 5 regiões
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Região Principal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Zona Sul</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                +10.6% 
              </Badge>
              <span className="text-xs text-muted-foreground">vs mês anterior</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Distância Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5.4 km</div>
            <Progress 
              value={5.4} 
              max={10}
              className="h-2 mt-2"
            />
            <div className="text-xs text-muted-foreground mt-1">
              Deslocamento médio até a instituição
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos de distribuição e comparação */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Volume de Leads por Região</CardTitle>
            <CardDescription>
              Comparação com o período anterior (último trimestre)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                atual: { color: "#8b5cf6" },
                anterior: { color: "#d4d4d8" },
              }}
              className="w-full aspect-[4/3]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={comparisonData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent 
                        formatter={(value: any) => [`${value} leads`, '']} 
                      />
                    }
                  />
                  <Legend />
                  <Bar dataKey="atual" name="Período Atual" fill="#8b5cf6" />
                  <Bar dataKey="anterior" name="Período Anterior" fill="#d4d4d8" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Distância Média por Região</CardTitle>
            <CardDescription>
              Deslocamento médio dos alunos até a instituição (km)
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChartContainer
              config={{
                distance: { color: "#3b82f6" },
              }}
              className="w-full aspect-[4/3]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={distanceData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent 
                        formatter={(value: any) => [`${value} km`, 'Distância']} 
                      />
                    }
                  />
                  <Legend />
                  <Bar dataKey="distance" name="Distância Média" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabela de performance por região */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Detalhada por Região</CardTitle>
          <CardDescription>
            Métricas de volume e conversão para cada localidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Região</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Leads</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">% do Total</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Taxa de Conversão</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Dist. Média</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Potencial</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {locationData.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-muted/30'}>
                    <td className="px-4 py-3 text-sm font-medium flex items-center">
                      <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-center">{item.count}</td>
                    <td className="px-4 py-3 text-sm text-center">{item.percentage}%</td>
                    <td className="px-4 py-3 text-sm text-center">{item.conversion}%</td>
                    <td className="px-4 py-3 text-sm text-center">{distanceData[index].distance} km</td>
                    <td className="px-4 py-3 text-sm text-center">
                      <Badge 
                        variant="outline"
                        className={index % 3 === 0 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : index % 3 === 1 
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }
                      >
                        {index % 3 === 0 ? "Alto" : index % 3 === 1 ? "Médio" : "Em observação"}
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

export default LocationsTabContent;
