
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

interface SubscriptionDetailsProps {
  onChangePlan: () => void;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({ onChangePlan }) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  const dateLocale = isPtBR ? ptBR : enUS;
  
  // Mock data for subscriptions
  const subscriptionData = {
    plan: isPtBR ? 'Premium' : 'Premium',
    status: 'active',
    startDate: new Date(2023, 5, 15),
    renewalDate: new Date(2024, 5, 15),
    billingCycle: isPtBR ? 'Anual' : 'Yearly',
    amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
    paymentMethod: isPtBR ? 'Cartão de crédito' : 'Credit card',
    cardLastFour: '4242'
  };
  
  const formatDate = (date: Date) => {
    return format(date, isPtBR ? 'dd/MM/yyyy' : 'MM/dd/yyyy', { locale: dateLocale });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {isPtBR ? 'Ativo' : 'Active'}
          </Badge>
        );
      case 'paid':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {isPtBR ? 'Pago' : 'Paid'}
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            {isPtBR ? 'Pendente' : 'Pending'}
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isPtBR ? 'Detalhes da Assinatura' : 'Subscription Details'}
        </CardTitle>
        <CardDescription>
          {isPtBR 
            ? 'Informações sobre seu plano atual' 
            : 'Information about your current plan'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">
                {isPtBR ? 'Plano' : 'Plan'}
              </h3>
              <p className="text-lg font-medium">{subscriptionData.plan}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">
                {isPtBR ? 'Status' : 'Status'}
              </h3>
              <div>{getStatusBadge(subscriptionData.status)}</div>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">
                {isPtBR ? 'Data de Início' : 'Start Date'}
              </h3>
              <p>{formatDate(subscriptionData.startDate)}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">
                {isPtBR ? 'Próxima Renovação' : 'Next Renewal'}
              </h3>
              <p>{formatDate(subscriptionData.renewalDate)}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">
                {isPtBR ? 'Ciclo de Cobrança' : 'Billing Cycle'}
              </h3>
              <p>{subscriptionData.billingCycle}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">
                {isPtBR ? 'Valor' : 'Amount'}
              </h3>
              <p className="text-lg font-medium">{subscriptionData.amount}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground text-sm mb-1">
                {isPtBR ? 'Método de Pagamento' : 'Payment Method'}
              </h3>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span>
                  {subscriptionData.paymentMethod} •••• {subscriptionData.cardLastFour}
                </span>
              </div>
            </div>
            
            <div className="pt-4">
              <Button variant="outline" className="w-full" onClick={onChangePlan}>
                {isPtBR ? 'Alterar Plano' : 'Change Plan'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionDetails;
