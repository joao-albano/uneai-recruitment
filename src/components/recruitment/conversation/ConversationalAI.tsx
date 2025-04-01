
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, Send, Phone, Mail, RefreshCw, 
  ThumbsUp, ThumbsDown, AlertCircle, Clock, User, Smile,
  Settings, Download, Filter
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Conversation, ConversationMessage, EmotionType, IntentType, ObjectionType } from '@/types/recruitment';

// Dados fictícios para demonstração
const mockConversations: Conversation[] = [
  {
    id: '1',
    leadId: '101',
    startDate: new Date(2024, 5, 1, 14, 30),
    lastMessageDate: new Date(2024, 5, 1, 15, 45),
    channel: 'whatsapp',
    messages: [
      {
        id: 'm1',
        conversationId: '1',
        timestamp: new Date(2024, 5, 1, 14, 30),
        sender: 'lead',
        content: 'Olá, gostaria de informações sobre o curso de Administração.',
        detectedEmotion: 'neutro',
        detectedIntent: 'informacao_curso',
      },
      {
        id: 'm2',
        conversationId: '1',
        timestamp: new Date(2024, 5, 1, 14, 32),
        sender: 'instituicao',
        content: 'Olá! Tudo bem? Claro, o curso de Administração tem duração de 4 anos e oferecemos turmas nos períodos matutino e noturno. Você tem preferência por algum período específico?',
      },
      {
        id: 'm3',
        conversationId: '1',
        timestamp: new Date(2024, 5, 1, 14, 40),
        sender: 'lead',
        content: 'Estou mais interessado no período noturno. Qual o valor da mensalidade?',
        detectedIntent: 'informacao_preco',
        detectedEmotion: 'interessado',
      },
      {
        id: 'm4',
        conversationId: '1',
        timestamp: new Date(2024, 5, 1, 14, 45),
        sender: 'instituicao',
        content: 'O valor da mensalidade do curso de Administração no período noturno é de R$ 899,00. Temos também bolsas de estudo que podem reduzir esse valor em até 30% dependendo do seu perfil. Posso te explicar mais sobre nossos programas de bolsas?',
      },
      {
        id: 'm5',
        conversationId: '1',
        timestamp: new Date(2024, 5, 1, 15, 20),
        sender: 'lead',
        content: 'Sim, tenho interesse em bolsas. Como funciona o processo seletivo?',
        detectedIntent: 'solicitar_bolsa',
        detectedEmotion: 'interessado',
      },
      {
        id: 'm6',
        conversationId: '1',
        timestamp: new Date(2024, 5, 1, 15, 25),
        sender: 'ai',
        isAutomatic: true,
        content: 'Nossa instituição oferece processo seletivo simplificado através de uma prova online que pode ser agendada conforme sua disponibilidade. Além disso, oferecemos bolsas baseadas em desempenho acadêmico anterior e situação socioeconômica. Posso agendar uma visita para que você conheça nossas instalações e converse com nossa equipe de bolsas?',
      },
      {
        id: 'm7',
        conversationId: '1',
        timestamp: new Date(2024, 5, 1, 15, 45),
        sender: 'lead',
        content: 'Parece ótimo! Quando posso agendar uma visita?',
        detectedIntent: 'agendar_visita',
        detectedEmotion: 'entusiasmado',
      },
    ],
    summary: 'Lead interessado no curso de Administração noturno, solicitou informações sobre preços e bolsas. Demonstrou interesse em agendar visita.',
    aiSuggestions: [
      'Oferecer desconto na matrícula se o agendamento for confirmado.',
      'Destacar laboratórios e infraestrutura durante a visita.'
    ],
    emotionTrend: 'positivo',
    status: 'ativa',
  },
  {
    id: '2',
    leadId: '102',
    startDate: new Date(2024, 5, 2, 10, 15),
    lastMessageDate: new Date(2024, 5, 2, 10, 35),
    channel: 'email',
    messages: [
      {
        id: 'm8',
        conversationId: '2',
        timestamp: new Date(2024, 5, 2, 10, 15),
        sender: 'lead',
        content: 'Bom dia, gostaria de saber se o curso de Psicologia é reconhecido pelo MEC.',
        detectedEmotion: 'neutro',
        detectedIntent: 'informacao_curso',
      },
      {
        id: 'm9',
        conversationId: '2',
        timestamp: new Date(2024, 5, 2, 10, 30),
        sender: 'instituicao',
        content: 'Bom dia! Sim, nosso curso de Psicologia é reconhecido pelo MEC com nota 5 (máxima). Temos orgulho da nossa excelente reputação acadêmica e corpo docente altamente qualificado. Posso enviar mais informações sobre o curso?',
      },
      {
        id: 'm10',
        conversationId: '2',
        timestamp: new Date(2024, 5, 2, 10, 35),
        sender: 'lead',
        content: 'Por favor, envie mais detalhes. Também gostaria de saber sobre o processo seletivo.',
        detectedEmotion: 'positivo',
        detectedIntent: 'duvida_processo',
      },
    ],
    summary: 'Lead interessado no curso de Psicologia. Solicitou confirmação sobre reconhecimento do MEC e informações sobre o processo seletivo.',
    aiSuggestions: [
      'Enviar material detalhado sobre o curso de Psicologia',
      'Mencionar diferenciais como clínica-escola e laboratórios'
    ],
    emotionTrend: 'neutro',
    status: 'ativa',
  },
  {
    id: '3',
    leadId: '103',
    startDate: new Date(2024, 5, 3, 16, 0),
    lastMessageDate: new Date(2024, 5, 3, 16, 30),
    channel: 'voz',
    messages: [
      {
        id: 'm11',
        conversationId: '3',
        timestamp: new Date(2024, 5, 3, 16, 0),
        sender: 'lead',
        content: 'Estou interessado no curso de Medicina, mas acho o valor muito alto.',
        detectedEmotion: 'hesitante',
        detectedIntent: 'informacao_preco',
        detectedObjection: 'preco_alto',
      },
      {
        id: 'm12',
        conversationId: '3',
        timestamp: new Date(2024, 5, 3, 16, 10),
        sender: 'instituicao',
        content: 'Entendo sua preocupação com o investimento. O curso de Medicina realmente exige uma infraestrutura completa com laboratórios e equipamentos modernos. Temos diferentes opções de financiamento e bolsas parciais que podem tornar esse investimento mais acessível. Você já conhece nossos programas de bolsas e financiamentos?',
      },
      {
        id: 'm13',
        conversationId: '3',
        timestamp: new Date(2024, 5, 3, 16, 20),
        sender: 'lead',
        content: 'Ainda não conheço, mas tenho interesse em financiamento.',
        detectedEmotion: 'interessado',
        detectedIntent: 'solicitar_bolsa',
      },
      {
        id: 'm14',
        conversationId: '3',
        timestamp: new Date(2024, 5, 3, 16, 30),
        sender: 'ai',
        isAutomatic: true,
        content: 'Temos parceria com diversos bancos para financiamento estudantil com taxas reduzidas, além do FIES e PROUNI para alunos que se qualificam. Nossa equipe financeira pode fazer uma análise personalizada para encontrar a melhor opção para você. Posso agendar uma conversa com nossa equipe financeira?',
      },
    ],
    summary: 'Lead interessado no curso de Medicina, mas com objeção de preço. Demonstrou interesse em opções de financiamento.',
    aiSuggestions: [
      'Destacar a relação custo-benefício do curso comparado ao retorno financeiro da profissão',
      'Oferecer simulação personalizada de financiamento'
    ],
    emotionTrend: 'hesitante',
    status: 'ativa',
  }
];

