
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SurveyForm from './SurveyForm';
import WhatsAppHistory from './WhatsAppHistory';
import WhatsAppSimulation from './WhatsAppSimulation';
import { Button } from '@/components/ui/button';
import { BrainCircuit, RotateCw, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWhatsApp } from '@/context/whatsapp/WhatsAppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const SurveyPageContent: React.FC = () => {
  const [tab, setTab] = useState('form');
  const [processing, setProcessing] = useState(false);
  const [lastProcessed, setLastProcessed] = useState<Date | null>(null);
  const { toast } = useToast();
  const { runAutomatedSurveys } = useWhatsApp();
  const isMobile = useIsMobile();

  const handleRunAutomatedSurveys = () => {
    setProcessing(true);
    
    // Executa o processamento automático
    runAutomatedSurveys();
    
    // Simula um processamento
    setTimeout(() => {
      setProcessing(false);
      setLastProcessed(new Date());
      
      toast({
        title: 'Análise automatizada concluída',
        description: 'A IA analisou os alunos e enviou pesquisas para aqueles com alto risco de evasão',
      });
    }, 2000);
  };

  return (
    <div className={`container py-6 sm:py-10 max-w-7xl ${isMobile ? 'px-2' : ''}`}>
      <div className={`flex flex-col ${!isMobile ? 'sm:flex-row justify-between' : ''} items-start sm:items-center mb-6 sm:mb-8 gap-4`}>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pesquisas Familiares</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Gerencie pesquisas diagnósticas para famílias de alunos em risco
          </p>
        </div>

        <Card className="w-full sm:w-auto">
          <CardHeader className={`${isMobile ? 'p-3 pb-1' : 'p-4 pb-2'}`}>
            <CardTitle className={`${isMobile ? 'text-sm' : 'text-base'} font-medium flex items-center`}>
              <BrainCircuit className="mr-2 h-4 w-4 text-primary" />
              Automação de Pesquisas
            </CardTitle>
            <CardDescription className={`${isMobile ? 'text-xs' : ''}`}>
              IA analisa alunos e envia pesquisas automaticamente
            </CardDescription>
          </CardHeader>
          <CardContent className={`${isMobile ? 'p-3 pt-1' : 'p-4 pt-2'}`}>
            <Button
              onClick={handleRunAutomatedSurveys}
              disabled={processing}
              variant="outline"
              className="w-full"
              size="sm"
            >
              {processing ? (
                <>
                  <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Executar análise agora
                </>
              )}
            </Button>
            {lastProcessed && (
              <div className="mt-2 text-xs text-muted-foreground flex items-center">
                <CheckCircle2 className="mr-1 h-3 w-3 text-green-500" />
                Última execução: {lastProcessed.toLocaleTimeString()}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className={`grid grid-cols-3 mb-6 ${isMobile ? 'text-xs' : ''}`}>
          <TabsTrigger value="form">Formulário</TabsTrigger>
          <TabsTrigger value="whatsapp">Histórico de WhatsApp</TabsTrigger>
          <TabsTrigger value="simulation">Simulação de Conversa</TabsTrigger>
        </TabsList>

        <TabsContent value="form" className="mt-0">
          <SurveyForm />
        </TabsContent>

        <TabsContent value="whatsapp" className="mt-0">
          <WhatsAppHistory />
        </TabsContent>

        <TabsContent value="simulation" className="mt-0">
          <WhatsAppSimulation />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SurveyPageContent;
