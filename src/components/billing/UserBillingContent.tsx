
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

import BillingHeader from './BillingHeader';
import SubscriptionDetails from './SubscriptionDetails';
import InvoiceHistory from './InvoiceHistory';
import ChangePlanDialog from './ChangePlanDialog';

const UserBillingContent: React.FC = () => {
  const { language } = useTheme();
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('invoices');
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('premium');
  
  const isPtBR = language === 'pt-BR';

  const handleChangePlan = () => {
    setChangePlanOpen(true);
  };

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value);
  };

  return (
    <div>
      <BillingHeader />
      
      <Tabs 
        defaultValue="invoices" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subscription">
            {isPtBR ? 'Assinatura Atual' : 'Current Subscription'}
          </TabsTrigger>
          <TabsTrigger value="invoices">
            {isPtBR ? 'Faturas' : 'Invoices'}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="subscription" className="space-y-6">
          <SubscriptionDetails onChangePlan={handleChangePlan} />
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-6">
          <InvoiceHistory />
        </TabsContent>
      </Tabs>

      <ChangePlanDialog 
        open={changePlanOpen}
        onOpenChange={setChangePlanOpen}
        selectedPlan={selectedPlan}
        onPlanChange={handlePlanChange}
        currentPlan="premium"
      />
    </div>
  );
};

export default UserBillingContent;
