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
        <TabsList className="grid grid-cols-7 w-full mb-6">
          <TabsTrigger value="architecture">Arquitetura</TabsTrigger>
          <TabsTrigger value="funnels">Funis</TabsTrigger>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="attendance">Atendimento</TabsTrigger>
          <TabsTrigger value="predictions">Previsões</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
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
                  <li><code>/components/recruitment/predictive/</code> - Componentes para análise preditiva e ML</li>
                  <li><code>/components/recruitment/analytics/</code> - Componentes de análise e relatórios</li>
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
        
        <TabsContent value="attendance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Módulo de Atendimento</CardTitle>
              <CardDescription>Implementação e estrutura do sistema de atendimento multicanal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Arquivos Principais</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><code>ConversationalAI.tsx</code> - Componente principal do sistema de conversação</li>
                  <li><code>ConversationInterface.tsx</code> - Interface de chat com lead/candidato</li>
                  <li><code>ConversationChatArea.tsx</code> - Área de mensagens e interação</li>
                  <li><code>WhatsAppTab.tsx</code> - Interface do canal WhatsApp</li>
                  <li><code>MessageBubble.tsx</code> - Componente de exibição de mensagens</li>
                  <li><code>MessageInput.tsx</code> - Entrada de texto para envio de mensagens</li>
                  <li><code>ConversationHeader.tsx</code> - Cabeçalho com informações do atendimento</li>
                  <li><code>ConversationSidebar.tsx</code> - Barra lateral para gerenciamento de conversas</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Estrutura de Dados</h3>
                <p className="text-muted-foreground mt-1">
                  O modelo de dados de conversações inclui:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><code>Conversation</code> - Dados da conversa (lead, canal, status, etc)</li>
                  <li><code>ConversationMessage</code> - Mensagens individuais trocadas</li>
                  <li><code>ActiveConversation</code> - Representação de conversas ativas</li>
                  <li><code>Message</code> - Formato interno de mensagens com análise</li>
                  <li><code>Agent</code> - Dados dos atendentes disponíveis</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Múltiplos Canais</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema suporta atendimento nos seguintes canais:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><strong>WhatsApp:</strong> Principal canal de comunicação com leads</li>
                  <li><strong>Email:</strong> Comunicação formal com candidatos</li>
                  <li><strong>Voz:</strong> Chamadas telefônicas para atendimento personalizado</li>
                  <li><strong>Omnichannel:</strong> Módulo orquestrador de canais em <code>OmnichannelOrchestration.tsx</code></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Inteligência Artificial</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema integra IA para:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><strong>Análise de Emoções:</strong> Detecção do estado emocional do lead</li>
                  <li><strong>Análise de Intenções:</strong> Identificação do objetivo do lead</li>
                  <li><strong>Detecção de Objeções:</strong> Reconhecimento de barreiras para conversão</li>
                  <li><strong>Sugestões de Resposta:</strong> Geração de respostas contextuais</li>
                  <li><strong>Atendimento Automatizado:</strong> Bots para primeiro atendimento</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Agendamentos</h3>
                <p className="text-muted-foreground mt-1">
                  Integração com sistema de agendamentos:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><code>useScheduleData.ts</code> - Hook principal para dados de agendamentos</li>
                  <li><code>useScheduleManagement.ts</code> - Hook para gerenciamento de agendamentos</li>
                  <li><code>useScheduleOperations.ts</code> - Operações de CRUD em agendamentos</li>
                  <li><code>ScheduleView.tsx</code> - Visualização de agendamentos</li>
                  <li><code>ScheduleDialogs.tsx</code> - Diálogos para criação e edição</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Integração com APIs Externas</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema se integra com:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><code>useWhatsAppHistory.ts</code> - Integração com API de WhatsApp</li>
                  <li><code>useVoiceCallHistory.ts</code> - Integração com API de chamadas</li>
                  <li><code>useVoiceCallConfig.ts</code> - Configuração de integrações de voz</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Rotas e Páginas</h3>
                <p className="text-muted-foreground mt-1">
                  Páginas relacionadas a atendimento:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><code>ConversationPage.tsx</code> - Página principal de conversações</li>
                  <li><code>ConversationalAIPage.tsx</code> - Página de atendimento com IA</li>
                  <li><code>LeadConversationPage.tsx</code> - Página de conversa com lead específico</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Módulo de Previsões</CardTitle>
              <CardDescription>Sistema de previsão de matrículas e análise preditiva</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Arquivos Principais</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><code>EnrollmentPredictionsPage.tsx</code> - Página principal de previsões de matrículas</li>
                  <li><code>PredictiveReportingPage.tsx</code> - Página de relatórios preditivos</li>
                  <li><code>EnrollmentPredictionEngine.tsx</code> - Componente principal do motor de previsão</li>
                  <li><code>EnrollmentPredictionDashboard.tsx</code> - Dashboard com gráficos e métricas de previsão</li>
                  <li><code>ModelPerformanceMetrics.tsx</code> - Métricas de desempenho do modelo preditivo</li>
                  <li><code>ChannelPerformancePrediction.tsx</code> - Previsões de desempenho por canal</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Estrutura de Dados</h3>
                <p className="text-muted-foreground mt-1">
                  O modelo de dados de previsões inclui:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><code>EnrollmentPrediction</code> - Previsões de matrículas para cada curso</li>
                  <li><code>ChannelPerformance</code> - Dados de desempenho por canal</li>
                  <li><code>ChannelDistribution</code> - Distribuição de leads entre canais</li>
                  <li>Métricas de confiança e risco para cada previsão</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Algoritmos e Modelos</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema de previsão utiliza os seguintes algoritmos:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><strong>Ensemble Learning:</strong> Combinação de múltiplos algoritmos (XGBoost, Random Forest)</li>
                  <li><strong>Séries Temporais:</strong> Para análise de tendências históricas</li>
                  <li><strong>Modelos de Regressão:</strong> Para prever quantidade de matrículas</li>
                  <li><strong>Análise de Sentimento:</strong> Para avaliar intenção de leads com base em interações</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Integração com AI</h3>
                <p className="text-muted-foreground mt-1">
                  O módulo se integra com serviços de AI:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li>Função <code>analyzeStudentBehavior</code> em <code>aiAnalysis.ts</code> para análise comportamental</li>
                  <li>Configuração via <code>getOpenAIConfig</code> para personalizar modelo e parâmetros</li>
                  <li>Sugestões de ações com base em análise preditiva</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Módulo de Analytics</CardTitle>
              <CardDescription>Análise de dados e visualizações para tomada de decisão</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Arquivos Principais</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><code>AnalyticsManagement.tsx</code> - Componente principal de analytics</li>
                  <li><code>ChannelConversionChart.tsx</code> - Gráfico de conversão por canal</li>
                  <li><code>ChannelDistributionChart.tsx</code> - Gráfico de distribuição por canal</li>
                  <li><code>AnalyticsTab.tsx</code> - Componente de análise na conversação de leads</li>
                  <li><code>EnhancedFunnelChart.tsx</code> - Gráfico avançado de funil</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Métricas Principais</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema de analytics rastreia as seguintes métricas:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li><strong>Conversão por Estágio:</strong> Taxa de conversão em cada estágio do funil</li>
                  <li><strong>ROI por Canal:</strong> Retorno sobre investimento em cada canal</li>
                  <li><strong>Custo por Lead:</strong> Custo médio de aquisição por canal</li>
                  <li><strong>Tempo de Conversão:</strong> Ciclo médio desde o primeiro contato até a matrícula</li>
                  <li><strong>Distribuição Geográfica:</strong> Origem geográfica dos leads</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Visualizações</h3>
                <p className="text-muted-foreground mt-1">
                  O módulo inclui as seguintes visualizações:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li>Gráficos de funil para análise de estágios</li>
                  <li>Gráficos de barras para comparação entre canais</li>
                  <li>Gráficos de linha para análise temporal</li>
                  <li>Gráficos de pizza para distribuição</li>
                  <li>Tabelas interativas para análise detalhada</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Exportação de Dados</h3>
                <p className="text-muted-foreground mt-1">
                  Funcionalidades de exportação:
                </p>
                <ul className="mt-2 space-y-1 list-disc pl-5">
                  <li>Exportação para CSV via <code>papaparse</code></li>
                  <li>Exportação para XLSX via <code>xlsx</code></li>
                  <li>Geração de relatórios PDF via <code>jspdf</code></li>
                  <li>Filtros personalizáveis pré-exportação</li>
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
