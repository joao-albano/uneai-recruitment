
import React from 'react';
import { useData } from '@/context/DataContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import DashboardContent from './DashboardContent';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard: React.FC = () => {
  const { students, alerts, schedules, isLoading } = useData();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
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

  return (
    <DashboardContent
      students={students}
      alerts={alerts}
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
