
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { DataProvider } from '@/context/DataContext';
import { useProduct } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';

const ReportsContent: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  
  const handleDownload = () => {
    toast({
      title: "Relatório gerado",
      description: "O arquivo foi preparado para download.",
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Exportar
        </Button>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="performance">Desempenho</TabsTrigger>
          <TabsTrigger value="attendance">Frequência</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resumo de Relatórios</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-2 rounded-md border p-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Relatório de Evasão</p>
                    <p className="text-sm text-muted-foreground">Análise detalhada</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 rounded-md border p-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Relatório de Atendimentos</p>
                    <p className="text-sm text-muted-foreground">Resumo mensal</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 rounded-md border p-4">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Relatório de Ações</p>
                    <p className="text-sm text-muted-foreground">Ações preventivas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Desempenho dos Alunos</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Relatórios de desempenho acadêmico serão exibidos aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="attendance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Frequência Escolar</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Relatórios de frequência e faltas serão exibidos aqui.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ReportsPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  
  // Definir o produto atual como 'retention'
  React.useEffect(() => {
    setCurrentProduct('retention');
  }, [setCurrentProduct]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto p-6">
        <ReportsContent />
      </div>
    </Layout>
  );
};

// Wrap with the necessary providers
const ReportsPageWithProviders: React.FC = () => {
  return (
    <DataProvider>
      <ReportsPage />
    </DataProvider>
  );
};

export default ReportsPageWithProviders;
