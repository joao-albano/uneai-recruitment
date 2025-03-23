
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Download, Search, ArrowUpDown, DollarSign, Users, CreditCard, 
  LineChart, Calendar, Filter 
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

const AdminPaymentsContent: React.FC = () => {
  const { language } = useTheme();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterPeriod, setFilterPeriod] = useState<string>('month');
  
  const isPtBR = language === 'pt-BR';
  const dateLocale = isPtBR ? ptBR : enUS;
  
  // Dados fictícios de receita mensal
  const revenueStats = {
    totalRevenue: isPtBR ? 'R$ 47.890,00' : '$47,890.00',
    monthlyRevenue: isPtBR ? 'R$ 12.476,00' : '$12,476.00',
    activeSubscriptions: 48,
    averageValue: isPtBR ? 'R$ 598,00' : '$598.00',
    growthRate: '+18.5%'
  };
  
  // Dados fictícios de pagamentos
  const payments = [
    {
      id: 'PAY-001',
      customer: 'Escola Santa Maria',
      email: 'financeiro@santamaria.edu',
      date: new Date(2024, 2, 15),
      amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
      plan: 'Premium',
      status: 'completed',
      method: 'credit_card'
    },
    {
      id: 'PAY-002',
      customer: 'Colégio Futuro',
      email: 'admin@colegiofuturo.edu',
      date: new Date(2024, 2, 12),
      amount: isPtBR ? 'R$ 9.990,00' : '$9,990.00',
      plan: 'Enterprise',
      status: 'completed',
      method: 'bank_transfer'
    },
    {
      id: 'PAY-003',
      customer: 'Instituto Nova Era',
      email: 'financas@novaera.edu',
      date: new Date(2024, 2, 10),
      amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
      plan: 'Premium',
      status: 'completed',
      method: 'credit_card'
    },
    {
      id: 'PAY-004',
      customer: 'Escola Primavera',
      email: 'contato@primavera.edu',
      date: new Date(2024, 2, 5),
      amount: isPtBR ? 'R$ 2.990,00' : '$2,990.00',
      plan: 'Basic',
      status: 'completed',
      method: 'credit_card'
    },
    {
      id: 'PAY-005',
      customer: 'Colégio Horizonte',
      email: 'adm@colegiohorizonte.edu',
      date: new Date(2024, 2, 1),
      amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
      plan: 'Premium',
      status: 'pending',
      method: 'bank_transfer'
    }
  ];
  
  // Dados fictícios de assinaturas por plano
  const subscriptionsByPlan = [
    { plan: 'Basic', count: 12, percentage: '25%' },
    { plan: 'Premium', count: 28, percentage: '58%' },
    { plan: 'Enterprise', count: 8, percentage: '17%' }
  ];
  
  const formatDate = (date: Date) => {
    return format(date, isPtBR ? 'dd/MM/yyyy' : 'MM/dd/yyyy', { locale: dateLocale });
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {isPtBR ? 'Concluído' : 'Completed'}
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            {isPtBR ? 'Pendente' : 'Pending'}
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {isPtBR ? 'Falhou' : 'Failed'}
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
  
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'credit_card':
        return <CreditCard className="h-4 w-4 mr-1" />;
      case 'bank_transfer':
        return <DollarSign className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };
  
  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'credit_card':
        return isPtBR ? 'Cartão de crédito' : 'Credit card';
      case 'bank_transfer':
        return isPtBR ? 'Transferência bancária' : 'Bank transfer';
      default:
        return method;
    }
  };
  
  // Filtra pagamentos com base no termo de pesquisa
  const filteredPayments = payments.filter(payment => 
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getFilteredTitle = () => {
    switch (filterPeriod) {
      case 'week':
        return isPtBR ? 'Últimos 7 dias' : 'Last 7 days';
      case 'month':
        return isPtBR ? 'Este mês' : 'This month';
      case 'quarter':
        return isPtBR ? 'Último trimestre' : 'Last quarter';
      case 'year':
        return isPtBR ? 'Este ano' : 'This year';
      default:
        return isPtBR ? 'Este mês' : 'This month';
    }
  };

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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isPtBR ? 'Receita Total' : 'Total Revenue'}
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{revenueStats.totalRevenue}</div>
                <p className="text-xs text-muted-foreground">
                  {isPtBR ? 'Desde o início' : 'Since beginning'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isPtBR ? 'Receita Mensal' : 'Monthly Revenue'}
                </CardTitle>
                <LineChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{revenueStats.monthlyRevenue}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{revenueStats.growthRate}</span>
                  {' '}
                  {isPtBR ? 'em relação ao mês anterior' : 'from last month'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isPtBR ? 'Assinaturas Ativas' : 'Active Subscriptions'}
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{revenueStats.activeSubscriptions}</div>
                <p className="text-xs text-muted-foreground">
                  {isPtBR ? 'escolas usando a plataforma' : 'schools using the platform'}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {isPtBR ? 'Valor Médio' : 'Average Value'}
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{revenueStats.averageValue}</div>
                <p className="text-xs text-muted-foreground">
                  {isPtBR ? 'por assinatura' : 'per subscription'}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>
                {isPtBR ? 'Pagamentos Recentes' : 'Recent Payments'}
              </CardTitle>
              <CardDescription>
                {getFilteredTitle()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{isPtBR ? 'ID' : 'ID'}</TableHead>
                    <TableHead>{isPtBR ? 'Cliente' : 'Customer'}</TableHead>
                    <TableHead>{isPtBR ? 'Data' : 'Date'}</TableHead>
                    <TableHead>{isPtBR ? 'Plano' : 'Plan'}</TableHead>
                    <TableHead>{isPtBR ? 'Valor' : 'Amount'}</TableHead>
                    <TableHead>{isPtBR ? 'Status' : 'Status'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.slice(0, 5).map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        {payment.customer}
                        <div className="text-xs text-muted-foreground">{payment.email}</div>
                      </TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                      <TableCell>{payment.plan}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>
                    {isPtBR ? 'Todas as Transações' : 'All Transactions'}
                  </CardTitle>
                  <CardDescription>
                    {isPtBR ? 'Histórico completo de pagamentos' : 'Complete payment history'}
                  </CardDescription>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder={isPtBR ? "Buscar transação..." : "Search transaction..."}
                      className="pl-8 w-full md:w-[200px] lg:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder={isPtBR ? "Período" : "Period"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">{isPtBR ? 'Últimos 7 dias' : 'Last 7 days'}</SelectItem>
                      <SelectItem value="month">{isPtBR ? 'Este mês' : 'This month'}</SelectItem>
                      <SelectItem value="quarter">{isPtBR ? 'Último trimestre' : 'Last quarter'}</SelectItem>
                      <SelectItem value="year">{isPtBR ? 'Este ano' : 'This year'}</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{isPtBR ? 'ID' : 'ID'}</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        {isPtBR ? 'Cliente' : 'Customer'}
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        {isPtBR ? 'Data' : 'Date'}
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>{isPtBR ? 'Plano' : 'Plan'}</TableHead>
                    <TableHead>{isPtBR ? 'Método' : 'Method'}</TableHead>
                    <TableHead>
                      <div className="flex items-center gap-1">
                        {isPtBR ? 'Valor' : 'Amount'}
                        <ArrowUpDown className="h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>{isPtBR ? 'Status' : 'Status'}</TableHead>
                    <TableHead className="text-right">{isPtBR ? 'Ações' : 'Actions'}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>
                        {payment.customer}
                        <div className="text-xs text-muted-foreground">{payment.email}</div>
                      </TableCell>
                      <TableCell>{formatDate(payment.date)}</TableCell>
                      <TableCell>{payment.plan}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getPaymentMethodIcon(payment.method)}
                          <span>{getPaymentMethodText(payment.method)}</span>
                        </div>
                      </TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" title={isPtBR ? 'Baixar recibo' : 'Download receipt'}>
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
        
        <TabsContent value="subscriptions" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  {isPtBR ? 'Distribuição por Plano' : 'Distribution by Plan'}
                </CardTitle>
                <CardDescription>
                  {isPtBR 
                    ? 'Assinaturas ativas por tipo de plano' 
                    : 'Active subscriptions by plan type'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isPtBR ? 'Plano' : 'Plan'}</TableHead>
                      <TableHead>{isPtBR ? 'Clientes' : 'Customers'}</TableHead>
                      <TableHead>{isPtBR ? 'Percentual' : 'Percentage'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subscriptionsByPlan.map((item) => (
                      <TableRow key={item.plan}>
                        <TableCell className="font-medium">{item.plan}</TableCell>
                        <TableCell>{item.count}</TableCell>
                        <TableCell>{item.percentage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>
                  {isPtBR ? 'Receita Anual' : 'Annual Revenue'}
                </CardTitle>
                <CardDescription>
                  {isPtBR 
                    ? 'Projeção de receita anual baseada nas assinaturas atuais' 
                    : 'Annual revenue projection based on current subscriptions'}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="space-y-2">
                  <div className="font-semibold text-sm text-muted-foreground">
                    {isPtBR ? 'Basic' : 'Basic'}
                  </div>
                  <div className="text-2xl font-bold">
                    {isPtBR ? 'R$ 35.880,00' : '$35,880.00'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isPtBR ? '12 clientes × R$ 2.990,00' : '12 customers × $2,990.00'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-semibold text-sm text-muted-foreground">
                    {isPtBR ? 'Premium' : 'Premium'}
                  </div>
                  <div className="text-2xl font-bold">
                    {isPtBR ? 'R$ 167.720,00' : '$167,720.00'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isPtBR ? '28 clientes × R$ 5.990,00' : '28 customers × $5,990.00'}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="font-semibold text-sm text-muted-foreground">
                    {isPtBR ? 'Enterprise' : 'Enterprise'}
                  </div>
                  <div className="text-2xl font-bold">
                    {isPtBR ? 'R$ 79.920,00' : '$79,920.00'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isPtBR ? '8 clientes × R$ 9.990,00' : '8 customers × $9,990.00'}
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="font-semibold text-sm text-muted-foreground">
                    {isPtBR ? 'Total' : 'Total'}
                  </div>
                  <div className="text-3xl font-bold">
                    {isPtBR ? 'R$ 283.520,00' : '$283,520.00'}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {isPtBR ? '48 clientes no total' : '48 customers total'}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPaymentsContent;
