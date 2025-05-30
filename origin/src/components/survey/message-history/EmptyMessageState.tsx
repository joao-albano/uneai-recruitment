
import React from 'react';
import { MessageSquare } from 'lucide-react';

const EmptyMessageState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <MessageSquare className="h-12 w-12 mb-4 text-muted-foreground/30" />
      <h3 className="text-lg font-medium mb-2">Nenhuma mensagem enviada</h3>
      <p className="text-muted-foreground max-w-md">
        Quando você enviar mensagens via WhatsApp, elas aparecerão aqui no histórico.
      </p>
    </div>
  );
};

export default EmptyMessageState;
