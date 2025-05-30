
import React from 'react';
import { Agent } from './types';
import { Badge } from '@/components/ui/badge';
import { User } from 'lucide-react';

interface AgentsListProps {
  agents: Agent[];
}

const AgentsList: React.FC<AgentsListProps> = ({ agents }) => {
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'away': return 'bg-orange-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-2 p-3">
      <h3 className="text-sm font-medium">Atendentes Online</h3>
      
      {agents.length === 0 ? (
        <div className="text-center p-4">
          <p className="text-sm text-muted-foreground">Nenhum atendente online</p>
        </div>
      ) : (
        <div className="space-y-2 mt-2">
          {agents.map(agent => (
            <div key={agent.id} className="flex items-center justify-between p-2 rounded-md hover:bg-accent">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  {agent.avatar ? (
                    <img src={agent.avatar} alt={agent.name} className="h-8 w-8 rounded-full" />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div className="ml-2">
                  <div className="font-medium text-sm">{agent.name}</div>
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${getStatusColor(agent.status)} mr-1`}></div>
                    <span className="text-xs text-muted-foreground capitalize">
                      {agent.status}
                    </span>
                  </div>
                </div>
              </div>
              <Badge className="bg-primary/10 text-primary text-xs">
                {agent.activeChats} {agent.activeChats === 1 ? 'chat' : 'chats'}
              </Badge>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentsList;
