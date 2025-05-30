
import React from 'react';
import { MessageSquare } from 'lucide-react';

const EmptyConversation: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
      <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
      <p>Nenhuma mensagem de WhatsApp enviada ainda.</p>
      <p className="text-sm mt-2">
        Utilize o botão "Enviar via WhatsApp" no formulário para simular o envio.
      </p>
    </div>
  );
};

export default EmptyConversation;
