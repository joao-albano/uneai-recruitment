
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SurveyForm from '@/components/survey/SurveyForm';
import WhatsAppSimulation from '@/components/survey/WhatsAppSimulation';
import { WhatsAppHistory } from '@/components/survey/WhatsAppHistory';

const SurveyTabs: React.FC = () => {
  return (
    <Tabs defaultValue="form" className="max-w-3xl mx-auto">
      <TabsList className="grid w-full grid-cols-3 mb-6">
        <TabsTrigger value="form">Formulário</TabsTrigger>
        <TabsTrigger value="whatsapp">Simulação WhatsApp</TabsTrigger>
        <TabsTrigger value="history">Histórico de Mensagens</TabsTrigger>
      </TabsList>
      
      <TabsContent value="form">
        <SurveyForm />
      </TabsContent>
      
      <TabsContent value="whatsapp">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Simulação de Mensagens WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/20 rounded-lg p-4 border">
              <WhatsAppSimulation />
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Histórico de Mensagens WhatsApp</CardTitle>
          </CardHeader>
          <CardContent>
            <WhatsAppHistory />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SurveyTabs;
