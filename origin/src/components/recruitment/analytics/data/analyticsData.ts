
import { v4 as uuidv4 } from 'uuid';

// Dados gerais de analíticos
export const overviewData = {
  totalLeads: 1248,
  leadsGrowth: 15.3,
  conversionRate: 22.8,
  conversionGrowth: 3.4,
  totalMatriculas: 285,
  matriculasGrowth: 8.7,
  averageCost: 42.5,
  costReduction: 6.2,
  leadsPerDay: [
    { day: '01/04', leads: 35 },
    { day: '02/04', leads: 38 },
    { day: '03/04', leads: 42 },
    { day: '04/04', leads: 50 },
    { day: '05/04', leads: 55 },
    { day: '06/04', leads: 48 },
    { day: '07/04', leads: 40 },
    { day: '08/04', leads: 52 }
  ],
  conversionBySource: [
    { source: 'WhatsApp', rate: 26.5 },
    { source: 'Facebook', rate: 18.3 },
    { source: 'Instagram', rate: 21.7 },
    { source: 'Google', rate: 24.8 },
    { source: 'Indicação', rate: 32.4 },
    { source: 'Eventos', rate: 28.9 }
  ],
  recentCampaigns: [
    {
      id: uuidv4(),
      name: 'Vestibular 2024.2',
      status: 'active',
      leads: 325,
      conversion: 23.7,
      cost: 9850,
      roi: 3.2
    },
    {
      id: uuidv4(),
      name: 'Pós-Graduação Especializações',
      status: 'active',
      leads: 218,
      conversion: 19.5,
      cost: 7200,
      roi: 2.8
    },
    {
      id: uuidv4(),
      name: 'Feira de Profissões',
      status: 'completed',
      leads: 180,
      conversion: 26.8,
      cost: 5400,
      roi: 4.1
    },
    {
      id: uuidv4(),
      name: 'Black Friday Educacional',
      status: 'completed',
      leads: 420,
      conversion: 31.2,
      cost: 12500,
      roi: 3.7
    }
  ]
};

// Dados detalhados de leads
export const leadsData = {
  leadsByStatus: [
    { status: 'Novo', count: 285, percentage: 22.8 },
    { status: 'Contatado', count: 420, percentage: 33.7 },
    { status: 'Qualificado', count: 315, percentage: 25.2 },
    { status: 'Agendado', count: 152, percentage: 12.2 },
    { status: 'Perdido', count: 76, percentage: 6.1 }
  ],
  leadsBySource: [
    { source: 'WhatsApp', count: 385, percentage: 30.8 },
    { source: 'Facebook', count: 245, percentage: 19.6 },
    { source: 'Instagram', count: 198, percentage: 15.9 },
    { source: 'Google', count: 220, percentage: 17.6 },
    { source: 'Indicação', count: 120, percentage: 9.6 },
    { source: 'Eventos', count: 80, percentage: 6.5 }
  ],
  leadsByCourse: [
    { course: 'Administração', count: 230, percentage: 18.4 },
    { course: 'Direito', count: 285, percentage: 22.8 },
    { course: 'Medicina', count: 175, percentage: 14.0 },
    { course: 'Engenharia Civil', count: 145, percentage: 11.6 },
    { course: 'Psicologia', count: 210, percentage: 16.8 },
    { course: 'Outros', count: 203, percentage: 16.4 }
  ],
  leadTimeSeries: [
    { month: 'Jan', count: 780 },
    { month: 'Fev', count: 820 },
    { month: 'Mar', count: 950 },
    { month: 'Abr', count: 1248 },
    { month: 'Mai', count: 0 },
    { month: 'Jun', count: 0 },
    { month: 'Jul', count: 0 },
    { month: 'Ago', count: 0 },
    { month: 'Set', count: 0 },
    { month: 'Out', count: 0 },
    { month: 'Nov', count: 0 },
    { month: 'Dez', count: 0 }
  ],
  leadQuality: {
    excellent: 312,
    good: 498,
    average: 280,
    poor: 158
  }
};

