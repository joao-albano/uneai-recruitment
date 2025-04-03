import { format, subDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Generate mock lead data
export const mockLeadsData = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '(11) 98765-4321',
    course: 'Ensino Fundamental',
    children: 2,
    _childrenData: [
      {
        name: 'Pedro Silva',
        age: '8',
        grade: '3º ano'
      },
      {
        name: 'Maria Silva',
        age: '10',
        grade: '5º ano'
      }
    ],
    channel: 'Site',
    stage: 'Contato Inicial',
    status: 'Novo',
    createdAt: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    notes: 'Interessado no programa bilíngue para os filhos.',
    enrollmentIntention: 'alta',
    contactTime: 'manha'
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    email: 'maria.oliveira@example.com',
    phone: '(11) 91234-5678',
    course: 'Educação Infantil',
    children: 1,
    _childrenData: [
      {
        name: 'Sofia Oliveira',
        age: '4',
        grade: 'Pré-escola'
      }
    ],
    channel: 'Facebook',
    stage: 'Agendamento',
    status: 'Em Andamento',
    createdAt: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    notes: 'Agendou visita para próxima semana. Filha tem 4 anos.',
    enrollmentIntention: 'alta',
    contactTime: 'tarde'
  },
  {
    id: 3,
    name: 'Pedro Santos',
    email: 'pedro.santos@example.com',
    phone: '(21) 99876-5432',
    course: 'Ensino Médio',
    children: 3,
    _childrenData: [
      {
        name: 'Gabriel Santos',
        age: '14',
        grade: '9º ano'
      },
      {
        name: 'Júlia Santos',
        age: '16',
        grade: '2º ano EM'
      },
      {
        name: 'Lucas Santos',
        age: '17',
        grade: '3º ano EM'
      }
    ],
    channel: 'Instagram',
    stage: 'Visita',
    status: 'Aguardando',
    createdAt: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    notes: 'Visitou a escola ontem. Ficou impressionado com o laboratório de ciências.',
    enrollmentIntention: 'media',
    contactTime: 'noite'
  },
  {
    id: 4,
    name: 'Ana Pereira',
    email: 'ana.pereira@example.com',
    phone: '(11) 97654-3210',
    course: 'Ensino Fundamental',
    children: 2,
    _childrenData: [
      {
        name: 'Miguel Pereira',
        age: '7',
        grade: '2º ano'
      },
      {
        name: 'Rafael Pereira',
        age: '9',
        grade: '4º ano'
      }
    ],
    channel: 'WhatsApp',
    stage: 'Matrícula',
    status: 'Finalizado',
    createdAt: format(subDays(new Date(), 10), 'yyyy-MM-dd'),
    notes: 'Finalizou a matrícula dos dois filhos para o próximo semestre.',
    enrollmentIntention: 'alta',
    contactTime: 'qualquer'
  },
  {
    id: 5,
    name: 'Lucas Costa',
    email: 'lucas.costa@example.com',
    phone: '(19) 98888-7777',
    course: 'Educação Infantil',
    children: 1,
    _childrenData: [
      {
        name: 'Isabela Costa',
        age: '3',
        grade: 'Maternal II'
      }
    ],
    channel: 'Indicação',
    stage: 'Contato Inicial',
    status: 'Novo',
    createdAt: format(subDays(new Date(), 2), 'yyyy-MM-dd'),
    notes: 'Indicado por Maria Oliveira. Interessado no período integral.',
    enrollmentIntention: 'media',
    contactTime: 'manha'
  },
  {
    id: 6,
    name: 'Juliana Lima',
    email: 'juliana.lima@example.com',
    phone: '(11) 95555-6666',
    course: 'Ensino Médio',
    children: 2,
    channel: 'Site',
    stage: 'Agendamento',
    status: 'Em Andamento',
    createdAt: format(subDays(new Date(), 4), 'yyyy-MM-dd'),
    notes: 'Agendou visita para sexta-feira às 14h. Interessada no programa de intercâmbio.'
  },
  {
    id: 7,
    name: 'Rodrigo Souza',
    email: 'rodrigo.souza@example.com',
    phone: '(11) 94444-3333',
    course: 'Educação Infantil',
    children: 1,
    channel: 'WhatsApp',
    stage: 'Visita',
    status: 'Aguardando',
    createdAt: format(subDays(new Date(), 6), 'yyyy-MM-dd'),
    notes: 'Visitou a escola na segunda-feira. Tem dúvidas sobre a metodologia de ensino.'
  },
  {
    id: 8,
    name: 'Mariana Torres',
    email: 'mariana.torres@example.com',
    phone: '(21) 93333-2222',
    course: 'Ensino Fundamental',
    children: 3,
    channel: 'Facebook',
    stage: 'Matrícula',
    status: 'Finalizado',
    createdAt: format(subDays(new Date(), 12), 'yyyy-MM-dd'),
    notes: 'Matrícula finalizada para os três filhos. Solicitou desconto por volume.'
  },
  {
    id: 9,
    name: 'Carlos Mendes',
    email: 'carlos.mendes@example.com',
    phone: '(11) 92222-1111',
    course: 'Ensino Fundamental',
    children: 2,
    channel: 'Google',
    stage: 'Contato Inicial',
    status: 'Novo',
    createdAt: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    notes: 'Encontrou a escola através de busca no Google. Quer informações sobre bolsas.'
  },
  {
    id: 10,
    name: 'Fernanda Lopes',
    email: 'fernanda.lopes@example.com',
    phone: '(19) 91111-0000',
    course: 'Ensino Médio',
    children: 1,
    channel: 'Instagram',
    stage: 'Agendamento',
    status: 'Em Andamento',
    createdAt: format(subDays(new Date(), 4), 'yyyy-MM-dd'),
    notes: 'Agendou visita para a próxima terça. Interesse específico na área de exatas.'
  },
  {
    id: 11,
    name: 'Marcelo Dias',
    email: 'marcelo.dias@example.com',
    phone: '(11) 90000-9999',
    course: 'Educação Infantil',
    children: 2,
    channel: 'Indicação',
    stage: 'Visita',
    status: 'Aguardando',
    createdAt: format(subDays(new Date(), 5), 'yyyy-MM-dd'),
    notes: 'Visitou a escola na quarta-feira. Gostou muito da estrutura e corpo docente.'
  },
  {
    id: 12,
    name: 'Camila Alves',
    email: 'camila.alves@example.com',
    phone: '(21) 99999-8888',
    course: 'Ensino Fundamental',
    children: 1,
    channel: 'Site',
    stage: 'Matrícula',
    status: 'Finalizado',
    createdAt: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
    notes: 'Matrícula finalizada. Solicitou informações sobre transporte escolar.'
  },
  {
    id: 13,
    name: 'Bruno Carvalho',
    email: 'bruno.carvalho@example.com',
    phone: '(11) 98888-7777',
    course: 'Ensino Médio',
    children: 2,
    channel: 'WhatsApp',
    stage: 'Contato Inicial',
    status: 'Novo',
    createdAt: format(subDays(new Date(), 1), 'yyyy-MM-dd'),
    notes: 'Entrou em contato pelo WhatsApp. Interessado em preparação para vestibular.'
  },
  {
    id: 14,
    name: 'Patricia Nascimento',
    email: 'patricia.nascimento@example.com',
    phone: '(19) 97777-6666',
    course: 'Educação Infantil',
    children: 1,
    channel: 'Facebook',
    stage: 'Agendamento',
    status: 'Em Andamento',
    createdAt: format(subDays(new Date(), 3), 'yyyy-MM-dd'),
    notes: 'Agendou visita para segunda-feira às 10h. Criança com necessidades especiais.'
  },
  {
    id: 15,
    name: 'Rafael Martins',
    email: 'rafael.martins@example.com',
    phone: '(11) 96666-5555',
    course: 'Ensino Fundamental',
    children: 3,
    channel: 'Instagram',
    stage: 'Visita',
    status: 'Aguardando',
    createdAt: format(subDays(new Date(), 7), 'yyyy-MM-dd'),
    notes: 'Visitou a escola no último sábado. Está comparando com outras duas instituições.'
  },
  {
    id: 16,
    name: 'Roberta Campos',
    email: 'roberta.campos@example.com',
    phone: '(21) 95555-4444',
    course: 'Ensino Médio',
    children: 1,
    channel: 'Site',
    stage: 'Matrícula',
    status: 'Finalizado',
    createdAt: format(subDays(new Date(), 20), 'yyyy-MM-dd'),
    notes: 'Matrícula finalizada. Pagamento da primeira mensalidade já realizado.'
  }
];

