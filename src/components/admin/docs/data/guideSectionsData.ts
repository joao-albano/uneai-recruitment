
import { useNavigate } from 'react-router-dom';
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
import { GuideSection } from '../types/userGuideTypes';

export const useGuideSectionsData = () => {
  const navigate = useNavigate();
  
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
  
  return guideSections;
};
