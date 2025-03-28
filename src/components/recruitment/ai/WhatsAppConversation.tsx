
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Send, RefreshCcw, Phone } from 'lucide-react';
import { LeadData, LeadInteraction } from '@/types/recruitment';
import { WhatsAppMessage } from '@/types/whatsapp';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppConversationProps {
  lead?: LeadData;
  onSendMessage: (message: string) => void;
  messages: WhatsAppMessage[];
  isLoading?: boolean;
}

const WhatsAppConversation: React.FC<WhatsAppConversationProps> = ({
  lead,
  onSendMessage,
  messages,
  isLoading = false,
}) => {
  const [message, setMessage] = useState('');
  const { toast } = useToast();
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getAiSuggestions = () => {
    // Simulação de sugestões da IA com base no contexto do lead
    if (!lead) return [];

    const suggestions = [
      `Olá ${lead.name}, notei que você tem interesse no curso de ${lead.course}. Posso te dar mais informações?`,
      "Você gostaria de agendar uma visita para conhecer nossa instituição?",
      "Temos algumas opções de bolsas de estudo disponíveis. Gostaria de saber mais?",
    ];
    
    return suggestions;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Conversa com {lead?.name || 'Lead'}</CardTitle>
            <CardDescription>
              Via WhatsApp • {lead?.phone || 'Sem telefone cadastrado'}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
        <Tabs defaultValue="conversation" className="flex-1 flex flex-col">
          <TabsList className="mx-4">
            <TabsTrigger value="conversation">Conversa</TabsTrigger>
            <TabsTrigger value="suggestions">Sugestões da IA</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conversation" className="flex-1 flex flex-col p-0 m-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  Nenhuma mensagem trocada ainda.
                </div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.status === 'sent' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        msg.status === 'sent' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}
                    >
                      <p>{msg.message}</p>
                      <div className={`text-xs mt-1 ${msg.status === 'sent' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                        {new Date(msg.sentAt || msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        {msg.status === 'read' && ' ✓✓'}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <div className="p-4 border-t">
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Digite sua mensagem..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="icon"
                  disabled={isLoading || !message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions" className="flex-1 overflow-auto p-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Sugestões com base no contexto:</h4>
              {getAiSuggestions().map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-lg hover:bg-accent cursor-pointer"
                  onClick={() => {
                    setMessage(suggestion);
                    toast({
                      title: "Sugestão aplicada",
                      description: "A mensagem foi adicionada ao campo de texto."
                    });
                  }}
                >
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WhatsAppConversation;
