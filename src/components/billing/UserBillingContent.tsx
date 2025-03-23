
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Download, Receipt, CreditCard, Clock, CheckCircle } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';

const UserBillingContent: React.FC = () => {
  const { language } = useTheme();
  const { isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('invoices');
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const { toast } = useToast();
  
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

  const handleChangePlan = () => {
    setChangePlanOpen(true);
  };

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value);
  };

  const handlePlanSubmit = () => {
    // Aqui iria a lógica para mudar o plano no backend
    toast({
      title: isPtBR ? "Plano alterado com sucesso!" : "Plan changed successfully!",
      description: isPtBR 
        ? "A mudança entrará em vigor no próximo ciclo de faturamento." 
        : "The change will take effect on your next billing cycle.",
      variant: "default",
    });
    setChangePlanOpen(false);
  };
  
  // Dados dos planos disponíveis
  const availablePlans = [
    {
      id: 'basic',
      name: isPtBR ? 'Básico' : 'Basic',
      price: isPtBR ? 'R$ 2.990,00/ano' : '$2,990.00/year',
      description: isPtBR ? 'Até 500 alunos' : 'Up to 500 students',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: isPtBR ? 'R$ 5.990,00/ano' : '$5,990.00/year',
      description: isPtBR ? 'Até 1500 alunos' : 'Up to 1500 students',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: isPtBR ? 'R$ 9.990,00/ano' : '$9,990.00/year',
      description: isPtBR ? 'Alunos ilimitados' : 'Unlimited students',
    }
  ];

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
                    <Button variant="outline" className="w-full" onClick={handleChangePlan}>
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

      {/* Dialog de alteração de plano */}
      <Dialog open={changePlanOpen} onOpenChange={setChangePlanOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {isPtBR ? 'Alterar seu plano' : 'Change your plan'}
            </DialogTitle>
            <DialogDescription>
              {isPtBR 
                ? 'Selecione o plano que melhor atende às suas necessidades.' 
                : 'Select the plan that best suits your needs.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup value={selectedPlan} onValueChange={handlePlanChange} className="space-y-4">
              {availablePlans.map(plan => (
                <div key={plan.id} className="flex items-start space-x-3 rounded-lg border p-4 relative">
                  <RadioGroupItem value={plan.id} id={plan.id} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={plan.id} className="text-base font-medium flex items-center justify-between">
                      {plan.name}
                      {plan.id === subscriptionData.plan.toLowerCase() && (
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          {isPtBR ? 'Atual' : 'Current'}
                        </Badge>
                      )}
                    </Label>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <p className="text-sm font-medium mt-2">{plan.price}</p>
                  </div>
                  {selectedPlan === plan.id && (
                    <CheckCircle className="h-5 w-5 text-primary absolute right-4 top-4" />
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setChangePlanOpen(false)}>
              {isPtBR ? 'Cancelar' : 'Cancel'}
            </Button>
            <Button onClick={handlePlanSubmit}>
              {isPtBR ? 'Confirmar Alteração' : 'Confirm Change'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserBillingContent;
