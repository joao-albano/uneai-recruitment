
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Settings, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OverviewTabContent from './dashboard/OverviewTabContent';
import ActivityTabContent from './dashboard/ActivityTabContent';
import WhatsAppTabContent from './dashboard/WhatsAppTabContent';
import ReportsTabContent from './dashboard/ReportsTabContent';

const AdminDashboardContent: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { isLoading, students, generateDemoData } = useData();
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  useEffect(() => {
    if (students.length === 0 && !isLoading) {
      generateDemoData();
      toast({
        title: 'Dados de demonstração',
        description: 'Carregamos alguns dados de exemplo para você explorar o sistema.',
      });
    }
  }, [students.length, generateDemoData, isLoading, toast]);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }
  
  const handleExportError = (error: Error) => {
    console.error('Export error:', error);
    toast({
      title: language === 'pt-BR' ? 'Erro na exportação' : 'Export Error',
      description: error.message,
      variant: 'destructive'
    });
  };
  
  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {language === 'pt-BR' ? 'Painel Administrativo' : 'Admin Dashboard'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'pt-BR' 
              ? 'Análise de dados e métricas do sistema' 
              : 'System data analysis and metrics'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link to="/admin/plans">
              <DollarSign className="mr-2 h-4 w-4" />
              {language === 'pt-BR' ? 'Gerenciar Planos' : 'Manage Plans'}
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              {language === 'pt-BR' ? 'Configurações Administrativas' : 'Admin Settings'}
            </Link>
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="overview">
            {language === 'pt-BR' ? 'Visão Geral' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="activity">
            {language === 'pt-BR' ? 'Atividade do Sistema' : 'System Activity'}
          </TabsTrigger>
          <TabsTrigger value="whatsapp">
            {language === 'pt-BR' ? 'WhatsApp' : 'WhatsApp'}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {language === 'pt-BR' ? 'Relatórios' : 'Reports'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <OverviewTabContent />
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-6">
          <ActivityTabContent />
        </TabsContent>
        
        <TabsContent value="whatsapp" className="space-y-6">
          <WhatsAppTabContent />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <ReportsTabContent onError={handleExportError} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardContent;