// Dados de conversão
export const conversionData = {
  funnelStages: [
    { stage: 'Leads Gerados', count: 1248, percentage: 100 },
    { stage: 'Leads Qualificados', count: 735, percentage: 58.9 },
    { stage: 'Agendamentos', count: 472, percentage: 37.8 },
    { stage: 'Visitas', count: 380, percentage: 30.5 },
    { stage: 'Matrículas', count: 285, percentage: 22.8 }
  ],
  conversionByCourse: [
    { course: 'Administração', rate: 19.7 },
    { course: 'Direito', rate: 25.8 },
    { course: 'Medicina', rate: 30.2 },
    { course: 'Engenharia Civil', rate: 18.5 },
    { course: 'Psicologia', rate: 24.3 },
    { course: 'Outros', rate: 17.9 }
  ],
  conversionBySource: [
    { source: 'WhatsApp', rate: 26.5 },
    { source: 'Facebook', rate: 18.3 },
    { source: 'Instagram', rate: 21.7 },
    { source: 'Google', rate: 24.8 },
    { source: 'Indicação', rate: 32.4 },
    { source: 'Eventos', rate: 28.9 }
  ],
  conversionOverTime: [
    { month: 'Jan', rate: 18.2 },
    { month: 'Fev', rate: 19.5 },
    { month: 'Mar', rate: 21.3 },
    { month: 'Abr', rate: 22.8 },
    { month: 'Mai', rate: 0 },
    { month: 'Jun', rate: 0 },
    { month: 'Jul', rate: 0 },
    { month: 'Ago', rate: 0 },
    { month: 'Set', rate: 0 },
    { month: 'Out', rate: 0 },
    { month: 'Nov', rate: 0 },
    { month: 'Dez', rate: 0 }
  ],
  bottlenecks: [
    { stage: 'Lead para Qualificado', dropoff: 41.1, reason: 'Demora no contato inicial' },
    { stage: 'Qualificado para Agendado', dropoff: 21.1, reason: 'Indisponibilidade de horários' },
    { stage: 'Agendado para Visita', dropoff: 7.3, reason: 'Desistência antes da visita' },
    { stage: 'Visita para Matrícula', dropoff: 7.7, reason: 'Questões financeiras' }
  ]
};

// Dados de canais
export const channelsData = {
  channelPerformance: [
    { 
      name: 'WhatsApp', 
      leads: 385, 
      cost: 9625,
      costPerLead: 25.0,
      conversion: 26.5,
      roi: 3.8,
      growth: 18.4
    },
    { 
      name: 'Facebook', 
      leads: 245, 
      cost: 8575,
      costPerLead: 35.0,
      conversion: 18.3,
      roi: 2.2,
      growth: 10.2
    },
    { 
      name: 'Instagram', 
      leads: 198, 
      cost: 6930,
      costPerLead: 35.0,
      conversion: 21.7,
      roi: 2.6,
      growth: 23.7
    },
    { 
      name: 'Google', 
      leads: 220, 
      cost: 11000,
      costPerLead: 50.0,
      conversion: 24.8,
      roi: 2.9,
      growth: 14.6
    },
    { 
      name: 'Indicação', 
      leads: 120, 
      cost: 1800,
      costPerLead: 15.0,
      conversion: 32.4,
      roi: 5.8,
      growth: 8.3
    },
    { 
      name: 'Eventos', 
      leads: 80, 
      cost: 5600,
      costPerLead: 70.0,
      conversion: 28.9,
      roi: 2.1,
      growth: 5.6
    }
  ],
  weeklyDistribution: [
    { day: 'Seg', whatsapp: 55, facebook: 35, instagram: 28, google: 32 },
    { day: 'Ter', whatsapp: 60, facebook: 38, instagram: 30, google: 35 },
    { day: 'Qua', whatsapp: 58, facebook: 36, instagram: 25, google: 30 },
    { day: 'Qui', whatsapp: 65, facebook: 42, instagram: 32, google: 36 },
    { day: 'Sex', whatsapp: 70, facebook: 45, instagram: 35, google: 40 },
    { day: 'Sáb', whatsapp: 45, facebook: 28, instagram: 25, google: 28 },
    { day: 'Dom', whatsapp: 32, facebook: 21, instagram: 23, google: 19 }
  ],
  channelDistribution: [
    { name: 'WhatsApp', value: 385, percentage: 30.8, color: '#25D366' },
    { name: 'Facebook', value: 245, percentage: 19.6, color: '#1877F2' },
    { name: 'Instagram', value: 198, percentage: 15.9, color: '#E1306C' },
    { name: 'Google', value: 220, percentage: 17.6, color: '#4285F4' },
    { name: 'Indicação', value: 120, percentage: 9.6, color: '#8B5CF6' },
    { name: 'Eventos', value: 80, percentage: 6.5, color: '#F59E0B' }
  ]
};
