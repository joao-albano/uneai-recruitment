
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Mail, Phone, History } from "lucide-react";

interface ConversationTabContentProps {
  activeChannel: string;
  setActiveChannel: (channel: 'whatsapp' | 'email' | 'voz') => void;
}

const ConversationTabContent: React.FC<ConversationTabContentProps> = ({
  activeChannel,
  setActiveChannel
}) => {
  return (
    <TabsList className="mx-6 mt-2 grid grid-cols-4">
      <TabsTrigger value="whatsapp" onClick={() => setActiveChannel('whatsapp')}>
        <MessageSquare className="h-4 w-4 mr-2" />
        WhatsApp
      </TabsTrigger>
      <TabsTrigger value="email" onClick={() => setActiveChannel('email')}>
        <Mail className="h-4 w-4 mr-2" />
        Email
      </TabsTrigger>
      <TabsTrigger value="voz" onClick={() => setActiveChannel('voz')}>
        <Phone className="h-4 w-4 mr-2" />
        Voz
      </TabsTrigger>
      <TabsTrigger value="history">
        <History className="h-4 w-4 mr-2" />
        Histórico
      </TabsTrigger>
    </TabsList>
  );
};

export default ConversationTabContent;
