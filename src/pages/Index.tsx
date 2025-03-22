
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Bell, Calendar, ClipboardCheck, FileUp, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';

const Index = () => {
  const { students, alerts, generateDemoData } = useData();
  const { toast } = useToast();
  
  useEffect(() => {
    if (students.length === 0) {
      toast({
        title: 'Bem-vindo ao Une.AI EduCare',
        description: 'Sistema de prevenção à evasão escolar com inteligência artificial.',
      });
    }
  }, [students.length, toast]);

  return (
    <div className="min-h-screen flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-primary/10 to-background py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center animate-slide-up">
            <Badge className="mb-4 px-3 py-1 text-sm rounded-full">
              <Shield className="mr-1 h-3.5 w-3.5" />
              <span>Preview MVP</span>
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Une.AI <span className="text-primary">EduCare</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8">
              Sistema inteligente de prevenção à evasão escolar para escolas de educação básica,
              com análise preditiva e recomendações personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="relative group">
                <Link to="/dashboard">
                  <span className="relative z-10 flex items-center">
                    Acessar dashboard
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => {
                  generateDemoData();
                  toast({
                    title: 'Dados de demonstração',
                    description: 'Carregamos alguns dados de exemplo para você explorar o sistema.',
                  });
                }}
              >
                Carregar dados de demonstração
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl"></div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-5xl mx-auto mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Principais funcionalidades</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra como o Une.AI EduCare pode ajudar sua escola a identificar e prevenir a evasão escolar.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-2">
                <FileUp className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Upload de Dados</CardTitle>
              <CardDescription>
                Faça o upload de dados dos alunos através de planilhas CSV ou Excel.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sistema plug and play que não depende de integração com sistemas escolares existentes. 
                Validação automática de dados para evitar erros.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/upload">
                  <FileUp className="mr-2 h-4 w-4" />
                  Upload de dados
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-2">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Dashboard Inteligente</CardTitle>
              <CardDescription>
                Visualize indicadores de risco de forma clara e objetiva.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Acompanhe o percentual de risco por aluno, turma e série, além do status das ações 
                tomadas e engajamento das famílias.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/dashboard">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Ver dashboard
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-2">
                <Bell className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Alertas Automáticos</CardTitle>
              <CardDescription>
                Receba alertas sobre alunos em risco e ações recomendadas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Alertas personalizados baseados no nível de risco de cada aluno, 
                com sugestão de ações para coordenadores e professores.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/alerts">
                  <Bell className="mr-2 h-4 w-4" />
                  Verificar alertas
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-2">
                <ClipboardCheck className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Pesquisa Diagnóstica</CardTitle>
              <CardDescription>
                Colete informações das famílias para enriquecer a análise.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Formulário web responsivo para coletar dados sobre mudança de endereço, 
                bullying, integração social e outros fatores de risco.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/survey">
                  <ClipboardCheck className="mr-2 h-4 w-4" />
                  Acessar pesquisa
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-2">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Agenda Automatizada</CardTitle>
              <CardDescription>
                Agende atendimentos e receba lembretes automáticos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Criação automática de atendimentos com regras inteligentes, 
                atribuição de responsáveis e lembretes por canais escolhidos.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/schedule">
                  <Calendar className="mr-2 h-4 w-4" />
                  Gerenciar agenda
                </Link>
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="transition-all duration-300 hover:shadow-md">
            <CardHeader>
              <div className="rounded-full w-10 h-10 bg-primary/10 flex items-center justify-center mb-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <CardTitle>Análise de IA</CardTitle>
              <CardDescription>
                Processamento inteligente de dados para identificar riscos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Algoritmo de Decision Tree que analisa notas, frequência e comportamento 
                para classificar alunos em níveis de risco e sugerir ações.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link to="/dashboard">
                  <Shield className="mr-2 h-4 w-4" />
                  Ver análises
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-tr from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Comece agora mesmo</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Faça o upload dos seus dados ou experimente o sistema com nossos dados de demonstração.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/upload">Fazer upload de dados</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/dashboard">Explorar dashboard</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 border-t">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              U
            </div>
            <p className="text-sm font-medium">
              Une.AI EduCare &copy; {new Date().getFullYear()}
            </p>
          </div>
          <p className="text-sm text-muted-foreground">
            Sistema de prevenção à evasão escolar com inteligência artificial
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
