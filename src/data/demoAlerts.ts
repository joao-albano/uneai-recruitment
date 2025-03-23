
import { AlertItem } from '@/types/data';

export const generateDemoAlerts = (): AlertItem[] => {
  return [
    {
      id: '1',
      studentId: '1',
      studentName: 'Ana Silva',
      studentClass: '9A',
      type: 'high-risk',
      message: 'Ana Silva possui múltiplos fatores de risco: notas baixas, frequência abaixo de 80% e questões comportamentais.',
      createdAt: new Date(Date.now() - 86400000 * 2),
      read: false,
      actionTaken: false
    },
    {
      id: '2',
      studentId: '5',
      studentName: 'Elena Costa',
      studentClass: '9C',
      type: 'high-risk',
      message: 'Elena Costa tem problemas críticos de frequência (68%) e notas abaixo da média.',
      createdAt: new Date(Date.now() - 86400000),
      read: false,
      actionTaken: false
    },
    {
      id: '3',
      studentId: '3',
      studentName: 'Carla Oliveira',
      studentClass: '9B',
      type: 'medium-risk',
      message: 'Carla Oliveira possui notas limítrofes e preocupações comportamentais.',
      createdAt: new Date(),
      read: false,
      actionTaken: false
    }
  ];
};
