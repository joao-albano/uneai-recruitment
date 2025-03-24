
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

const SurveyPageContent: React.FC = () => {
  const [tab, setTab] = useState('form');
  const [processing, setProcessing] = useState(false);
  const [lastProcessed, setLastProcessed] = useState<Date | null>(null);
  const { toast } = useToast();
  const { runAutomatedSurveys } = useWhatsApp();

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
    <div className="container py-10 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pesquisas Familiares</h1>
          <p className="text-muted-foreground">
            Gerencie pesquisas diagnósticas para famílias de alunos em risco
          </p>
        </div>

        <Card className="w-auto">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <BrainCircuit className="mr-2 h-5 w-5 text-primary" />
              Automação de Pesquisas
            </CardTitle>
            <CardDescription className="text-xs">
              IA analisa alunos e envia pesquisas automaticamente
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-2">
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
        <TabsList className="grid grid-cols-3 mb-8">
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
