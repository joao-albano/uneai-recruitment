
import React from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ConversationHistory } from '../types/history';
import { HistoryHeader } from './components/HistoryHeader';
import { HistoryTabs } from './components/HistoryTabs';
import { HistoryItem } from './components/HistoryItem';
import { useConversationHistory } from './hooks/useConversationHistory';

interface ConversationHistoryViewProps {
  history?: ConversationHistory[];
  leadName: string;
}

export const ConversationHistoryView = ({ history, leadName }: ConversationHistoryViewProps) => {
  const { demoHistory, filterHistoryByChannel } = useConversationHistory();
  const historyToUse = history?.length ? history : demoHistory;
  
  const whatsappHistory = filterHistoryByChannel(historyToUse, 'whatsapp');
  const emailHistory = filterHistoryByChannel(historyToUse, 'email');
  const voiceHistory = filterHistoryByChannel(historyToUse, 'voz');

  const EmptyState = ({ channel }: { channel: string }) => (
    <p className="text-center text-muted-foreground py-8">
      Nenhum histórico de {channel} encontrado.
    </p>
  );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <HistoryHeader leadName={leadName} />
      
      <Tabs defaultValue="whatsapp" className="flex-1 flex flex-col overflow-hidden">
        <HistoryTabs 
          whatsappCount={whatsappHistory.length}
          emailCount={emailHistory.length}
          voiceCount={voiceHistory.length}
        />

        <div className="flex-1 overflow-auto p-4">
          <TabsContent value="whatsapp" className="mt-0 h-full">
            {whatsappHistory.length > 0 ? (
              whatsappHistory.map(item => <HistoryItem key={item.id} item={item} />)
            ) : (
              <EmptyState channel="WhatsApp" />
            )}
          </TabsContent>

          <TabsContent value="email" className="mt-0 h-full">
            {emailHistory.length > 0 ? (
              emailHistory.map(item => <HistoryItem key={item.id} item={item} />)
            ) : (
              <EmptyState channel="email" />
            )}
          </TabsContent>

          <TabsContent value="voz" className="mt-0 h-full">
            {voiceHistory.length > 0 ? (
              voiceHistory.map(item => <HistoryItem key={item.id} item={item} />)
            ) : (
              <EmptyState channel="chamadas" />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
