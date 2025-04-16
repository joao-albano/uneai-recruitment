
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from "@/components/ui/separator";
import { 
  Home, UserPlus, LineChart, CalendarCheck, 
  MessageSquare, Upload, Building, Bell, 
  BarChart, Calendar, Target, MapPin, Settings 
} from 'lucide-react';

const UserGuideContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-2">Guia do Usuário - Sistema de Captação</h1>
      <p className="text-muted-foreground mb-6">
        Aprenda a utilizar todos os recursos do sistema de captação de alunos para maximizar sua eficiência.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Navegação</CardTitle>
            <CardDescription>
              Navegue pelas seções do guia
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <nav className="flex flex-col">
              <SideNavItem 
                icon={<Home className="h-4 w-4" />}
                title="Introdução"
                section="getting-started"
                activeSection={activeSection}
                onClick={() => setActiveSection('getting-started')}
              />
              <SideNavItem 
                icon={<BarChart className="h-4 w-4" />}
                title="Dashboard"
                section="dashboard"
                activeSection={activeSection}
                onClick={() => setActiveSection('dashboard')}
              />
              <SideNavItem 
                icon={<UserPlus className="h-4 w-4" />}
                title="Gestão de Leads"
                section="leads-management"
                activeSection={activeSection}
                onClick={() => setActiveSection('leads-management')}
              />
              <SideNavItem 
                icon={<LineChart className="h-4 w-4" />}
                title="Funil de Captação"
                section="funnel"
                activeSection={activeSection}
                onClick={() => setActiveSection('funnel')}
              />
              <SideNavItem 
                icon={<Building className="h-4 w-4" />}
                title="Unidades"
                section="campus"
                activeSection={activeSection}
                onClick={() => setActiveSection('campus')}
              />
              <SideNavItem 
                icon={<MapPin className="h-4 w-4" />}
                title="Orquestração"
                section="orchestration"
                activeSection={activeSection}
                onClick={() => setActiveSection('orchestration')}
              />
              <SideNavItem 
                icon={<CalendarCheck className="h-4 w-4" />}
                title="Campanhas"
                section="campaigns"
                activeSection={activeSection}
                onClick={() => setActiveSection('campaigns')}
              />
              <SideNavItem 
                icon={<Bell className="h-4 w-4" />}
                title="Alertas"
                section="alerts"
                activeSection={activeSection}
                onClick={() => setActiveSection('alerts')}
              />
              <SideNavItem 
                icon={<MessageSquare className="h-4 w-4" />}
                title="Conversas"
                section="conversations"
                activeSection={activeSection}
                onClick={() => setActiveSection('conversations')}
              />
              <SideNavItem 
                icon={<Calendar className="h-4 w-4" />}
                title="Agenda"
                section="schedule"
                activeSection={activeSection}
                onClick={() => setActiveSection('schedule')}
              />
              <SideNavItem 
                icon={<Upload className="h-4 w-4" />}
                title="Upload"
                section="upload"
                activeSection={activeSection}
                onClick={() => setActiveSection('upload')}
              />
              <SideNavItem 
                icon={<Target className="h-4 w-4" />}
                title="Regras"
                section="rules"
                activeSection={activeSection}
                onClick={() => setActiveSection('rules')}
              />
              <SideNavItem 
                icon={<Settings className="h-4 w-4" />}
                title="Configurações"
                section="settings"
                activeSection={activeSection}
                onClick={() => setActiveSection('settings')}
              />
            </nav>
          </CardContent>
        </Card>
        
        <ScrollArea className="md:col-span-3 h-[calc(100vh-200px)]">
          <Card>
            <CardContent className="p-6">
              {activeSection === 'getting-started' && <GettingStartedGuide />}
              {activeSection === 'dashboard' && <DashboardGuide />}
              {activeSection === 'leads-management' && <LeadsManagementGuide />}
              {activeSection === 'funnel' && <FunnelGuide />}
              {activeSection === 'campus' && <CampusGuide />}
              {activeSection === 'orchestration' && <OrchestrationGuide />}
              {activeSection === 'campaigns' && <CampaignsGuide />}
              {activeSection === 'alerts' && <AlertsGuide />}
              {activeSection === 'conversations' && <ConversationsGuide />}
              {activeSection === 'schedule' && <ScheduleGuide />}
              {activeSection === 'upload' && <UploadGuide />}
              {activeSection === 'rules' && <RulesGuide />}
              {activeSection === 'settings' && <SettingsGuide />}
            </CardContent>
          </Card>
        </ScrollArea>
      </div>
    </div>
  );
};

interface SideNavItemProps {
  icon: React.ReactNode;
  title: string;
  section: string;
  activeSection: string;
  onClick: () => void;
}

