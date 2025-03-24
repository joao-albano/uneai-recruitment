
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Chart from './Chart';
import RiskStats from './RiskStats';
import ClassesOverview from './ClassesOverview';
import RiskCard from './RiskCard';
import UpcomingAppointments from './UpcomingAppointments';
import AlertsSection from './AlertsSection';
import AiModelInfo from './AiModelInfo';
import RiskExplanation from './RiskExplanation';
import { useTheme } from '@/context/ThemeContext';
import FreePlanExpirationBanner from '../billing/FreePlanExpirationBanner';
import { useTrialPeriod } from '@/hooks/useTrialPeriod';
import PaymentNotificationBanner from '../billing/PaymentNotificationBanner';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { AlertItem, ScheduleItem, StudentData } from '@/types/data';
import { Alert } from '@/types/alert';

interface DashboardContentProps {
  students?: StudentData[];
  alerts?: Alert[];
  schedules?: ScheduleItem[];
  onViewAlertDetails?: (alertId: string) => void;
  onViewClassDetails?: (className: string) => void;
  onScheduleClick?: (schedule: ScheduleItem) => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  students = [],
  alerts = [],
  schedules = [],
  onViewAlertDetails = () => {},
  onViewClassDetails = () => {},
  onScheduleClick = () => {}
}) => {
  const { language } = useTheme();
  const { showBanner, daysRemaining } = useTrialPeriod();
  const hasPendingInvoice = false; // This would come from your payment system in a real app
  
  // Calculate risk statistics
  const highRiskCount = students.filter(s => s.riskLevel === 'high').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'medium').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'low').length;
  const totalStudents = students.length;
  
  const getPercentage = (count: number) => (totalStudents > 0 ? (count / totalStudents) * 100 : 0);
  
  // Mock student for RiskExplanation with proper type
  const mockStudent: StudentData = students.length > 0 
    ? students.find(s => s.riskLevel === 'high') || students[0]
    : {
        id: 'mock',
        name: 'Student Example',
        registrationNumber: '123456',
        class: '9A',
        segment: 'ENSINO MÉDIO',
        grade: 7,
        attendance: 70,
        behavior: 6,
        riskLevel: 'high',
        decisionPath: ['Low attendance', 'Declining grades'],
        actionItems: ['Contact parents', 'Schedule counseling']
      };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {language === 'pt-BR' ? 'Dashboard' : 'Dashboard'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {language === 'pt-BR' 
            ? 'Visão geral do desempenho dos alunos' 
            : 'Overview of student performance'}
        </p>
      </div>
      
      {/* Free trial expiration banner */}
      {showBanner && (
        <FreePlanExpirationBanner daysRemaining={daysRemaining} />
      )}
      
      {/* Payment notification for existing customers with pending invoices */}
      {hasPendingInvoice && (
        <PaymentNotificationBanner />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <RiskCard 
          title={language === 'pt-BR' ? 'Alto Risco' : 'High Risk'} 
          value={highRiskCount.toString()} 
          description={`${getPercentage(highRiskCount).toFixed(1)}% dos alunos`} 
          icon={<AlertTriangle className="h-8 w-8 text-red-500" />}
          className="border-red-200 bg-red-50"
        />
        <RiskCard 
          title={language === 'pt-BR' ? 'Médio Risco' : 'Medium Risk'} 
          value={mediumRiskCount.toString()} 
          description={`${getPercentage(mediumRiskCount).toFixed(1)}% dos alunos`} 
          icon={<AlertCircle className="h-8 w-8 text-amber-500" />}
          className="border-amber-200 bg-amber-50"
        />
        <RiskCard 
          title={language === 'pt-BR' ? 'Baixo Risco' : 'Low Risk'} 
          value={lowRiskCount.toString()} 
          description={`${getPercentage(lowRiskCount).toFixed(1)}% dos alunos`} 
          icon={<CheckCircle className="h-8 w-8 text-green-500" />}
          className="border-green-200 bg-green-50"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent>
            <Chart students={students} title={language === 'pt-BR' ? 'Distribuição de Risco' : 'Risk Distribution'} />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <RiskStats 
              highRiskCount={highRiskCount}
              mediumRiskCount={mediumRiskCount}
              lowRiskCount={lowRiskCount}
              totalStudents={totalStudents}
              highRiskPercentage={getPercentage(highRiskCount).toFixed(1)}
              alerts={alerts as unknown as AlertItem[]}
              schedules={schedules as ScheduleItem[]}
            />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ClassesOverview students={students} onViewClassDetails={onViewClassDetails} />
        <RiskExplanation student={mockStudent} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <UpcomingAppointments schedules={schedules as unknown as any[]} onScheduleClick={onScheduleClick as any} />
        <AlertsSection alerts={alerts} onViewAlertDetails={onViewAlertDetails} />
      </div>

      <AiModelInfo />
    </div>
  );
};

export default DashboardContent;
