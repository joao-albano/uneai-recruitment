
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Layers, Code, Server, Share2, Lock, Network, Users, FileText, BarChart } from 'lucide-react';

const ArchitectureDocumentation: React.FC = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Arquitetura do Sistema</h1>
          <p className="text-muted-foreground mt-1">
            Documentação técnica detalhada da arquitetura do sistema de captação
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="data">Dados</TabsTrigger>
          <TabsTrigger value="integration">Integrações</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Arquitetura de Alto Nível
              </CardTitle>
              <CardDescription>Visão geral da estrutura do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Camadas Principais</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema de captação está estruturado em camadas bem definidas:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Interface do Usuário:</strong> Construída com React e Tailwind CSS</li>
                  <li><strong>Lógica de Negócio:</strong> Implementada via hooks React personalizados</li>
                  <li><strong>Gerenciamento de Estado:</strong> Combinação de React Context e estados locais</li>
                  <li><strong>API Client:</strong> Integração com serviços externos e APIs</li>
                  <li><strong>Serviços de Persistência:</strong> Armazenamento local e remoto de dados</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Princípios Arquiteturais</h3>
                <p className="text-muted-foreground mt-1">
                  A arquitetura segue estes princípios fundamentais:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Componentização:</strong> Componentes modulares e reutilizáveis</li>
                  <li><strong>Separação de Responsabilidades:</strong> Cada módulo com função específica</li>
                  <li><strong>Fluxo de Dados Unidirecional:</strong> Props down, events up</li>
                  <li><strong>Design Responsivo:</strong> Adaptação a diferentes dispositivos</li>
                  <li><strong>Extensibilidade:</strong> Facilidade para adicionar novos recursos</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Módulos Principais</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema é composto pelos seguintes módulos principais:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Gestão de Funis:</strong> Configuração e acompanhamento de funis de captação</li>
                  <li><strong>Gerenciamento de Leads:</strong> Cadastro, acompanhamento e conversão de leads</li>
                  <li><strong>Campanhas:</strong> Criação e monitoramento de campanhas de captação</li>
                  <li><strong>Atendimento:</strong> Sistema multicanal para comunicação com leads</li>
                  <li><strong>Analytics:</strong> Análise de desempenho e relatórios</li>
                  <li><strong>Previsões:</strong> Análise preditiva para estimativa de matrículas</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium">Diagrama de Arquitetura</h3>
                <div className="mt-2 p-4 bg-muted rounded-md border text-center text-muted-foreground">
                  <p className="text-sm">Diagrama simplificado da arquitetura do sistema</p>
                  <div className="mt-4 flex flex-col items-center">
                    {/* Simplified architecture diagram using divs and borders */}
                    <div className="w-full max-w-2xl border rounded-md p-4 bg-background">
                      <div className="text-center font-medium mb-2">Interface do Usuário (React + Tailwind)</div>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="border rounded p-2 text-center text-xs">Componentes UI</div>
                        <div className="border rounded p-2 text-center text-xs">Páginas</div>
                        <div className="border rounded p-2 text-center text-xs">Layout</div>
                      </div>
                      
                      <div className="border rounded-md p-2 text-center font-medium mb-2">
                        Lógica de Negócio (Hooks React)
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="border rounded p-2 text-center text-xs">Contextos</div>
                        <div className="border rounded p-2 text-center text-xs">Hooks Customizados</div>
                        <div className="border rounded p-2 text-center text-xs">Utilitários</div>
                      </div>
                      
                      <div className="border rounded-md p-2 text-center font-medium mb-2">
                        Integração e Persistência
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="border rounded p-2 text-center text-xs">API Clients</div>
                        <div className="border rounded p-2 text-center text-xs">Armazenamento</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="frontend" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Arquitetura Frontend
              </CardTitle>
              <CardDescription>Componentes e estrutura do frontend</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Tecnologias Principais</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>React:</strong> Biblioteca para construção de interfaces</li>
                  <li><strong>TypeScript:</strong> Tipagem estática para melhor manutenção</li>
                  <li><strong>Tailwind CSS:</strong> Framework CSS utilitário para estilos</li>
                  <li><strong>Shadcn/UI:</strong> Componentes de UI reutilizáveis</li>
                  <li><strong>React Router:</strong> Gerenciamento de rotas</li>
                  <li><strong>React Query:</strong> Gerenciamento de estado assíncrono</li>
                  <li><strong>Recharts:</strong> Biblioteca para visualização de dados</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Estrutura de Componentes</h3>
                <p className="text-muted-foreground mt-1">
                  A aplicação segue uma estrutura de componentes hierárquica:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Pages:</strong> Componentes de página de alto nível</li>
                  <li><strong>Layout:</strong> Componentes para estrutura visual (header, sidebar)</li>
                  <li><strong>Feature Components:</strong> Componentes específicos de funcionalidades</li>
                  <li><strong>UI Components:</strong> Componentes reutilizáveis de UI</li>
                  <li><strong>Forms:</strong> Componentes para entrada de dados</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Gerenciamento de Estado</h3>
                <p className="text-muted-foreground mt-1">
                  O estado é gerenciado através de:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Context API:</strong> Para estado global da aplicação</li>
                  <li><strong>useState/useReducer:</strong> Para estado local de componentes</li>
                  <li><strong>Custom Hooks:</strong> Para lógica reutilizável e estado encapsulado</li>
                  <li><strong>React Query:</strong> Para estado e cache de dados remotos</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Padrões de Design</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Compound Components:</strong> Para componentes relacionados</li>
                  <li><strong>Render Props:</strong> Para compartilhamento de lógica</li>
                  <li><strong>Custom Hooks:</strong> Para extração de lógica</li>
                  <li><strong>Container/Presentational:</strong> Separação de lógica e apresentação</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Fluxo de Renderização</h3>
                <p className="text-muted-foreground mt-1">
                  O processo de renderização segue estas etapas:
                </p>
                <ol className="mt-2 space-y-2 list-decimal pl-5">
                  <li>Inicialização da aplicação com React Router</li>
                  <li>Carregamento dos providers de contexto (Auth, Product, etc.)</li>
                  <li>Renderização do layout base com sidebar e header</li>
                  <li>Renderização do componente de página específico</li>
                  <li>Carregamento de dados via hooks e atualização da UI</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Arquitetura de Dados
              </CardTitle>
              <CardDescription>Estrutura e fluxo de dados no sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Modelos de Dados Principais</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Lead:</strong> Dados de candidatos potenciais</li>
                  <li><strong>Funnel:</strong> Estrutura de funil de captação e estágios</li>
                  <li><strong>Campaign:</strong> Campanhas de marketing e métricas</li>
                  <li><strong>Conversation:</strong> Histórico de comunicações</li>
                  <li><strong>Analytics:</strong> Dados de desempenho e métricas</li>
                  <li><strong>Prediction:</strong> Modelos e previsões</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Fluxo de Dados</h3>
                <p className="text-muted-foreground mt-1">
                  O fluxo de dados na aplicação segue este padrão:
                </p>
                <ol className="mt-2 space-y-2 list-decimal pl-5">
                  <li>Entrada de dados via formulários e interfaces de usuário</li>
                  <li>Validação e processamento no frontend</li>
                  <li>Envio para APIs e serviços externos quando necessário</li>
                  <li>Armazenamento em cache local e/ou persistência</li>
                  <li>Atualização da interface do usuário</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Persistência de Dados</h3>
                <p className="text-muted-foreground mt-1">
                  Os dados são armazenados em diferentes níveis:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Estado em Memória:</strong> Durante a sessão do usuário</li>
                  <li><strong>localStorage:</strong> Para persistência entre sessões</li>
                  <li><strong>APIs Externas:</strong> Para persistência servidor</li>
                  <li><strong>Banco de Dados:</strong> Para armazenamento permanente</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Transformação de Dados</h3>
                <p className="text-muted-foreground mt-1">
                  A aplicação implementa várias transformações de dados:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Normalização:</strong> Para armazenamento eficiente</li>
                  <li><strong>Desnormalização:</strong> Para renderização e uso</li>
                  <li><strong>Agregação:</strong> Para analytics e relatórios</li>
                  <li><strong>Filtragem:</strong> Para exibições específicas</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Exemplos de Estruturas de Dados</h3>
                <div className="mt-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="p-3 bg-muted rounded-md">
                    <h4 className="text-sm font-medium mb-2">Modelo de Lead</h4>
                    <pre className="text-xs overflow-auto">
                      {`{
  id: string,
  name: string,
  email: string,
  phone: string,
  status: 'new' | 'contacted' | 'qualified' | 'converted',
  stage: string,
  source: string,
  course: string,
  campus: string,
  createdAt: Date,
  updatedAt: Date,
  ...additionalFields
}`}
                    </pre>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-md">
                    <h4 className="text-sm font-medium mb-2">Modelo de Funil</h4>
                    <pre className="text-xs overflow-auto">
                      {`{
  id: string,
  name: string,
  active: boolean,
  stages: [
    {
      id: string,
      name: string,
      order: number,
      active: boolean,
      subStages: Stage[],
      metrics: {...}
    }
  ],
  createdAt: Date,
  updatedAt: Date
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                Integrações
              </CardTitle>
              <CardDescription>Interfaces e integrações externas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">APIs Externas</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema integra-se com as seguintes APIs:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>WhatsApp Business API:</strong> Para comunicação via WhatsApp</li>
                  <li><strong>APIs de Telefonia:</strong> Para chamadas e SMS</li>
                  <li><strong>Email Service Providers:</strong> Para envio de emails</li>
                  <li><strong>APIs de IA:</strong> Para análise preditiva e interações</li>
                  <li><strong>Google Maps API:</strong> Para geolocalização</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Webhooks</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema suporta webhooks para:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li>Notificações de eventos</li>
                  <li>Integrações com CRMs</li>
                  <li>Integrações com ERPs educacionais</li>
                  <li>Sistemas de automação de marketing</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Padrões de Integração</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>REST APIs:</strong> Para maioria das integrações</li>
                  <li><strong>OAuth:</strong> Para autenticação em serviços de terceiros</li>
                  <li><strong>WebSockets:</strong> Para comunicação em tempo real</li>
                  <li><strong>Webhooks:</strong> Para recebimento de eventos</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Serviços de Autenticação</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li>Autenticação JWT interna</li>
                  <li>Integração com OAuth de provedores</li>
                  <li>Single Sign-On (SSO) com sistemas institucionais</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Fluxo de Integração</h3>
                <p className="text-muted-foreground mt-1">
                  O fluxo típico de integração:
                </p>
                <ol className="mt-2 space-y-2 list-decimal pl-5">
                  <li>Configuração da integração via interface administrativa</li>
                  <li>Autenticação com o serviço externo</li>
                  <li>Sincronização bidirecional de dados</li>
                  <li>Tratamento de erros e retentativas</li>
                  <li>Monitoramento e logs de integração</li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Diagrama de Integração</h3>
                <div className="mt-2 p-4 bg-muted rounded-md border">
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-2xl border rounded-md p-4 bg-background">
                      <div className="text-center font-medium mb-4">Sistema de Captação</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="border rounded p-2 flex flex-col items-center text-xs">
                          <Server className="h-8 w-8 mb-2" />
                          <div>APIs REST</div>
                        </div>
                        
                        <div className="border rounded p-2 flex flex-col items-center text-xs">
                          <Network className="h-8 w-8 mb-2" />
                          <div>WebSockets</div>
                        </div>
                        
                        <div className="border rounded p-2 flex flex-col items-center text-xs">
                          <FileText className="h-8 w-8 mb-2" />
                          <div>Webhooks</div>
                        </div>
                      </div>
                      
                      <div className="text-center text-sm mb-4">↑↓ Integrações ↑↓</div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div className="border rounded p-2 text-center text-xs">
                          CRM
                        </div>
                        <div className="border rounded p-2 text-center text-xs">
                          ERP
                        </div>
                        <div className="border rounded p-2 text-center text-xs">
                          WhatsApp
                        </div>
                        <div className="border rounded p-2 text-center text-xs">
                          Serviços de AI
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Segurança e Controle de Acesso
              </CardTitle>
              <CardDescription>Arquitetura de segurança do sistema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Autenticação</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema implementa os seguintes mecanismos de autenticação:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li>Autenticação baseada em JWT (JSON Web Tokens)</li>
                  <li>Refresh tokens para sessões prolongadas</li>
                  <li>Autenticação de dois fatores (2FA) opcional</li>
                  <li>Single Sign-On (SSO) com sistemas institucionais</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Autorização</h3>
                <p className="text-muted-foreground mt-1">
                  O controle de acesso é implementado através de:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>RBAC:</strong> Controle de acesso baseado em funções</li>
                  <li><strong>Permissões granulares:</strong> Para recursos específicos</li>
                  <li><strong>Controle por produto:</strong> Acesso baseado em produtos contratados</li>
                  <li><strong>Segregação organizacional:</strong> Isolamento entre organizações</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Níveis de Acesso</h3>
                <p className="text-muted-foreground mt-1">
                  Os principais níveis de acesso no sistema:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li><strong>Usuário Regular:</strong> Acesso às funcionalidades básicas</li>
                  <li><strong>Administrador:</strong> Configuração e gerenciamento avançado</li>
                  <li><strong>Super Admin:</strong> Controle total do sistema</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Proteção de Dados</h3>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li>Criptografia em trânsito (TLS/SSL)</li>
                  <li>Criptografia de dados sensíveis armazenados</li>
                  <li>Proteção contra injeção SQL e XSS</li>
                  <li>Validação e sanitização de entrada de dados</li>
                  <li>Conformidade com LGPD para dados pessoais</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Auditoria e Logging</h3>
                <p className="text-muted-foreground mt-1">
                  O sistema mantém logs detalhados de:
                </p>
                <ul className="mt-2 space-y-2 list-disc pl-5">
                  <li>Tentativas de login e falhas de autenticação</li>
                  <li>Alterações em dados sensíveis</li>
                  <li>Ações administrativas</li>
                  <li>Uso de APIs e integrações</li>
                  <li>Alterações de configuração</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-medium">Arquitetura de Segurança</h3>
                <div className="mt-2 p-4 bg-muted rounded-md border">
                  <div className="flex flex-col items-center">
                    <div className="w-full max-w-2xl border rounded-md p-4 bg-background">
                      <div className="text-center font-medium mb-4">Camadas de Segurança</div>
                      
                      <div className="space-y-3">
                        <div className="border-2 border-primary/30 rounded-md p-3">
                          <div className="text-sm font-medium text-center mb-2">Camada de Frontend</div>
                          <div className="text-xs">
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Validação de formulários</li>
                              <li>Proteção contra XSS</li>
                              <li>Gerenciamento seguro de tokens</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="border-2 border-primary/30 rounded-md p-3">
                          <div className="text-sm font-medium text-center mb-2">Camada de API</div>
                          <div className="text-xs">
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Autenticação JWT</li>
                              <li>Rate limiting</li>
                              <li>Validação de payload</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="border-2 border-primary/30 rounded-md p-3">
                          <div className="text-sm font-medium text-center mb-2">Camada de Dados</div>
                          <div className="text-xs">
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Criptografia de dados sensíveis</li>
                              <li>Proteção contra SQL injection</li>
                              <li>Validação de nível de banco de dados</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArchitectureDocumentation;
