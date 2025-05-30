
import { Funnel, FunnelStage } from '@/types/recruitment';

// Sample stages for different funnels
export const sampleStages1: FunnelStage[] = [
  {
    id: '1',
    name: 'Lead Gerado',
    order: 1,
    description: 'Lead captado através de diversos canais',
    isActive: true,
    leadCount: 520,
    conversionRate: 75,
    expectedDuration: 2,
    subStages: []
  },
  {
    id: '2',
    name: 'Primeiro Contato',
    order: 2,
    description: 'Primeiro contato realizado com o lead',
    isActive: true,
    leadCount: 390,
    conversionRate: 64,
    expectedDuration: 3,
    subStages: [
      {
        id: '2-1',
        name: 'Material Enviado',
        order: 1,
        description: 'Material informativo enviado ao lead',
        isActive: true,
        leadCount: 210,
        conversionRate: 85,
        expectedDuration: 1,
        parentId: '2',
        isSubStage: true
      },
      {
        id: '2-2',
        name: 'Analisando Proposta',
        order: 2,
        description: 'Lead está analisando a proposta enviada',
        isActive: true,
        leadCount: 180,
        conversionRate: 78,
        expectedDuration: 2,
        parentId: '2',
        isSubStage: true
      }
    ]
  },
  {
    id: '3',
    name: 'Apresentação',
    order: 3,
    description: 'Apresentação do produto/serviço ao lead',
    isActive: true,
    leadCount: 150,
    conversionRate: 80,
    expectedDuration: 4,
    subStages: []
  },
  {
    id: '4',
    name: 'Visita',
    order: 4,
    description: 'Visita agendada com o lead',
    isActive: true,
    leadCount: 120,
    conversionRate: 85,
    expectedDuration: 5,
    subStages: []
  },
  {
    id: '5',
    name: 'Matrícula',
    order: 5,
    description: 'Lead realizou a matrícula',
    isActive: true,
    leadCount: 100,
    conversionRate: 90,
    expectedDuration: 1,
    subStages: []
  }
];

export const sampleStages2: FunnelStage[] = [
  {
    id: '1',
    name: 'Prospecção',
    order: 1,
    description: 'Identificação e qualificação de potenciais clientes',
    isActive: true,
    leadCount: 350,
    conversionRate: 60,
    expectedDuration: 5,
    subStages: []
  },
  {
    id: '2',
    name: 'Diagnóstico',
    order: 2,
    description: 'Análise das necessidades do cliente',
    isActive: true,
    leadCount: 210,
    conversionRate: 70,
    expectedDuration: 3,
    subStages: []
  },
  {
    id: '3',
    name: 'Proposta Comercial',
    order: 3,
    description: 'Elaboração e envio da proposta',
    isActive: true,
    leadCount: 150,
    conversionRate: 75,
    expectedDuration: 4,
    subStages: [
      {
        id: '3-1',
        name: 'Em Análise',
        order: 1,
        description: 'Cliente está analisando a proposta',
        isActive: true,
        leadCount: 120,
        conversionRate: 85,
        expectedDuration: 3,
        parentId: '3',
        isSubStage: true
      },
      {
        id: '3-2',
        name: 'Negociação',
        order: 2,
        description: 'Fase de negociação de valores e condições',
        isActive: true,
        leadCount: 100,
        conversionRate: 70,
        expectedDuration: 4,
        parentId: '3',
        isSubStage: true
      }
    ]
  },
  {
    id: '4',
    name: 'Fechamento',
    order: 4,
    description: 'Fechamento do negócio e assinatura de contrato',
    isActive: true,
    leadCount: 90,
    conversionRate: 95,
    expectedDuration: 2,
    subStages: []
  }
];

// Initial sample data for funnels
export const initialFunnels: Funnel[] = [
  {
    id: '1',
    name: 'Funil de Captação Padrão',
    description: 'Processo de captação de alunos para matrícula',
    isActive: true,
    stages: sampleStages1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Funil de Vendas Corporativas',
    description: 'Processo de venda para empresas e parcerias',
    isActive: true,
    stages: sampleStages2,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(), // 30 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()   // 2 days ago
  }
];

// Default empty stage template to add to new funnels
export const defaultEmptyStage: FunnelStage = {
  id: 'initial-stage',
  name: 'Nova Etapa',
  order: 1,
  description: 'Configure esta etapa inicial do funil',
  isActive: true,
  leadCount: 0,
  conversionRate: 0,
  expectedDuration: 1,
  subStages: []
};
