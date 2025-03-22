
import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import SurveyForm from '@/components/survey/SurveyForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// WhatsApp Chat Simulation Component
const WhatsAppSimulation: React.FC = () => {
  const [messages, setMessages] = useState<{type: 'sent' | 'received', content: string, time: Date}[]>([]);
  const { alerts } = useData();
  
  // Listen for new WhatsApp-related alerts and add them to the chat
  useEffect(() => {
    const whatsAppAlerts = alerts.filter(alert => 
      alert.type === 'survey-requested' && 
      alert.message.includes('WhatsApp')
    );
    
    const newMessages = whatsAppAlerts.map(alert => ({
      type: 'sent' as const,
      content: alert.message,
      time: alert.createdAt
    }));
    
    if (newMessages.length > 0) {
      setMessages(prev => {
        // Filter out duplicates
        const existingMessageContents = prev.map(m => m.content);
        const uniqueNewMessages = newMessages.filter(m => !existingMessageContents.includes(m.content));
        return [...prev, ...uniqueNewMessages];
      });
      
      // Simulate responses
      setTimeout(() => {
        const lastAlert = whatsAppAlerts[whatsAppAlerts.length - 1];
        if (lastAlert) {
          const student = lastAlert.studentName;
          const responseMessage = {
            type: 'received' as const,
            content: `Olá, sou o responsável por ${student}. Acabei de visualizar as perguntas e responderei em breve.`,
            time: new Date()
          };
          setMessages(prev => [...prev, responseMessage]);
        }
      }, 5000);
    }
  }, [alerts]);
  
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
        <p>Nenhuma mensagem de WhatsApp enviada ainda.</p>
        <p className="text-sm mt-2">
          Utilize o botão "Enviar via WhatsApp" no formulário para simular o envio.
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col space-y-4 pt-4">
      {messages.map((message, index) => (
        <div 
          key={index} 
          className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
        >
          <div 
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.type === 'sent' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <div className="flex justify-end items-center mt-1">
              <Clock className="h-3 w-3 mr-1 opacity-70" />
              <span className="text-xs opacity-70">
                {format(message.time, 'HH:mm', { locale: ptBR })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// Page content component
const SurveyPageContent: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { students, generateDemoData } = useData();
  
  // Generate demo data if needed
  useEffect(() => {
    if (students.length === 0) {
      console.log("Generating demo data for survey page");
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex w-full">
      <Sidebar isOpen={sidebarOpen} onClose={toggleSidebar} />
      
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Pesquisa Diagnóstica</h1>
            <p className="text-muted-foreground mt-1">
              Colete informações importantes das famílias para enriquecer a análise
            </p>
          </div>
          
          <Tabs defaultValue="form" className="max-w-3xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="form">Formulário</TabsTrigger>
              <TabsTrigger value="whatsapp">Simulação WhatsApp</TabsTrigger>
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
          </Tabs>
        </main>
      </div>
    </div>
  );
};

// Wrapper with DataProvider
const SurveyPage: React.FC = () => {
  return (
    <DataProvider>
      <SurveyPageContent />
    </DataProvider>
  );
};

export default SurveyPage;
