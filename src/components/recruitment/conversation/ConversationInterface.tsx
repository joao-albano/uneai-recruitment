
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send, Mic, Paperclip, SmilePlus, 
  MessageSquare, Mail, Phone, Bot,
  ChevronLeft, MoreVertical, User
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EmotionType, IntentType, ObjectionType } from '@/types/recruitment';

interface ConversationInterfaceProps {
  leadName: string;
  leadEmail?: string;
  leadPhone?: string;
}

const ConversationInterface: React.FC<ConversationInterfaceProps> = ({
  leadName,
  leadEmail,
  leadPhone
}) => {
  const [message, setMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState<'whatsapp' | 'email' | 'voz'>('whatsapp');
  const [messages, setMessages] = useState<{
    id: string;
    content: string;
    timestamp: Date;
    isFromLead: boolean;
    emotion?: EmotionType;
    intent?: IntentType;
    objection?: ObjectionType;
  }[]>([
    {
      id: '1',
      content: `Olá! Sou a assistente virtual da instituição. Em que posso ajudar você hoje?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      isFromLead: false,
    },
    {
      id: '2',
      content: `Olá, gostaria de saber mais sobre o curso de Administração. Vocês têm turmas noturnas?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 14),
      isFromLead: true,
      emotion: 'interessado',
      intent: 'informacao_turno',
    },
    {
      id: '3',
      content: `Sim, temos turmas de Administração no período noturno! As aulas acontecem de segunda a sexta, das 19h às 22h. Você trabalha durante o dia?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 13),
      isFromLead: false,
    },
    {
      id: '4',
      content: `Sim, trabalho em horário comercial e estou procurando um curso para me especializar. Mas acho que o valor está um pouco alto para mim.`,
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      isFromLead: true,
      emotion: 'hesitante',
      intent: 'informacao_preco',
      objection: 'preco_alto',
    },
    {
      id: '5',
      content: `Entendo sua preocupação com o investimento! Temos várias opções de bolsas e descontos, especialmente para quem trabalha na área. Além disso, para o período noturno, oferecemos um desconto de 15% nas mensalidades. Posso enviar mais informações sobre nossos planos de pagamento?`,
      timestamp: new Date(Date.now() - 1000 * 60 * 11),
      isFromLead: false,
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Adiciona a mensagem do usuário
    const newMessage = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      isFromLead: false,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
    
    // Simula uma resposta automática após um pequeno delay
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        content: "Estou analisando sua mensagem. Como posso ajudar mais em relação ao curso de Administração?",
        timestamp: new Date(),
        isFromLead: true,
        emotion: 'neutro' as EmotionType,
        intent: 'duvida_processo' as IntentType,
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1500);
  };

  const getEmotionColor = (emotion?: EmotionType) => {
    switch(emotion) {
      case 'positivo': return 'bg-green-500';
      case 'negativo': return 'bg-red-500';
      case 'interessado': return 'bg-blue-500';
      case 'confuso': return 'bg-orange-500';
      case 'hesitante': return 'bg-yellow-500';
      case 'entusiasmado': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const renderEmotionBadge = (emotion?: EmotionType) => {
    if (!emotion || emotion === 'neutro') return null;
    
    return (
      <Badge className={`${getEmotionColor(emotion)} text-xs ml-2`}>
        {emotion}
      </Badge>
    );
  };
  
  const renderIntentBadge = (intent?: IntentType) => {
    if (!intent) return null;
    
    return (
      <Badge variant="outline" className="text-xs ml-2">
        {intent.replace('_', ' ')}
      </Badge>
    );
  };
  
  const renderObjectionBadge = (objection?: ObjectionType) => {
    if (!objection || objection === 'nenhuma') return null;
    
    return (
      <Badge variant="destructive" className="text-xs ml-2">
        {objection.replace('_', ' ')}
      </Badge>
    );
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Card className="h-[80vh] flex flex-col">
      <CardHeader className="pb-2 border-b">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-2">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="ml-3">
                <CardTitle className="text-lg">{leadName}</CardTitle>
                <CardDescription className="text-xs">
                  {leadEmail && `${leadEmail} • `}
                  {leadPhone && leadPhone}
                </CardDescription>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <Tabs defaultValue="whatsapp" className="flex-1 flex flex-col">
          <TabsList className="mx-6 mt-2 grid grid-cols-3">
            <TabsTrigger value="whatsapp" onClick={() => setActiveChannel('whatsapp')}>
              <MessageSquare className="h-4 w-4 mr-2" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="email" onClick={() => setActiveChannel('email')}>
              <Mail className="h-4 w-4 mr-2" />
              Email
            </TabsTrigger>
            <TabsTrigger value="voz" onClick={() => setActiveChannel('voz')}>
              <Phone className="h-4 w-4 mr-2" />
              Voz
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="whatsapp" className="flex-1 flex flex-col p-0 m-0">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`flex mb-4 ${msg.isFromLead ? 'justify-start' : 'justify-end'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.isFromLead 
                        ? 'bg-muted text-foreground rounded-tl-none' 
                        : 'bg-primary text-primary-foreground rounded-tr-none'
                    }`}
                  >
                    <div className="text-sm">{msg.content}</div>
                    <div className="text-xs mt-1 opacity-70 flex justify-between items-center">
                      <span>{formatTime(msg.timestamp)}</span>
                      <div className="flex flex-wrap gap-1 ml-2">
                        {msg.isFromLead && (
                          <>
                            {renderEmotionBadge(msg.emotion)}
                            {renderIntentBadge(msg.intent)}
                            {renderObjectionBadge(msg.objection)}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t">
              <div className="mb-2 px-2">
                <div className="text-sm font-medium">Sugestões da IA:</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setMessage("Temos bolsas de até 40% para alunos com experiência profissional na área. Posso explicar como funciona o processo de solicitação?")}
                  >
                    Oferecer bolsa por experiência
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setMessage("Gostaria de agendar uma visita ao campus para conhecer nossa estrutura e conversar com coordenadores do curso?")}
                  >
                    Sugerir visita ao campus
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => setMessage("Além do desconto noturno, temos parcelamento especial em até 12x sem juros para matrícula antecipada. Tem interesse?")}
                  >
                    Condições de pagamento
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite uma mensagem..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button 
                  size="icon" 
                  variant="ghost"
                >
                  <SmilePlus className="h-4 w-4" />
                </Button>
                <Button 
                  size="icon"
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="flex-1 flex items-center justify-center">
            <div className="text-center p-4">
              <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Interface de Email</h3>
              <p className="text-muted-foreground">
                Integração de email em desenvolvimento.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="voz" className="flex-1 flex items-center justify-center">
            <div className="text-center p-4">
              <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">Interface de Voz</h3>
              <p className="text-muted-foreground">
                Integração de chamadas de voz em desenvolvimento.
              </p>
              <Button className="mt-4" variant="outline">
                <Mic className="h-4 w-4 mr-2" />
                Iniciar chamada (simulação)
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ConversationInterface;
