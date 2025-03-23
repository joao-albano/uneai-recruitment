
import { useTheme } from '@/context/ThemeContext';

export interface PlanOption {
  id: string;
  name: string;
  price: string;
  description: string;
}

export const usePlanOptions = () => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  // Data for available plans
  const availablePlans: PlanOption[] = [
    {
      id: 'basic',
      name: isPtBR ? 'Básico' : 'Basic',
      price: isPtBR ? 'R$ 2.990,00/ano' : '$2,990.00/year',
      description: isPtBR ? 'Até 500 alunos' : 'Up to 500 students',
    },
    {
      id: 'premium',
      name: 'Premium',
      price: isPtBR ? 'R$ 5.990,00/ano' : '$5,990.00/year',
      description: isPtBR ? 'Até 1500 alunos' : 'Up to 1500 students',
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: isPtBR ? 'R$ 9.990,00/ano' : '$9,990.00/year',
      description: isPtBR ? 'Alunos ilimitados' : 'Unlimited students',
    }
  ];

  return availablePlans;
};
