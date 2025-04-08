import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, LineChart, ResponsiveContainer, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { conversionData } from '../data/analyticsData';
import EnhancedFunnelChart from '../components/EnhancedFunnelChart';
import { Users, Check, Calendar, Building } from 'lucide-react';

const ConversionTab: React.FC = () => {
  // Prepara os dados para o componente de funil aprimorado
  const funnelData = conversionData.funnelStages.map((stage, index) => {
    const colors = ['#4F46E5', '#8B5CF6', '#EC4899', '#F59E0B', '#22C55E'];
    const icons = [
      <Users key="users" className="text-indigo-600" />,
      <Check key="check" className="text-purple-600" />,
      <Calendar key="calendar" className="text-pink-600" />,
      <Users key="visit" className="text-amber-600" />,
      <Building key="building" className="text-green-600" />
    ];
    
    return {
      ...stage,
      color: colors[index % colors.length],
      icon: icons[index % icons.length]
    };
  });

  return (
    <div className="space-y-6">
      {/* Funil de Conversão Aprimorado */}
      <Card>
        <CardHeader>
          <CardTitle>Funil de Conversão</CardTitle>
          <CardDescription>Taxa de conversão em cada etapa do processo de captação</CardDescription>
        </CardHeader>
        <CardContent>
          <EnhancedFunnelChart data={funnelData} />
        </CardContent>
      </Card>
      
      {/* Gráficos - mantendo os existentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversão por Curso</CardTitle>
            <CardDescription>Taxa de conversão segmentada por curso</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData.conversionByCourse}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
                <Legend />
                <Bar dataKey="rate" fill="#8884d8" name="Conversão" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Conversão por Canal</CardTitle>
            <CardDescription>Taxa de conversão por canal de captação</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData.conversionBySource}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="source" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
                <Legend />
                <Bar dataKey="rate" fill="#8884d8" name="Conversão" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      {/* Gráfico de tendência */}
      <Card>
        <CardHeader>
          <CardTitle>Evolução da Taxa de Conversão</CardTitle>
          <CardDescription>Taxa de conversão ao longo do tempo</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={conversionData.conversionOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${value}%`} />
              <Tooltip formatter={(value) => [`${value}%`, 'Taxa de Conversão']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#8884d8" 
                name="Taxa de Conversão" 
                activeDot={{ r: 8 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Gargalos no funil */}
      <Card>
        <CardHeader>
          <CardTitle>Gargalos do Funil</CardTitle>
          <CardDescription>Principais pontos de perda de conversão</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {conversionData.bottlenecks.map((bottleneck, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-lg">{bottleneck.stage}</h4>
                    <p className="text-muted-foreground text-sm">{bottleneck.reason}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-red-600 font-bold text-lg">-{bottleneck.dropoff}%</span>
                  </div>
                </div>
                <Progress value={100 - bottleneck.dropoff} className="h-2 bg-red-200" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversionTab;
