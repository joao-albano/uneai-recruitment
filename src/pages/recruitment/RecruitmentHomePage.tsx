
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileUp, BarChart3, UserPlus, LineChart, CalendarCheck, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useProduct } from '@/context/product';
import Layout from '@/components/layout/Layout';
import FeatureCard from '@/components/recruitment/home/FeatureCard';

const RecruitmentHomePage: React.FC = () => {
  // Inicialize o sidebar fechado (sidebarOpen = false) e colapsado (sidebarCollapsed = true)
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(true);
  const { toast } = useToast();
  const { setCurrentProduct } = useProduct();
  
  // Definir o produto atual como 'recruitment'
  useEffect(() => {
    setCurrentProduct('recruitment');
  }, [setCurrentProduct]);

  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="w-full">
        <section className="relative w-full bg-gradient-to-b from-primary/10 to-background py-16 px-4 md:px-6 overflow-hidden mb-16">
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                Une.AI <span className="text-primary">Captação</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mb-8">
                Sistema inteligente de captação de alunos com análise preditiva, 
                gestão de leads e automação de campanhas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="relative group">
                  <Link to="/recruitment">
                    <span className="relative z-10 flex items-center">
                      Acessar dashboard
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/upload">Carregar dados de leads</Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Background decorative elements */}
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
        </section>
        
        <section className="py-10 px-4 md:px-6">
          <div className="max-w-5xl mx-auto mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Principais funcionalidades</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descubra como o Une.AI Captação pode ajudar sua instituição a otimizar o processo de captação de alunos.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            <FeatureCard 
              icon={FileUp}
              title="Upload de Dados"
              description="Faça o upload de leads através de planilhas CSV ou Excel."
              content="Sistema de importação que permite trazer dados de leads já existentes. Validação automática para evitar erros."
              linkTo="/upload"
              linkText="Upload de dados"
            />
            
            <FeatureCard 
              icon={BarChart3}
              title="Dashboard Inteligente"
              description="Visualize indicadores de conversão de forma clara e objetiva."
              content="Acompanhe a performance dos canais de captação, estágios do funil e taxa de conversão por origem."
              linkTo="/recruitment"
              linkText="Ver dashboard"
            />
            
            <FeatureCard 
              icon={UserPlus}
              title="Gestão de Leads"
              description="Gerencie todo o ciclo de vida dos leads de forma eficiente."
              content="Kanban visual do processo de captação, com dados detalhados dos potenciais alunos e histórico de interações."
              linkTo="/recruitment/leads"
              linkText="Gerenciar leads"
            />
            
            <FeatureCard 
              icon={LineChart}
              title="Funil de Captação"
              description="Visualize e otimize cada estágio do seu funil de captação."
              content="Análise detalhada de conversão entre estágios, identificação de gargalos e oportunidades de melhoria no processo."
              linkTo="/recruitment/funnel"
              linkText="Acessar funil"
            />
            
            <FeatureCard 
              icon={CalendarCheck}
              title="Campanhas"
              description="Crie e gerencie campanhas de captação automatizadas."
              content="Definição de públicos-alvo, criação de sequências de contato, agendamento de ações e análise de resultados."
              linkTo="/recruitment/campaigns"
              linkText="Gerenciar campanhas"
            />
            
            <FeatureCard 
              icon={MessageSquare}
              title="Conversas Inteligentes"
              description="Interface de conversas com IA para atendimento aos leads."
              content="Sistema conversacional que permite atendimento em escala com qualidade, respondendo dúvidas e coletando informações."
              linkTo="/recruitment/conversation"
              linkText="Ver conversas"
            />
          </div>
        </section>
        
        <section className="py-16 px-4 md:px-6 bg-gradient-to-tr from-primary/5 to-accent/5 rounded-xl mx-4 md:mx-6 mt-10 mb-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Comece agora mesmo</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Otimize seu processo de captação com automação inteligente e análise preditiva.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/upload">Importar leads</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/recruitment">Explorar dashboard</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RecruitmentHomePage;