// Histórico fictício para leads
export const mockLeadHistory = {
  1: [
    { 
      id: 101, 
      date: format(subDays(new Date(), 3), 'dd/MM/yyyy HH:mm'),
      action: 'Criação',
      user: 'Carlos Admin',
      notes: 'Lead criado através do formulário do site'
    },
    { 
      id: 102, 
      date: format(subDays(new Date(), 2), 'dd/MM/yyyy HH:mm'),
      action: 'Contato',
      user: 'Ana Atendimento',
      notes: 'Primeiro contato realizado por telefone. Cliente interessado em conhecer mais sobre o programa bilíngue.'
    }
  ],
  2: [
    { 
      id: 201, 
      date: format(subDays(new Date(), 5), 'dd/MM/yyyy HH:mm'),
      action: 'Criação',
      user: 'Carlos Admin',
      notes: 'Lead criado a partir de contato no Facebook'
    },
    { 
      id: 202, 
      date: format(subDays(new Date(), 4), 'dd/MM/yyyy HH:mm'),
      action: 'Contato',
      user: 'Ana Atendimento',
      notes: 'Contato realizado. Cliente interessado no programa de meio período.'
    },
    { 
      id: 203, 
      date: format(subDays(new Date(), 1), 'dd/MM/yyyy HH:mm'),
      action: 'Agendamento',
      user: 'Marcelo Secretaria',
      notes: 'Agendamento de visita para o dia 15/07/2024 às 14h30.'
    }
  ],
  3: [
    { 
      id: 301, 
      date: format(subDays(new Date(), 10), 'dd/MM/yyyy HH:mm'),
      action: 'Criação',
      user: 'Carlos Admin',
      notes: 'Lead criado a partir de mensagem no Instagram'
    },
    { 
      id: 302, 
      date: format(subDays(new Date(), 8), 'dd/MM/yyyy HH:mm'),
      action: 'Contato',
      user: 'Ana Atendimento',
      notes: 'Cliente já conhecia a instituição. Interessado principalmente no programa de ciências.'
    },
    { 
      id: 303, 
      date: format(subDays(new Date(), 7), 'dd/MM/yyyy HH:mm'),
      action: 'Agendamento',
      user: 'Marcelo Secretaria',
      notes: 'Visita agendada para ontem às 10h.'
    },
    { 
      id: 304, 
      date: format(subDays(new Date(), 1), 'dd/MM/yyyy HH:mm'),
      action: 'Visita',
      user: 'Roberto Direção',
      notes: 'Cliente visitou a escola e demonstrou grande interesse no laboratório de ciências.'
    }
  ],
  // Mais históricos para outros leads podem ser adicionados conforme necessário
};

