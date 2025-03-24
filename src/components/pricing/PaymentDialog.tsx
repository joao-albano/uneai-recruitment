
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import PaymentSummary from './payment/PaymentSummary';
import PaymentMethodSelector from './payment/PaymentMethodSelector';
import CreditCardForm from './payment/CreditCardForm';
import BankTransferDetails from './payment/BankTransferDetails';

type Plan = {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  features: { included: boolean; text: string }[];
  highlightPlan?: boolean;
};

type PaymentDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: Plan | null;
  yearlyBilling: boolean;
};

const PaymentDialog: React.FC<PaymentDialogProps> = ({ 
  open, 
  onOpenChange, 
  plan, 
  yearlyBilling 
}) => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState<'credit-card' | 'bank-transfer'>('credit-card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const isPtBR = language === 'pt-BR';

  if (!plan) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      
      toast({
        title: isPtBR ? 'Pagamento processado com sucesso!' : 'Payment processed successfully!',
        description: isPtBR 
          ? `Você assinou o plano ${plan.name}. Um e-mail de confirmação foi enviado.` 
          : `You have subscribed to the ${plan.name} plan. A confirmation email has been sent.`,
      });
    }, 2000);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isPtBR ? 'Finalizar Assinatura' : 'Complete Subscription'}
          </DialogTitle>
          <DialogDescription>
            {isPtBR 
              ? `Você está assinando o plano ${plan.name}` 
              : `You are subscribing to the ${plan.name} plan`}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <PaymentSummary plan={plan} yearlyBilling={yearlyBilling} />
          
          <PaymentMethodSelector 
            paymentMethod={paymentMethod} 
            setPaymentMethod={setPaymentMethod} 
          />
          
          {paymentMethod === 'credit-card' && <CreditCardForm />}
          
          {paymentMethod === 'bank-transfer' && <BankTransferDetails />}
          
          <DialogFooter className="mt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              {isPtBR ? 'Cancelar' : 'Cancel'}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? (isPtBR ? 'Processando...' : 'Processing...') 
                : (isPtBR ? 'Confirmar Pagamento' : 'Confirm Payment')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
