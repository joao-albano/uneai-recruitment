
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Users, Tag, Target, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface SegmentationStrategiesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SegmentationStrategiesDialog: React.FC<SegmentationStrategiesDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('demographic');
  const [isApplying, setIsApplying] = useState(false);
  
  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };
  
  const handleApplyStrategies = () => {
    setIsApplying(true);
    
    // Simulando um processamento
    setTimeout(() => {
      setIsApplying(false);
      
      // Mostrar notificação de sucesso
      toast({
        title: "Estratégias aplicadas com sucesso",
        description: `As estratégias de segmentação ${getTabTitle(selectedTab)} foram aplicadas ao funil.`,
      });
      
      // Fechar o diálogo
      onOpenChange(false);
    }, 1000);
  };
  
  const getTabTitle = (tabValue: string): string => {
    switch (tabValue) {
      case 'demographic': return 'Demográficas';
      case 'behavioral': return 'Comportamentais';
      case 'interest': return 'Por Interesse';
      case 'engagement': return 'Por Engajamento';
      default: return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl text-blue-800 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            Estratégias de Segmentação de Leads
          </DialogTitle>
          <DialogDescription>
            Aprimore seu processo de captação com segmentações estratégicas para aumentar a eficácia das suas ações.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="demographic" value={selectedTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="demographic">Demográfica</TabsTrigger>
            <TabsTrigger value="behavioral">Comportamental</TabsTrigger>
            <TabsTrigger value="interest">Por Interesse</TabsTrigger>
            <TabsTrigger value="engagement">Engajamento</TabsTrigger>
          </TabsList>
          
          <TabsContent value="demographic" className="pt-4">
            <div className="grid gap-4">
              <p className="text-sm text-muted-foreground mb-2">
                A segmentação demográfica agrupa leads com base em características pessoais como idade, 
                localização, renda e escolaridade dos pais.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StrategyCard 
                  title="Segmentação por Localização"
                  description="Crie grupos de leads por bairros, zonas ou distância da instituição."
                  benefits={[
                    "Personalizar comunicação por região",
                    "Otimizar estratégias de transporte escolar",
                    "Focar em áreas com maior potencial de conversão"
                  ]}
                  icon={<Target className="h-5 w-5 text-blue-500" />}
                />
                
                <StrategyCard 
                  title="Segmentação por Perfil Familiar"
                  description="Agrupe leads por composição familiar e poder aquisitivo."
                  benefits={[
                    "Adaptar propostas ao orçamento familiar",
                    "Destacar diferenciais relevantes para cada perfil",
                    "Personalizar abordagem de negociação"
                  ]}
                  icon={<Users className="h-5 w-5 text-blue-500" />}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="behavioral" className="pt-4">
            <div className="grid gap-4">
              <p className="text-sm text-muted-foreground mb-2">
                A segmentação comportamental agrupa leads com base em como interagem com sua instituição, 
                histórico de navegação e padrões de resposta.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StrategyCard 
                  title="Segmentação por Interação com Conteúdo"
                  description="Agrupe leads com base no conteúdo que mais consomem em seus canais."
                  benefits={[
                    "Enviar conteúdo direcionado aos interesses demonstrados",
                    "Identificar leads mais engajados com temas específicos",
                    "Criar campanhas direcionadas por afinidade temática"
                  ]}
                  icon={<Filter className="h-5 w-5 text-indigo-500" />}
                />
                
                <StrategyCard 
                  title="Segmentação por Velocidade de Resposta"
                  description="Agrupe leads conforme o tempo que levam para responder aos contatos."
                  benefits={[
                    "Identificar leads mais responsivos para abordagens rápidas",
                    "Desenvolver estratégias para reativar leads menos responsivos",
                    "Otimizar a cadência de comunicação para cada grupo"
                  ]}
                  icon={<Tag className="h-5 w-5 text-indigo-500" />}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="interest" className="pt-4">
            <div className="grid gap-4">
              <p className="text-sm text-muted-foreground mb-2">
                A segmentação por interesse agrupa leads com base nos cursos, atividades ou programas 
                específicos pelos quais demonstraram maior interesse.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StrategyCard 
                  title="Segmentação por Curso de Interesse"
                  description="Agrupe leads por cursos ou áreas acadêmicas de maior interesse."
                  benefits={[
                    "Enviar informações específicas sobre cada curso",
                    "Convidar para eventos relacionados à área de interesse",
                    "Destacar diferenciais específicos de cada programa"
                  ]}
                  icon={<Tag className="h-5 w-5 text-purple-500" />}
                />
                
                <StrategyCard 
                  title="Segmentação por Atividades Extracurriculares"
                  description="Agrupe leads pelo interesse em atividades específicas oferecidas."
                  benefits={[
                    "Promover atividades específicas para grupos interessados",
                    "Destacar diferenciais que atraem diferentes perfis",
                    "Personalizar comunicação destacando atividades relevantes"
                  ]}
                  icon={<Target className="h-5 w-5 text-purple-500" />}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="engagement" className="pt-4">
            <div className="grid gap-4">
              <p className="text-sm text-muted-foreground mb-2">
                A segmentação por engajamento agrupa leads com base no nível de interação 
                e probabilidade de conversão.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StrategyCard 
                  title="Segmentação por Nível de Engajamento"
                  description="Agrupe leads por grau de interação com suas comunicações."
                  benefits={[
                    "Identificar leads quentes para abordagem prioritária",
                    "Criar estratégias específicas para reativar leads frios",
                    "Otimizar esforços da equipe de captação"
                  ]}
                  icon={<Filter className="h-5 w-5 text-teal-500" />}
                />
                
                <StrategyCard 
                  title="Segmentação por Estágio no Funil"
                  description="Agrupe leads conforme sua posição no funil de captação."
                  benefits={[
                    "Personalizar abordagem para cada etapa do funil",
                    "Identificar gargalos na jornada de conversão",
                    "Aplicar estratégias específicas para cada momento decisório"
                  ]}
                  icon={<Users className="h-5 w-5 text-teal-500" />}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-blue-200 hover:bg-blue-50 text-blue-700"
          >
            Fechar
          </Button>
          <Button 
            onClick={handleApplyStrategies}
            disabled={isApplying}
            className="relative"
          >
            {isApplying ? (
              <>
                <span className="opacity-0">Aplicar Estratégias</span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              </>
            ) : (
              "Aplicar Estratégias"
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
  icon: React.ReactNode;
}

const StrategyCard: React.FC<StrategyCardProps> = ({ title, description, benefits, icon }) => {
  return (
    <Card className="border border-blue-100 hover:border-blue-200 transition-colors">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 rounded-full bg-blue-50 flex-shrink-0">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-blue-800">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="bg-slate-50 p-3 rounded-md">
          <p className="text-sm font-medium mb-2 text-slate-700">Benefícios:</p>
          <ul className="space-y-1">
            {benefits.map((benefit, index) => (
              <li key={index} className="text-sm flex items-start gap-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SegmentationStrategiesDialog;
