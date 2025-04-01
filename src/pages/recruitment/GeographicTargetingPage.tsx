
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import GeographicTargeting from '@/components/recruitment/geographic/GeographicTargeting';
import OmnichannelOrchestration from '@/components/recruitment/omnichannel/OmnichannelOrchestration';
import EnhancedLeadCard from '@/components/recruitment/leads/components/EnhancedLeadCard';
import { toast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Demo data for enhanced lead cards
const demoLeads = [
  {
    id: "1",
    name: "Carlos Silva",
    email: "carlos.silva@email.com",
    phone: "(11) 98765-4321",
    postalCode: "01310-200",
    createdAt: "2023-09-15",
    status: "Novo",
    preferredChannel: "whatsapp"
  },
  {
    id: "2",
    name: "Marina Alves",
    email: "marina.alves@email.com",
    phone: "(11) 97654-3210",
    postalCode: "04538-132",
    createdAt: "2023-09-12",
    status: "Contatado",
    lastContact: "4h atrás",
    preferredChannel: "email"
  },
  {
    id: "3",
    name: "Felipe Rodrigues",
    email: "felipe.r@email.com",
    phone: "(11) 96543-2109",
    postalCode: "02012-021",
    createdAt: "2023-09-10",
    status: "Interessado",
    lastContact: "1 dia atrás",
    preferredChannel: "whatsapp"
  }
];

const demoCampuses = [
  {
    id: "1",
    name: "Campus Centro",
    address: "Av. Paulista, 1000",
    city: "São Paulo",
    state: "SP",
    distance: 2.3
  },
  {
    id: "2",
    name: "Campus Zona Sul",
    address: "Av. Santo Amaro, 500",
    city: "São Paulo",
    state: "SP",
    distance: 4.7
  },
  {
    id: "3",
    name: "Campus Guarulhos",
    address: "Rua Guarulhos, 100",
    city: "Guarulhos",
    state: "SP",
    distance: 15.2
  }
];

const demoCourses = [
  {
    id: "1",
    name: "Administração",
    modality: "Presencial",
    shift: "Noturno",
    startDate: "Fev/2024"
  },
  {
    id: "2",
    name: "Direito",
    modality: "Semipresencial",
    shift: "Matutino",
    startDate: "Fev/2024"
  },
  {
    id: "3",
    name: "Engenharia Civil",
    modality: "Presencial",
    shift: "Integral",
    startDate: "Ago/2024"
  },
  {
    id: "4",
    name: "ADS",
    modality: "EAD",
    shift: "Livre",
    startDate: "Imediato"
  }
];

const GeographicTargetingPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  
  // Definir o produto atual como 'recruitment'
  React.useEffect(() => {
    setCurrentProduct('recruitment');
  }, [setCurrentProduct]);
  
  const handleScheduleVisit = (leadId: string, campusId: string) => {
    toast({
      title: "Visita agendada",
      description: `Visita agendada para o lead ${leadId} no campus ${campusId}`,
    });
  };
  
  const handleViewAlternatives = (postalCode: string) => {
    toast({
      title: "Buscando alternativas",
      description: `Buscando outras unidades próximas ao CEP ${postalCode}`,
    });
  };
  
  const handleContact = (leadId: string, channel: string) => {
    toast({
      title: "Contato iniciado",
      description: `Iniciando contato com o lead ${leadId} via ${channel}`,
    });
  };
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Direcionamento Geográfico e Orquestração</h1>
          <p className="text-muted-foreground">
            Configure a integração geográfica e os canais de comunicação para seus leads
          </p>
        </div>
        
        <Tabs defaultValue="geo" className="space-y-6">
          <TabsList>
            <TabsTrigger value="geo">Direcionamento Geográfico</TabsTrigger>
            <TabsTrigger value="omnichannel">Orquestração Omnichannel</TabsTrigger>
            <TabsTrigger value="demo">Demo de Cards</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geo" className="space-y-6">
            <GeographicTargeting />
          </TabsContent>
          
          <TabsContent value="omnichannel" className="space-y-6">
            <OmnichannelOrchestration />
          </TabsContent>
          
          <TabsContent value="demo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cards Aprimorados de Leads</CardTitle>
                <CardDescription>
                  Visualização de leads com informações geográficas e de cursos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {demoLeads.map((lead, index) => (
                    <EnhancedLeadCard
                      key={lead.id}
                      lead={lead}
                      recommendedCampus={demoCampuses[index % demoCampuses.length]}
                      availableCourses={demoCourses}
                      onScheduleVisit={handleScheduleVisit}
                      onViewAlternatives={handleViewAlternatives}
                      onContact={handleContact}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default GeographicTargetingPage;
