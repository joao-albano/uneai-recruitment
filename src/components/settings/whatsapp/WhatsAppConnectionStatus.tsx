
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Link2, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';

const WhatsAppConnectionStatus: React.FC = () => {
  const { language } = useTheme();
  const { config } = useWhatsAppConfig();
  
  if (config.connected) {
    return (
      <Alert variant="default" className="bg-green-50 border-green-200">
        <Link2 className="h-4 w-4 text-green-600" />
        <AlertTitle className="text-green-700">
          {language === 'pt-BR' ? 'WhatsApp Conectado' : 'WhatsApp Connected'}
        </AlertTitle>
        <AlertDescription className="text-green-700">
          {language === 'pt-BR' 
            ? 'Seu WhatsApp Business está conectado e pronto para enviar mensagens.' 
            : 'Your WhatsApp Business is connected and ready to send messages.'}
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert variant="destructive">
      <MessageSquare className="h-4 w-4" />
      <AlertTitle>
        {language === 'pt-BR' ? 'WhatsApp Desconectado' : 'WhatsApp Disconnected'}
      </AlertTitle>
      <AlertDescription>
        {language === 'pt-BR' 
          ? 'Escaneie o QR Code abaixo para conectar seu WhatsApp Business.' 
          : 'Scan the QR code below to connect your WhatsApp Business.'}
      </AlertDescription>
    </Alert>
  );
};

export default WhatsAppConnectionStatus;
