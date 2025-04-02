
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, PieChart, BarChart3, BarChart } from 'lucide-react';
import ModelPerformanceMetrics from './ModelPerformanceMetrics';
import EnrollmentPredictionDashboard from './EnrollmentPredictionDashboard';
import ChannelPerformancePrediction from './ChannelPerformancePrediction';

const PredictiveReportingDashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2024.2');
  
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Relatórios Preditivos</h1>
          <p className="text-muted-foreground">
            Painel estratégico com análises preditivas e métricas de desempenho
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList>
              <TabsTrigger value="2023.2">2023.2</TabsTrigger>
              <TabsTrigger value="2024.1">2024.1</TabsTrigger>
              <TabsTrigger value="2024.2">2024.2</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar Relatório
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="enrollment" className="space-y-6">
        <TabsList className="mb-6">
          <TabsTrigger value="enrollment" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Previsão de Matrículas
          </TabsTrigger>
          <TabsTrigger value="channels" className="gap-2">
            <PieChart className="h-4 w-4" />
            Performance por Canal
          </TabsTrigger>
          <TabsTrigger value="metrics" className="gap-2">
            <BarChart className="h-4 w-4" />
            Métricas do Modelo
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="enrollment" className="m-0">
          <EnrollmentPredictionDashboard selectedPeriod={selectedPeriod} />
        </TabsContent>
        
        <TabsContent value="channels" className="m-0">
          <ChannelPerformancePrediction selectedPeriod={selectedPeriod} />
        </TabsContent>
        
        <TabsContent value="metrics" className="m-0">
          <ModelPerformanceMetrics selectedPeriod={selectedPeriod} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PredictiveReportingDashboard;
