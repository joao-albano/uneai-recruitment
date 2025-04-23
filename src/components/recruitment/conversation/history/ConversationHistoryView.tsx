
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Mail, Phone, History } from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ConversationHistory } from '../types/history';
import { Card } from "@/components/ui/card";

interface ConversationHistoryViewProps {
  history: ConversationHistory[];
  leadName: string;
}

export const ConversationHistoryView = ({ history, leadName }: ConversationHistoryViewProps) => {
  const whatsappHistory = history.filter(h => h.channel === 'whatsapp');
  const emailHistory = history.filter(h => h.channel === 'email');
  const voiceHistory = history.filter(h => h.channel === 'voz');

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
      
      <ScrollArea className="h-[200px] w-full rounded-md border bg-muted/10 p-4">
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
    <div className="p-4">
      <div className="flex items-center gap-2 mb-6">
        <History className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Histórico de Atendimentos - {leadName}</h2>
      </div>
      
      <Tabs defaultValue="whatsapp" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
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

        <TabsContent value="whatsapp">
          {whatsappHistory.length > 0 ? (
            whatsappHistory.map(item => renderHistoryItem(item))
          ) : (
            <p className="text-center text-muted-foreground">Nenhum histórico de WhatsApp encontrado.</p>
          )}
        </TabsContent>

        <TabsContent value="email">
          {emailHistory.length > 0 ? (
            emailHistory.map(item => renderHistoryItem(item))
          ) : (
            <p className="text-center text-muted-foreground">Nenhum histórico de email encontrado.</p>
          )}
        </TabsContent>

        <TabsContent value="voz">
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
