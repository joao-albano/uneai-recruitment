
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, LineChart, ResponsiveContainer, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell } from 'recharts';
import { FunnelChart, Funnel, LabelList } from 'recharts';
import { conversionData } from '../data/analyticsData';

const ConversionTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Métricas de conversão do funil */}
      <Card>
        <CardHeader>
          <CardTitle>Funil de Conversão</CardTitle>
          <CardDescription>Taxa de conversão em cada etapa do processo de captação</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Tooltip formatter={(value) => [`${value} leads`, 'Quantidade']} />
              <Funnel
                dataKey="count"
                data={conversionData.funnelStages}
                nameKey="stage"
                isAnimationActive
              >
                <LabelList 
                  position="right"
                  fill="#000"
                  stroke="none"
                  dataKey="stage"
                  fontSize={12}
                  fontWeight="bold"
                />
                <LabelList
                  position="center"
                  fill="#fff"
                  stroke="none"
                  dataKey="count"
                  fontSize={16}
                  fontWeight="bold"
                />
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Gráficos */}
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
