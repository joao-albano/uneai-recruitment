
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, User, Phone, Mail, Calendar } from 'lucide-react';
import WhatsAppConversation from '@/components/recruitment/ai/WhatsAppConversation';
import EnrollmentScoreCard from '@/components/recruitment/prediction/EnrollmentScoreCard';
import { useWhatsAppConversation } from '@/hooks/useWhatsAppConversation';
import { EnrollmentPrediction, LeadData } from '@/types/recruitment';
import { useNavigate } from 'react-router-dom';

// Mock lead data
const mockLead: LeadData = {
  id: '123',
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(11) 98765-4321',
  channel: 'whatsapp',
  course: 'Ensino Médio',
  status: 'interessado',
  createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 dias atrás
  updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
  lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
  responsiblePerson: 'Ana Coordenadora',
  children: 1,
  notes: 'Lead demonstrou grande interesse no diferencial pedagógico da instituição',
  institutionType: 'school',
  location: 'Zona Sul',
  funnelStage: 'Agendamento',
  enrollmentScore: 72,
};

// Mock prediction data
const mockPrediction: EnrollmentPrediction = {
  leadId: '123',
  leadName: 'João Silva',
  score: 72,
  factors: {
    interactionFrequency: 85,
    responseSpeed: 65,
    engagement: 78,
    sentiment: 80,
  },
  courseDemand: 68,
  lastUpdated: new Date(),
  recommendation: 'Este lead tem alta probabilidade de matrícula. Recomendamos agendar uma visita presencial e enviar materiais específicos sobre bolsas de estudo, que parece ser um tópico de interesse.',
};

const LeadConversationPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  const navigate = useNavigate();
  const { leadId } = useParams<{ leadId: string }>();
  
  // Estado para armazenar dados do lead
  const [lead] = useState<LeadData | undefined>(mockLead);
  const [prediction] = useState<EnrollmentPrediction | undefined>(mockPrediction);
  
  // Usar o hook para gerenciar conversas de WhatsApp
  const { messages, isLoading, sendMessage } = useWhatsAppConversation(lead);
  
  // Definir o produto atual como 'recruitment'
  React.useEffect(() => {
    setCurrentProduct('recruitment');
  }, [setCurrentProduct]);
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={() => navigate('/recruitment/leads')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{lead?.name}</h1>
            <p className="text-muted-foreground">
              {lead?.funnelStage} • Último contato: {lead?.lastContactDate?.toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="col-span-1 md:col-span-2">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <User className="h-3 w-3 mr-1" />
                    <span>Lead ID</span>
                  </div>
                  <div className="font-medium">{leadId}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Phone className="h-3 w-3 mr-1" />
                    <span>Telefone</span>
                  </div>
                  <div className="font-medium">{lead?.phone}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Mail className="h-3 w-3 mr-1" />
                    <span>Email</span>
                  </div>
                  <div className="font-medium">{lead?.email}</div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Cadastrado em</span>
                  </div>
                  <div className="font-medium">{lead?.createdAt.toLocaleDateString()}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <EnrollmentScoreCard prediction={prediction} />
        </div>
        
        <Tabs defaultValue="whatsapp" className="mt-6">
          <TabsList>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="webchat">Webchat</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="voice">Ligações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="whatsapp" className="mt-6">
            <WhatsAppConversation
              lead={lead}
              messages={messages}
              onSendMessage={sendMessage}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="webchat" className="mt-6">
            <Card className="h-[600px] flex items-center justify-center">
              <p className="text-muted-foreground">Módulo de Webchat em desenvolvimento</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="email" className="mt-6">
            <Card className="h-[600px] flex items-center justify-center">
              <p className="text-muted-foreground">Módulo de Email em desenvolvimento</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="voice" className="mt-6">
            <Card className="h-[600px] flex items-center justify-center">
              <p className="text-muted-foreground">Módulo de Ligações de Voz em desenvolvimento</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default LeadConversationPage;
