
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CreditCard, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentMethodSelectorProps {
  paymentMethod: 'credit-card' | 'bank-transfer';
  setPaymentMethod: React.Dispatch<React.SetStateAction<'credit-card' | 'bank-transfer'>>;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
  paymentMethod, 
  setPaymentMethod 
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  return (
    <div className="mb-4">
      <Label className="text-base">
        {isPtBR ? 'Método de Pagamento' : 'Payment Method'}
      </Label>
      
      <div className="grid grid-cols-2 gap-4 mt-2">
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-20 flex flex-col items-center justify-center gap-1",
            paymentMethod === 'credit-card' && "border-primary bg-primary/5"
          )}
          onClick={() => setPaymentMethod('credit-card')}
        >
          <CreditCard className="h-6 w-6" />
          <span>{isPtBR ? 'Cartão de Crédito' : 'Credit Card'}</span>
        </Button>
        
        <Button
          type="button"
          variant="outline"
          className={cn(
            "h-20 flex flex-col items-center justify-center gap-1",
            paymentMethod === 'bank-transfer' && "border-primary bg-primary/5"
          )}
          onClick={() => setPaymentMethod('bank-transfer')}
        >
          <DollarSign className="h-6 w-6" />
          <span>{isPtBR ? 'Transferência Bancária' : 'Bank Transfer'}</span>
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
