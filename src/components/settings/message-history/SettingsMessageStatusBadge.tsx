
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, X } from 'lucide-react';
import { WhatsAppMessage } from '@/types/whatsapp';
import { useTheme } from '@/context/ThemeContext';

interface SettingsMessageStatusBadgeProps {
  status: WhatsAppMessage['status'];
}

const SettingsMessageStatusBadge: React.FC<SettingsMessageStatusBadgeProps> = ({ status }) => {
  const { language } = useTheme();
  
  switch(status) {
    case 'sent':
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
        <Clock className="h-3 w-3 mr-1" /> 
        {language === 'pt-BR' ? 'Enviado' : 'Sent'}
      </Badge>;
    case 'delivered':
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
        <Check className="h-3 w-3 mr-1" /> 
        {language === 'pt-BR' ? 'Entregue' : 'Delivered'}
      </Badge>;
    case 'read':
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
        <Check className="h-3 w-3 mr-1" /> 
        {language === 'pt-BR' ? 'Lido' : 'Read'}
      </Badge>;
    case 'failed':
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
        <X className="h-3 w-3 mr-1" /> 
        {language === 'pt-BR' ? 'Falhou' : 'Failed'}
      </Badge>;
    default:
      return <Badge variant="outline">
        {language === 'pt-BR' ? 'Desconhecido' : 'Unknown'}
      </Badge>;
  }
};

export default SettingsMessageStatusBadge;
