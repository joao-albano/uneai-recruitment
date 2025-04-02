
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ChannelDistributionChart } from './charts/ChannelDistributionChart';
import { ChannelConversionChart } from './charts/ChannelConversionChart';

// Mock channel data
const channelData = [
  { 
    name: 'WhatsApp', 
    leads: 420, 
    enrollment: 85, 
    conversionRate: 20.2,
    costPerLead: 38.5,
    costPerEnrollment: 190.4,
    targetEnrollment: 90,
    predictedEnrollment: 98,
    confidence: 'alta'
  },
  { 
    name: 'Facebook', 
    leads: 350, 
    enrollment: 52, 
    conversionRate: 14.9,
    costPerLead: 42.3,
    costPerEnrollment: 284.6,
    targetEnrollment: 60,
    predictedEnrollment: 55,
    confidence: 'média'
  },
  { 
    name: 'Google', 
    leads: 280, 
    enrollment: 70, 
    conversionRate: 25.0,
    costPerLead: 50.2,
    costPerEnrollment: 200.8,
    targetEnrollment: 65,
    predictedEnrollment: 72,
    confidence: 'alta'
  },
  { 
    name: 'Email', 
    leads: 180, 
    enrollment: 22, 
    conversionRate: 12.2,
    costPerLead: 25.0,
    costPerEnrollment: 204.5,
    targetEnrollment: 30,
    predictedEnrollment: 24,
    confidence: 'média'
  },
  { 
    name: 'SMS', 
    leads: 95, 
    enrollment: 12, 
    conversionRate: 12.6,
    costPerLead: 18.5,
    costPerEnrollment: 146.8,
    targetEnrollment: 15,
    predictedEnrollment: 13,
    confidence: 'alta'
  },
  { 
    name: 'Eventos', 
    leads: 120, 
    enrollment: 35, 
    conversionRate: 29.2,
    costPerLead: 85.0,
    costPerEnrollment: 291.4,
    targetEnrollment: 30,
    predictedEnrollment: 38,
    confidence: 'alta'
  }
];

// Calculate totals
const totalLeads = channelData.reduce((sum, item) => sum + item.leads, 0);
const totalEnrollment = channelData.reduce((sum, item) => sum + item.enrollment, 0);
const totalPredicted = channelData.reduce((sum, item) => sum + item.predictedEnrollment, 0);
const totalTarget = channelData.reduce((sum, item) => sum + item.targetEnrollment, 0);
const averageConversionRate = channelData.reduce((sum, item) => sum + item.conversionRate, 0) / channelData.length;
const averageCostPerLead = channelData.reduce((sum, item) => sum + item.costPerLead, 0) / channelData.length;

interface ChannelPerformancePredictionProps {
  selectedPeriod: string;
}

const ChannelPerformancePrediction: React.FC<ChannelPerformancePredictionProps> = ({ selectedPeriod }) => {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Leads por Canal</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLeads}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {channelData.length} canais ativos
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversão Média</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageConversionRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground mt-1">
              Taxa média de conversão em todos os canais
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Previsão de Matrículas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalPredicted}</div>
            <Progress 
              value={(totalPredicted / totalTarget) * 100} 
              className={`h-2 mt-2 ${totalPredicted >= totalTarget ? 'bg-green-500' : 'bg-amber-500'}`}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {((totalPredicted / totalTarget) * 100).toFixed(1)}% da meta ({totalTarget})
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Leads por Canal</CardTitle>
            <CardDescription>
              Volume de leads captados por cada canal de marketing
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChannelDistributionChart />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conversão por Canal</CardTitle>
            <CardDescription>
              Percentual de conversão de leads para matrículas por canal
            </CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ChannelConversionChart />
          </CardContent>
        </Card>
      </div>
      
      {/* Detailed Channel Table */}
      <Card>
        <CardHeader>
          <CardTitle>Desempenho Detalhado por Canal</CardTitle>
          <CardDescription>
            Métricas de desempenho e previsões para cada canal de captação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">Canal</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Leads</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Conversão</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Custo/Lead</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Meta</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Previsão</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">% Atingimento</th>
                  <th className="px-4 py-3 text-center text-sm font-medium">Confiança</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {channelData.map((item, index) => {
                  const percentage = (item.predictedEnrollment / item.targetEnrollment) * 100;
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-muted/30'}>
                      <td className="px-4 py-3 text-sm">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-center">{item.leads}</td>
                      <td className="px-4 py-3 text-sm text-center">{item.conversionRate.toFixed(1)}%</td>
                      <td className="px-4 py-3 text-sm text-center">R$ {item.costPerLead.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm text-center">{item.targetEnrollment}</td>
                      <td className="px-4 py-3 text-sm text-center">{item.predictedEnrollment}</td>
                      <td className="px-4 py-3 text-sm text-center">
                        <div className="flex items-center justify-center">
                          <span className={percentage >= 100 
                            ? 'text-green-600' 
                            : percentage >= 80 
                              ? 'text-amber-600' 
                              : 'text-red-600'
                          }>
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <Badge
                          variant="outline"
                          className={
                            item.confidence === 'alta' 
                              ? 'bg-green-50 text-green-700 border-green-200' 
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }
                        >
                          {item.confidence}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChannelPerformancePrediction;
