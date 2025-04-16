
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { LeadData } from '@/types/recruitment/leads';
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface SegmentationStrategiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Função para processar estratégias de engajamento
const processEngagementStrategies = (leads: LeadData[]) => {
  // Segmentação por Nível de Engajamento
  const hotLeads = leads.filter(lead => 
    lead.interactionCount! > 3 && 
    lead.responseTime! < 24 // menos de 24h para responder
  );

  const coldLeads = leads.filter(lead => 
    (lead.interactionCount! <= 1 || lead.responseTime! > 72) // mais de 3 dias sem resposta
  );

  // Segmentação por Estágio no Funil
  const leadsByStage = {
    'Lead Gerado': leads.filter(lead => lead.funnelStage === 'Lead Gerado'),
    'Primeiro Contato': leads.filter(lead => lead.funnelStage === 'Primeiro Contato'),
    'Apresentação': leads.filter(lead => lead.funnelStage === 'Apresentação'),
    'Visita': leads.filter(lead => lead.funnelStage === 'Visita'),
    'Matrícula': leads.filter(lead => lead.funnelStage === 'Matrícula')
  };

  return { hotLeads, coldLeads, leadsByStage };
};

const SegmentationStrategiesDialog: React.FC<SegmentationStrategiesDialogProps> = ({
  open,
  onOpenChange
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("demographic");
  const [notes, setNotes] = useState("");

  const handleApplyStrategies = () => {
    setIsProcessing(true);
    
    // Simular processamento com dados de demonstração
    setTimeout(() => {
      // Mockup de leads para demonstração
      const mockLeads: LeadData[] = [
        { 
          id: '1', 
          name: 'João Silva', 
          email: 'joao@example.com', 
          interactionCount: 5, 
          responseTime: 3,
          funnelStage: 'Apresentação'
        },
        { 
          id: '2', 
          name: 'Maria Souza', 
          email: 'maria@example.com', 
          interactionCount: 1, 
          responseTime: 96,
          funnelStage: 'Lead Gerado'
        },
        { 
          id: '3', 
          name: 'Carlos Oliveira', 
          email: 'carlos@example.com', 
          interactionCount: 4, 
          responseTime: 12,
          funnelStage: 'Primeiro Contato'
        },
        { 
          id: '4', 
          name: 'Ana Ferreira', 
          email: 'ana@example.com', 
          interactionCount: 0, 
          responseTime: 120,
          funnelStage: 'Lead Gerado'
        },
        { 
          id: '5', 
          name: 'Pedro Santos', 
          email: 'pedro@example.com', 
          interactionCount: 6, 
          responseTime: 6,
          funnelStage: 'Visita'
        }
      ];
      
      if (activeTab === "engagement") {
        const { hotLeads, coldLeads, leadsByStage } = processEngagementStrategies(mockLeads);

        // Executar ações baseadas nas estratégias
        hotLeads.forEach(lead => {
          // Ações para leads quentes
          console.log(`Priorizar lead ${lead.name} para contato imediato`);
        });

        coldLeads.forEach(lead => {
          // Ações para leads frios
          console.log(`Iniciar campanha de reativação para ${lead.name}`);
        });

        // Estatísticas de segmentação
        toast({
          title: "Estratégias de Engajamento Aplicadas",
          description: `
            Leads Quentes: ${hotLeads.length}
            Leads Frios: ${coldLeads.length}
            Leads em cada estágio processados.
            ${notes ? `\nObservações: ${notes}` : ''}
          `
        });
      } else {
        // Mensagem para outras estratégias (demo)
        toast({
          title: `Estratégias de ${getTabTitle(activeTab)} Aplicadas`,
          description: `
            Critérios aplicados com sucesso!
            ${notes ? `\nObservações: ${notes}` : ''}
          `
        });
      }
      
      setIsProcessing(false);
      onOpenChange(false);
    }, 1500);
  };

  const getTabTitle = (tabId: string): string => {
    switch (tabId) {
      case "demographic": return "Demográfica";
      case "behavioral": return "Comportamental";
      case "interest": return "Interesse";
      case "engagement": return "Engajamento";
      default: return "";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Estratégias de Segmentação de Leads
          </DialogTitle>
        </DialogHeader>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-4"
        >
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="demographic">Demográfica</TabsTrigger>
            <TabsTrigger value="behavioral">Comportamental</TabsTrigger>
            <TabsTrigger value="interest">Por Interesse</TabsTrigger>
            <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="demographic" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StrategyCard 
                title="Segmentação Geográfica" 
                description="Crie grupos de leads com base em sua localização (bairros, cidades, regiões)."
                benefits={[
                  "Personalize abordagem por proximidade do campus",
                  "Otimize estratégias por região",
                  "Direcione campanhas para áreas específicas"
                ]}
              />
              
              <StrategyCard 
                title="Segmentação por Perfil Socioeconômico" 
                description="Agrupe leads conforme poder aquisitivo, formação e histórico familiar."
                benefits={[
                  "Adeque ofertas à capacidade financeira",
                  "Crie programas de bolsas direcionados",
                  "Ajuste mensagens ao perfil sociocultural"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="behavioral" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StrategyCard 
                title="Segmentação por Urgência" 
                description="Identifique leads com necessidade imediata de matrícula vs. planejamento de longo prazo."
                benefits={[
                  "Priorize contatos com decisão iminente",
                  "Crie senso de urgência quando apropriado",
                  "Ajuste tempo de follow-up à necessidade"
                ]}
              />
              
              <StrategyCard 
                title="Segmentação por Fonte de Origem" 
                description="Agrupe leads de acordo com o canal que os trouxe (redes sociais, site, indicações, etc)."
                benefits={[
                  "Personalize abordagem conforme ponto de contato",
                  "Identifique canais mais eficientes",
                  "Otimize investimento em fontes produtivas"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="interest" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StrategyCard 
                title="Segmentação por Curso de Interesse" 
                description="Agrupe leads por áreas acadêmicas ou cursos específicos de interesse."
                benefits={[
                  "Envie conteúdo específico do curso desejado",
                  "Destaque diferenciais relevantes para cada área",
                  "Conecte leads com coordenadores específicos"
                ]}
              />
              
              <StrategyCard 
                title="Segmentação por Motivação" 
                description="Identifique razões primárias para buscar a instituição (carreira, qualidade, localização)."
                benefits={[
                  "Personalize argumentos conforme motivadores",
                  "Destaque aspectos mais relevantes para cada grupo",
                  "Aumente conversão com mensagens mais precisas"
                ]}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StrategyCard 
                title="Segmentação por Nível de Engajamento" 
                description="Identifique leads 'quentes' para abordagem prioritária e leads 'frios' para reativação."
                benefits={[
                  "Priorize leads com alto potencial de conversão",
                  "Crie estratégias específicas para reativar leads frios",
                  "Otimize esforços da equipe de captação"
                ]}
              />
              
              <StrategyCard 
                title="Segmentação por Estágio no Funil" 
                description="Personalize a abordagem conforme a etapa do funil em que o lead se encontra."
                benefits={[
                  "Personalize contato para cada estágio do funil",
                  "Identifique gargalos na jornada de conversão",
                  "Aplique estratégias específicas para cada momento de decisão"
                ]}
              />
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-4">
          <label htmlFor="notes" className="block text-sm font-medium mb-2">
            Observações ou ajustes (opcional)
          </label>
          <Textarea
            id="notes"
            placeholder="Adicione observações ou ajustes específicos para a estratégia selecionada..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleApplyStrategies} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processando...
              </>
            ) : (
              'Aplicar Estratégias'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

interface StrategyCardProps {
  title: string;
  description: string;
  benefits: string[];
}

const StrategyCard: React.FC<StrategyCardProps> = ({ title, description, benefits }) => {
  return (
    <div className="bg-white rounded-lg border p-5 shadow-sm">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm">{description}</p>
      <div className="bg-gray-50 rounded-md p-3">
        <h4 className="text-sm font-medium mb-2">Benefícios:</h4>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SegmentationStrategiesDialog;
