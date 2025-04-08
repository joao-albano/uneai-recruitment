
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, PieChart, LineChart, ResponsiveContainer, Bar, Pie, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { ArrowUp, ArrowDown, TrendingUp } from 'lucide-react';
import { channelsData } from '../data/analyticsData';

const ChannelsTab: React.FC = () => {
  // Calcular totais para as métricas
  const totalLeads = channelsData.channelPerformance.reduce((sum, channel) => sum + channel.leads, 0);
  const totalCost = channelsData.channelPerformance.reduce((sum, channel) => sum + channel.cost, 0);
  const averageCostPerLead = totalCost / totalLeads;
  const averageConversion = channelsData.channelPerformance.reduce((sum, channel) => sum + channel.conversion, 0) / channelsData.channelPerformance.length;
  
  // Helper para determinar a cor da tendência
  const getTrendColor = (value: number) => {
    return value > 0 ? 'text-green-500' : 'text-red-500';
  };
  
  return (
    <div className="space-y-6">
      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLeads}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {channelsData.channelPerformance.length} canais ativos
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Investimento Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ {totalCost.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Todos os canais
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Custo Médio por Lead</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">R$ {averageCostPerLead.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Média de todos os canais
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversão Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageConversion.toFixed(1)}%</div>
            <Progress value={averageConversion} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>
      
      {/* Gráficos de distribuição */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Leads por Canal</CardTitle>
            <CardDescription>Volume de leads captados por canal</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={channelsData.channelDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {channelsData.channelDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => {
                  // Convert values to numbers to ensure proper arithmetic operations
                  const numericValue = Number(value);
                  const percentage = (numericValue / totalLeads * 100).toFixed(1);
                  return [`${numericValue} leads (${percentage}%)`, name];
                }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Desempenho Semanal</CardTitle>
            <CardDescription>Volume diário de leads por canal</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelsData.weeklyDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="whatsapp" name="WhatsApp" fill="#25D366" />
                <Bar dataKey="facebook" name="Facebook" fill="#1877F2" />
                <Bar dataKey="instagram" name="Instagram" fill="#E1306C" />
                <Bar dataKey="google" name="Google" fill="#4285F4" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabela de desempenho por canal */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho por Canal</CardTitle>
          <CardDescription>Métricas detalhadas de cada canal de captação</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Canal</th>
                  <th className="text-center py-3 px-4 font-medium">Leads</th>
                  <th className="text-center py-3 px-4 font-medium">CPL</th>
                  <th className="text-center py-3 px-4 font-medium">Conversão</th>
                  <th className="text-center py-3 px-4 font-medium">ROI</th>
                  <th className="text-center py-3 px-4 font-medium">Crescimento</th>
                </tr>
              </thead>
              <tbody>
                {channelsData.channelPerformance.map((channel, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-muted/30' : ''}>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: channelsData.channelDistribution.find(c => c.name === channel.name)?.color || '#ccc' }}></div>
                        {channel.name}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">{channel.leads}</td>
                    <td className="py-3 px-4 text-center">R$ {channel.costPerLead.toFixed(2)}</td>
                    <td className="py-3 px-4 text-center">{channel.conversion}%</td>
                    <td className="py-3 px-4 text-center">{channel.roi}x</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center">
                        {channel.growth > 0 ? (
                          <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                        )}
                        <span className={getTrendColor(channel.growth)}>
                          {Math.abs(channel.growth)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Métricas de ROI */}
      <Card>
        <CardHeader>
          <CardTitle>ROI por Canal</CardTitle>
          <CardDescription>Retorno sobre investimento de cada canal</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={channelsData.channelPerformance}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip formatter={(value) => [`${value}x`, 'ROI']} />
              <Legend />
              <Bar dataKey="roi" name="ROI" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelsTab;
