
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { useToast } from '@/hooks/use-toast';
import UsageStats from './dashboard/UsageStats';
import RiskDistribution from './dashboard/RiskDistribution';
import SystemActivity from './dashboard/SystemActivity';
import UserActivityChart from './dashboard/UserActivityChart';
import ExportReports from './dashboard/ExportReports';

const AdminDashboardContent: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { isLoading } = useData();
  const [activeTab, setActiveTab] = useState<string>('overview');
  
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
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === 'pt-BR' ? 'Painel Administrativo' : 'Admin Dashboard'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'pt-BR' 
            ? 'Análise de dados e métricas do sistema' 
            : 'System data analysis and metrics'}
        </p>
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
          <TabsTrigger value="risk">
            {language === 'pt-BR' ? 'Análise de Risco' : 'Risk Analysis'}
          </TabsTrigger>
          <TabsTrigger value="activity">
            {language === 'pt-BR' ? 'Atividade do Sistema' : 'System Activity'}
          </TabsTrigger>
          <TabsTrigger value="reports">
            {language === 'pt-BR' ? 'Relatórios' : 'Reports'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <UsageStats />
        </TabsContent>
        
        <TabsContent value="risk" className="space-y-6">
          <RiskDistribution />
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <SystemActivity />
            <UserActivityChart />
          </div>
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <ExportReports onError={handleExportError} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboardContent;
