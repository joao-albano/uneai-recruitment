
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/context/ThemeContext';

interface PlanDistribution {
  plan: string;
  count: number;
  percentage: string;
}

interface SubscriptionsSummaryProps {
  subscriptionsByPlan: PlanDistribution[];
}

const SubscriptionsSummary: React.FC<SubscriptionsSummaryProps> = ({ subscriptionsByPlan }) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  return (
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
  );
};

export default SubscriptionsSummary;
