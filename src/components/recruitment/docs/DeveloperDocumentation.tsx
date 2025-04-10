
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DeveloperDocumentation: React.FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Documentação Técnica</h1>
          <p className="text-muted-foreground mt-1">
            Guia para desenvolvedores do sistema de recrutamento
          </p>
        </div>
      </div>

      <Tabs defaultValue="architecture" className="w-full">
        <TabsList className="grid grid-cols-4 w-full mb-6">
          <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
          <TabsTrigger value="funnels">Funis</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
        
        <TabsContent value="architecture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral da Arquitetura</CardTitle>
              <CardDescription>Estrutura organizacional do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Estrutura de Diretórios</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema de recrutamento está organizado nos seguintes diretórios principais:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><code>/components/recruitment/</code> - Componentes específicos de recrutamento</li>
                  <li><code>/components/recruitment/funnel/</code> - Componentes relacionados aos funis de captação</li>
                  <li><code>/components/recruitment/campaigns/</code> - Componentes de gerenciamento de campanhas</li>
                  <li><code>/components/recruitment/leads/</code> - Componentes de gerenciamento de leads</li>
                  <li><code>/hooks/recruitment/</code> - Hooks personalizados para o módulo de recrutamento</li>
                  <li><code>/types/recruitment</code> - Definições de tipos para o módulo de recrutamento</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Padrões Arquiteturais</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema utiliza os seguintes padrões:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Componentes Funcionais:</strong> Utilizamos React Hooks para gerenciar estado e ciclo de vida</li>
                  <li><strong>Custom Hooks:</strong> Lógica de negócio é encapsulada em hooks personalizados</li>
                  <li><strong>Container/Presentation Pattern:</strong> Separação entre lógica (hooks) e apresentação (componentes)</li>
                  <li><strong>Context API:</strong> Para gerenciamento de estado global quando necessário</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Fluxo de Dados</h3>
                <p className="text-muted-foreground mt-1">
                  O fluxo de dados segue uma abordagem unidirecional:
                </p>
                <ol className="mt-2 space-y-2 list-decimal pl-5">
                  <li>Dados são armazenados em hooks personalizados</li>
                  <li>Componentes consomem dados via props ou contexto</li>
                  <li>Interações do usuário disparam handlers que atualizam estado</li>
                  <li>O estado atualizado é propagado para a UI</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="funnels" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Módulo de Funis</CardTitle>
              <CardDescription>Implementação e estrutura de funis de captação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Arquivos Principais</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><code>FunnelManagement.tsx</code> - Componente principal de gerenciamento de funis</li>
                  <li><code>hooks/useFunnels.ts</code> - Hook principal para gerenciamento do estado dos funis</li>
                  <li><code>hooks/funnelTypes.ts</code> - Definições de tipos para funis</li>
                  <li><code>hooks/funnelOperations.ts</code> - Funções de manipulação de funis</li>
                  <li><code>hooks/funnelMockData.ts</code> - Dados iniciais para desenvolvimento</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Estrutura de Dados</h3>
                <p className="text-muted-foreground mt-1">
                  O modelo de dados de funis inclui:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><code>Funnel</code> - Contém informações gerais do funil e seus estágios</li>
                  <li><code>FunnelStage</code> - Representa um estágio dentro do funil</li>
                  <li>Suporte para estágios aninhados (subStages)</li>
                  <li>Controle de ativo/inativo por funil e por estágio</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Fluxo de Operações</h3>
                <p className="text-muted-foreground mt-1">
                  O módulo de funis implementa as seguintes operações:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li>Criação de novo funil (<code>handleCreateFunnel</code>)</li>
                  <li>Atualização de estágios (<code>updateFunnelStages</code>)</li>
                  <li>Ativação/desativação de funil (<code>toggleFunnelActive</code>)</li>
                  <li>Adição de estágios principais e sub-estágios</li>
                  <li>Edição de estágios existentes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Módulo de Campanhas</CardTitle>
              <CardDescription>Implementação e estrutura de campanhas de captação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Arquivos Principais</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><code>CampaignsManagement.tsx</code> - Componente principal de gerenciamento de campanhas</li>
                  <li><code>hooks/useCampaigns.ts</code> - Hook principal para gerenciamento do estado das campanhas</li>
                  <li><code>edit/CampaignEditForm.tsx</code> - Formulário de edição de campanhas</li>
                  <li><code>edit/hooks/useCampaignForm.ts</code> - Hook para gerenciar o formulário de campanha</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Estrutura de Dados</h3>
                <p className="text-muted-foreground mt-1">
                  O modelo de dados de campanhas inclui:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><code>Campaign</code> - Contém dados da campanha (nome, descrição, datas, etc)</li>
                  <li><code>ChannelType</code> - Tipos de canais disponíveis para campanhas</li>
                  <li><code>Target</code> - Informações de segmentação (público-alvo, localização, cursos)</li>
                  <li><code>Performance</code> - Métricas de desempenho da campanha</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Persistência</h3>
                <p className="text-muted-foreground mt-1">
                  Os dados de campanhas são armazenados:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li>Localmente via <code>localStorage</code> para prototipação</li>
                  <li>Chave <code>eduquest_recruitment_campaigns</code> usada para persistência</li>
                  <li>Dados demo são carregados inicialmente se não houver dados salvos</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Operações Principais</h3>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li>Criação de campanhas (<code>createCampaign</code>)</li>
                  <li>Atualização de campanhas (<code>updateCampaign</code>)</li>
                  <li>Arquivamento de campanhas (<code>archiveCampaign</code>)</li>
                  <li>Filtros por status (ativas, arquivadas)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Módulo de Leads</CardTitle>
              <CardDescription>Implementação e estrutura de gestão de leads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Arquivos Principais</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><code>LeadsManagement.tsx</code> - Componente principal de gerenciamento de leads</li>
                  <li><code>hooks/useLeadsManagement.ts</code> - Hook principal que agrega funcionalidades</li>
                  <li><code>hooks/useLeadData.ts</code> - Hook para gerenciamento dos dados de leads</li>
                  <li><code>hooks/useLeadForm.ts</code> - Hook para formulário de cadastro de leads</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Hooks Especializados</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema utiliza múltiplos hooks especializados:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><code>useLeadViewMode</code> - Gerencia modos de visualização (lista, cards, etc)</li>
                  <li><code>useLeadDialogs</code> - Controla estados de diálogos (edição, histórico, etc)</li>
                  <li><code>useLeadFilters</code> - Gerencia filtros aplicados aos leads</li>
                  <li><code>useLeadActions</code> - Agrega ações disponíveis para leads</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Estrutura de Dados</h3>
                <p className="text-muted-foreground mt-1">
                  O modelo de dados de leads inclui:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li>Dados básicos (nome, email, telefone)</li>
                  <li>Informações de curso e instituição</li>
                  <li>Estágio no funil de captação e status</li>
                  <li>Informações adicionais (filhos, preferências, etc)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Validação de Formulário</h3>
                <p className="text-muted-foreground mt-1">
                  Validação implementada usando:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><code>react-hook-form</code> para gerenciamento de formulários</li>
                  <li><code>zod</code> para esquemas de validação</li>
                  <li>Validação adaptativa baseada no tipo de instituição</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeveloperDocumentation;
