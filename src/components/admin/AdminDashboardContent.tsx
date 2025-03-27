
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';
import { Settings, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UsageStats from './dashboard/UsageStats';
import RiskDistribution from './dashboard/RiskDistribution';
import SystemActivity from './dashboard/SystemActivity';
import UserActivityChart from './dashboard/UserActivityChart';
import ExportReports from './dashboard/ExportReports';

const AdminDashboardContent: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { isLoading, students, generateDemoData } = useData();
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  // Make sure we have demo data
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
        <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-8">
          <TabsTrigger value="overview">
            {language === 'pt-BR' ? 'Visão Geral' : 'Overview'}
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
          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <RiskDistribution />
            
            {/* Class Details Card (moved from Risk Analysis tab) */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>
                  {language === 'pt-BR' ? 'Detalhamento por Turma' : 'Class Details'}
                </CardTitle>
                <CardDescription>
                  {language === 'pt-BR' 
                    ? 'Distribuição de risco por turma' 
                    : 'Risk distribution by class'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['9A', '9B', '9C', '9D'].map(className => {
                    const classStudents = students.filter(s => s.class === className);
                    const highRiskInClass = classStudents.filter(s => s.riskLevel === 'high').length;
                    const totalInClass = classStudents.length;
                    const riskPercentage = totalInClass > 0 ? (highRiskInClass / totalInClass) * 100 : 0;
                    
                    return (
                      <div key={className} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${riskPercentage > 30 ? 'bg-red-500' : riskPercentage > 15 ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                          <span className="font-medium">Turma {className}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{totalInClass} alunos</span>
                          <div className="w-24 bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full ${riskPercentage > 30 ? 'bg-red-500' : riskPercentage > 15 ? 'bg-amber-500' : 'bg-green-500'}`}
                              style={{ width: `${riskPercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{riskPercentage.toFixed(1)}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
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
