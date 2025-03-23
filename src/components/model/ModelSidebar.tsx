
import React from 'react';
import { 
  Brain, 
  BarChart3, 
  Users, 
  BookOpen, 
  AlertTriangle, 
  FileText, 
  History, 
  X, 
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

interface ModelSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ModelSidebar: React.FC<ModelSidebarProps> = ({
  isOpen,
  onClose
}) => {
  return (
    <aside 
      className={cn(
        "h-full border-r bg-card w-72 transition-all duration-300 overflow-hidden",
        isOpen ? "mr-0" : "-ml-72"
      )}
    >
      <div className="flex h-12 items-center justify-between border-b px-4">
        <span className="text-base font-semibold flex items-center">
          <Brain className="mr-2 h-5 w-5 text-primary" />
          Menu do Modelo
        </span>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="md:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="h-[calc(100vh-3rem)]">
        <div className="px-3 py-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">
              VISÃO GERAL
            </p>
            
            <a 
              href="#overview"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
            >
              <Brain className="h-4 w-4" />
              <span>Funcionamento do Modelo</span>
            </a>
            
            <a 
              href="#metrics"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Métricas de Desempenho</span>
            </a>
            
            <a 
              href="#students"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
            >
              <Users className="h-4 w-4" />
              <span>Alunos Analisados</span>
            </a>
            
            <a 
              href="#docs"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
            >
              <BookOpen className="h-4 w-4" />
              <span>Documentação Técnica</span>
            </a>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-1">
            <p className="text-xs font-semibold text-muted-foreground mb-2 px-2">
              RECURSOS
            </p>
            
            <a 
              href="#alerts"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Alertas Gerados</span>
            </a>
            
            <a 
              href="#interventions"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
            >
              <Lightbulb className="h-4 w-4" />
              <span>Intervenções Sugeridas</span>
            </a>
            
            <a 
              href="#reports"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
            >
              <FileText className="h-4 w-4" />
              <span>Relatórios</span>
            </a>
            
            <a 
              href="#history"
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-primary"
            >
              <History className="h-4 w-4" />
              <span>Histórico de Análises</span>
            </a>
          </div>
          
          <Separator className="my-4" />
          
          <div className="rounded-lg border border-dashed p-4 mt-4">
            <h4 className="text-sm font-medium mb-2">Precisa de ajuda?</h4>
            <p className="text-xs text-muted-foreground mb-3">
              Consulte nossa documentação para entender melhor como o modelo de IA funciona.
            </p>
            <Button 
              variant="secondary" 
              size="sm" 
              className="w-full"
            >
              Ver Documentação
            </Button>
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
};
