
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import MessagesContainer from './MessagesContainer';
import MessageInput from './MessageInput';
import { Message } from './types';
import { Settings, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WhatsAppTabProps {
  messages: Message[];
  isAiMode: boolean;
  showAnalytics: boolean;
  onSendMessage: (message: string) => void;
  onOpenSettings?: () => void;
  isSelectedLead?: boolean;
  leadId?: string;
}

const WhatsAppTab: React.FC<WhatsAppTabProps> = ({
  messages,
  isAiMode,
  showAnalytics,
  onSendMessage,
  onOpenSettings,
  isSelectedLead = true,
  leadId
}) => {
  return (
    <TabsContent value="whatsapp" className="flex-1 flex flex-col p-0 m-0">
      <div className="flex items-center justify-end p-2 border-b">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => window.location.reload()}
          title="Atualizar conversa"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        
        {onOpenSettings && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onOpenSettings}
            title="Configurações da conversa"
          >
            <Settings className="h-4 w-4" />
          </Button>
        )}
      </div>

      <MessagesContainer 
        messages={messages}
        showAnalytics={showAnalytics}
        leadId={leadId}
      />
      
      {isSelectedLead && (
        <MessageInput 
          isAiMode={isAiMode}
          onSendMessage={onSendMessage}
        />
      )}
    </TabsContent>
  );
};

export default WhatsAppTab;
