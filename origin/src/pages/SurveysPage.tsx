
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SurveysPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Pesquisas</h1>
        <Card>
          <CardHeader>
            <CardTitle>Gerenciamento de Pesquisas</CardTitle>
            <CardDescription>Configure e monitore pesquisas para alunos e responsáveis</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-12 min-h-[400px]">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Módulo de Pesquisas em Desenvolvimento</h2>
              <p className="text-muted-foreground">
                Este módulo estará disponível em breve com funcionalidades para criação e análise de pesquisas.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SurveysPage;
