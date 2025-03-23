
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Receipt, CreditCard, Clock } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

const UserBillingContent: React.FC = () => {
  const { language } = useTheme();
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('invoices');
  
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
  
  // Mock data for invoices
  const invoices = [
    {
      id: 'INV-001',
      date: new Date(2023, 5, 15),
      amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
      status: 'paid',
    },
    {
      id: 'INV-002',
      date: new Date(2023, 8, 15),
      amount: isPtBR ? 'R$ 0,00' : '$0.00',
      status: 'paid',
      description: isPtBR ? 'Ajuste de promoção' : 'Promotion adjustment'
    },
    {
      id: 'INV-003',
      date: new Date(2024, 2, 15),
      amount: isPtBR ? 'R$ 299,00' : '$299.00',
      status: 'paid',
      description: isPtBR ? 'Adicional de usuários' : 'Additional users'
    },
  ];
  
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
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          {isPtBR ? 'Relatório de Cobrança' : 'Billing Report'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {isPtBR 
            ? 'Gerencie suas assinaturas e veja histórico de pagamentos' 
            : 'Manage your subscriptions and view payment history'}
        </p>
      </div>
      
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
                    <Button variant="outline" className="w-full">
                      {isPtBR ? 'Alterar Plano' : 'Change Plan'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {isPtBR ? 'Histórico de Faturas' : 'Invoice History'}
              </CardTitle>
              <CardDescription>
                {isPtBR 
                  ? 'Veja e baixe suas faturas anteriores' 
                  : 'View and download your previous invoices'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isPtBR ? 'Fatura' : 'Invoice'}</TableHead>
                    <TableHead>{isPtBR ? 'Data' : 'Date'}</TableHead>
                    <TableHead>{isPtBR ? 'Valor' : 'Amount'}</TableHead>
                    <TableHead>{isPtBR ? 'Status' : 'Status'}</TableHead>
                    <TableHead className="text-right">{isPtBR ? 'Ações' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.id}
                        {invoice.description && (
                          <div className="text-sm text-muted-foreground">
                            {invoice.description}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" title={isPtBR ? 'Baixar PDF' : 'Download PDF'}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserBillingContent;
