
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';

interface BillingToggleProps {
  yearlyBilling: boolean;
  onToggleBilling: () => void;
}

const BillingToggle: React.FC<BillingToggleProps> = ({ 
  yearlyBilling, 
  onToggleBilling 
}) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center gap-2">
        <Label htmlFor="billing-toggle" className={cn("text-sm", !yearlyBilling && "font-medium")}>
          {isPtBR ? 'Mensal' : 'Monthly'}
        </Label>
        <Switch
          id="billing-toggle"
          checked={yearlyBilling}
          onCheckedChange={onToggleBilling}
        />
        <Label htmlFor="billing-toggle" className={cn("text-sm", yearlyBilling && "font-medium")}>
          {isPtBR ? 'Anual (2 meses grátis)' : 'Yearly (2 months free)'}
        </Label>
      </div>
    </div>
  );
};

export default BillingToggle;
