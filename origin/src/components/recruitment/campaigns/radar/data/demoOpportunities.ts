
import { OpportunityItem } from '@/types/recruitment';

export const demoOpportunities: OpportunityItem[] = [
  {
    id: '1',
    name: 'Medicina Veterinária',
    title: 'Medicina Veterinária',
    type: 'course',
    count: 32,
    urgency: 'high',
    trend: 'up',
    trendPercentage: 24,
    description: 'Interesse elevado em Medicina Veterinária, mas não temos o curso',
    suggestedAction: 'Parceria com faculdade de veterinária para curso de extensão',
    impact: 8
  },
  {
    id: '2',
    name: 'Zona Leste',
    title: 'Zona Leste',
    type: 'location',
    count: 45,
    urgency: 'medium',
    trend: 'up',
    trendPercentage: 15,
    description: 'Muitos leads da Zona Leste com dificuldade de deslocamento',
    suggestedAction: 'Oferecer transporte escolar ou aulas híbridas',
    impact: 6
  },
  {
    id: '3',
    name: 'Inteligência Artificial',
    title: 'Inteligência Artificial',
    type: 'interest',
    count: 28,
    urgency: 'high',
    trend: 'up',
    trendPercentage: 38,
    description: 'Alto interesse em tecnologias de IA como complemento curricular',
    impact: 7
  },
  {
    id: '4',
    name: 'Valor de Mensalidade',
    title: 'Valor de Mensalidade',
    type: 'interest',
    count: 67,
    urgency: 'high',
    trend: 'stable',
    trendPercentage: 3,
    description: 'Preocupação com valores das mensalidades',
    suggestedAction: 'Criar campanha de bolsas parciais ou opções de financiamento',
    impact: 9
  },
  {
    id: '5',
    name: 'Modalidade EAD',
    title: 'Modalidade EAD',
    type: 'interest',
    count: 23,
    urgency: 'medium',
    trend: 'up',
    trendPercentage: 12,
    description: 'Interesse em modalidade 100% EAD para cursos presenciais',
    impact: 5
  }
];
