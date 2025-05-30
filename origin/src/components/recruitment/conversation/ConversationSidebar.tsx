
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { ActiveConversation, Agent } from './types';
import ActiveConversationsList from './ActiveConversationsList';
import AgentsList from './AgentsList';

interface ConversationSidebarProps {
  conversations: ActiveConversation[];
  agents: Agent[];
  selectedConversationId?: string;
  onSelectConversation: (id: string) => void;
}

const ConversationSidebar: React.FC<ConversationSidebarProps> = ({
  conversations,
  agents,
  selectedConversationId,
  onSelectConversation
}) => {
  return (
    <div className="w-[300px] border-r flex flex-col">
      <div className="p-3 border-b">
        <h2 className="font-semibold">Conversas Ativas</h2>
        <p className="text-sm text-muted-foreground">
          Interações em andamento com leads
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <ActiveConversationsList 
          conversations={conversations}
          selectedConversationId={selectedConversationId}
          onSelectConversation={onSelectConversation}
        />
      </div>
      
      <Separator />
      
      <AgentsList agents={agents} />
    </div>
  );
};

export default ConversationSidebar;
