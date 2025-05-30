
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs } from '@/components/ui/tabs';
import { toast } from "sonner";

import ConversationHeader from './ConversationHeader';
import WhatsAppTab from './WhatsAppTab';
import ChannelTab from './ChannelTab';
import NewConversationDialog from './NewConversationDialog';
import ConversationTabs from './ConversationTabs';
import { useConversationState } from './hooks/useConversationState';

interface ConversationInterfaceProps {
  leadName: string;
  leadEmail?: string;
  leadPhone?: string;
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({
  leadName,
  leadEmail,
  leadPhone
}) => {
  const {
    activeChannel,
    setActiveChannel,
    isAiMode,
    setIsAiMode,
    showAnalytics,
    setShowAnalytics,
    newConversationOpen,
    setNewConversationOpen,
    messages,
    setMessages,  // Added this line to include setMessages from the hook
    handleSendMessage,
    handleCreateNewConversation
  } = useConversationState();

  const handleStartNewConversation = () => {
    setNewConversationOpen(true);
  };

  const handleEndConversation = () => {
    toast.success(`Atendimento com ${leadName} encerrado com sucesso!`);
    setMessages([]);
  };

  return (
    <Card className="h-[80vh] flex flex-col">
      <ConversationHeader 
        leadName={leadName}
        leadEmail={leadEmail}
        leadPhone={leadPhone}
        isAiMode={isAiMode}
        showAnalytics={showAnalytics}
        onToggleAttendanceMode={() => setIsAiMode(!isAiMode)}
        onToggleAnalytics={() => setShowAnalytics(!showAnalytics)}
      />
      
      <CardContent className="flex-1 flex flex-col p-0">
        <Tabs defaultValue="whatsapp" className="flex-1 flex flex-col">
          <ConversationTabs 
            activeChannel={activeChannel}
            setActiveChannel={setActiveChannel}
          />
          
          <WhatsAppTab 
            messages={messages}
            isAiMode={isAiMode}
            showAnalytics={showAnalytics}
            onSendMessage={handleSendMessage}
            onOpenSettings={handleStartNewConversation}
            isSelectedLead={true}
            onEndConversation={handleEndConversation}
          />
          
          <ChannelTab 
            value="email"
            icon="mail"
            title="Interface de Email"
            description="Integração de email em desenvolvimento."
          />
          
          <ChannelTab 
            value="voz"
            icon="phone"
            title="Interface de Voz"
            description="Integração de chamadas de voz em desenvolvimento."
          />
        </Tabs>
      </CardContent>
      
      <NewConversationDialog
        open={newConversationOpen}
        onClose={() => setNewConversationOpen(false)}
        onCreateConversation={handleCreateNewConversation}
      />
    </Card>
  );
};

export default ConversationInterface;
