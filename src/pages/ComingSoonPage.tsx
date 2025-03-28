
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ComingSoonPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const navigate = useNavigate();
  
  return (
    <Layout
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
      sidebarCollapsed={sidebarCollapsed}
      setSidebarCollapsed={setSidebarCollapsed}
    >
      <div className="container flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="pt-6 text-center">
            <div className="mb-4 flex justify-center">
              <Clock className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Funcionalidade em Desenvolvimento</h2>
            <p className="text-muted-foreground mb-6">
              Esta funcionalidade está sendo desenvolvida e estará disponível em breve.
              Estamos trabalhando para entregar a melhor experiência possível.
            </p>
            <Button 
              variant="outline" 
              className="flex mx-auto items-center" 
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ComingSoonPage;
