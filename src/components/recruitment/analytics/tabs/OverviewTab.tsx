
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, LineChart, PieChart, ResponsiveContainer, Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp, Users, ChartBar, ChartPie } from 'lucide-react';
import { overviewData } from '../data/analyticsData';

const OverviewTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Cards de métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-blue-500">
                <Users className="h-5 w-5" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Total de Leads
                </p>
                <div className="flex items-center justify-end">
                  <h3 className="text-2xl font-bold">{overviewData.totalLeads}</h3>
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                    <span className="flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {overviewData.leadsGrowth}%
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-green-500">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Taxa de Conversão
                </p>
                <div className="flex items-center justify-end">
                  <h3 className="text-2xl font-bold">{overviewData.conversionRate}%</h3>
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                    <span className="flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {overviewData.conversionGrowth}%
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-amber-500">
                <ChartBar className="h-5 w-5" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Matrículas
                </p>
                <div className="flex items-center justify-end">
                  <h3 className="text-2xl font-bold">{overviewData.totalMatriculas}</h3>
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                    <span className="flex items-center">
                      <ArrowUp className="h-3 w-3 mr-1" />
                      {overviewData.matriculasGrowth}%
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white bg-purple-500">
                <ChartPie className="h-5 w-5" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  Custo por Lead
                </p>
                <div className="flex items-center justify-end">
                  <h3 className="text-2xl font-bold">R$ {overviewData.averageCost}</h3>
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">
                    <span className="flex items-center">
                      <ArrowDown className="h-3 w-3 mr-1" />
                      {overviewData.costReduction}%
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Leads Diários</CardTitle>
            <CardDescription>Volume de leads nos últimos 8 dias</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={overviewData.leadsPerDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="#8884d8" 
                  activeDot={{ r: 8 }} 
                  name="Leads"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversão por Fonte</CardTitle>
            <CardDescription>Taxa de conversão por canal de captação</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={overviewData.conversionBySource}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
                <Legend />
                <Bar dataKey="rate" fill="#8884d8" name="Taxa de Conversão (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Campanhas Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Campanhas Recentes</CardTitle>
          <CardDescription>Desempenho das últimas campanhas de captação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Campanha</th>
                  <th className="text-center py-3 px-4 font-medium">Status</th>
                  <th className="text-center py-3 px-4 font-medium">Leads</th>
                  <th className="text-center py-3 px-4 font-medium">Conversão</th>
                  <th className="text-center py-3 px-4 font-medium">Custo</th>
                  <th className="text-center py-3 px-4 font-medium">ROI</th>
                </tr>
              </thead>
              <tbody>
                {overviewData.recentCampaigns.map((campaign, index) => (
                  <tr key={campaign.id} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                    <td className="py-3 px-4">{campaign.name}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge className={campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                        {campaign.status === 'active' ? 'Ativa' : 'Concluída'}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">{campaign.leads}</td>
                    <td className="py-3 px-4 text-center">{campaign.conversion}%</td>
                    <td className="py-3 px-4 text-center">R$ {campaign.cost.toLocaleString()}</td>
                    <td className="py-3 px-4 text-center">{campaign.roi}x</td>
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

export default OverviewTab;
