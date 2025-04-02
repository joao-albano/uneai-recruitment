
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, PieChart, BarChart } from 'lucide-react';
import EnrollmentPredictionDashboard from '../EnrollmentPredictionDashboard';
import ChannelPerformancePrediction from '../ChannelPerformancePrediction';
import ModelPerformanceMetrics from '../ModelPerformanceMetrics';

interface DashboardTabsProps {
  selectedPeriod: string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ selectedPeriod }) => {
  return (
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
  );
};

export default DashboardTabs;
