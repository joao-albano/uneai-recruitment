
import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import DashboardContent from './DashboardContent';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Schedule } from '@/types/schedule';
import { Alert } from '@/types/alert';
import PaymentNotificationBanner from '../billing/PaymentNotificationBanner';

const Dashboard: React.FC = () => {
  const { students, alerts, schedules, isLoading, generateDemoData } = useData();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // For demo purposes - we'll assume there's a pending invoice
  const hasPendingInvoice = true;
  
  useEffect(() => {
    if (students.length === 0 && !isLoading) {
      generateDemoData();
      toast({
        title: 'Dados de demonstração',
        description: 'Carregamos alguns dados de exemplo para você explorar o sistema.',
      });
    }
  }, [students.length, generateDemoData, isLoading, toast]);

  const handleViewAlertDetails = (alertId: string) => {
    navigate(`/alerts?id=${alertId}`);
  };
  
  const handleViewClassDetails = (className: string) => {
    navigate(`/students?class=${className}`);
    
    toast({
      title: `Turma ${className}`,
      description: `Visualizando todos os alunos da turma ${className}`,
    });
  };

  const handleScheduleClick = (schedule: Schedule) => {
    navigate('/schedule');
    
    toast({
      title: 'Agenda',
      description: 'Visualizando página de agendamentos',
    });
  };

  const convertedAlerts: Alert[] = alerts.map(alert => ({
    id: alert.id,
    studentId: alert.studentId,
    studentName: alert.studentName,
    studentClass: alert.studentClass,
    type: alert.type,
    actionTaken: alert.actionTaken,
    createdAt: alert.createdAt.toString()
  }));

  return (
    <div className="animate-fade-in">
      {hasPendingInvoice && <PaymentNotificationBanner />}
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral do risco de evasão escolar
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Carregando dados...</p>
          </div>
        </div>
      ) : students.length === 0 ? (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Bem-vindo ao Une.AI EduCare</CardTitle>
            <CardDescription>
              Para começar, faça o upload de dados ou use nossos dados de demonstração.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button 
              onClick={generateDemoData}
              size="lg"
              className="w-full max-w-md"
            >
              Carregar dados de demonstração
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <DashboardContent
            students={students}
            alerts={convertedAlerts}
            schedules={schedules}
            allAlerts={alerts}
            allSchedules={schedules}
            onViewAlertDetails={handleViewAlertDetails}
            onViewClassDetails={handleViewClassDetails}
            onScheduleClick={handleScheduleClick}
          />
        </>
      )}
    </div>
  );
};

export default Dashboard;
