
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SystemArchitectureDoc: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Arquitetura do Sistema</CardTitle>
          <CardDescription>Visão geral da estrutura e componentes principais</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Visão Geral</h3>
            <p className="text-muted-foreground mt-1">
              O sistema está construído com base em React, TypeScript e Tailwind CSS, seguindo uma arquitetura de componentes 
              modular. A aplicação utiliza o padrão de Contexto do React para gerenciamento de estado global.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Estrutura de Diretórios</h3>
            <ul className="mt-2 space-y-2 list-disc pl-5">
              <li><code>/components</code> - UI components reutilizáveis</li>
              <li><code>/context</code> - Contextos React para gerenciamento de estado</li>
              <li><code>/hooks</code> - Hooks personalizados</li>
              <li><code>/pages</code> - Componentes de página</li>
              <li><code>/routes</code> - Configuração de rotas</li>
              <li><code>/utils</code> - Funções utilitárias</li>
              <li><code>/types</code> - Definições de tipos TypeScript</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Fluxo de Dados</h3>
            <p className="text-muted-foreground mt-1">
              O fluxo de dados na aplicação segue o padrão unidirecional do React, com os dados fluindo de cima para baixo 
              através de props e sendo atualizados através dos Contextos centralizados.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Autenticação</h3>
            <p className="text-muted-foreground mt-1">
              O sistema utiliza um mecanismo de autenticação baseado em tokens, gerenciado pelo AuthContext, 
              com diferentes níveis de permissão: usuário regular, admin e super admin.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemArchitectureDoc;
