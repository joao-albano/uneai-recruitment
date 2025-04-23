
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ConversationHistory } from '../types/history';

interface ConversationHistoryViewProps {
  history: ConversationHistory[];
  leadName: string;
}

export const ConversationHistoryView = ({ history, leadName }: ConversationHistoryViewProps) => {
  const whatsappHistory = history.filter(h => h.channel === 'whatsapp');
  const emailHistory = history.filter(h => h.channel === 'email');
  const voiceHistory = history.filter(h => h.channel === 'voz');

  const renderHistoryItem = (item: ConversationHistory) => (
    <div key={item.id} className="border rounded-lg p-4 mb-4 hover:bg-muted/50">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-medium">
            Atendente: {item.agent}
          </p>
          <p className="text-sm text-muted-foreground">
            {format(item.date, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR })}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">
            Status: {item.status === 'completed' ? 'Concluído' : item.status === 'missed' ? 'Perdido' : 'Cancelado'}
          </p>
          {item.registryCode && (
            <p className="text-sm text-muted-foreground">
              Tabulação: {item.registryCode} - {item.registryDescription}
            </p>
          )}
        </div>
      </div>
      
      <ScrollArea className="h-[200px] w-full rounded-md border p-4">
        {item.channel === 'voz' ? (
          <div>
            <p className="text-sm mb-2">Duração: {Math.floor(item.duration! / 60)}:{(item.duration! % 60).toString().padStart(2, '0')}</p>
            <p className="text-sm">{item.transcription}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {item.messages.map((message, idx) => (
              <div key={idx} className={`flex ${message.isFromLead ? 'justify-start' : 'justify-end'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] ${message.isFromLead ? 'bg-secondary' : 'bg-primary text-primary-foreground'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Histórico de Atendimentos - {leadName}</h2>
      
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
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

        <TabsContent value="whatsapp" className="mt-4">
          {whatsappHistory.length > 0 ? (
            whatsappHistory.map(item => renderHistoryItem(item))
          ) : (
            <p className="text-center text-muted-foreground">Nenhum histórico de WhatsApp encontrado.</p>
          )}
        </TabsContent>

        <TabsContent value="email" className="mt-4">
          {emailHistory.length > 0 ? (
            emailHistory.map(item => renderHistoryItem(item))
          ) : (
            <p className="text-center text-muted-foreground">Nenhum histórico de email encontrado.</p>
          )}
        </TabsContent>

        <TabsContent value="voz" className="mt-4">
          {voiceHistory.length > 0 ? (
            voiceHistory.map(item => renderHistoryItem(item))
          ) : (
            <p className="text-center text-muted-foreground">Nenhum histórico de chamadas encontrado.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
