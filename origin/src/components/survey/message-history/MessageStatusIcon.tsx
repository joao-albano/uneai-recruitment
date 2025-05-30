
import React from 'react';
import { Check, Clock, AlertTriangle } from 'lucide-react';
import { WhatsAppMessage } from '@/types/whatsapp';

interface MessageStatusIconProps {
  status: WhatsAppMessage['status'];
}

const MessageStatusIcon: React.FC<MessageStatusIconProps> = ({ status }) => {
  switch (status) {
    case 'sent':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'delivered':
      return <Check className="h-4 w-4 text-green-500" />;
    case 'read':
      return <Check className="h-4 w-4 text-green-600" />;
    case 'failed':
      return <AlertTriangle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

export default MessageStatusIcon;
