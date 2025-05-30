
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, Phone, Send } from 'lucide-react';
import { ChannelType } from '@/types/recruitment';

interface ChannelsTabProps {
  selectedChannels: ChannelType[];
  toggleChannel: (channel: ChannelType) => void;
}

const ChannelsTab: React.FC<ChannelsTabProps> = ({ selectedChannels, toggleChannel }) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Canais de Comunicação</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Selecione quais canais serão utilizados nesta campanha
      </p>
      
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant={selectedChannels.includes('mail') ? "default" : "outline"} 
          className="cursor-pointer flex items-center gap-1"
          onClick={() => toggleChannel('mail')}
        >
          <Mail className="h-3 w-3" />
          <span>Email</span>
        </Badge>
        
        <Badge 
          variant={selectedChannels.includes('whatsapp') ? "default" : "outline"} 
          className="cursor-pointer flex items-center gap-1"
          onClick={() => toggleChannel('whatsapp')}
        >
          <MessageSquare className="h-3 w-3" />
          <span>WhatsApp</span>
        </Badge>
        
        <Badge 
          variant={selectedChannels.includes('voice') ? "default" : "outline"} 
          className="cursor-pointer flex items-center gap-1"
          onClick={() => toggleChannel('voice')}
        >
          <Phone className="h-3 w-3" />
          <span>Ligação de IA (Voz)</span>
        </Badge>
        
        <Badge 
          variant={selectedChannels.includes('sms') ? "default" : "outline"} 
          className="cursor-pointer flex items-center gap-1"
          onClick={() => toggleChannel('sms')}
        >
          <Send className="h-3 w-3" />
          <span>SMS</span>
        </Badge>
      </div>
      
      {selectedChannels.length === 0 && (
        <p className="text-sm text-red-500 mt-2">
          Selecione pelo menos um canal de comunicação
        </p>
      )}
    </div>
  );
};

export default ChannelsTab;