const mockLeads = [
  { id: '101', name: 'João Silva', course: 'Administração', status: 'interessado' },
  { id: '102', name: 'Maria Oliveira', course: 'Psicologia', status: 'novo' },
  { id: '103', name: 'Pedro Santos', course: 'Medicina', status: 'interessado' },
  { id: '104', name: 'Ana Costa', course: 'Engenharia', status: 'agendado' },
  { id: '105', name: 'Carlos Mendes', course: 'Direito', status: 'novo' },
];

const ConversationalAI: React.FC = () => {
  const [activeTab, setActiveTab] = useState('whatsapp');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // Aqui você adicionaria a lógica para enviar a mensagem
    console.log('Enviando mensagem:', newMessage);
    
    // Limpar o campo de mensagem
    setNewMessage('');
  };

  const getEmotionColor = (emotion?: EmotionType) => {
    switch (emotion) {
      case 'positivo': return 'bg-green-100 text-green-800';
      case 'negativo': return 'bg-red-100 text-red-800';
      case 'confuso': return 'bg-purple-100 text-purple-800';
      case 'interessado': return 'bg-blue-100 text-blue-800';
      case 'hesitante': return 'bg-amber-100 text-amber-800';
      case 'entusiasmado': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getIconForChannel = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return <MessageSquare className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'voz': return <Phone className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">IA Conversacional</h1>
          <p className="text-muted-foreground">
            Interação inteligente e humanizada com leads via múltiplos canais
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button variant="outline" className="gap-2">
            <Settings className="h-4 w-4" />
            Configurações
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Painel Lateral (Conversas) */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Conversas Ativas</CardTitle>
              <CardDescription>
                Interações em andamento com leads
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <div className="mb-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-2">
                    <TabsTrigger value="whatsapp" className="gap-1">
                      <MessageSquare className="h-4 w-4" />
                      <span className="hidden sm:inline">WhatsApp</span>
                    </TabsTrigger>
                    <TabsTrigger value="email" className="gap-1">
                      <Mail className="h-4 w-4" />
                      <span className="hidden sm:inline">Email</span>
                    </TabsTrigger>
                    <TabsTrigger value="voz" className="gap-1">
                      <Phone className="h-4 w-4" />
                      <span className="hidden sm:inline">Voz</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="space-y-2">
                {mockConversations
                  .filter(conv => activeTab === 'all' || conv.channel === activeTab)
                  .map(conversation => (
                    <div 
                      key={conversation.id}
                      className={`p-3 rounded-lg transition-colors cursor-pointer ${
                        selectedConversation?.id === conversation.id
                        ? 'bg-primary/10 border border-primary/30'
                        : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs bg-primary-foreground">
                              {mockLeads.find(lead => lead.id === conversation.leadId)?.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">
                              {mockLeads.find(lead => lead.id === conversation.leadId)?.name}
                            </p>
                            <div className="text-xs text-muted-foreground flex items-center gap-1">
                              {getIconForChannel(conversation.channel)}
                              <span>{mockLeads.find(lead => lead.id === conversation.leadId)?.course}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Badge variant="outline" className={getEmotionColor(conversation.emotionTrend)}>
                            {conversation.emotionTrend === 'positivo' ? 'Positivo' : 
                             conversation.emotionTrend === 'negativo' ? 'Negativo' : 
                             conversation.emotionTrend === 'neutro' ? 'Neutro' : 
                             conversation.emotionTrend === 'interessado' ? 'Interessado' : 
                             conversation.emotionTrend === 'hesitante' ? 'Hesitante' : 
                             conversation.emotionTrend === 'entusiasmado' ? 'Entusiasmado' : 
                             conversation.emotionTrend === 'confuso' ? 'Confuso' : 'Desconhecido'}
                          </Badge>
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground truncate">
                        {conversation.messages[conversation.messages.length - 1]?.content.substring(0, 50) + (conversation.messages[conversation.messages.length - 1]?.content.length > 50 ? '...' : '')}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Área de Conversa */}
        <div className="lg:col-span-8 space-y-4">
          {selectedConversation ? (
            <Card className="h-[700px] flex flex-col">
              <CardHeader className="pb-2 border-b">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary-foreground">
                        {mockLeads.find(lead => lead.id === selectedConversation.leadId)?.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">
                        {mockLeads.find(lead => lead.id === selectedConversation.leadId)?.name}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="gap-1 text-xs">
                          {getIconForChannel(selectedConversation.channel)}
                          <span className="capitalize">{selectedConversation.channel}</span>
                        </Badge>
                        <CardDescription className="text-xs">
                          {mockLeads.find(lead => lead.id === selectedConversation.leadId)?.course}
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
                {selectedConversation.messages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'lead' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'lead' 
                          ? 'bg-muted border border-border' 
                          : message.sender === 'ai'
                            ? 'bg-primary/10 border border-primary/30'
                            : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.sender === 'lead' ? (
                          <User className="h-4 w-4" />
                        ) : message.sender === 'ai' ? (
                          <Smile className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                        <span className="text-xs font-medium">
                          {message.sender === 'lead' 
                            ? mockLeads.find(lead => lead.id === selectedConversation.leadId)?.name
                            : message.sender === 'ai' ? 'IA Assistente' : 'Atendente'}
                        </span>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                      
                      {/* Metadados de análise da IA */}
                      {message.sender === 'lead' && (message.detectedEmotion || message.detectedIntent || message.detectedObjection) && (
                        <div className="mt-2 pt-2 border-t border-border/50 text-xs space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {message.detectedEmotion && (
                              <Badge variant="outline" className={`text-xs ${getEmotionColor(message.detectedEmotion)}`}>
                                {message.detectedEmotion}
                              </Badge>
                            )}
                            {message.detectedIntent && (
                              <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                                {message.detectedIntent.replace(/_/g, ' ')}
                              </Badge>
                            )}
                            {message.detectedObjection && (
                              <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                                {message.detectedObjection.replace(/_/g, ' ')}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {/* Feedback para mensagens da IA */}
                      {message.sender === 'ai' && (
                        <div className="flex items-center justify-end gap-1 mt-1">
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsUp className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <ThumbsDown className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
              
              <div className="p-4 border-t">
                <div className="flex items-start gap-2">
                  <div className="flex-grow">
                    <Input
                      placeholder="Digite sua mensagem..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-[700px] flex items-center justify-center">
              <div className="text-center p-4">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium">Nenhuma conversa selecionada</h3>
                <p className="text-muted-foreground mt-1">
                  Selecione uma conversa para visualizar
                </p>
              </div>
            </Card>
          )}
          
          {/* Painel de Sugestões */}
          {selectedConversation && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Análise e Sugestões</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Intenção Principal</div>
                    <Badge className="mt-1 bg-blue-100 text-blue-800 hover:bg-blue-200">
                      {selectedConversation.messages
                        .filter(m => m.detectedIntent)
                        .slice(-1)[0]?.detectedIntent?.replace(/_/g, ' ') || 'Não detectada'}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Emoção Predominante</div>
                    <Badge className={`mt-1 ${getEmotionColor(selectedConversation.emotionTrend)}`}>
                      {selectedConversation.emotionTrend === 'positivo' ? 'Positivo' : 
                       selectedConversation.emotionTrend === 'negativo' ? 'Negativo' : 
                       selectedConversation.emotionTrend === 'neutro' ? 'Neutro' : 
                       selectedConversation.emotionTrend === 'interessado' ? 'Interessado' : 
                       selectedConversation.emotionTrend === 'hesitante' ? 'Hesitante' : 
                       selectedConversation.emotionTrend === 'entusiasmado' ? 'Entusiasmado' : 
                       selectedConversation.emotionTrend === 'confuso' ? 'Confuso' : 'Desconhecido'}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-muted-foreground">Objeção Principal</div>
                    <Badge className="mt-1 bg-red-100 text-red-800 hover:bg-red-200">
                      {selectedConversation.messages
                        .filter(m => m.detectedObjection)
                        .slice(-1)[0]?.detectedObjection?.replace(/_/g, ' ') || 'Nenhuma'}
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground mb-2">Sugestões Inteligentes</div>
                  {selectedConversation.aiSuggestions?.map((suggestion, index) => (
                    <div key={index} className="flex items-start gap-2 mb-2">
                      <div className="mt-0.5">
                        <AlertCircle className="h-4 w-4 text-amber-500" />
                      </div>
                      <p className="text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConversationalAI;
