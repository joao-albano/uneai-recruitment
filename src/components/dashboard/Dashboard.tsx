
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { useData } from '@/context/DataContext';
import { cn } from '@/lib/utils';
import DashboardContent from './DashboardContent';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import PaymentNotificationBanner from '../billing/PaymentNotificationBanner';
import { useAuth } from '@/context/auth';
import { Alert } from '@/types/alert';
import { ScheduleItem } from '@/types/data';

const Dashboard: React.FC = () => {
  const { students, alerts, schedules, isLoading, generateDemoData } = useData();
  const { toast } = useToast();
  const { isAdmin, currentUser } = useAuth();
  const isMobile = useIsMobile();
  
  // For demo purposes - we'll assume there's a pending invoice
  const hasPendingInvoice = true;
  const shouldShowPaymentBanner = hasPendingInvoice && !isAdmin;
  
  // Only show trial banner for non-admin users
  const shouldShowTrialBanner = !isAdmin && currentUser?.role === 'user';
  
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
    // Implement your logic here
  };
  
  const handleViewClassDetails = (className: string) => {
    // Implement your logic here
  };

  const handleScheduleClick = (schedule: ScheduleItem) => {
    // Implement your logic here
  };

  // Convert AlertItem[] to Alert[] for compatibility with DashboardContent
  const alertsForDashboard: Alert[] = alerts.map(alert => ({
    id: alert.id,
    studentId: alert.studentId,
    studentName: alert.studentName,
    studentClass: alert.studentClass,
    type: alert.type,
    actionTaken: alert.actionTaken,
    createdAt: alert.createdAt.toISOString(),
  }));

  return (
    <div>
      {shouldShowPaymentBanner && <PaymentNotificationBanner />}
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral do desempenho dos alunos
        </p>
      </div>
      
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="ml-3 text-muted-foreground">Carregando dados...</p>
        </div>
      ) : students.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao Une.AI EduCare</CardTitle>
            <CardDescription>
              Para começar, faça o upload de dados ou use nossos dados de demonstração.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={generateDemoData}
            >
              Carregar dados de demonstração
            </Button>
          </CardContent>
        </Card>
      ) : (
        <DashboardContent
          students={students}
          alerts={alertsForDashboard}
          schedules={schedules}
          onViewAlertDetails={handleViewAlertDetails}
          onViewClassDetails={handleViewClassDetails}
          onScheduleClick={handleScheduleClick}
          isMobile={isMobile}
          showTrialBanner={shouldShowTrialBanner}
        />
      )}
    </div>
  );
};

export default Dashboard;
