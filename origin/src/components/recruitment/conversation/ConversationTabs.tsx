
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Mail, Phone } from 'lucide-react';

interface ConversationTabsProps {
  activeChannel: 'whatsapp' | 'email' | 'voz';
  setActiveChannel: (channel: 'whatsapp' | 'email' | 'voz') => void;
}

const ConversationTabs: React.FC<ConversationTabsProps> = ({
  activeChannel,
  setActiveChannel,
}) => {
  return (
    <TabsList className="mx-6 mt-2 grid grid-cols-3">
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
    </TabsList>
  );
};

export default ConversationTabs;
