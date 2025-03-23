
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AiModelInfo from '@/components/model/AiModelInfo';
import RiskDistributionCard from '@/components/model/RiskDistributionCard';
import InterventionsCard from '@/components/model/InterventionsCard';
import ModelExplanationCard from '@/components/model/ModelExplanationCard';

const OverviewTab: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Model Information Card */}
        <AiModelInfo />
        
        {/* Risk Distribution Card */}
        <RiskDistributionCard />
        
        {/* Example card with decision tree path */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Caminhos de Decisão</CardTitle>
            <CardDescription>
              Como o modelo determina o nível de risco
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="relative pl-6">
                <div className="absolute left-0 top-2 mt-0.5 h-full w-px bg-muted-foreground/20" />
                <div className="absolute left-0 top-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Passo 1: Frequência</p>
                  <p className="text-xs text-muted-foreground">O modelo analisa a taxa de frequência do aluno.</p>
                  <div className="bg-muted p-2 rounded text-xs">
                    <p>Se frequência &lt; 75%: <span className="text-red-500">Alto risco</span></p>
                    <p>Se frequência entre 75-85%: <span className="text-amber-500">Médio risco</span></p>
                    <p>Se frequência &gt; 85%: <span className="text-green-500">Baixo risco (inicial)</span></p>
                  </div>
                </div>
              </div>
              
              <div className="relative pl-6">
                <div className="absolute left-0 top-2 mt-0.5 h-full w-px bg-muted-foreground/20" />
                <div className="absolute left-0 top-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Passo 2: Notas</p>
                  <p className="text-xs text-muted-foreground">Avaliação do desempenho acadêmico.</p>
                  <div className="bg-muted p-2 rounded text-xs">
                    <p>Se nota &lt; 5.0: <span className="text-red-500">Alto risco</span></p>
                    <p>Se nota entre 5.0-6.0: <span className="text-amber-500">Médio risco</span></p>
                    <p>Se nota &gt; 6.0: Manter nível de risco atual</p>
                  </div>
                </div>
              </div>
              
              <div className="relative pl-6">
                <div className="absolute left-0 top-2 mt-0.5 h-2 w-2 rounded-full bg-primary" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Passo 3: Comportamento</p>
                  <p className="text-xs text-muted-foreground">Avaliação de aspectos comportamentais.</p>
                  <div className="bg-muted p-2 rounded text-xs">
                    <p>Se comportamento &lt; 3: Elevar nível de risco em um grau</p>
                    <p>Se comportamento = 5: Reduzir nível de risco em um grau</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* AI-Assisted Interventions Card */}
        <InterventionsCard />
        
        {/* Model Explanation Card */}
        <ModelExplanationCard />
      </div>
    </>
  );
};

export default OverviewTab;
