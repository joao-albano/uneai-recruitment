
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

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

  const finalPrice = yearlyBilling ? plan.priceYearly : plan.priceMonthly;
  
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
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {isPtBR ? 'Plano selecionado:' : 'Selected plan:'}
              </span>
              <span className="font-medium">{plan.name}</span>
            </div>
            
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">
                {isPtBR ? 'Período de cobrança:' : 'Billing period:'}
              </span>
              <span className="font-medium">
                {yearlyBilling 
                  ? (isPtBR ? 'Anual' : 'Yearly') 
                  : (isPtBR ? 'Mensal' : 'Monthly')}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {isPtBR ? 'Valor total:' : 'Total amount:'}
              </span>
              <span className="font-bold">
                {isPtBR ? `R$ ${finalPrice.toFixed(2)}` : `$${finalPrice.toFixed(2)}`}
              </span>
            </div>
          </div>
          
          <Separator className="my-4" />
          
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
          
          {paymentMethod === 'credit-card' && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="card-name">
                  {isPtBR ? 'Nome no Cartão' : 'Cardholder Name'}
                </Label>
                <Input id="card-name" placeholder="Ex. João Silva" required />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="card-number">
                  {isPtBR ? 'Número do Cartão' : 'Card Number'}
                </Label>
                <Input 
                  id="card-number" 
                  placeholder="0000 0000 0000 0000" 
                  required 
                  inputMode="numeric"
                  pattern="[0-9\s]{13,19}"
                  maxLength={19}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry">
                    {isPtBR ? 'Validade' : 'Expiry Date'}
                  </Label>
                  <Input 
                    id="expiry" 
                    placeholder="MM/AA" 
                    required 
                    maxLength={5}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    placeholder="123" 
                    required 
                    inputMode="numeric"
                    pattern="[0-9]{3,4}"
                    maxLength={4}
                  />
                </div>
              </div>
            </div>
          )}
          
          {paymentMethod === 'bank-transfer' && (
            <div className="p-4 bg-muted rounded-md space-y-2">
              <p className="font-medium">
                {isPtBR ? 'Dados para Transferência' : 'Bank Transfer Details'}
              </p>
              <div className="text-sm">
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">
                    {isPtBR ? 'Banco:' : 'Bank:'}
                  </span>
                  <span>Banco Exemplo</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">
                    {isPtBR ? 'Agência:' : 'Branch:'}
                  </span>
                  <span>1234-5</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">
                    {isPtBR ? 'Conta:' : 'Account:'}
                  </span>
                  <span>12345-6</span>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <span className="text-muted-foreground">
                    {isPtBR ? 'CNPJ:' : 'Tax ID:'}
                  </span>
                  <span>12.345.678/0001-90</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {isPtBR 
                  ? 'Após realizar a transferência, envie o comprovante para finance@example.com'
                  : 'After completing the transfer, please send proof of payment to finance@example.com'}
              </p>
            </div>
          )}
          
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
