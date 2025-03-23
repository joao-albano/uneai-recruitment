
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useWhatsAppHistory } from '@/hooks/useWhatsAppHistory';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import WhatsAppHistory from '../WhatsAppHistory';

const WhatsAppHistoryTab: React.FC = () => {
  const { language } = useTheme();
  const { messages, clearHistory } = useWhatsAppHistory();
  
  const handleClearHistory = () => {
    clearHistory();
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>
            {language === 'pt-BR' ? 'Histórico de Mensagens' : 'Message History'}
          </CardTitle>
          <CardDescription>
            {language === 'pt-BR' 
              ? 'Histórico de mensagens enviadas via WhatsApp' 
              : 'History of messages sent via WhatsApp'}
          </CardDescription>
        </div>
        <Button 
          variant="destructive" 
          size="sm"
          onClick={handleClearHistory}
          title={language === 'pt-BR' ? 'Limpar histórico' : 'Clear history'}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
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
