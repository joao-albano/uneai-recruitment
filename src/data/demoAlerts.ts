
import { AlertItem } from '@/types/data';

export const generateDemoAlerts = (): AlertItem[] => {
  return [
    {
      id: '1',
      studentId: '1',
      studentName: 'Ana Silva',
      studentClass: '9A',
      type: 'high-risk',
      message: 'Queda significativa no desempenho acadêmico. Ana Silva apresentou notas abaixo da média em 3 disciplinas consecutivas e frequência em declínio.',
      createdAt: new Date(Date.now() - 86400000 * 2), // 2 dias atrás
      read: false,
      actionTaken: false
    },
    {
      id: '2',
      studentId: '5',
      studentName: 'Elena Costa',
      studentClass: '9C',
      type: 'high-risk',
      message: 'URGENTE: Elena Costa atingiu frequência crítica (65%) e apresenta sinais de possível evasão. Necessária intervenção imediata.',
      createdAt: new Date(Date.now() - 86400000), // 1 dia atrás
      read: false,
      actionTaken: false
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Carla Oliveira',
      studentClass: '9B',
      type: 'medium-risk',
      message: 'Carla Oliveira apresentou dificuldades crescentes em matemática. Recomenda-se acompanhamento preventivo.',
      createdAt: new Date(),
      read: false,
      actionTaken: false
    },
    {
      id: '4',
      studentId: '7',
      studentName: 'Gabriela Lima',
      studentClass: '9D',
      type: 'medium-risk',
      message: 'Gabriela Lima está próxima do limite mínimo de frequência (78%). Necessário contato com responsáveis.',
      createdAt: new Date(Date.now() - 86400000 * 3), // 3 dias atrás
      read: true,
      actionTaken: true
    },
    {
      id: '5',
      studentId: '2',
      studentName: 'Bruno Santos',
      studentClass: '9A',
      type: 'positive',
      message: 'Bruno Santos manteve excelente desempenho por 3 meses consecutivos. Considerar indicação para programa de alunos destaque.',
      createdAt: new Date(Date.now() - 86400000 * 4), // 4 dias atrás
      read: true,
      actionTaken: true
    },
    {
      id: '6',
      studentId: '8',
      studentName: 'Henrique Alves',
      studentClass: '9D',
      type: 'positive',
      message: 'Henrique Alves conquistou primeiro lugar na Olimpíada de Matemática. Oportunidade para destacar conquista.',
      createdAt: new Date(Date.now() - 86400000 * 1), // 1 dia atrás
      read: false,
      actionTaken: false
    }
  ];
};
