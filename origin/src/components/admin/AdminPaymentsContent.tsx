
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/context/ThemeContext';
import PaymentStats from './payments/PaymentStats';
import RecentPaymentsTable from './payments/RecentPaymentsTable';
import TransactionsTable from './payments/TransactionsTable';
import SubscriptionsSummary from './payments/SubscriptionsSummary';
import { 
  getRevenueStats, 
  getMockPayments, 
  getSubscriptionsByPlan,
  getFilteredTitle 
} from './payments/utils';

const AdminPaymentsContent: React.FC = () => {
  const { language } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterPeriod, setFilterPeriod] = useState<string>('month');
  
  const isPtBR = language === 'pt-BR';
  
  // Get data from utils
  const revenueStats = getRevenueStats(isPtBR);
  const payments = getMockPayments(isPtBR);
  const subscriptionsByPlan = getSubscriptionsByPlan();
  const filteredTitle = getFilteredTitle(filterPeriod, isPtBR);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {isPtBR ? 'Relatório de Pagamentos' : 'Payment Reports'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isPtBR 
            ? 'Visualize e analise todos os pagamentos da plataforma' 
            : 'View and analyze all platform payments'}
        </p>
      </div>
      
      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            {isPtBR ? 'Visão Geral' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="transactions">
            {isPtBR ? 'Transações' : 'Transactions'}
          </TabsTrigger>
          <TabsTrigger value="subscriptions">
            {isPtBR ? 'Assinaturas' : 'Subscriptions'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <PaymentStats revenueStats={revenueStats} />
          <RecentPaymentsTable 
            payments={payments} 
            filteredTitle={filteredTitle}
          />
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6">
          <TransactionsTable 
            payments={payments}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filterPeriod={filterPeriod}
            setFilterPeriod={setFilterPeriod}
          />
        </TabsContent>
        
        <TabsContent value="subscriptions" className="space-y-6">
          <SubscriptionsSummary subscriptionsByPlan={subscriptionsByPlan} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPaymentsContent;
