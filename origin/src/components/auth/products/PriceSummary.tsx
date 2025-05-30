
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from './productData';

interface PriceSummaryProps {
  totalPrice: number;
}

const PriceSummary: React.FC<PriceSummaryProps> = ({ totalPrice }) => {
  if (totalPrice === 0) return null;
  
  return (
    <Card className="bg-secondary/20 border border-primary/20">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total selecionado:</span>
            <span className="font-bold text-lg">{formatCurrency(totalPrice)}/mês</span>
          </div>
          <p className="text-sm text-muted-foreground">
            A cobrança só ocorrerá após o período de teste de 14 dias.
            Você poderá cancelar a qualquer momento durante o período de teste.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceSummary;
