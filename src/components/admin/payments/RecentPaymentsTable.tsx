
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
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

interface RecentPaymentsTableProps {
  payments: Payment[];
  filteredTitle: string;
}

const RecentPaymentsTable: React.FC<RecentPaymentsTableProps> = ({ payments, filteredTitle }) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isPtBR ? 'Pagamentos Recentes' : 'Recent Payments'}
        </CardTitle>
        <CardDescription>
          {filteredTitle}
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
  );
};

export default RecentPaymentsTable;
