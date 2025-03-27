
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Clock, CheckCheck, Send } from 'lucide-react';
import { MessageStatus } from '@/types/whatsapp';

interface MessageStatusBadgeProps {
  status: MessageStatus;
}

const MessageStatusBadge: React.FC<MessageStatusBadgeProps> = ({ status }) => {
  switch (status) {
    case 'sending':
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 gap-1">
          <Clock className="h-3 w-3" /> Enviando
        </Badge>
      );
    case 'sent':
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200 gap-1">
          <Send className="h-3 w-3" /> Enviado
        </Badge>
      );
    case 'delivered':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200 gap-1">
          <CheckCircle className="h-3 w-3" /> Entregue
        </Badge>
      );
    case 'read':
      return (
        <Badge variant="outline" className="bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200 gap-1">
          <CheckCheck className="h-3 w-3" /> Lido
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-700 hover:bg-red-100 border-red-200 gap-1">
          <AlertCircle className="h-3 w-3" /> Falha
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200">
          {status}
        </Badge>
      );
  }
};

export default MessageStatusBadge;
