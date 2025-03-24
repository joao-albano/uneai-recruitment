
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
import { AlertTriangle, AlertCircle, CheckCircle2, Users, Clock, Brain } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { AlertItem, ScheduleItem, StudentData } from '@/types/data';
import { Alert } from '@/types/alert';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  
  // Calculate risk statistics
  const highRiskCount = students.filter(s => s.riskLevel === 'high').length;
  const mediumRiskCount = students.filter(s => s.riskLevel === 'medium').length;
  const lowRiskCount = students.filter(s => s.riskLevel === 'low').length;
  const totalStudents = students.length;
  
  const getPercentage = (count: number) => (totalStudents > 0 ? (count / totalStudents) * 100 : 0);
  
  // Count pending alerts (those that need action and haven't been marked as actioned)
  const pendingAlertsCount = alerts.filter(alert => !alert.actionTaken).length;
  
  // Count completed interventions (schedules with 'completed' status)
  const completedInterventionsCount = schedules.filter(
    schedule => schedule.status === 'completed'
  ).length;

  // Calculate AI assisted interventions (a subset of completed interventions)
  const aiAssistedCount = Math.min(completedInterventionsCount, 
    Math.floor(completedInterventionsCount * 0.8)); // Assume 80% of interventions are AI-assisted
  
  // Mock student for RiskExplanation with proper type
  const mockStudent: StudentData = students.length > 0 
    ? students.find(s => s.riskLevel === 'high') || students[0]
    : {
        id: 'mock',
        name: 'Student Example',
        registrationNumber: '123456',
        class: '9A',
        segment: 'ENSINO MÉDIO' as any,
        grade: 7,
        attendance: 70,
        behavior: 6,
        riskLevel: 'high',
        decisionPath: ['Low attendance', 'Declining grades'],
        actionItems: ['Contact parents', 'Schedule counseling']
      };
  
  const handleModelCardClick = () => {
    navigate('/model');
  };
  
  return (
    <div>
      {/* Free trial expiration banner */}
      {showBanner && (
        <FreePlanExpirationBanner daysRemaining={daysRemaining} />
      )}
      
      {/* Payment notification for existing customers with pending invoices */}
      {hasPendingInvoice && (
        <PaymentNotificationBanner />
      )}

      {/* Risk stats cards - display in a responsive grid with 3 cards per row on medium screens, 6 on large */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <RiskCard
          title="Alunos em Alto Risco"
          value={highRiskCount}
          description={`${getPercentage(highRiskCount).toFixed(1)}% do total de alunos`}
          icon={<AlertTriangle className="h-4 w-4 text-red-500" />}
          className="border-l-4 border-l-red-500"
        />
        <RiskCard
          title="Alunos em Médio Risco"
          value={mediumRiskCount}
          description="Risco moderado de evasão"
          icon={<AlertCircle className="h-4 w-4 text-orange-500" />}
          className="border-l-4 border-l-orange-500"
        />
        <RiskCard
          title="Alunos em Baixo Risco"
          value={lowRiskCount}
          description="Baixo risco de evasão"
          icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
          className="border-l-4 border-l-green-500"
        />
        <RiskCard
          title="Total de Alunos"
          value={totalStudents}
          description="Alunos monitorados"
          icon={<Users className="h-4 w-4 text-blue-500" />}
          className="border-l-4 border-l-blue-500"
        />
        <RiskCard
          title="Alertas Pendentes"
          value={pendingAlertsCount}
          description="Ações necessárias"
          icon={<Clock className="h-4 w-4 text-yellow-500" />}
          className="border-l-4 border-l-yellow-500"
        />
        <RiskCard
          title="Atendimentos com IA"
          value={aiAssistedCount}
          description="Intervenções guiadas por IA"
          icon={<Brain className="h-4 w-4 text-purple-500" />}
          className="border-l-4 border-l-purple-500"
          onClick={handleModelCardClick}
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
