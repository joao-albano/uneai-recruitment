import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/context/ProductContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ComingSoonPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { currentProduct, setCurrentProduct } = useProduct();
  
  // Keep current product from context
  React.useEffect(() => {
    // No need to set product here as we want to keep the current one
  }, []);
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container mx-auto py-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleGoBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Em Construção</h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-xl">
            Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
          </p>
          <div className="p-4 rounded-full bg-primary/10">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/30 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComingSoonPage;
