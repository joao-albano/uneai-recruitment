
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConversationEmptyStateProps {
  onStartNewConversation: () => void;
}

const ConversationEmptyState: React.FC<ConversationEmptyStateProps> = ({
  onStartNewConversation
}) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">Nenhuma conversa selecionada</h2>
        <p className="text-muted-foreground mb-4">
          Selecione uma conversa na lista à esquerda ou inicie uma nova conversa.
        </p>
        <Button onClick={onStartNewConversation}>Iniciar nova conversa</Button>
      </div>
    </div>
  );
};

export default ConversationEmptyState;
