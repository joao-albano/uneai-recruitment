
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useWhatsAppHistory } from '@/hooks/useWhatsAppHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import WhatsAppHistory from '../WhatsAppHistory';

const WhatsAppHistoryTab: React.FC = () => {
  const { language } = useTheme();
  const { messages } = useWhatsAppHistory();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>
          {language === 'pt-BR' ? 'Histórico de Mensagens' : 'Message History'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Histórico de mensagens enviadas via WhatsApp' 
            : 'History of messages sent via WhatsApp'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WhatsAppHistory 
          messages={messages}
        />
      </CardContent>
    </Card>
  );
};

export default WhatsAppHistoryTab;
