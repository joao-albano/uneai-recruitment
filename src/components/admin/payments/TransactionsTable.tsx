
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Search, ArrowUpDown, CreditCard, DollarSign, Filter } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

interface Payment {
  id: string;
  customer: string;
  email: string;
  date: Date;
  amount: string;
  plan: string;
  status: string;
  method: string;
}

interface TransactionsTableProps {
  payments: Payment[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterPeriod: string;
  setFilterPeriod: (period: string) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ 
  payments, 
  searchTerm, 
  setSearchTerm, 
  filterPeriod, 
  setFilterPeriod 
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  const dateLocale = isPtBR ? ptBR : enUS;
  
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

  return (
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
  );
};

export default TransactionsTable;
