
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, AlertTriangle } from 'lucide-react';
import { WhatsAppMessage } from '@/types/whatsapp';

interface MessageStatusBadgeProps {
  status: WhatsAppMessage['status'];
}

const MessageStatusBadge: React.FC<MessageStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'sent':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          <Clock className="h-4 w-4 mr-1" />
          Enviada
        </Badge>
      );
    case 'delivered':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          <Check className="h-4 w-4 mr-1" />
          Entregue
        </Badge>
      );
    case 'read':
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
          <Check className="h-4 w-4 mr-1" />
          Lida
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          <AlertTriangle className="h-4 w-4 mr-1" />
          Falha
        </Badge>
      );
    default:
      return <Badge variant="outline">Desconhecido</Badge>;
  }
};

export default MessageStatusBadge;
