
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useParams } from 'react-router-dom';
import { useProduct } from '@/context/ProductContext';
import ConversationInterface from '@/components/recruitment/conversation/ConversationInterface';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  User, Mail, Phone, Calendar, FileText, 
  MessageSquare, BarChart2, Clock, Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const LeadConversationPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  const { leadId } = useParams<{ leadId: string }>();
  
  // Lead data - Em uma implementação real, isso viria de uma chamada à API
  const leadData = {
    id: leadId || '1',
    name: 'Carlos Silva',
    email: 'carlos.silva@email.com',
    phone: '(11) 98765-4321',
    status: 'interessado',
    funnelStage: 'Contato Inicial',
    course: 'Administração',
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    enrollmentScore: 65,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    lastEmotion: 'interessado',
    lastIntent: 'informacao_curso',
    lastObjection: 'preco_alto',
    channel: 'whatsapp',
    responsiblePerson: 'Juliana Oliveira',
    notes: 'Interessado no curso noturno, mas preocupado com o valor. Tem experiência na área.'
  };
  
  // Definir o produto atual como 'recruitment'
  React.useEffect(() => {
    setCurrentProduct('recruitment');
  }, [setCurrentProduct]);
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'novo': return <Badge className="bg-blue-500">Novo</Badge>;
      case 'contatado': return <Badge className="bg-purple-500">Contatado</Badge>;
      case 'interessado': return <Badge className="bg-green-500">Interessado</Badge>;
      case 'agendado': return <Badge className="bg-amber-500">Agendado</Badge>;
      case 'matriculado': return <Badge className="bg-emerald-500">Matriculado</Badge>;
      case 'desistente': return <Badge className="bg-red-500">Desistente</Badge>;
      default: return <Badge className="bg-gray-500">Indefinido</Badge>;
    }
  };
  
  const getEmotionBadge = (emotion?: string) => {
    if (!emotion) return null;
    
    switch(emotion) {
      case 'positivo': return <Badge className="bg-green-500">Positivo</Badge>;
      case 'negativo': return <Badge className="bg-red-500">Negativo</Badge>;
      case 'interessado': return <Badge className="bg-blue-500">Interessado</Badge>;
      case 'hesitante': return <Badge className="bg-amber-500">Hesitante</Badge>;
      case 'confuso': return <Badge className="bg-orange-500">Confuso</Badge>;
      case 'entusiasmado': return <Badge className="bg-purple-500">Entusiasmado</Badge>;
      default: return <Badge className="bg-gray-500">Neutro</Badge>;
    }
  };
  
  const getLeadScore = (score: number) => {
    if (score >= 80) return <Badge className="bg-green-500">Alto ({score}%)</Badge>;
    if (score >= 50) return <Badge className="bg-amber-500">Médio ({score}%)</Badge>;
    return <Badge className="bg-red-500">Baixo ({score}%)</Badge>;
  };
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">{leadData.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span>ID: {leadData.id}</span>
              <span>•</span>
              <span>
                {getStatusBadge(leadData.status)}
              </span>
              <span>•</span>
              <span>Etapa: {leadData.funnelStage}</span>
            </div>
          </div>
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Editar Lead
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Informações do Lead</CardTitle>
                <CardDescription>Dados de contato e status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 text-muted-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Nome</div>
                    <div>{leadData.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 text-muted-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Email</div>
                    <div>{leadData.email}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 text-muted-foreground">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Telefone</div>
                    <div>{leadData.phone}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 text-muted-foreground">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Canal</div>
                    <div className="capitalize">{leadData.channel}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 text-muted-foreground">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Curso de Interesse</div>
                    <div>{leadData.course}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Último contato</div>
                    <div>{leadData.lastContactDate.toLocaleDateString()}</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 text-muted-foreground">
                    <User className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">Responsável</div>
                    <div>{leadData.responsiblePerson}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Análise Preditiva</CardTitle>
                <CardDescription>Insights gerados por IA</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium mb-1">Chance de Matrícula</div>
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${leadData.enrollmentScore}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="ml-3">
                      {getLeadScore(leadData.enrollmentScore)}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Estado Emocional</div>
                  <div>{getEmotionBadge(leadData.lastEmotion)}</div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Última Intenção</div>
                  <div>
                    <Badge variant="outline">{leadData.lastIntent?.replace('_', ' ')}</Badge>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium mb-1">Objeção Detectada</div>
                  <div>
                    <Badge variant="destructive">{leadData.lastObjection?.replace('_', ' ')}</Badge>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-medium">Sugestões Personalizadas</div>
                  <div className="mt-2 space-y-2">
                    <Badge className="block w-full p-2 justify-start font-normal bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20" variant="outline">
                      Oferecer desconto de 15% para turno noturno
                    </Badge>
                    <Badge className="block w-full p-2 justify-start font-normal bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20" variant="outline">
                      Destacar programa de financiamento estudantil
                    </Badge>
                    <Badge className="block w-full p-2 justify-start font-normal bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20" variant="outline">
                      Agendar visita ao campus em horário comercial
                    </Badge>
                  </div>
                </div>
                
                <div className="pt-2">
                  <div className="text-sm font-medium mb-1">Observações</div>
                  <div className="text-sm p-3 bg-muted rounded-md">
                    {leadData.notes}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Tabs defaultValue="conversation">
              <TabsList className="mb-4">
                <TabsTrigger value="conversation">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Conversas
                </TabsTrigger>
                <TabsTrigger value="appointments">
                  <Calendar className="h-4 w-4 mr-2" />
                  Agendamentos
                </TabsTrigger>
                <TabsTrigger value="analytics">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Análise
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="conversation" className="m-0">
                <ConversationInterface 
                  leadName={leadData.name}
                  leadEmail={leadData.email}
                  leadPhone={leadData.phone}
                />
              </TabsContent>
              
              <TabsContent value="appointments">
                <Card>
                  <CardHeader>
                    <CardTitle>Agendamentos</CardTitle>
                    <CardDescription>
                      Histórico e agendamentos futuros
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[600px] flex items-center justify-center">
                    <div className="text-center p-4">
                      <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Sem agendamentos</h3>
                      <p className="text-muted-foreground mb-4">
                        Esse lead ainda não possui agendamentos.
                      </p>
                      <Button>Agendar Visita</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Análise Detalhada</CardTitle>
                    <CardDescription>
                      Comportamento e interações do lead
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="h-[600px] flex items-center justify-center">
                    <div className="text-center">
                      <BarChart2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Análise em desenvolvimento</h3>
                      <p className="text-muted-foreground">
                        Visualizações detalhadas serão implementadas em breve.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeadConversationPage;