const SideNavItem: React.FC<SideNavItemProps> = ({ icon, title, section, activeSection, onClick }) => {
  const isActive = section === activeSection;
  
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-primary/5 ${
        isActive ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground'
      }`}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

// Conteúdo por seção
const GettingStartedGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Bem-vindo ao Sistema de Captação de Alunos</h2>
    
    <div className="space-y-4">
      <p>
        O sistema de Captação de Alunos foi desenvolvido para otimizar o processo de captação de novos alunos para sua instituição de ensino, 
        desde a geração de leads até a matrícula efetiva. Esta ferramenta combina inteligência artificial, automação e análise de dados para 
        aumentar suas taxas de conversão e eficiência operacional.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Funcionalidades</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <FeatureCard 
          icon={<BarChart className="h-5 w-5 text-primary" />}
          title="Dashboard Inteligente"
          description="Visualize métricas e indicadores de performance em tempo real."
        />
        
        <FeatureCard 
          icon={<UserPlus className="h-5 w-5 text-primary" />}
          title="Gestão de Leads"
          description="Acompanhe e gerencie leads de forma organizada e eficiente."
        />
        
        <FeatureCard 
          icon={<LineChart className="h-5 w-5 text-primary" />}
          title="Funil de Captação"
          description="Visualize e otimize cada etapa do processo de captação."
        />
        
        <FeatureCard 
          icon={<CalendarCheck className="h-5 w-5 text-primary" />}
          title="Campanhas"
          description="Crie e gerencie campanhas de captação automatizadas."
        />
      </div>
      
      <h3 className="text-xl font-semibold mt-6">Como Navegar neste Guia</h3>
      
      <p>
        Este guia do usuário está organizado por funcionalidades. No menu lateral esquerdo, você encontrará links para cada 
        seção do sistema. Clique no tópico desejado para acessar instruções detalhadas sobre como utilizar cada recurso.
      </p>
      
      <p>
        Recomendamos começar pela seção de Dashboard para compreender os principais indicadores, e depois explorar as 
        funcionalidades de Gestão de Leads e Funil de Captação, que são os pilares do sistema.
      </p>
      
      <div className="bg-primary/5 p-4 rounded-md mt-4">
        <h4 className="font-medium">Dica para Iniciantes:</h4>
        <p className="text-sm mt-1">
          Comece importando seus leads pela seção de Upload, depois configure seu Funil de Captação com 
          as etapas que refletem seu processo atual, e então utilize o Dashboard para acompanhar os resultados.
        </p>
      </div>
    </div>
  </div>
);

const DashboardGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Dashboard</h2>
    
    <div className="space-y-4">
      <p>
        O Dashboard é a página inicial do sistema, oferecendo uma visão geral dos principais indicadores de captação. 
        Aqui você encontra gráficos, métricas e informações organizadas para facilitar o monitoramento do desempenho.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Visão Geral"
          description="Resumo dos principais indicadores e métricas de performance."
          steps={[
            "Acesse o Dashboard através do menu lateral.",
            "Visualize os cards de métricas principais no topo da página.",
            "Observe o total de leads, taxa de conversão por estágio e média de tempo de conversão."
          ]}
        />
        
        <GuideSection
          title="Filtros e Períodos"
          description="Personalize a visualização dos dados por período."
          steps={[
            "Utilize os filtros de data no topo do Dashboard para selecionar o período desejado.",
            "Compare períodos diferentes para análise de tendências.",
            "Filtre por unidade ou canal específico para análises mais detalhadas."
          ]}
        />
        
        <GuideSection
          title="Gráficos de Desempenho"
          description="Visualização gráfica dos principais indicadores."
          steps={[
            "Analise o gráfico de funil para visualizar a conversão entre estágios.",
            "Observe o gráfico de leads por origem para identificar os canais mais eficientes.",
            "Monitore a evolução temporal de captação através do gráfico de tendências."
          ]}
        />
        
        <GuideSection
          title="Alertas e Notificações"
          description="Acompanhe eventos importantes no sistema."
          steps={[
            "Visualize os alertas recentes no widget de notificações.",
            "Clique em um alerta para ver mais detalhes ou tomar ações.",
            "Configure os tipos de alertas que deseja receber nas configurações."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para utilização eficiente:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Configure o dashboard para mostrar os KPIs mais relevantes para sua instituição</li>
          <li>Utilize a comparação de períodos para identificar tendências e sazonalidades</li>
          <li>Exporte relatórios periodicamente para apresentações à direção</li>
          <li>Verifique diariamente os alertas para identificar oportunidades e problemas rapidamente</li>
        </ul>
      </div>
    </div>
  </div>
);

const LeadsManagementGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Gestão de Leads</h2>
    
    <div className="space-y-4">
      <p>
        O módulo de Gestão de Leads permite organizar, classificar e acompanhar todos os contatos potenciais 
        da sua instituição. Com uma interface intuitiva, você pode visualizar informações detalhadas sobre cada lead 
        e gerenciar todo o ciclo de vida do processo de captação.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Listagem de Leads"
          description="Visualize todos os leads em um formato de tabela ou kanban."
          steps={[
            "Acesse a seção 'Leads' no menu lateral.",
            "Alterne entre os modos de visualização: tabela ou kanban.",
            "Utilize os filtros para encontrar leads específicos por status, origem, curso de interesse, etc.",
            "Ordene a lista por diferentes critérios: data de criação, nome, estágio no funil, etc."
          ]}
        />
        
        <GuideSection
          title="Detalhes do Lead"
          description="Visualize e edite informações detalhadas de cada lead."
          steps={[
            "Clique em um lead para abrir o modal com detalhes completos.",
            "Visualize informações de contato, histórico de interações e notas.",
            "Edite as informações do lead conforme necessário.",
            "Acompanhe o histórico de mudanças de estágio no funil."
          ]}
        />
        
        <GuideSection
          title="Criação de Leads"
          description="Adicione novos leads manualmente ao sistema."
          steps={[
            "Clique no botão 'Adicionar Lead' no topo da página.",
            "Preencha os dados do formulário com as informações do lead.",
            "Selecione o estágio inicial no funil de captação.",
            "Salve o novo lead para começar a acompanhá-lo."
          ]}
        />
        
        <GuideSection
          title="Alteração de Estágio"
          description="Mova leads entre os estágios do funil de captação."
          steps={[
            "No modo kanban, arraste e solte o card do lead entre as colunas de estágios.",
            "No modo tabela, clique no botão de mudança de estágio e selecione o novo estágio.",
            "Adicione notas sobre a mudança de estágio quando solicitado.",
            "Observe as automações que podem ser acionadas conforme a mudança de estágio."
          ]}
        />
        
        <GuideSection
          title="Estratégias de Segmentação"
          description="Aplique estratégias para segmentar seus leads."
          steps={[
            "Acesse a função 'Estratégias de Segmentação' no topo da página.",
            "Escolha entre diferentes critérios: demográfico, comportamental, por interesse ou engajamento.",
            "Visualize os benefícios de cada estratégia e selecione a mais adequada.",
            "Acompanhe o histórico de estratégias aplicadas para avaliar a eficácia."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para gestão eficiente de leads:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Mantenha os dados dos leads sempre atualizados para facilitar o contato</li>
          <li>Utilize etiquetas para classificar leads por características específicas</li>
          <li>Acompanhe regularmente leads estagnados em determinado estágio</li>
          <li>Priorize leads com maior probabilidade de conversão</li>
          <li>Registre todas as interações com detalhes para manter o histórico completo</li>
        </ul>
      </div>
    </div>
  </div>
);

const FunnelGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Funil de Captação</h2>
    
    <div className="space-y-4">
      <p>
        O Funil de Captação permite visualizar e gerenciar o fluxo de conversão de leads ao longo do processo de captação. 
        Com este recurso, você pode personalizar as etapas do funil conforme o processo específico da sua instituição, 
        acompanhar métricas de conversão entre estágios e identificar pontos de melhoria.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Visualização do Funil"
          description="Visualize graficamente o fluxo de captação e a distribuição de leads por estágio."
          steps={[
            "Acesse a seção 'Funil' no menu lateral.",
            "Observe a distribuição de leads por estágio na visualização gráfica.",
            "Analise as taxas de conversão entre estágios.",
            "Identifique gargalos no processo onde há queda significativa de conversão."
          ]}
        />
        
        <GuideSection
          title="Criação e Edição de Funis"
          description="Personalize as etapas do funil conforme seu processo de captação."
          steps={[
            "Clique em 'Criar Novo Funil' para iniciar um funil personalizado.",
            "Defina um nome e descrição para o novo funil.",
            "Adicione os estágios necessários, configurando nome e ordem.",
            "Salve o funil para começar a utilizá-lo na gestão de leads."
          ]}
        />
        
        <GuideSection
          title="Gerenciamento de Estágios"
          description="Configure os estágios do funil com detalhes e ações específicas."
          steps={[
            "Dentro da edição do funil, clique em um estágio para configurá-lo.",
            "Defina cores, ícones e descrições para cada estágio.",
            "Configure ações automáticas que devem ocorrer quando um lead entra no estágio.",
            "Organize a ordem dos estágios arrastando e soltando na interface."
          ]}
        />
        
        <GuideSection
          title="Métricas e Análises"
          description="Acompanhe o desempenho do funil através de métricas detalhadas."
          steps={[
            "Visualize a taxa de conversão entre cada estágio do funil.",
            "Analise o tempo médio de permanência em cada estágio.",
            "Identifique tendências de conversão por período.",
            "Exporte relatórios de desempenho do funil para análises detalhadas."
          ]}
        />
        
        <GuideSection
          title="Sugestões da IA"
          description="Receba recomendações inteligentes para otimizar seu funil de captação."
          steps={[
            "Acesse a seção 'Sugestões da IA' dentro da página do funil.",
            "Visualize recomendações baseadas nos dados históricos e padrões identificados.",
            "Implemente sugestões com um clique para testar melhorias no processo.",
            "Acompanhe os resultados das otimizações implementadas."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para otimização do funil:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Crie estágios que reflitam precisamente o processo real de captação da sua instituição</li>
          <li>Analise regularmente os estágios com maior taxa de abandono para identificar melhorias</li>
          <li>Implemente ações automáticas em cada estágio para reduzir trabalho manual</li>
          <li>Compare o desempenho de diferentes funis para identificar as melhores práticas</li>
          <li>Revise periodicamente a ordem e relevância dos estágios do funil</li>
        </ul>
      </div>
    </div>
  </div>
);

const CampusGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Gestão de Unidades</h2>
    
    <div className="space-y-4">
      <p>
        O módulo de Gestão de Unidades permite cadastrar e gerenciar todas as unidades (campi) da sua instituição. 
        Este recurso é fundamental para instituições com múltiplas unidades, pois permite segmentar leads, 
        personalizar campanhas e analisar métricas específicas para cada localidade.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Listagem de Unidades"
          description="Visualize todas as unidades cadastradas no sistema."
          steps={[
            "Acesse a seção 'Unidades' no menu lateral.",
            "Visualize a lista de unidades com informações resumidas.",
            "Utilize os filtros para encontrar unidades específicas.",
            "Clique em uma unidade para ver seus detalhes completos."
          ]}
        />
        
        <GuideSection
          title="Cadastro de Unidades"
          description="Adicione novas unidades ao sistema."
          steps={[
            "Clique no botão 'Nova Unidade' no topo da página.",
            "Preencha as informações básicas: nome, endereço, contatos, etc.",
            "Configure detalhes específicos como horário de funcionamento e cursos oferecidos.",
            "Salve a nova unidade para começar a utilizá-la no sistema."
          ]}
        />
        
        <GuideSection
          title="Importação em Massa"
          description="Importe múltiplas unidades de uma só vez através de planilha."
          steps={[
            "Acesse a aba 'Importar' na página de unidades.",
            "Baixe o modelo de planilha fornecido.",
            "Preencha a planilha com os dados de todas as unidades.",
            "Faça upload da planilha e verifique a validação dos dados antes de confirmar a importação."
          ]}
        />
        
        <GuideSection
          title="Edição e Configuração"
          description="Gerencie informações e configurações específicas de cada unidade."
          steps={[
            "Clique no botão de edição ao lado da unidade desejada.",
            "Atualize informações básicas ou configurações específicas.",
            "Configure os cursos disponíveis em cada unidade.",
            "Defina responsáveis e equipes de atendimento por unidade."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para gestão de unidades:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Mantenha os dados de endereço sempre atualizados para geocodificação precisa</li>
          <li>Configure corretamente os cursos disponíveis em cada unidade para direcionamento adequado de leads</li>
          <li>Utilize a importação em massa para atualizações periódicas de várias unidades</li>
          <li>Defina áreas de abrangência para cada unidade para distribuição geográfica de leads</li>
          <li>Configure responsáveis específicos para cada unidade para melhor gestão descentralizada</li>
        </ul>
      </div>
    </div>
  </div>
);

const OrchestrationGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Orquestração</h2>
    
    <div className="space-y-4">
      <p>
        O módulo de Orquestração permite configurar fluxos automáticos de comunicação e ações baseados em regras e 
        eventos. Com este recurso, você pode criar jornadas de captação personalizadas e automatizar interações com 
        leads em diferentes canais.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Segmentação Geográfica"
          description="Configure a distribuição de leads por proximidade geográfica."
          steps={[
            "Acesse a seção 'Orquestração' no menu lateral.",
            "Configure mapas de calor para visualizar a distribuição geográfica de leads.",
            "Defina áreas de abrangência para cada unidade.",
            "Configure regras automáticas de direcionamento baseadas em localização."
          ]}
        />
        
        <GuideSection
          title="Jornadas Automatizadas"
          description="Crie fluxos de comunicação automáticos baseados em comportamentos e eventos."
          steps={[
            "Acesse a aba 'Jornadas' dentro da Orquestração.",
            "Crie uma nova jornada definindo o evento inicial (trigger).",
            "Configure os passos da jornada com ações, condições e tempos de espera.",
            "Ative a jornada para começar a processar leads automaticamente."
          ]}
        />
        
        <GuideSection
          title="Configuração de Canais"
          description="Configure os canais de comunicação para orquestração multicanal."
          steps={[
            "Acesse a aba 'Canais' dentro da Orquestração.",
            "Configure integrações com WhatsApp, SMS, Email e outros canais.",
            "Defina modelos de mensagem para cada canal.",
            "Configure regras de prioridade e alternância entre canais."
          ]}
        />
        
        <GuideSection
          title="Regras de Engajamento"
          description="Configure quando e como interagir com cada perfil de lead."
          steps={[
            "Acesse a aba 'Regras' dentro da Orquestração.",
            "Crie regras baseadas em características dos leads ou comportamentos.",
            "Configure ações a serem executadas quando as condições forem atendidas.",
            "Defina prioridades entre regras para evitar conflitos."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para orquestração eficiente:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Comece com jornadas simples e vá aumentando a complexidade conforme você se familiariza com o sistema</li>
          <li>Teste todas as jornadas antes de ativá-las completamente</li>
          <li>Configure esperas apropriadas entre comunicações para não sobrecarregar o lead</li>
          <li>Monitore constantemente as taxas de abertura e resposta por canal para otimizar a estratégia</li>
          <li>Implemente gatilhos de saída para leads que demonstram desinteresse</li>
        </ul>
      </div>
    </div>
  </div>
);

const CampaignsGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Campanhas</h2>
    
    <div className="space-y-4">
      <p>
        O módulo de Campanhas permite criar, gerenciar e monitorar ações estruturadas de captação. 
        Com este recurso, você pode planejar e executar campanhas específicas para diferentes públicos-alvo, 
        acompanhando resultados e otimizando estratégias continuamente.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Listagem de Campanhas"
          description="Visualize todas as campanhas ativas e arquivadas."
          steps={[
            "Acesse a seção 'Campanhas' no menu lateral.",
            "Alterne entre as abas 'Ativas' e 'Arquivadas' para ver diferentes campanhas.",
            "Visualize informações resumidas como status, público-alvo e desempenho.",
            "Clique em uma campanha para ver detalhes completos."
          ]}
        />
        
        <GuideSection
          title="Criação de Campanhas"
          description="Configure novas campanhas com definição de público-alvo e ações."
          steps={[
            "Clique no botão 'Nova Campanha' no topo da página.",
            "Defina nome, descrição, período e objetivo da campanha.",
            "Configure o público-alvo utilizando critérios de segmentação.",
            "Defina as ações e canais que serão utilizados na campanha.",
            "Configure métricas de acompanhamento e metas de conversão."
          ]}
        />
        
        <GuideSection
          title="Radar de Oportunidades"
          description="Identifique oportunidades para novas campanhas baseadas em análise de dados."
          steps={[
            "Acesse a aba 'Radar de Oportunidades' na página de campanhas.",
            "Visualize sugestões de campanhas baseadas em padrões identificados pela IA.",
            "Analise o potencial de cada oportunidade com base em dados históricos.",
            "Crie campanhas diretamente a partir de oportunidades identificadas."
          ]}
        />
        
        <GuideSection
          title="Monitoramento e Análise"
          description="Acompanhe o desempenho das campanhas em tempo real."
          steps={[
            "Acesse os detalhes de uma campanha específica.",
            "Visualize métricas de desempenho como alcance, engajamento e conversão.",
            "Analise a distribuição de leads por estágio do funil dentro da campanha.",
            "Compare resultados com as metas estabelecidas.",
            "Exporte relatórios detalhados para análises aprofundadas."
          ]}
        />
        
        <GuideSection
          title="Reengajamento Automático"
          description="Configure campanhas específicas para reativar leads inativos."
          steps={[
            "Acesse a aba 'Reengajamento Automático' na página de campanhas.",
            "Configure critérios para identificação de leads inativos ou frios.",
            "Defina sequências de ações para reativação de leads.",
            "Monitore taxas de reativação e eficácia das estratégias."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para campanhas eficientes:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Segmente o público-alvo com precisão para aumentar a relevância da comunicação</li>
          <li>Defina objetivos claros e mensuráveis para cada campanha</li>
          <li>Teste diferentes abordagens e mensagens para otimizar resultados</li>
          <li>Monitore constantemente o desempenho e faça ajustes durante a execução</li>
          <li>Analise campanhas passadas para identificar padrões de sucesso</li>
          <li>Utilize o radar de oportunidades para identificar momentos estratégicos para novas campanhas</li>
        </ul>
      </div>
    </div>
  </div>
);

const AlertsGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Alertas</h2>
    
    <div className="space-y-4">
      <p>
        O módulo de Alertas permite acompanhar situações que requerem atenção imediata no processo de captação. 
        Com este recurso, você pode identificar oportunidades de conversão, leads prioritários e situações que 
        exigem intervenção manual para otimizar o processo.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Central de Alertas"
          description="Visualize e gerencie todos os alertas gerados pelo sistema."
          steps={[
            "Acesse a seção 'Alertas' no menu lateral.",
            "Visualize a lista de alertas classificados por prioridade e tipo.",
            "Utilize filtros para encontrar alertas específicos por categoria ou status.",
            "Marque alertas como resolvidos após tomar as ações necessárias."
          ]}
        />
        
        <GuideSection
          title="Tipos de Alertas"
          description="Compreenda os diferentes tipos de alertas disponíveis no sistema."
          steps={[
            "Alertas de Lead Quente: Indicam leads com alta probabilidade de conversão.",
            "Alertas de Inatividade: Identificam leads estagnados em um estágio por tempo excessivo.",
            "Alertas de Oportunidade: Sugerem momentos oportunos para contato baseado em comportamento.",
            "Alertas de Sistema: Notificam sobre questões técnicas ou processuais que precisam de atenção."
          ]}
        />
        
        <GuideSection
          title="Configuração de Alertas"
          description="Personalize quais alertas deseja receber e como."
          steps={[
            "Acesse a seção 'Configurações de Alertas' dentro do módulo.",
            "Defina quais tipos de alertas deseja receber e sua prioridade.",
            "Configure métodos de notificação (sistema, email, SMS, etc).",
            "Defina regras específicas para geração de alertas personalizados."
          ]}
        />
        
        <GuideSection
          title="Ações em Alertas"
          description="Responda e tome ações a partir dos alertas recebidos."
          steps={[
            "Clique em um alerta para ver detalhes completos.",
            "Visualize informações contextuais sobre o lead ou situação.",
            "Execute ações recomendadas diretamente da interface de alerta.",
            "Registre notas e resultados das intervenções realizadas.",
            "Marque o alerta como resolvido após as ações necessárias."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para gestão eficiente de alertas:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Configure alertas com prioridades adequadas para evitar sobrecarga de notificações</li>
          <li>Defina responsáveis específicos para cada tipo de alerta</li>
          <li>Estabeleça tempos de resposta máximos para alertas de alta prioridade</li>
          <li>Revise periodicamente a eficácia dos alertas configurados</li>
          <li>Utilize as estatísticas de resolução de alertas para identificar gargalos no processo</li>
          <li>Crie alertas personalizados para momentos críticos do seu processo específico de captação</li>
        </ul>
      </div>
    </div>
  </div>
);

const ConversationsGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Conversas</h2>
    
    <div className="space-y-4">
      <p>
        O módulo de Conversas centraliza todas as interações de comunicação com leads, permitindo acompanhar 
        e gerenciar diálogos em diferentes canais. Com este recurso, você mantém um histórico completo de 
        comunicações e pode continuar conversas de forma contextualizada.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Inbox Unificado"
          description="Visualize e responda mensagens de diferentes canais em um único local."
          steps={[
            "Acesse a seção 'Conversas' no menu lateral.",
            "Visualize a lista de conversas ativas com leads.",
            "Filtre conversas por canal, status ou responsável.",
            "Clique em uma conversa para ver o histórico completo e interagir."
          ]}
        />
        
        <GuideSection
          title="Chat Multicanal"
          description="Gerencie conversas através de diferentes canais de comunicação."
          steps={[
            "Dentro de uma conversa, visualize qual canal está sendo utilizado (WhatsApp, Email, SMS, etc.).",
            "Alterne entre canais para o mesmo lead conforme necessário.",
            "Visualize histórico completo independente do canal utilizado anteriormente.",
            "Utilize modelos de mensagem específicos para cada canal."
          ]}
        />
        
        <GuideSection
          title="Assistência da IA"
          description="Utilize inteligência artificial para otimizar comunicações."
          steps={[
            "Utilize sugestões de respostas geradas pela IA durante conversas.",
            "Acesse informações contextuais sobre o lead durante a conversa.",
            "Configure respostas automáticas para perguntas frequentes.",
            "Utilize o assistente de IA para analisar o sentimento da conversa e receber dicas."
          ]}
        />
        
        <GuideSection
          title="Transferência e Colaboração"
          description="Trabalhe em equipe no atendimento aos leads."
          steps={[
            "Transfira conversas para outros membros da equipe quando necessário.",
            "Adicione notas internas visíveis apenas para a equipe.",
            "Solicite apoio de especialistas mantendo o contexto da conversa.",
            "Configure alertas para conversas sem resposta por tempo excessivo."
          ]}
        />
        
        <GuideSection
          title="Automações de Conversa"
          description="Configure respostas e ações automáticas baseadas em regras."
          steps={[
            "Configure mensagens automáticas para primeiros contatos.",
            "Defina sequências de follow-up automatizadas.",
            "Configure gatilhos baseados em palavras-chave nas mensagens recebidas.",
            "Integre as conversas com atualizações de estágio no funil."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para conversas eficientes:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Mantenha tempos de resposta curtos para aumentar taxas de engajamento</li>
          <li>Personalize mensagens com informações contextuais do lead</li>
          <li>Utilize o canal preferido do lead sempre que possível</li>
          <li>Aproveite as sugestões da IA para comunicação mais eficiente</li>
          <li>Mantenha linguagem consistente entre diferentes atendentes</li>
          <li>Registre todas as informações relevantes obtidas durante conversas</li>
          <li>Utilize mensagens de follow-up para manter o engajamento</li>
        </ul>
      </div>
    </div>
  </div>
);

const ScheduleGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Agenda</h2>
    
    <div className="space-y-4">
      <p>
        O módulo de Agenda permite gerenciar compromissos, visitas e atendimentos relacionados ao processo de captação. 
        Com este recurso, você pode organizar atividades da equipe, agendar eventos com leads e garantir o 
        acompanhamento adequado de cada interação programada.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Visualização do Calendário"
          description="Visualize compromissos e eventos em diferentes formatos."
          steps={[
            "Acesse a seção 'Agenda' no menu lateral.",
            "Alterne entre visualizações: diária, semanal e mensal.",
            "Filtre eventos por tipo, responsável ou unidade.",
            "Visualize rapidamente compromissos pendentes e próximos eventos."
          ]}
        />
        
        <GuideSection
          title="Agendamento de Eventos"
          description="Crie e gerencie diferentes tipos de compromissos."
          steps={[
            "Clique no botão 'Novo Evento' ou diretamente no calendário.",
            "Selecione o tipo de evento: visita, reunião, atendimento, etc.",
            "Vincule o evento a um ou mais leads quando relevante.",
            "Configure detalhes como local, horário, duração e responsáveis.",
            "Defina lembretes automáticos para participantes."
          ]}
        />
        
        <GuideSection
          title="Agendamento Online"
          description="Permita que leads agendem compromissos diretamente."
          steps={[
            "Configure disponibilidade da equipe por tipo de atendimento.",
            "Crie links de agendamento para compartilhar com leads.",
            "Personalize formulários de pré-agendamento para coletar informações.",
            "Configure confirmações e lembretes automáticos.",
            "Visualize e gerencie solicitações de agendamento recebidas."
          ]}
        />
        
        <GuideSection
          title="Acompanhamento de Eventos"
          description="Registre resultados e próximos passos após cada evento."
          steps={[
            "Acesse um evento realizado no calendário.",
            "Registre o status do evento (realizado, cancelado, reagendado).",
            "Adicione notas sobre o que foi discutido ou decidido.",
            "Defina tarefas de acompanhamento quando necessário.",
            "Atualize o estágio do lead no funil conforme resultados do evento."
          ]}
        />
        
        <GuideSection
          title="Integração com Leads"
          description="Vincule eventos ao histórico de interação com leads."
          steps={[
            "Associe eventos a leads específicos durante o agendamento.",
            "Visualize o histórico completo de eventos de um lead em sua página de detalhes.",
            "Configure atualizações automáticas de estágio baseadas em participação em eventos.",
            "Utilize modelos de acompanhamento pós-evento específicos por tipo de compromisso."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para gestão eficiente da agenda:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Configure corretamente a disponibilidade da equipe para evitar conflitos</li>
          <li>Utilize códigos de cores para diferentes tipos de eventos para fácil visualização</li>
          <li>Configure lembretes adequados para minimizar faltas e cancelamentos</li>
          <li>Registre detalhadamente os resultados de cada evento para acompanhamento eficiente</li>
          <li>Utilize intervalos entre eventos para preparação e deslocamento</li>
          <li>Integre o calendário com aplicativos externos (Google Calendar, Outlook, etc.)</li>
          <li>Analise periodicamente taxas de comparecimento para otimizar processos</li>
        </ul>
      </div>
    </div>
  </div>
);

const UploadGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Upload</h2>
    
    <div className="space-y-4">
      <p>
        O módulo de Upload permite importar leads para o sistema a partir de arquivos externos, 
        como planilhas e CSVs. Com este recurso, você pode trazer dados previamente coletados 
        para o sistema de captação, otimizando o início do trabalho com leads existentes.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Importação de Leads"
          description="Importe leads de planilhas no formato CSV ou Excel."
          steps={[
            "Acesse a seção 'Upload' no menu lateral.",
            "Selecione o tipo de instituição (escola ou universidade).",
            "Escolha o campo chave que será utilizado para identificação de duplicidades.",
            "Arraste e solte o arquivo ou clique para selecionar o arquivo para upload.",
            "Aguarde a validação dos dados e correção de eventuais erros.",
            "Confirme a importação após a validação."
          ]}
        />
        
        <GuideSection
          title="Modelos de Importação"
          description="Utilize modelos pré-formatados para organizar seus dados."
          steps={[
            "Clique no botão 'Baixar modelo' na página de upload.",
            "Selecione o tipo de modelo adequado para seu caso.",
            "Preencha a planilha seguindo as instruções e campos definidos.",
            "Salve a planilha no formato CSV ou Excel.",
            "Faça o upload do arquivo preenchido no sistema."
          ]}
        />
        
        <GuideSection
          title="Validação de Dados"
          description="Verifique e corrija possíveis erros antes da importação."
          steps={[
            "Após o upload, o sistema validará automaticamente os dados.",
            "Identifique erros e avisos na lista de validação exibida.",
            "Corrija os erros na planilha original conforme necessário.",
            "Reenvie o arquivo corrigido se necessário.",
            "Confirme a importação quando todos os dados estiverem válidos."
          ]}
        />
        
        <GuideSection
          title="Mapeamento de Campos"
          description="Configure como os campos da planilha serão importados."
          steps={[
            "Após o upload, visualize o mapeamento automático de campos.",
            "Ajuste o mapeamento caso algum campo não tenha sido identificado corretamente.",
            "Configure campos adicionais que não estão no modelo padrão.",
            "Defina valores padrão para campos não presentes na planilha.",
            "Salve o mapeamento para futuros uploads se desejado."
          ]}
        />
        
        <GuideSection
          title="Histórico de Importações"
          description="Acompanhe registros de uploads anteriores."
          steps={[
            "Acesse a aba 'Histórico' na página de upload.",
            "Visualize todas as importações realizadas com data, usuário e status.",
            "Veja detalhes como quantidade de registros e estatísticas de cada importação.",
            "Baixe relatórios de importação para análise detalhada.",
            "Reverta importações recentes se necessário."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para uploads eficientes:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Utilize sempre os modelos fornecidos pelo sistema para evitar erros de formatação</li>
          <li>Certifique-se de que os campos obrigatórios estão preenchidos em todos os registros</li>
          <li>Defina corretamente o campo chave para evitar duplicidades indesejadas</li>
          <li>Padronize informações como telefones, emails e endereços antes do upload</li>
          <li>Realize uploads menores para testar antes de importar grandes volumes de dados</li>
          <li>Verifique cuidadosamente os relatórios de validação antes de confirmar a importação</li>
          <li>Mantenha cópias de segurança dos arquivos originais utilizados nos uploads</li>
        </ul>
      </div>
    </div>
  </div>
);

const RulesGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Regras</h2>
    
    <div className="space-y-4">
      <p>
        O módulo de Regras permite configurar políticas, parâmetros e automações para o funcionamento do sistema de captação. 
        Com este recurso, você pode personalizar o comportamento do sistema conforme as necessidades específicas da sua instituição.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Regras de Discagem"
          description="Configure quando e como os contatos telefônicos devem ser realizados."
          steps={[
            "Acesse a seção 'Regras > Discagem' no menu lateral.",
            "Configure horários permitidos para contato telefônico.",
            "Defina intervalos mínimos entre tentativas de contato.",
            "Configure prioridades de discagem por tipo de lead ou estágio.",
            "Estabeleça limites de tentativas antes de mudar a abordagem."
          ]}
        />
        
        <GuideSection
          title="Configuração de Metas"
          description="Defina objetivos quantitativos para o processo de captação."
          steps={[
            "Acesse a seção 'Regras > Metas' no menu lateral.",
            "Configure metas globais de captação para períodos específicos.",
            "Defina metas individuais por membro da equipe.",
            "Estabeleça metas por unidade ou curso específico.",
            "Configure indicadores de acompanhamento e visualização de progresso."
          ]}
        />
        
        <GuideSection
          title="Configuração de Períodos"
          description="Defina períodos letivos e ciclos de captação."
          steps={[
            "Acesse a seção 'Regras > Períodos' no menu lateral.",
            "Configure datas de início e fim dos períodos letivos.",
            "Defina ciclos de captação associados a cada período.",
            "Configure datas importantes como início de matrículas e limite de ingresso.",
            "Associe campanhas e ações específicas a cada período configurado."
          ]}
        />
        
        <GuideSection
          title="Regras de Negócio"
          description="Configure comportamentos específicos do sistema."
          steps={[
            "Acesse a seção 'Regras > Negócio' no menu lateral.",
            "Configure critérios para classificação automática de leads (quente, morno, frio).",
            "Defina regras para distribuição automática de leads entre a equipe.",
            "Estabeleça critérios para geração de alertas específicos.",
            "Configure integrações com outros sistemas da instituição."
          ]}
        />
        
        <GuideSection
          title="Permissões e Acessos"
          description="Configure quem pode acessar e modificar diferentes recursos."
          steps={[
            "Acesse a seção 'Regras > Permissões' no menu lateral.",
            "Configure perfis de acesso com diferentes níveis de permissão.",
            "Atribua permissões específicas por módulo e funcionalidade.",
            "Defina restrições de acesso por unidade ou departamento.",
            "Configure limites de visualização e edição de dados sensíveis."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para configuração de regras:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Configure regras que reflitam as políticas reais da sua instituição</li>
          <li>Documente as regras configuradas para facilitar a compreensão da equipe</li>
          <li>Teste as regras em ambiente controlado antes de aplicá-las amplamente</li>
          <li>Revise periodicamente as regras para adequá-las a mudanças nos processos</li>
          <li>Configure permissões com o princípio de menor privilégio necessário</li>
          <li>Mantenha metas desafiadoras, porém realistas para motivar a equipe</li>
          <li>Alinhe períodos configurados com o calendário acadêmico da instituição</li>
        </ul>
      </div>
    </div>
  </div>
);

const SettingsGuide: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Configurações</h2>
    
    <div className="space-y-4">
      <p>
        O módulo de Configurações permite personalizar diversos aspectos do sistema para adequá-lo 
        às necessidades específicas da sua instituição. Aqui você pode ajustar preferências, 
        integrações e parâmetros gerais de funcionamento.
      </p>
      
      <h3 className="text-xl font-semibold mt-6">Principais Recursos</h3>
      
      <div className="mt-2 space-y-4">
        <GuideSection
          title="Configurações Gerais"
          description="Ajuste parâmetros básicos do sistema."
          steps={[
            "Acesse a seção 'Configurações > Geral' no menu de sistema.",
            "Configure informações básicas da instituição (nome, logo, cores).",
            "Ajuste preferências de exibição e formatos de data/hora.",
            "Configure parâmetros de notificações gerais.",
            "Defina configurações regionais (idioma, fuso horário, formato numérico)."
          ]}
        />
        
        <GuideSection
          title="Integrações"
          description="Configure conexões com sistemas e ferramentas externas."
          steps={[
            "Acesse a seção 'Configurações > Integrações' no menu de sistema.",
            "Configure integrações com sistemas de gestão acadêmica.",
            "Configure conexões com ferramentas de marketing digital.",
            "Estabeleça integrações com canais de comunicação (WhatsApp, SMS, Email).",
            "Configure webhooks para comunicação bidirecional com outros sistemas."
          ]}
        />
        
        <GuideSection
          title="Usuários e Equipes"
          description="Gerencie acessos e responsabilidades no sistema."
          steps={[
            "Acesse a seção 'Configurações > Usuários' no menu de sistema.",
            "Crie e gerencie contas de usuários do sistema.",
            "Configure grupos e equipes para organização da estrutura.",
            "Atribua permissões e perfis de acesso específicos.",
            "Defina hierarquias e supervisores para controle de atividades."
          ]}
        />
        
        <GuideSection
          title="Modelos e Templates"
          description="Configure mensagens padronizadas para diversos contextos."
          steps={[
            "Acesse a seção 'Configurações > Modelos' no menu de sistema.",
            "Crie templates de emails para diferentes situações.",
            "Configure modelos de mensagens para WhatsApp e SMS.",
            "Estabeleça roteiros para contatos telefônicos.",
            "Defina respostas rápidas para utilização nas conversas."
          ]}
        />
        
        <GuideSection
          title="Backup e Segurança"
          description="Configure políticas de proteção e backup de dados."
          steps={[
            "Acesse a seção 'Configurações > Segurança' no menu de sistema.",
            "Configure políticas de senha e autenticação.",
            "Defina regras para backup automático de dados.",
            "Configure políticas de retenção de informações.",
            "Estabeleça níveis de criptografia e proteção de dados sensíveis."
          ]}
        />
      </div>
      
      <div className="bg-primary/5 p-4 rounded-md mt-6">
        <h4 className="font-medium">Dicas para configurações eficientes:</h4>
        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
          <li>Personalize a interface com as cores e logo da instituição para identificação visual</li>
          <li>Configure integrações apenas com sistemas que realmente necessitam de comunicação</li>
          <li>Mantenha a lista de usuários atualizada, removendo acessos de pessoas que não estão mais na equipe</li>
          <li>Crie templates de mensagens que refletem o tom de comunicação da instituição</li>
          <li>Implemente políticas de segurança robustas, especialmente para proteção de dados pessoais</li>
          <li>Documente todas as configurações realizadas para referência futura</li>
          <li>Teste integrações em ambiente controlado antes de ativá-las em produção</li>
        </ul>
      </div>
    </div>
  </div>
);

// Componentes auxiliares
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="flex items-start gap-3 p-4 border rounded-md bg-white hover:border-primary transition-colors">
    <div className="shrink-0 mt-1">{icon}</div>
    <div>
      <h4 className="font-medium mb-1">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

interface GuideSectionProps {
  title: string;
  description: string;
  steps: string[];
}

const GuideSection: React.FC<GuideSectionProps> = ({ title, description, steps }) => (
  <div className="border rounded-md p-4">
    <h4 className="font-medium text-lg mb-1">{title}</h4>
    <p className="text-muted-foreground mb-3 text-sm">{description}</p>
    
    <div className="space-y-2 mt-3">
      <p className="text-sm font-medium">Passo a passo:</p>
      <ol className="list-decimal list-inside text-sm space-y-1">
        {steps.map((step, index) => (
          <li key={index} className="text-muted-foreground">{step}</li>
        ))}
      </ol>
    </div>
  </div>
);

export default UserGuideContent;
