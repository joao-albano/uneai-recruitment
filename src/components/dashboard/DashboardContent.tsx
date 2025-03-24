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

const DashboardContent: React.FC = () => {
  const { language } = useTheme();
  const { showBanner, daysRemaining } = useTrialPeriod();
  const hasPendingInvoice = false; // This would come from your payment system in a real app
  
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
          count={15} 
          percentage={12.5} 
          change={2.3} 
          type="high"
        />
        <RiskCard 
          title={language === 'pt-BR' ? 'Médio Risco' : 'Medium Risk'} 
          count={23} 
          percentage={19.2} 
          change={-1.5} 
          type="medium"
        />
        <RiskCard 
          title={language === 'pt-BR' ? 'Baixo Risco' : 'Low Risk'} 
          count={82} 
          percentage={68.3} 
          change={-0.8} 
          type="low"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardContent>
            <Chart />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <RiskStats />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ClassesOverview />
        <RiskExplanation />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <UpcomingAppointments />
        <AlertsSection />
      </div>

      <AiModelInfo />
    </div>
  );
};

export default DashboardContent;
