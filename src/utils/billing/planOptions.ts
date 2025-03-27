
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
    price: isPtBR ? 'R$ 249,00/ano' : '$249.00/year',
    description: isPtBR ? 'Para instituições pequenas' : 'For small institutions',
    relatedProduct: 'retention',
    features: [
      isPtBR ? 'Manual' : 'Manual',
      isPtBR ? 'Suporte' : 'Support'
    ],
    products: ['retention', 'sales'],
    limits: {
      students: 500,
      users: 4,
      whatsappMessages: 1000,
      callMinutes: 100,
      aiAnalyses: 50,
      imports: 5000
    }
  },
  {
    id: 'premium',
    name: 'Premium',
    price: isPtBR ? 'R$ 499,00/ano' : '$499.00/year',
    description: isPtBR ? 'Para instituições médias' : 'For medium institutions',
    relatedProduct: 'retention',
    features: [
      isPtBR ? 'Recursos' : 'Resources',
      isPtBR ? 'API' : 'API',
      isPtBR ? 'WhatsApp Business' : 'WhatsApp Business',
      isPtBR ? 'Ligações inteligentes' : 'Smart calls'
    ],
    products: ['retention', 'scheduling', 'sales'],
    limits: {
      students: 1500,
      users: 50,
      whatsappMessages: 5000,
      callMinutes: 500,
      aiAnalyses: 200,
      imports: 12000
    }
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: isPtBR ? 'R$ 999,00/ano' : '$999.00/year',
    description: isPtBR ? 'Para grandes instituições' : 'For large institutions',
    relatedProduct: 'retention',
    features: [
      isPtBR ? 'APIs' : 'APIs',
      isPtBR ? 'Suporte' : 'Support',
      isPtBR ? 'Canal de vendas' : 'Sales channel'
    ],
    products: ['retention', 'scheduling', 'sales', 'recruitment', 'secretary', 'pedagogical'],
    limits: {
      students: -1, // Unlimited
      users: 100,
      whatsappMessages: 20000,
      callMinutes: 2000,
      aiAnalyses: 1000,
      imports: 25000
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
    price: plan.id === 'basic'
      ? (isPtBR ? 'R$ 249,00/ano' : '$249.00/year')
      : (plan.id === 'premium'
          ? (isPtBR ? 'R$ 499,00/ano' : '$499.00/year')
          : (isPtBR ? 'R$ 999,00/ano' : '$999.00/year')),
    description: plan.id === 'basic' 
      ? (isPtBR ? 'Para instituições pequenas' : 'For small institutions')
      : (plan.id === 'premium' 
          ? (isPtBR ? 'Para instituições médias' : 'For medium institutions')
          : (isPtBR ? 'Para grandes instituições' : 'For large institutions'))
  }));
};
