
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import VoiceCallApiIntegration from '@/components/admin/ai/VoiceCallApiIntegration';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VoiceConfigurationPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { setCurrentProduct } = useProduct();
  const navigate = useNavigate();
  
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
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Campanhas
        </Button>
        <h1 className="text-2xl font-bold">Configuração de Ligações de Voz</h1>
        <p className="text-muted-foreground mt-1">
          Configure o serviço de ligações de voz para usar nas campanhas de reengajamento
        </p>
      </div>
      
      <VoiceCallApiIntegration />
    </Layout>
  );
};

export default VoiceConfigurationPage;
