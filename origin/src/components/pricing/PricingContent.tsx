
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import PricingPlans from './PricingPlans';
import PaymentFAQ from './PaymentFAQ';

const PricingContent: React.FC = () => {
  const { language } = useTheme();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          {language === 'pt-BR' ? 'Planos e Preços' : 'Plans and Pricing'}
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {language === 'pt-BR' 
            ? 'Escolha o plano ideal para sua instituição e desbloqueie todo o potencial do sistema.'
            : 'Choose the ideal plan for your institution and unlock the full potential of the system.'}
        </p>
      </div>

      <PricingPlans />
      
      <div className="mt-24">
        <PaymentFAQ />
      </div>
    </div>
  );
};

export default PricingContent;
