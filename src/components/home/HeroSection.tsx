
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface HeroSectionProps {
  generateDemoData: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ generateDemoData }) => {
  const { toast } = useToast();
  
  return (
    <section className="relative w-full bg-gradient-to-b from-primary/10 to-background py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
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
  );
};

export default HeroSection;
