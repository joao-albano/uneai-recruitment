
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import EnrollmentPredictionEngine from '@/components/recruitment/predictions/EnrollmentPredictionEngine';
import StrategicDecisionDashboard from '@/components/recruitment/dashboard/StrategicDecisionDashboard';
import ModelPerformanceMetrics from '@/components/recruitment/predictive/ModelPerformanceMetrics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PanelTop, LineChart, BarChart3 } from 'lucide-react';

const EnrollmentPredictionsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  const [selectedPeriod, setSelectedPeriod] = useState<string>('2024.2');
  
  // Definir o produto atual como 'recruitment'
  React.useEffect(() => {
    setCurrentProduct('recruitment');
  }, [setCurrentProduct]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Previsão de Matrículas</h1>
          <p className="text-muted-foreground">
            Motor de predição inteligente com análise de probabilidade e suporte à decisão
          </p>
        </div>
        
        <Tabs defaultValue="dashboard" className="mb-6">
          <TabsList>
            <TabsTrigger value="dashboard" className="gap-2">
              <PanelTop className="h-4 w-4" />
              Dashboard Estratégico
            </TabsTrigger>
            <TabsTrigger value="predictions" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              Motor de Previsão
            </TabsTrigger>
            <TabsTrigger value="metrics" className="gap-2">
              <LineChart className="h-4 w-4" />
              Métricas do Modelo
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="m-0">
            <StrategicDecisionDashboard selectedPeriod={selectedPeriod} />
          </TabsContent>
          
          <TabsContent value="predictions" className="m-0">
            <EnrollmentPredictionEngine />
          </TabsContent>
          
          <TabsContent value="metrics" className="m-0">
            <ModelPerformanceMetrics selectedPeriod={selectedPeriod} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default EnrollmentPredictionsPage;
