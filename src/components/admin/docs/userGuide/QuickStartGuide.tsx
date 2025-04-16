
import React from 'react';
import { Lightbulb } from 'lucide-react';

const QuickStartGuide: React.FC = () => {
  return (
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
  );
};

export default QuickStartGuide;