// Function to group leads by stage
export const getLeadsByStage = () => {
  return {
    "Contato Inicial": mockLeadsData.filter(lead => lead.stage === "Contato Inicial"),
    "Agendamento": mockLeadsData.filter(lead => lead.stage === "Agendamento"),
    "Visita": mockLeadsData.filter(lead => lead.stage === "Visita"),
    "Matrícula": mockLeadsData.filter(lead => lead.stage === "Matrícula"),
  };
};

// Função para retornar o histórico de um lead específico pelo ID
export const getLeadHistory = (leadId: number) => {
  return mockLeadHistory[leadId as keyof typeof mockLeadHistory] || [];
};

// Estatísticas para dashboard
export const mockLeadStats = {
  totalLeads: mockLeadsData.length,
  newLeadsThisWeek: 5,
  conversionRate: 35.2,
  averageTimeToConversion: 14.3, // dias
  // Distribuição por canal
  channelDistribution: [
    { name: 'Site', value: 31.25 },
    { name: 'Instagram', value: 18.75 },
    { name: 'Facebook', value: 18.75 },
    { name: 'WhatsApp', value: 18.75 },
    { name: 'Indicação', value: 12.5 }
  ],
  // Distribuição por curso
  courseDistribution: [
    { name: 'Ensino Fundamental', value: 43.75 },
    { name: 'Educação Infantil', value: 31.25 },
    { name: 'Ensino Médio', value: 25 }
  ],
  // Taxa de conversão por etapa
  stageConversion: [
    { name: 'Contato Inicial', value: 100 },
    { name: 'Agendamento', value: 75 },
    { name: 'Visita', value: 50 },
    { name: 'Matrícula', value: 25 }
  ]
};
