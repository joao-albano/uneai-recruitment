
import React, { useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/context/ThemeContext';
import { Smartphone, Send, Eye, MessageSquare, Receipt } from 'lucide-react';
import { useWhatsAppHistory } from '@/hooks/useWhatsAppHistory';

const WhatsappStats: React.FC = () => {
  const { language } = useTheme();
  const { messages } = useWhatsAppHistory();
  
  // Calculate statistics from messages
  const stats = useMemo(() => {
    const sent = messages.length;
    const delivered = messages.filter(msg => msg.status === 'delivered' || msg.status === 'read').length;
    const read = messages.filter(msg => msg.status === 'read').length;
    const failed = messages.filter(msg => msg.status === 'failed').length;
    const responses = messages.filter(msg => msg.responseContent).length;
    
    // Calculate estimated cost (this is a simplified model)
    // Adjust these values based on your actual WhatsApp Business API pricing
    const costPerMessage = 0.05; // Example: 5 cents per message
    const totalCost = (sent * costPerMessage).toFixed(2);
    
    return {
      sent,
      delivered,
      read,
      failed,
      responses,
      totalCost
    };
  }, [messages]);
  
  const statsItems = [
    {
      title: language === 'pt-BR' ? 'Mensagens Enviadas' : 'Messages Sent',
      value: stats.sent,
      icon: <Send className="h-5 w-5 text-blue-600" />,
      description: language === 'pt-BR' ? 'Total de mensagens enviadas' : 'Total messages sent'
    },
    {
      title: language === 'pt-BR' ? 'Mensagens Entregues' : 'Messages Delivered',
      value: stats.delivered,
      icon: <Receipt className="h-5 w-5 text-green-600" />,
      description: language === 'pt-BR' ? 'Mensagens confirmadas como entregues' : 'Messages confirmed delivered'
    },
    {
      title: language === 'pt-BR' ? 'Mensagens Lidas' : 'Messages Read',
      value: stats.read,
      icon: <Eye className="h-5 w-5 text-amber-600" />,
      description: language === 'pt-BR' ? 'Mensagens confirmadas como lidas' : 'Messages confirmed read'
    },
    {
      title: language === 'pt-BR' ? 'Respostas Recebidas' : 'Responses Received',
      value: stats.responses,
      icon: <MessageSquare className="h-5 w-5 text-purple-600" />,
      description: language === 'pt-BR' ? 'Respostas recebidas dos destinatários' : 'Responses received from recipients'
    },
    {
      title: language === 'pt-BR' ? 'Custo Estimado' : 'Estimated Cost',
      value: `R$ ${stats.totalCost}`,
      icon: <Smartphone className="h-5 w-5 text-red-600" />,
      description: language === 'pt-BR' ? 'Custo estimado das mensagens' : 'Estimated cost of messages'
    }
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {language === 'pt-BR' ? 'Estatísticas de WhatsApp' : 'WhatsApp Statistics'}
        </CardTitle>
        <CardDescription>
          {language === 'pt-BR' 
            ? 'Métricas de comunicação via WhatsApp' 
            : 'WhatsApp communication metrics'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {statsItems.map((item, index) => (
            <div key={index} className="bg-card border rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-background mb-3">
                {item.icon}
              </div>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="text-sm font-medium mt-1">{item.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{item.description}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WhatsappStats;
