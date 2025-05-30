
import React from 'react';
import { useWhatsAppConversation } from './whatsapp/useWhatsAppConversation';
import EmptyConversation from './whatsapp/EmptyConversation';
import ConversationContainer from './whatsapp/ConversationContainer';

const WhatsAppSimulation: React.FC = () => {
  const { messages } = useWhatsAppConversation();
  
  if (messages.length === 0) {
    return <EmptyConversation />;
  }
  
  return <ConversationContainer messages={messages} />;
};

export default WhatsAppSimulation;
