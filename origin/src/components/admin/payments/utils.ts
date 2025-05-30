
import { format, subDays, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR, enUS } from 'date-fns/locale';

export interface Payment {
  id: string;
  customer: string;
  email: string;
  date: Date;
  amount: string;
  plan: string;
  status: string;
  method: string;
}

export const getFilteredTitle = (filterPeriod: string, isPtBR: boolean) => {
  switch (filterPeriod) {
    case 'week':
      return isPtBR ? 'Últimos 7 dias' : 'Last 7 days';
    case 'month':
      return isPtBR ? 'Este mês' : 'This month';
    case 'quarter':
      return isPtBR ? 'Último trimestre' : 'Last quarter';
    case 'year':
      return isPtBR ? 'Este ano' : 'This year';
    default:
      return isPtBR ? 'Este mês' : 'This month';
  }
};

// Mock data for revenue stats
export const getRevenueStats = (isPtBR: boolean) => ({
  totalRevenue: isPtBR ? 'R$ 47.890,00' : '$47,890.00',
  monthlyRevenue: isPtBR ? 'R$ 12.476,00' : '$12,476.00',
  activeSubscriptions: 48,
  averageValue: isPtBR ? 'R$ 598,00' : '$598.00',
  growthRate: '+18.5%'
});

// Mock data for payments with more entries for pagination testing
export const getMockPayments = (isPtBR: boolean): Payment[] => [
  {
    id: 'PAY-001',
    customer: 'Escola Santa Maria',
    email: 'financeiro@santamaria.edu',
    date: new Date(2024, 2, 15),
    amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
    plan: 'Premium',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'PAY-002',
    customer: 'Colégio Futuro',
    email: 'admin@colegiofuturo.edu',
    date: new Date(2024, 2, 12),
    amount: isPtBR ? 'R$ 9.990,00' : '$9,990.00',
    plan: 'Enterprise',
    status: 'completed',
    method: 'bank_transfer'
  },
  {
    id: 'PAY-003',
    customer: 'Instituto Nova Era',
    email: 'financas@novaera.edu',
    date: new Date(2024, 2, 10),
    amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
    plan: 'Premium',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'PAY-004',
    customer: 'Escola Primavera',
    email: 'contato@primavera.edu',
    date: new Date(2024, 2, 5),
    amount: isPtBR ? 'R$ 2.990,00' : '$2,990.00',
    plan: 'Basic',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'PAY-005',
    customer: 'Colégio Horizonte',
    email: 'adm@colegiohorizonte.edu',
    date: new Date(2024, 2, 1),
    amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
    plan: 'Premium',
    status: 'pending',
    method: 'bank_transfer'
  },
  {
    id: 'PAY-006',
    customer: 'Escola Montessori',
    email: 'financeiro@montessori.edu',
    date: new Date(2024, 1, 28),
    amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
    plan: 'Premium',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'PAY-007',
    customer: 'Colégio São Francisco',
    email: 'contato@saofrancisco.edu',
    date: new Date(2024, 1, 25),
    amount: isPtBR ? 'R$ 2.990,00' : '$2,990.00',
    plan: 'Basic',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'PAY-008',
    customer: 'Instituto Educacional Alvorada',
    email: 'financeiro@alvorada.edu',
    date: new Date(2024, 1, 20),
    amount: isPtBR ? 'R$ 9.990,00' : '$9,990.00',
    plan: 'Enterprise',
    status: 'completed',
    method: 'bank_transfer'
  },
  {
    id: 'PAY-009',
    customer: 'Escola Nova Geração',
    email: 'adm@novageracao.edu',
    date: new Date(2024, 1, 15),
    amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
    plan: 'Premium',
    status: 'failed',
    method: 'credit_card'
  },
  {
    id: 'PAY-010',
    customer: 'Colégio Integrado',
    email: 'financeiro@integrado.edu',
    date: new Date(2024, 1, 10),
    amount: isPtBR ? 'R$ 2.990,00' : '$2,990.00',
    plan: 'Basic',
    status: 'completed',
    method: 'credit_card'
  },
  {
    id: 'PAY-011',
    customer: 'Academia de Ensino',
    email: 'contato@academiaensino.edu',
    date: new Date(2024, 1, 5),
    amount: isPtBR ? 'R$ 5.990,00' : '$5,990.00',
    plan: 'Premium',
    status: 'completed',
    method: 'bank_transfer'
  },
  {
    id: 'PAY-012',
    customer: 'Instituto Educacional Estrela',
    email: 'financeiro@estrela.edu',
    date: new Date(2024, 0, 28),
    amount: isPtBR ? 'R$ 9.990,00' : '$9,990.00',
    plan: 'Enterprise',
    status: 'completed',
    method: 'credit_card'
  }
];

// Mock data for subscriptions by plan
export const getSubscriptionsByPlan = () => [
  { plan: 'Basic', count: 12, percentage: '25%' },
  { plan: 'Premium', count: 28, percentage: '58%' },
  { plan: 'Enterprise', count: 8, percentage: '17%' }
];
