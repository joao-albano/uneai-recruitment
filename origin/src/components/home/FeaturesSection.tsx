
import React from 'react';
import { FileUp, BarChart3, Bell, ClipboardCheck, Calendar, Shield } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-6">
      <div className="max-w-5xl mx-auto mb-12 text-center">
        <h2 className="text-3xl font-bold mb-4">Principais funcionalidades</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Descubra como o Une.AI EduCare pode ajudar sua escola a identificar e prevenir a evasão escolar.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <FeatureCard 
          icon={FileUp}
          title="Upload de Dados"
          description="Faça o upload de dados dos alunos através de planilhas CSV ou Excel."
          content="Sistema plug and play que não depende de integração com sistemas escolares existentes. Validação automática de dados para evitar erros."
          linkTo="/upload"
          linkText="Upload de dados"
        />
        
        <FeatureCard 
          icon={BarChart3}
          title="Dashboard Inteligente"
          description="Visualize indicadores de risco de forma clara e objetiva."
          content="Acompanhe o percentual de risco por aluno, turma e série, além do status das ações tomadas e engajamento das famílias."
          linkTo="/dashboard"
          linkText="Ver dashboard"
        />
        
        <FeatureCard 
          icon={Bell}
          title="Alertas Automáticos"
          description="Receba alertas sobre alunos em risco e ações recomendadas."
          content="Alertas personalizados baseados no nível de risco de cada aluno, com sugestão de ações para coordenadores e professores."
          linkTo="/alerts"
          linkText="Verificar alertas"
        />
        
        <FeatureCard 
          icon={ClipboardCheck}
          title="Pesquisa Diagnóstica"
          description="Colete informações das famílias para enriquecer a análise."
          content="Formulário web responsivo para coletar dados sobre mudança de endereço, bullying, integração social e outros fatores de risco."
          linkTo="/survey"
          linkText="Acessar pesquisa"
        />
        
        <FeatureCard 
          icon={Calendar}
          title="Agenda Automatizada"
          description="Agende atendimentos e receba lembretes automáticos."
          content="Criação automática de atendimentos com regras inteligentes, atribuição de responsáveis e lembretes por canais escolhidos."
          linkTo="/schedule"
          linkText="Gerenciar agenda"
        />
        
        <FeatureCard 
          icon={Shield}
          title="Análise de IA"
          description="Processamento inteligente de dados para identificar riscos."
          content="Algoritmo de Decision Tree que analisa notas, frequência e comportamento para classificar alunos em níveis de risco e sugerir ações."
          linkTo="/dashboard"
          linkText="Ver análises"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
