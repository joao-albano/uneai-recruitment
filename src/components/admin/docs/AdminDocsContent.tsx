
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import SystemArchitectureDoc from './SystemArchitectureDoc';
import UploadDocumentation from './UploadDocumentation';
import IntegrationsDocumentation from './IntegrationsDocumentation';
import DataModelDocumentation from './DataModelDocumentation';

const AdminDocsContent: React.FC = () => {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Documentação do Sistema</h1>
      <p className="text-muted-foreground mb-6">
        Esta documentação contém informações importantes sobre a arquitetura, funcionamento e manutenção do sistema.
      </p>

      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
          <TabsTrigger value="uploads">Uploads</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="datamodel">Modelo de Dados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="architecture">
          <SystemArchitectureDoc />
        </TabsContent>
        
        <TabsContent value="uploads">
          <UploadDocumentation />
        </TabsContent>
        
        <TabsContent value="integrations">
          <IntegrationsDocumentation />
        </TabsContent>
        
        <TabsContent value="datamodel">
          <DataModelDocumentation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDocsContent;
