
import { create } from 'zustand';
import { useTheme } from '@/context/ThemeContext';
import { ProductType } from '@/context/ProductContext';

export interface PlanOption {
  id: string;
  name: string;
  price: string;
  description: string;
  relatedProduct?: string;
  features?: string[];
  products?: ProductType[];
  limits?: {
    students?: number;
    users?: number;
    whatsappMessages?: number;
    callMinutes?: number;
    aiAnalyses?: number;
    imports?: number;
  };
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
    description: isPtBR ? 'Para instituições pequenas' : 'For small institutions',
    relatedProduct: 'retention',
    features: [
      isPtBR ? 'Monitoramento básico' : 'Basic monitoring',
      isPtBR ? 'Alertas de risco' : 'Risk alerts',
      isPtBR ? 'Suporte por email' : 'Email support'
    ],
    products: ['retention'],
    limits: {
      students: 500,
      users: 3,
      whatsappMessages: 1000,
      callMinutes: 100,
      aiAnalyses: 50,
      imports: 5
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: isPtBR ? 'R$ 5.990,00/ano' : '$5,990.00/year',
    description: isPtBR ? 'Para instituições médias' : 'For medium institutions',
    relatedProduct: 'retention',
    features: [
      isPtBR ? 'Monitoramento avançado' : 'Advanced monitoring',
      isPtBR ? 'Alertas em tempo real' : 'Real-time alerts',
      isPtBR ? 'Suporte prioritário' : 'Priority support',
      isPtBR ? 'Relatórios detalhados' : 'Detailed reports'
    ],
    products: ['retention', 'scheduling'],
    limits: {
      students: 1500,
      users: 10,
      whatsappMessages: 5000,
      callMinutes: 500,
      aiAnalyses: 200,
      imports: 20
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: isPtBR ? 'R$ 9.990,00/ano' : '$9,990.00/year',
    description: isPtBR ? 'Para grandes instituições' : 'For large institutions',
    relatedProduct: 'retention',
    features: [
      isPtBR ? 'Todos os recursos premium' : 'All premium features',
      isPtBR ? 'Alunos ilimitados' : 'Unlimited students',
      isPtBR ? 'API personalizada' : 'Custom API access',
      isPtBR ? 'Suporte dedicado' : 'Dedicated support',
      isPtBR ? 'Consultoria estratégica' : 'Strategic consulting'
    ],
    products: ['retention', 'scheduling', 'sales', 'recruitment', 'secretary', 'pedagogical'],
    limits: {
      students: -1, // Unlimited
      users: 30,
      whatsappMessages: 20000,
      callMinutes: 2000,
      aiAnalyses: 1000,
      imports: 100
    }
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
      ? (isPtBR ? 'Para instituições pequenas' : 'For small institutions')
      : (plan.id === 'premium' 
          ? (isPtBR ? 'Para instituições médias' : 'For medium institutions')
          : (isPtBR ? 'Para grandes instituições' : 'For large institutions'))
  }));
};
