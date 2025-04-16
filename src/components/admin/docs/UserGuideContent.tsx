
import React, { useState } from 'react';
import { 
  Book, 
  BarChart2, 
  Users, 
  Filter, 
  Clock, 
  Megaphone, 
  Bell, 
  MessageCircle, 
  Calendar, 
  Upload, 
  Settings,
  Search,
  ChevronRight,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Lightbulb
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface GuideSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action?: () => void;
  features?: string[];
  steps?: string[];
  tips?: string[];
  benefits?: string[];
  useCases?: string[];
  tags?: string[];
}

const UserGuideContent: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const guideSections: GuideSection[] = [
    {
      id: 'dashboard',
      title: 'Dashboard Inteligente',
      description: 'Centro de comando para visualizar e analisar métricas e indicadores de performance em tempo real, permitindo tomar decisões estratégicas baseadas em dados.',
      icon: BarChart2,
      action: () => navigate('/recruitment'),
      features: [
        'Visão consolidada de conversão por etapas do funil',
        'Análise de desempenho por canal de captação',
        'Indicadores de performance por curso',
        'Comparativos temporais e tendências',
        'Exportação de relatórios personalizados'
      ],
      steps: [
        'Acesse a aba "Visão Geral" para métricas principais',
        'Utilize os filtros de data para análises por período',
        'Navegue entre abas para análises específicas',
        'Identifique gargalos no processo de captação',
        'Exporte dados para apresentações'
      ],
      tips: [
        'Verifique o dashboard diariamente para acompanhar tendências',
        'Compare períodos semelhantes (mesmo mês em anos diferentes)',
        'Observe as métricas após campanhas para avaliar impacto'
      ],
      tags: ['análise', 'métricas', 'desempenho', 'relatórios']
    },
    {
      id: 'leads',
      title: 'Gestão de Leads',
      description: 'Sistema completo para organizar, classificar e gerenciar todos os potenciais alunos no pipeline de captação, desde o primeiro contato até a matrícula.',
      icon: Users,
      action: () => navigate('/recruitment/leads'),
      features: [
        'Visualização em lista ou kanban de todos os leads',
        'Filtros avançados por origem, curso, status e etapa',
        'Atribuição de responsáveis para acompanhamento',
        'Histórico completo de interações e eventos',
        'Segmentação por potencial de conversão'
      ],
      steps: [
        'Utilize a barra de pesquisa para localizar leads específicos',
        'Aplique filtros combinados para segmentação estratégica',
        'Clique em um lead para acessar detalhes e histórico',
        'Use ações rápidas para agendar contatos ou enviar mensagens',
        'Movimente leads entre etapas do funil conforme progresso'
      ],
      tips: [
        'Priorize leads com maior score de conversão',
        'Mantenha anotações detalhadas após cada interação',
        'Estabeleça prazos para follow-up de cada lead'
      ],
      tags: ['captação', 'prospecção', 'conversão', 'potenciais alunos']
    },
    {
      id: 'funnel',
      title: 'Funil de Captação',
      description: 'Visualização intuitiva e gerenciamento do fluxo de potenciais alunos através das etapas do processo de captação, com análises de conversão e identificação de oportunidades.',
      icon: Filter,
      action: () => navigate('/recruitment/funnel'),
      features: [
        'Visualização Kanban das etapas do processo',
        'Análise de taxas de conversão entre etapas',
        'Identificação de gargalos no funil',
        'Movimentação manual ou automática de leads',
        'Configuração personalizada de estágios do funil'
      ],
      steps: [
        'Arraste leads entre colunas para atualizar status',
        'Utilize filtros para visualizar segmentos específicos',
        'Analise os indicadores de conversão entre etapas',
        'Configure regras de automação para movimentação',
        'Personalize as etapas do funil conforme seu processo'
      ],
      tips: [
        'Mantenha o olhar atento às etapas com baixa conversão',
        'Estabeleça tempos máximos para cada etapa do funil',
        'Analise periodicamente o comportamento geral do funil'
      ],
      tags: ['conversão', 'processo', 'captação', 'etapas']
    },
    {
      id: 'campaigns',
      title: 'Campanhas',
      description: 'Plataforma para criação, execução e análise de campanhas de captação automatizadas em múltiplos canais, maximizando o alcance e eficiência do processo.',
      icon: Megaphone,
      action: () => navigate('/recruitment/campaigns'),
      features: [
        'Criação de campanhas multi-canal segmentadas',
        'Agendamento e automação de envios',
        'Métricas detalhadas de performance e ROI',
        'Testes A/B para otimização de conteúdo',
        'Integração com WhatsApp, email e SMS'
      ],
      steps: [
        'Inicie com "Nova Campanha" e defina objetivo',
        'Segmente seu público-alvo com precisão',
        'Configure conteúdo personalizado por canal',
        'Defina cronograma e acionadores automáticos',
        'Acompanhe resultados e otimize continuamente'
      ],
      tips: [
        'Personalize as mensagens com dados do perfil do lead',
        'Teste diferentes horários para maximizar engajamento',
        'Crie campanhas específicas para leads inativos'
      ],
      tags: ['marketing', 'automação', 'comunicação', 'multicanal']
    },
    {
      id: 'schedule',
      title: 'Agenda de Atendimentos',
      description: 'Central completa para gerenciar todos os agendamentos com potenciais alunos, incluindo entrevistas, visitas ao campus e atendimentos virtuais ou presenciais.',
      icon: Calendar,
      action: () => navigate('/recruitment/schedule'),
      features: [
        'Visualização por dia, semana e mês',
        'Agendamento com seleção de responsável',
        'Lembretes automáticos via WhatsApp/email',
        'Registro de resultados pós-atendimento',
        'Integração com calendários externos (Google, Outlook)'
      ],
      steps: [
        'Navegue pelo calendário para visualizar compromissos',
        'Clique em uma data para adicionar novo agendamento',
        'Configure lembretes automáticos para reduzir faltas',
        'Registre o resultado após cada atendimento',
        'Visualize histórico de interações anteriores'
      ],
      tips: [
        'Confirme agendamentos com 24h de antecedência',
        'Reserve slots específicos para atendimentos prioritários',
        'Analise horários com maior taxa de comparecimento'
      ],
      tags: ['agendamentos', 'atendimento', 'calendário', 'reuniões']
    },
    {
      id: 'alerts',
      title: 'Alertas e Notificações',
      description: 'Sistema inteligente de notificações que mantém sua equipe informada sobre oportunidades, tarefas pendentes e eventos críticos no processo de captação.',
      icon: Bell,
      action: () => navigate('/recruitment/alerts'),
      features: [
        'Alertas de leads com alto potencial',
        'Notificações de tarefas e agendamentos',
        'Avisos sobre gargalos no funil',
        'Insights de IA para otimização',
        'Alertas personalizáveis por usuário'
      ],
      steps: [
        'Verifique o ícone de sino para notificações não lidas',
        'Filtre alertas por tipo, urgência ou origem',
        'Marque como "lidos" ou "resolvidos" após ação',
        'Configure suas preferências de notificação',
        'Delegue alertas para outros membros da equipe'
      ],
      tips: [
        'Priorize alertas de leads com maior score de conversão',
        'Configure notificações mobile para alertas urgentes',
        'Estabeleça rotina diária para processamento de alertas'
      ],
      tags: ['monitoramento', 'priorização', 'notificações', 'oportunidades']
    },
    {
      id: 'conversations',
      title: 'Conversas e Mensagens',
      description: 'Hub centralizado para toda comunicação com potenciais alunos em diferentes canais, permitindo acompanhamento completo e gestão eficiente das interações.',
      icon: MessageCircle,
      action: () => navigate('/recruitment/conversation'),
      features: [
        'Interface unificada para WhatsApp, email e chat',
        'Histórico completo de conversas por lead',
        'Modelos de mensagem personalizáveis',
        'Assistente de IA para sugestão de respostas',
        'Automação de mensagens de follow-up'
      ],
      steps: [
        'Selecione um lead para visualizar histórico completo',
        'Utilize a barra de mensagem para novas comunicações',
        'Alterne entre os diferentes canais disponíveis',
        'Use templates pré-definidos para respostas comuns',
        'Aproveite sugestões da IA para respostas eficientes'
      ],
      tips: [
        'Responda todas as mensagens em até 15 minutos',
        'Personalize as mensagens com informações do perfil',
        'Utilize tom amigável mas profissional nas comunicações'
      ],
      tags: ['comunicação', 'mensagens', 'atendimento', 'whatsapp']
    },
    {
      id: 'upload',
      title: 'Upload de Dados',
      description: 'Ferramenta robusta para importação e integração de listas de leads, históricos e outras informações externas para alimentar o sistema de captação.',
      icon: Upload,
      action: () => navigate('/recruitment/upload'),
      features: [
        'Importação de arquivos CSV, Excel e outros formatos',
        'Mapeamento inteligente de campos',
        'Validação e limpeza automática de dados',
        'Detecção de duplicidades e conflitos',
        'Histórico completo de importações realizadas'
      ],
      steps: [
        'Prepare seu arquivo seguindo os modelos disponíveis',
        'Faça upload na área designada ou via drag-and-drop',
        'Verifique o mapeamento automático de campos',
        'Ajuste configurações de importação conforme necessário',
        'Confirme a importação após validação preliminar'
      ],
      tips: [
        'Padronize seus arquivos antes da importação',
        'Verifique dados sensíveis como telefone e email',
        'Importe em horários de menor utilização do sistema'
      ],
      tags: ['importação', 'dados', 'integração', 'listas']
    },
    {
      id: 'rules',
      title: 'Regras e Configurações',
      description: 'Central de configurações avançadas para personalizar o funcionamento do sistema de captação conforme as necessidades específicas da sua instituição.',
      icon: Settings,
      features: [
        'Configuração de regras de discagem',
        'Definição de metas por curso, período e canal',
        'Configuração de períodos acadêmicos',
        'Personalização de fluxos de automação',
        'Gestão de integrações com outros sistemas'
      ],
      steps: [
        'Navegue pelas categorias de configuração disponíveis',
        'Ajuste regras de discagem e tentativas de contato',
        'Defina metas de captação por período e equipe',
        'Configure o calendário acadêmico e prazos',
        'Personalize automações conforme seu processo'
      ],
      tips: [
        'Revise as configurações a cada novo período letivo',
        'Documente as regras definidas para referência da equipe',
        'Ajuste configurações gradualmente, medindo impacto'
      ],
      tags: ['configuração', 'automação', 'personalização', 'metas']
    }
  ];

  const filteredSections = searchQuery 
    ? guideSections.filter(section => 
        section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : guideSections;

  const renderSectionDetails = (section: GuideSection) => {
    return (
      <Card className="w-full border-l-4 border-l-primary shadow-md">
        <CardHeader className="bg-muted/30">
          <CardTitle className="flex items-center text-primary">
            <section.icon className="mr-3 h-6 w-6" />
            {section.title}
          </CardTitle>
          <CardDescription className="text-base mt-2">
            {section.description}
          </CardDescription>
          {section.tags && (
            <div className="flex flex-wrap gap-2 mt-2">
              {section.tags.map(tag => (
                <Badge key={tag} variant="outline" className="bg-primary/10">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="features">Recursos</TabsTrigger>
              <TabsTrigger value="steps">Como Usar</TabsTrigger>
              {section.tips && <TabsTrigger value="tips">Dicas</TabsTrigger>}
              {section.useCases && <TabsTrigger value="useCases">Casos de Uso</TabsTrigger>}
            </TabsList>

            <TabsContent value="features" className="mt-0">
              {section.features && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium mb-3">Principais recursos:</h3>
                  <ul className="space-y-3">
                    {section.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="steps" className="mt-0">
              {section.steps && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium mb-3">Passo a passo:</h3>
                  <ol className="space-y-3">
                    {section.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <div className="h-6 w-6 rounded-full bg-primary/20 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                          {index + 1}
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </TabsContent>

            <TabsContent value="tips" className="mt-0">
              {section.tips && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium mb-3">Dicas de especialista:</h3>
                  <ul className="space-y-3">
                    {section.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <Lightbulb className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>

            <TabsContent value="useCases" className="mt-0">
              {section.useCases && (
                <div className="space-y-2">
                  <h3 className="text-lg font-medium mb-3">Aplicações práticas:</h3>
                  <ul className="space-y-3">
                    {section.useCases.map((useCase, index) => (
                      <li key={index} className="flex items-start">
                        <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                        <span>{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {section.action && (
            <Button 
              onClick={section.action} 
              className="mt-6 w-full sm:w-auto"
              size="lg"
            >
              Acessar {section.title}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">Guia do Usuário - Sistema de Captação</h1>
        <p className="text-muted-foreground text-lg">
          Explore nosso guia completo para aproveitar ao máximo todas as funcionalidades do Sistema de Captação de Alunos.
        </p>
        
        <div className="mt-4 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Buscar por funcionalidade ou palavra-chave..." 
            className="pl-10 w-full md:w-2/3 lg:w-1/2" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-[280px_1fr] gap-6">
        {/* Navigation Menu */}
        <div className="space-y-2 bg-card rounded-lg p-4 shadow-sm border h-fit sticky top-6">
          <h2 className="font-semibold mb-4 px-2 flex items-center">
            <Book className="mr-2 h-5 w-5 text-primary" />
            Navegação Rápida
          </h2>
          
          <div className="space-y-1">
            {guideSections.map((section) => (
              <Button
                key={section.id}
                variant={selectedSection === section.id ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedSection(section.id)}
              >
                <section.icon className="mr-2 h-5 w-5" />
                <span className="truncate">{section.title}</span>
              </Button>
            ))}
          </div>
          
          <Separator className="my-4" />
          
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-md">
            <h3 className="font-medium flex items-center text-amber-700 dark:text-amber-400">
              <HelpCircle className="h-4 w-4 mr-2" />
              Precisa de ajuda?
            </h3>
            <p className="text-sm mt-2 text-amber-800/70 dark:text-amber-300/70">
              Entre em contato com nosso suporte técnico para orientações adicionais sobre o sistema.
            </p>
          </div>
        </div>

        {/* Section Details */}
        <div>
          {selectedSection ? (
            renderSectionDetails(
              guideSections.find(s => s.id === selectedSection)!
            )
          ) : (
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground">
                  Selecione uma seção para ver mais detalhes e ações disponíveis.
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* Related Sections */}
          {selectedSection && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Funcionalidades relacionadas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {guideSections
                  .filter(s => s.id !== selectedSection)
                  .slice(0, 3)
                  .map(section => (
                    <Card 
                      key={section.id} 
                      className="cursor-pointer hover:border-primary/50 transition-all"
                      onClick={() => setSelectedSection(section.id)}
                    >
                      <CardContent className="p-4 flex items-start">
                        <section.icon className="h-5 w-5 mr-3 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">{section.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {section.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="mt-12 bg-primary/5 p-6 rounded-lg border border-primary/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-primary/20 p-2 rounded-full">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold">Guia Rápido para Iniciantes</h2>
        </div>
        
        <p className="mb-4">
          Novo no sistema? Aqui está um passo a passo rápido para começar a usar o Sistema de Captação com eficiência:
        </p>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-primary/15 text-primary font-medium rounded-full w-8 h-8 flex items-center justify-center mr-3">1</div>
              <h3 className="font-medium">Importe seus leads</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Comece pelo Upload de Dados para importar sua base de leads existente ou iniciar a captação do zero.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-primary/15 text-primary font-medium rounded-full w-8 h-8 flex items-center justify-center mr-3">2</div>
              <h3 className="font-medium">Configure seu funil</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Personalize as etapas do Funil de Captação para refletir seu processo de conversão atual.
            </p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-3">
              <div className="bg-primary/15 text-primary font-medium rounded-full w-8 h-8 flex items-center justify-center mr-3">3</div>
              <h3 className="font-medium">Monitore resultados</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Utilize o Dashboard para acompanhar métricas e otimizar continuamente seu processo de captação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuideContent;
