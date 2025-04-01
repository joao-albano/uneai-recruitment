
import { useState } from 'react';
import { MessageSquare, Mail, Phone, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ChannelConfig, ChannelType } from './types';

export function useChannels() {
  // Initial channel configuration
  const [channels, setChannels] = useState<ChannelConfig[]>([
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      enabled: true,
      priority: 1,
      icon: MessageSquare,
      fallbackTo: 'sms',
      responseRate: 92,
      averageTime: '3min',
      status: 'online'
    },
    {
      id: 'email',
      name: 'E-mail',
      enabled: true,
      priority: 3,
      icon: Mail,
      fallbackTo: 'whatsapp',
      responseRate: 71,
      averageTime: '2h',
      status: 'online'
    },
    {
      id: 'voice',
      name: 'Ligação',
      enabled: true,
      priority: 2,
      icon: Phone,
      fallbackTo: 'whatsapp',
      responseRate: 48,
      averageTime: '3min',
      status: 'limited'
    },
    {
      id: 'sms',
      name: 'SMS',
      enabled: true,
      priority: 4,
      icon: MessageCircle,
      fallbackTo: 'email',
      responseRate: 65,
      averageTime: '30min',
      status: 'online'
    }
  ]);

  const [editMode, setEditMode] = useState(false);

  const toggleChannel = (id: string) => {
    setChannels(channels.map(channel => 
      channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
    ));
    
    const channel = channels.find(ch => ch.id === id);
    if (channel) {
      toast({
        title: `${channel.name} ${channel.enabled ? 'desativado' : 'ativado'}`,
        description: `O canal de comunicação foi ${channel.enabled ? 'desativado' : 'ativado'} com sucesso.`,
      });
    }
  };
  
  const movePriorityUp = (id: string) => {
    setChannels(prevChannels => {
      const index = prevChannels.findIndex(c => c.id === id);
      if (index <= 0) return prevChannels;
      
      const newChannels = [...prevChannels];
      
      // Swap priorities
      const priorityToSwitch = newChannels[index-1].priority;
      newChannels[index-1].priority = newChannels[index].priority;
      newChannels[index].priority = priorityToSwitch;
      
      // Sort by new priorities
      return newChannels.sort((a, b) => a.priority - b.priority);
    });
  };
  
  const movePriorityDown = (id: string) => {
    setChannels(prevChannels => {
      const index = prevChannels.findIndex(c => c.id === id);
      if (index >= prevChannels.length - 1) return prevChannels;
      
      const newChannels = [...prevChannels];
      
      // Swap priorities
      const priorityToSwitch = newChannels[index+1].priority;
      newChannels[index+1].priority = newChannels[index].priority;
      newChannels[index].priority = priorityToSwitch;
      
      // Sort by new priorities
      return newChannels.sort((a, b) => a.priority - b.priority);
    });
  };
  
  const setFallback = (channelId: string, fallbackId: string) => {
    setChannels(channels.map(channel => 
      channel.id === channelId ? { ...channel, fallbackTo: fallbackId as ChannelType } : channel
    ));
    
    toast({
      title: "Fallback atualizado",
      description: "A configuração de canal alternativo foi atualizada.",
    });
  };

  return {
    channels,
    editMode,
    setEditMode,
    toggleChannel,
    movePriorityUp,
    movePriorityDown,
    setFallback
  };
}
