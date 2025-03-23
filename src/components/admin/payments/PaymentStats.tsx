
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, LineChart, Users, Calendar } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface PaymentStatsProps {
  revenueStats: {
    totalRevenue: string;
    monthlyRevenue: string;
    activeSubscriptions: number;
    averageValue: string;
    growthRate: string;
  };
}

const PaymentStats: React.FC<PaymentStatsProps> = ({ revenueStats }) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  return (
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
  );
};

export default PaymentStats;
