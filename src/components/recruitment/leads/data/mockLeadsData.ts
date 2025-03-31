
import { format } from 'date-fns';

// Generate mock lead data
export const mockLeadsData = [
  {
    id: 1,
    name: 'João Silva',
    course: 'Ensino Fundamental',
    children: 2,
    channel: 'Site',
    stage: 'Contato Inicial',
    status: 'Novo',
    createdAt: format(new Date('2023-12-15'), 'yyyy-MM-dd'),
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    course: 'Educação Infantil',
    children: 1,
    channel: 'Facebook',
    stage: 'Agendamento',
    status: 'Em Andamento',
    createdAt: format(new Date('2023-12-16'), 'yyyy-MM-dd'),
  },
  {
    id: 3,
    name: 'Pedro Santos',
    course: 'Ensino Médio',
    children: 3,
    channel: 'Instagram',
    stage: 'Visita',
    status: 'Aguardando',
    createdAt: format(new Date('2023-12-17'), 'yyyy-MM-dd'),
  },
  {
    id: 4,
    name: 'Ana Pereira',
    course: 'Ensino Fundamental',
    children: 2,
    channel: 'WhatsApp',
    stage: 'Matrícula',
    status: 'Finalizado',
    createdAt: format(new Date('2023-12-18'), 'yyyy-MM-dd'),
  },
  {
    id: 5,
    name: 'Lucas Costa',
    course: 'Educação Infantil',
    children: 1,
    channel: 'Indicação',
    stage: 'Contato Inicial',
    status: 'Novo',
    createdAt: format(new Date('2023-12-19'), 'yyyy-MM-dd'),
  },
  {
    id: 6,
    name: 'Juliana Lima',
    course: 'Ensino Médio',
    children: 2,
    channel: 'Site',
    stage: 'Agendamento',
    status: 'Em Andamento',
    createdAt: format(new Date('2023-12-20'), 'yyyy-MM-dd'),
  },
  {
    id: 7,
    name: 'Rodrigo Souza',
    course: 'Educação Infantil',
    children: 1,
    channel: 'WhatsApp',
    stage: 'Visita',
    status: 'Aguardando',
    createdAt: format(new Date('2023-12-21'), 'yyyy-MM-dd'),
  },
  {
    id: 8,
    name: 'Mariana Torres',
    course: 'Ensino Fundamental',
    children: 3,
    channel: 'Facebook',
    stage: 'Matrícula',
    status: 'Finalizado',
    createdAt: format(new Date('2023-12-22'), 'yyyy-MM-dd'),
  },
];

// Function to group leads by stage
export const getLeadsByStage = () => {
  return {
    "Contato Inicial": mockLeadsData.filter(lead => lead.stage === "Contato Inicial"),
    "Agendamento": mockLeadsData.filter(lead => lead.stage === "Agendamento"),
    "Visita": mockLeadsData.filter(lead => lead.stage === "Visita"),
    "Matrícula": mockLeadsData.filter(lead => lead.stage === "Matrícula"),
  };
};
