
import { create } from 'zustand';
import { useTheme } from '@/context/ThemeContext';

export interface PlanOption {
  id: string;
  name: string;
  price: string;
  description: string;
}

interface PlanOptionsStore {
  plans: PlanOption[];
  setPlan: (id: string, updatedPlan: Partial<PlanOption>) => void;
  resetToDefaults: () => void;
}

const getDefaultPlans = (isPtBR: boolean): PlanOption[] => [
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

// Create a store to manage plan options
export const usePlanOptionsStore = create<PlanOptionsStore>((set) => {
  // Initialize with default values
  const storedPlans = typeof window !== 'undefined' ? localStorage.getItem('planOptions') : null;
  const initialPlans = storedPlans ? JSON.parse(storedPlans) : getDefaultPlans(false);
  
  return {
    plans: initialPlans,
    setPlan: (id, updatedPlan) => {
      set((state) => {
        const updatedPlans = state.plans.map(plan => 
          plan.id === id ? { ...plan, ...updatedPlan } : plan
        );
        
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('planOptions', JSON.stringify(updatedPlans));
        }
        
        return { plans: updatedPlans };
      });
    },
    resetToDefaults: () => {
      const isPtBR = document.documentElement.lang === 'pt-BR';
      const defaultPlans = getDefaultPlans(isPtBR);
      if (typeof window !== 'undefined') {
        localStorage.setItem('planOptions', JSON.stringify(defaultPlans));
      }
      set({ plans: defaultPlans });
    }
  };
});

export const usePlanOptions = (): PlanOption[] => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  const { plans } = usePlanOptionsStore();
  
  // If the language changes, we need to update the plan names and prices
  // This ensures we still have the right language without modifying the store
  return plans.map(plan => ({
    ...plan,
    name: plan.id === 'basic' ? (isPtBR ? 'Básico' : 'Basic') : plan.name,
    price: plan.price.includes('R$') !== isPtBR 
      ? (isPtBR 
          ? plan.price.replace('$', 'R$ ').replace('.', ',') 
          : plan.price.replace('R$ ', '$').replace(',', '.'))
      : plan.price,
    description: plan.id === 'basic' 
      ? (isPtBR ? 'Até 500 alunos' : 'Up to 500 students')
      : (plan.id === 'premium' 
          ? (isPtBR ? 'Até 1500 alunos' : 'Up to 1500 students')
          : (isPtBR ? 'Alunos ilimitados' : 'Unlimited students'))
  }));
};
