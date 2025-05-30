
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const CreditCardForm: React.FC = () => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  return (
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
  );
};

export default CreditCardForm;
