
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { format } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

const InvoiceHistory: React.FC = () => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  const dateLocale = isPtBR ? ptBR : enUS;
  
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
  );
};

export default InvoiceHistory;
