
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const BillingHeader: React.FC = () => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';

  return (
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
  );
};

export default BillingHeader;
