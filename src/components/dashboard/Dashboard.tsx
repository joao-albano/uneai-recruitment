
import React, { useEffect } from 'react';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import DashboardContent from './DashboardContent';
import { useIsMobile } from '@/hooks/use-mobile';
import { Alert } from '@/types/alert';
import { useAppState } from '@/context/app/AppStateContext';

const Dashboard: React.FC = () => {
  const { students, alerts, schedules, isLoading } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { generateDemoData } = useAppState();
  
  useEffect(() => {
    // Carregar dados de demonstração se não houver dados
    if (!isLoading && students.length === 0 && alerts.length === 0 && schedules.length === 0) {
      console.log('Carregando dados de demonstração...');
      generateDemoData();
      toast({
        title: 'Dados de demonstração',
        description: 'Carregamos dados fictícios para você explorar o sistema.',
      });
    }
  }, [isLoading, students.length, alerts.length, schedules.length, generateDemoData, toast]);
  
  const handleViewAlertDetails = (alertId: string) => {
    navigate(`/alerts?id=${alertId}`);
  };
  
  const handleViewClassDetails = (className: string) => {
    navigate(`/students?class=${className}`);
    toast({
      title: 'Turma selecionada',
      description: `Detalhes da turma ${className} carregados`,
    });
  };
  
  const handleScheduleClick = (schedule: any) => {
    navigate(`/schedule?id=${schedule.id}`);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // Verificação adicional para carregamento de dados de demonstração se não houver dados
  if (students.length === 0 && alerts.length === 0 && schedules.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mb-4"></div>
        <p className="text-muted-foreground">Carregando dados de demonstração...</p>
      </div>
    );
  }

  // Convert AlertItem[] to Alert[] by formatting createdAt to string
  const convertedAlerts: Alert[] = alerts.map(alert => ({
    ...alert,
    createdAt: alert.createdAt instanceof Date ? alert.createdAt.toISOString() : alert.createdAt
  }));

  return (
    <DashboardContent
      students={students}
      alerts={convertedAlerts}
      schedules={schedules}
      onViewAlertDetails={handleViewAlertDetails}
      onViewClassDetails={handleViewClassDetails}
      onScheduleClick={handleScheduleClick}
      isMobile={isMobile}
      showTrialBanner={false}
    />
  );
};

export default Dashboard;
