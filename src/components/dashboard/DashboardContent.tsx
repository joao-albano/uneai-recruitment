
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RiskStats from './RiskStats';
import AlertsSection from './AlertsSection';
import UpcomingAppointments from './UpcomingAppointments';
import ClassesOverview from './ClassesOverview';
import Chart from './Chart';
import { StudentData } from '@/context/DataContext';
import { Schedule } from '@/types/schedule';
import { Alert } from '@/types/alert';

interface DashboardContentProps {
  students: StudentData[];
  alerts: Alert[];
  schedules: Schedule[];
  onViewAlertDetails: (alertId: string) => void;
  onViewClassDetails: (className: string) => void;
  onScheduleClick: (schedule: Schedule) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  students,
  alerts,
  schedules,
  onViewAlertDetails,
  onViewClassDetails,
  onScheduleClick
}) => {
  const highRiskCount = students.filter(s => s.riskLevel === 'high').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'medium').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'low').length;
  
  const totalStudents = students.length;
  const highRiskPercentage = totalStudents > 0 
    ? ((highRiskCount / totalStudents) * 100).toFixed(1) 
    : '0';
    
  const recentAlerts = alerts.slice(0, 5);
  
  const upcomingSchedules = schedules
    .filter(s => s.status === 'scheduled')
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <RiskStats 
          highRiskCount={highRiskCount}
          mediumRiskCount={mediumRiskCount}
          lowRiskCount={lowRiskCount}
          totalStudents={totalStudents}
          highRiskPercentage={highRiskPercentage}
        />
      </div>
      
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="classes">Por Turma</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Chart
              students={students}
              title="Distribuição de Risco"
              description="Porcentagem de alunos por nível de risco"
            />
            
            <AlertsSection 
              alerts={recentAlerts} 
              onViewAlertDetails={onViewAlertDetails} 
            />
          </div>
          
          <UpcomingAppointments 
            schedules={upcomingSchedules} 
            onScheduleClick={onScheduleClick} 
          />
        </TabsContent>
        
        <TabsContent value="classes" className="space-y-4">
          <ClassesOverview 
            students={students} 
            onViewClassDetails={onViewClassDetails} 
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default DashboardContent;
