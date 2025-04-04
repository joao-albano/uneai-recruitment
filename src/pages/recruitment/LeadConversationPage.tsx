
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useParams } from 'react-router-dom';
import { useProduct } from '@/context/ProductContext';
import ConversationInterface from '@/components/recruitment/conversation/ConversationInterface';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Calendar, BarChart2 } from 'lucide-react';

// Import our new components
import LeadHeader from '@/components/recruitment/leadConversation/LeadHeader';
import LeadInfo from '@/components/recruitment/leadConversation/LeadInfo';
import AppointmentsTab from '@/components/recruitment/leadConversation/AppointmentsTab';
import AnalyticsTab from '@/components/recruitment/leadConversation/AnalyticsTab';
import { useLeadData } from '@/components/recruitment/leadConversation/hooks/useLeadData';

const LeadConversationPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  const { leadId } = useParams<{ leadId: string }>();
  
  const leadData = useLeadData(leadId || '1');
  
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
        <LeadHeader leadData={leadData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <LeadInfo leadData={leadData} />
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
                <AppointmentsTab />
              </TabsContent>
              
              <TabsContent value="analytics">
                <AnalyticsTab />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LeadConversationPage;
