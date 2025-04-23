import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Mail, Phone, History } from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ConversationHistory } from '../types/history';
import { Card } from "@/components/ui/card";
import { v4 as uuidv4 } from 'uuid';

interface ConversationHistoryViewProps {
  history?: ConversationHistory[];
  leadName: string;
}

const demoHistory: ConversationHistory[] = [
  {
    id: '1',
    leadId: 'lead-001',
    channel: 'whatsapp',
    date: new Date(2024, 3, 15, 14, 30),
    agent: 'Ana Silva',
    status: 'completed',
    registryCode: 'INT001',
    registryDescription: 'Interesse em matrícula',
    messages: [
      { 
        id: uuidv4(),
        content: "Olá, gostaria de informações sobre o curso de Administração", 
        isFromLead: true, 
        timestamp: new Date(2024, 3, 15, 14, 25), 
        isFromAi: false 
      },
      { 
        id: uuidv4(),
        content: "Claro! Temos turmas nos períodos matutino e noturno. Qual seria sua preferência?", 
        isFromLead: false, 
        timestamp: new Date(2024, 3, 15, 14, 27), 
        isFromAi: false 
      },
      { 
        id: uuidv4(),
        content: "Noturno, pois trabalho durante o dia", 
        isFromLead: true, 
        timestamp: new Date(2024, 3, 15, 14, 30), 
        isFromAi: false 
      }
    ]
  },
  {
    id: '2',
    leadId: 'lead-001',
    channel: 'email',
    date: new Date(2024, 3, 14, 10, 15),
    agent: 'Carlos Santos',
    status: 'completed',
    registryCode: 'MAT002',
    registryDescription: 'Matrícula efetivada',
    messages: [
      { 
        id: uuidv4(),
        content: "Prezado(a), seguem os documentos necessários para matrícula...", 
        isFromLead: false, 
        timestamp: new Date(2024, 3, 14, 10, 10), 
        isFromAi: false 
      },
      { 
        id: uuidv4(),
        content: "Recebi os documentos, obrigado!", 
        isFromLead: true, 
        timestamp: new Date(2024, 3, 14, 10, 15), 
        isFromAi: false 
      }
    ]
  },
  {
    id: '3',
    leadId: 'lead-001',
    channel: 'voz',
    date: new Date(2024, 3, 13, 16, 45),
    agent: 'Roberto Oliveira',
    status: 'completed',
    duration: 485, // duração em segundos
    registryCode: 'DUV003',
    registryDescription: 'Dúvidas sobre financiamento',
    transcription: "Conversa sobre opções de financiamento estudantil e bolsas disponíveis. Cliente demonstrou interesse no FIES.",
    messages: [] // Empty array for voice calls since we use transcription instead
  }
];

export const ConversationHistoryView = ({ history, leadName }: ConversationHistoryViewProps) => {
  const historyToUse = history?.length ? history : demoHistory;
  const whatsappHistory = historyToUse.filter(h => h.channel === 'whatsapp');
  const emailHistory = historyToUse.filter(h => h.channel === 'email');
  const voiceHistory = historyToUse.filter(h => h.channel === 'voz');

  const renderHistoryItem = (item: ConversationHistory) => (
    <Card key={item.id} className="mb-4 p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-muted-foreground">Atendente:</span>
            <span className="font-medium">{item.agent}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {format(item.date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 justify-end">
            <span className="text-sm font-medium text-muted-foreground">Status:</span>
            <span className={`text-sm font-medium ${
              item.status === 'completed' ? 'text-green-600' : 
              item.status === 'missed' ? 'text-red-600' : 
              'text-orange-600'
            }`}>
              {item.status === 'completed' ? 'Concluído' : 
               item.status === 'missed' ? 'Perdido' : 
               'Cancelado'}
            </span>
          </div>
          {item.registryCode && (
            <div className="flex items-center gap-2 justify-end mt-1">
              <span className="text-sm font-medium text-muted-foreground">Tabulação:</span>
              <span className="text-sm">{item.registryCode} - {item.registryDescription}</span>
            </div>
          )}
        </div>
      </div>
      
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        {item.channel === 'voz' ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">Duração:</span>
              <span className="text-sm">
                {Math.floor(item.duration! / 60)}:{(item.duration! % 60).toString().padStart(2, '0')}
              </span>
            </div>
            <p className="text-sm leading-relaxed">{item.transcription}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {item.messages.map((message, idx) => (
              <div key={idx} className={`flex ${message.isFromLead ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.isFromLead 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'bg-primary text-primary-foreground'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 py-3 px-4 border-b">
        <History className="h-5 w-5" />
        <h2 className="text-lg font-medium">Histórico de Atendimentos - {leadName}</h2>
      </div>
      
      <Tabs defaultValue="whatsapp" className="flex-1">
        <TabsList className="mx-4 mt-2 grid w-auto grid-cols-3">
          <TabsTrigger value="whatsapp">
            <MessageSquare className="h-4 w-4 mr-2" />
            WhatsApp ({whatsappHistory.length})
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4 mr-2" />
            Email ({emailHistory.length})
          </TabsTrigger>
          <TabsTrigger value="voz">
            <Phone className="h-4 w-4 mr-2" />
            Voz ({voiceHistory.length})
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-auto p-4">
          <TabsContent value="whatsapp" className="mt-0">
            {whatsappHistory.length > 0 ? (
              whatsappHistory.map(item => renderHistoryItem(item))
            ) : (
              <p className="text-center text-muted-foreground py-8">Nenhum histórico de WhatsApp encontrado.</p>
            )}
          </TabsContent>

          <TabsContent value="email" className="mt-0">
            {emailHistory.length > 0 ? (
              emailHistory.map(item => renderHistoryItem(item))
            ) : (
              <p className="text-center text-muted-foreground py-8">Nenhum histórico de email encontrado.</p>
            )}
          </TabsContent>

          <TabsContent value="voz" className="mt-0">
            {voiceHistory.length > 0 ? (
              voiceHistory.map(item => renderHistoryItem(item))
            ) : (
              <p className="text-center text-muted-foreground py-8">Nenhum histórico de chamadas encontrado.</p>
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
