
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
  Settings 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface GuideSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  action?: () => void;
}

const UserGuideContent: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const guideSections: GuideSection[] = [
    {
      id: 'dashboard',
      title: 'Dashboard Inteligente',
      description: 'Visualize métricas e indicadores de performance em tempo real',
      icon: BarChart2,
      action: () => navigate('/recruitment')
    },
    {
      id: 'leads',
      title: 'Gestão de Leads',
      description: 'Acompanhe e gerencie leads de forma organizada e eficiente',
      icon: Users,
      action: () => navigate('/recruitment/leads')
    },
    {
      id: 'funnel',
      title: 'Funil de Captação',
      description: 'Visualize e otimize cada etapa do processo de captação',
      icon: Filter,
      action: () => navigate('/recruitment/funnel')
    },
    {
      id: 'campaigns',
      title: 'Campanhas',
      description: 'Crie e gerencie campanhas de captação automatizadas',
      icon: Megaphone,
      action: () => navigate('/recruitment/campaigns')
    },
    {
      id: 'schedule',
      title: 'Agenda de Atendimentos',
      description: 'Organize e acompanhe agendamentos com potenciais alunos',
      icon: Calendar,
      action: () => navigate('/recruitment/schedule')
    },
    {
      id: 'alerts',
      title: 'Alertas e Notificações',
      description: 'Receba alertas sobre oportunidades e tarefas pendentes',
      icon: Bell,
      action: () => navigate('/recruitment/alerts')
    },
    {
      id: 'conversations',
      title: 'Conversas e Mensagens',
      description: 'Gerencie comunicações com potenciais alunos em diferentes canais',
      icon: MessageCircle,
      action: () => navigate('/recruitment/conversation')
    },
    {
      id: 'upload',
      title: 'Upload de Dados',
      description: 'Importe listas de leads e dados para o sistema',
      icon: Upload,
      action: () => navigate('/recruitment/upload')
    },
    {
      id: 'rules',
      title: 'Regras e Configurações',
      description: 'Configure regras de discagem, metas e períodos do sistema',
      icon: Settings
    }
  ];

  const renderSectionDetails = (section: GuideSection) => {
    // Conteúdo detalhado para cada seção
    const detailedContent = {
      dashboard: (
        <div className="space-y-4">
          <p>O Dashboard Inteligente oferece uma visão consolidada do seu processo de captação, com gráficos interativos e métricas em tempo real.</p>
          
          <h3 className="text-lg font-medium mt-4">Principais recursos:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Visão geral de conversão por etapas do funil</li>
            <li>Estatísticas de desempenho por canal de captação</li>
            <li>Indicadores de performance por curso</li>
            <li>Análise de tendências e comparativos temporais</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Como usar:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Acesse a aba "Visão Geral" para métricas principais</li>
            <li>Utilize os filtros de data para analisar períodos específicos</li>
            <li>Navegue entre as abas para análises detalhadas por canal ou curso</li>
            <li>Exporte relatórios para apresentações ou análises complementares</li>
          </ol>
        </div>
      ),
      leads: (
        <div className="space-y-4">
          <p>O módulo de Gestão de Leads permite organizar, segmentar e acompanhar todos os potenciais alunos em seu pipeline de captação.</p>
          
          <h3 className="text-lg font-medium mt-4">Principais recursos:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Visualização em lista ou tabela de todos os leads</li>
            <li>Filtros avançados por origem, curso, status, etapa do funil, etc.</li>
            <li>Atribuição de responsáveis para acompanhamento</li>
            <li>Histórico de interações com cada lead</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Como usar:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Utilize a barra de pesquisa para encontrar leads específicos</li>
            <li>Aplique filtros combinados para segmentar sua base</li>
            <li>Clique em um lead para visualizar detalhes e histórico</li>
            <li>Use as ações rápidas para agendar contatos ou enviar mensagens</li>
          </ol>
        </div>
      ),
      funnel: (
        <div className="space-y-4">
          <p>O Funil de Captação permite visualizar e gerenciar o fluxo de potenciais alunos através das etapas do processo de matrícula.</p>
          
          <h3 className="text-lg font-medium mt-4">Principais recursos:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Visualização Kanban das etapas do funil</li>
            <li>Análise de conversão entre etapas</li>
            <li>Identificação de gargalos no processo</li>
            <li>Movimentação manual ou automática de leads entre etapas</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Como usar:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Arraste leads entre colunas para atualizar seu status</li>
            <li>Utilize filtros para visualizar leads específicos no funil</li>
            <li>Analise os indicadores de conversão entre etapas</li>
            <li>Configure regras de automação para movimentação automática</li>
          </ol>
        </div>
      ),
      campaigns: (
        <div className="space-y-4">
          <p>O módulo de Campanhas permite criar, gerenciar e analisar estratégias de captação automatizadas em diversos canais.</p>
          
          <h3 className="text-lg font-medium mt-4">Principais recursos:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Criação de campanhas segmentadas</li>
            <li>Agendamento de envios automáticos</li>
            <li>Acompanhamento de desempenho e conversão</li>
            <li>Integração com múltiplos canais (email, WhatsApp, SMS)</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Como usar:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Clique em "Nova Campanha" para iniciar a configuração</li>
            <li>Defina público-alvo, canais e conteúdo da campanha</li>
            <li>Configure cronograma de envio e gatilhos automáticos</li>
            <li>Acompanhe os resultados na aba de desempenho</li>
          </ol>
        </div>
      ),
      schedule: (
        <div className="space-y-4">
          <p>A Agenda de Atendimentos permite organizar e acompanhar todos os agendamentos com potenciais alunos, otimizando o processo de conversão.</p>
          
          <h3 className="text-lg font-medium mt-4">Principais recursos:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Visualização em calendário de todos os atendimentos</li>
            <li>Agendamento rápido com seleção de agente responsável</li>
            <li>Lembretes automáticos via WhatsApp ou email</li>
            <li>Registro de resultados e próximos passos após atendimento</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Como usar:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Clique em uma data no calendário para visualizar ou adicionar agendamentos</li>
            <li>Utilize o botão "Novo Agendamento" para criar rapidamente</li>
            <li>Após o atendimento, registre o status (realizado, cancelado, etc.)</li>
            <li>Configure lembretes para reduzir taxas de não comparecimento</li>
          </ol>
        </div>
      ),
      alerts: (
        <div className="space-y-4">
          <p>O sistema de Alertas e Notificações mantém você informado sobre oportunidades, tarefas e eventos importantes no processo de captação.</p>
          
          <h3 className="text-lg font-medium mt-4">Principais recursos:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Alertas de leads com alto potencial de conversão</li>
            <li>Notificações de tarefas pendentes e agendamentos próximos</li>
            <li>Avisos sobre gargalos no funil de captação</li>
            <li>Insights de IA para otimização de estratégias</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Como usar:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Verifique regularmente o ícone de sino para notificações não lidas</li>
            <li>Utilize filtros para priorizar alertas mais relevantes</li>
            <li>Marque alertas como "lidos" ou "resolvidos" após tomar ação</li>
            <li>Configure suas preferências de notificação nas configurações</li>
          </ol>
        </div>
      ),
      conversations: (
        <div className="space-y-4">
          <p>O módulo de Conversas e Mensagens centraliza a comunicação com potenciais alunos em diferentes canais, facilitando o acompanhamento e a gestão de interações.</p>
          
          <h3 className="text-lg font-medium mt-4">Principais recursos:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Interface unificada para WhatsApp, email e chat</li>
            <li>Histórico completo de conversas por lead</li>
            <li>Modelos de mensagem pré-configurados</li>
            <li>Assistente de IA para sugestão de respostas</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Como usar:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Selecione um lead na lista para visualizar o histórico de conversas</li>
            <li>Utilize a barra de mensagem para enviar novas comunicações</li>
            <li>Alterne entre os canais disponíveis para cada lead</li>
            <li>Aproveite as sugestões da IA para respostas mais eficientes</li>
          </ol>
        </div>
      ),
      upload: (
        <div className="space-y-4">
          <p>O sistema de Upload de Dados permite importar listas de leads, histórico de interações e outras informações para alimentar seu processo de captação.</p>
          
          <h3 className="text-lg font-medium mt-4">Principais recursos:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Importação de arquivos CSV, Excel e outros formatos</li>
            <li>Mapeamento inteligente de campos</li>
            <li>Validação e limpeza automática de dados</li>
            <li>Histórico de uploads realizados</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Como usar:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Prepare seu arquivo seguindo os modelos disponíveis</li>
            <li>Arraste o arquivo para a área de upload ou use o seletor</li>
            <li>Verifique o mapeamento de campos e faça ajustes se necessário</li>
            <li>Confirme a importação e aguarde a validação dos dados</li>
          </ol>
        </div>
      ),
      rules: (
        <div className="space-y-4">
          <p>O módulo de Regras e Configurações permite personalizar o funcionamento do sistema de captação de acordo com suas necessidades específicas.</p>
          
          <h3 className="text-lg font-medium mt-4">Principais recursos:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Configuração de regras de discagem automática</li>
            <li>Definição de metas por curso, período e canal</li>
            <li>Configuração de períodos acadêmicos e prazos</li>
            <li>Personalização de fluxos de automação</li>
          </ul>
          
          <h3 className="text-lg font-medium mt-4">Como usar:</h3>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Acesse as subseções específicas para cada tipo de configuração</li>
            <li>Regras de Discagem: configure horários, tentativas e intervalos</li>
            <li>Metas: defina objetivos por período, curso e equipe</li>
            <li>Períodos: configure calendário acadêmico e prazos de matrículas</li>
          </ol>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <Button size="sm" variant="outline" onClick={() => navigate('/recruitment/rules/dialing')}>
              Regras de Discagem
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/recruitment/rules/goals')}>
              Configuração de Metas
            </Button>
            <Button size="sm" variant="outline" onClick={() => navigate('/recruitment/rules/periods')}>
              Períodos Acadêmicos
            </Button>
          </div>
        </div>
      )
    };
    
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <section.icon className="mr-2" />
            {section.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground mb-4">
            {section.description}
          </div>
          
          {/* Conteúdo detalhado específico para cada seção */}
          {detailedContent[section.id as keyof typeof detailedContent]}
          
          {section.action && (
            <Button onClick={section.action} className="mt-4">
              Acessar {section.title}
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Guia do Usuário - Sistema de Captação</h1>
      
      <div className="grid md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar Navigation */}
        <div className="space-y-2">
          {guideSections.map((section) => (
            <Button
              key={section.id}
              variant={selectedSection === section.id ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => setSelectedSection(section.id)}
            >
              <section.icon className="mr-2" />
              {section.title}
            </Button>
          ))}
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
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 bg-muted p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Dica para Iniciantes</h2>
        <p>
          Comece importando seus leads pela seção de Upload, depois configure seu Funil de Captação 
          com as etapas que refletem seu processo atual, e então utilize o Dashboard para acompanhar 
          os resultados.
        </p>
      </div>
    </div>
  );
};

export default UserGuideContent;
