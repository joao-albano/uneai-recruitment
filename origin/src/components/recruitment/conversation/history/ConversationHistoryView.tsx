
import React from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
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
  const [isOpen, setIsOpen] = React.useState(false);
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
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border-t"
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-accent/5">
        <div className="flex items-center gap-2">
          <span className="font-medium">Histórico de Atendimentos</span>
          <span className="text-sm text-muted-foreground">
            ({historyToUse.length} registros)
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="border-t">
          <HistoryHeader leadName={leadName} />
          
          <Tabs defaultValue="whatsapp" className="flex-1 flex flex-col">
            <HistoryTabs 
              whatsappCount={whatsappHistory.length}
              emailCount={emailHistory.length}
              voiceCount={voiceHistory.length}
            />

            <div className="p-4">
              <TabsContent value="whatsapp" className="mt-0">
                {whatsappHistory.length > 0 ? (
                  whatsappHistory.map(item => <HistoryItem key={item.id} item={item} />)
                ) : (
                  <EmptyState channel="WhatsApp" />
                )}
              </TabsContent>

              <TabsContent value="email" className="mt-0">
                {emailHistory.length > 0 ? (
                  emailHistory.map(item => <HistoryItem key={item.id} item={item} />)
                ) : (
                  <EmptyState channel="email" />
                )}
              </TabsContent>

              <TabsContent value="voz" className="mt-0">
                {voiceHistory.length > 0 ? (
                  voiceHistory.map(item => <HistoryItem key={item.id} item={item} />)
                ) : (
                  <EmptyState channel="chamadas" />
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
