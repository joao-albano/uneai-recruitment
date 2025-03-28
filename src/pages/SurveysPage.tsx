
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { DataProvider } from '@/context/DataContext';
import { useProduct } from '@/context/ProductContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Send, MessageSquare } from 'lucide-react';

const SurveysContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pesquisas</h1>
          <p className="text-muted-foreground">
            Gerencie as pesquisas com alunos e responsáveis
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nova Pesquisa
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pesquisa Diagnóstica</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Identifica fatores de risco para evasão escolar através de formulários enviados para os responsáveis.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Enviadas: 42</div>
                <Button size="sm" variant="outline">
                  <Send className="mr-2 h-3 w-3" />
                  Enviar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pesquisa de Satisfação</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Avalia a satisfação dos responsáveis com a instituição e identifica possíveis problemas.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Enviadas: 28</div>
                <Button size="sm" variant="outline">
                  <Send className="mr-2 h-3 w-3" />
                  Enviar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Pesquisa Pós-Atendimento</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Coleta feedback após atendimentos realizados com os responsáveis.
              </p>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Enviadas: 15</div>
                <Button size="sm" variant="outline">
                  <Send className="mr-2 h-3 w-3" />
                  Enviar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Envios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-4 border-b px-4 py-3 font-medium">
              <div>Destinatário</div>
              <div>Tipo</div>
              <div>Data</div>
              <div>Status</div>
            </div>
            <div className="divide-y">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-4 px-4 py-3">
                  <div>Responsável {i}</div>
                  <div>Diagnóstica</div>
                  <div>{new Date().toLocaleDateString()}</div>
                  <div className="flex items-center">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    Enviado
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const SurveysPage: React.FC = () => {
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
        <SurveysContent />
      </div>
    </Layout>
  );
};

// Wrap with the necessary providers
const SurveysPageWithProviders: React.FC = () => {
  return (
    <DataProvider>
      <SurveysPage />
    </DataProvider>
  );
};

export default SurveysPageWithProviders;
