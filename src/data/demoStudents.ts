
import { StudentData } from '@/types/data';

export const generateDemoStudents = (): StudentData[] => {
  return [
    {
      id: '1',
      name: 'Ana Silva',
      registrationNumber: '12345',
      class: '9A',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 5.5,
      attendance: 75,
      behavior: 3,
      riskLevel: 'high',
      actionItems: ['Contatar pais', 'Agendar aconselhamento'],
      parentName: 'Roberto Silva',
      parentContact: '(11) 98765-4321',
      decisionPath: [
        'Frequência: 75% - Abaixo do ideal (risco médio)',
        'Nota média: 5.5 - Abaixo da média (risco alto)',
        'Comportamento: 3/5 - Mediano (mantém risco alto)'
      ]
    },
    {
      id: '2',
      name: 'Bruno Santos',
      registrationNumber: '23456',
      class: '9A',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 7.2,
      attendance: 92,
      behavior: 4,
      riskLevel: 'low',
      actionItems: ['Monitorar desempenho'],
      parentName: 'Marta Santos',
      parentContact: '(11) 91234-5678',
      decisionPath: [
        'Frequência: 92% - Excelente (risco baixo)',
        'Nota média: 7.2 - Acima da média (mantém risco baixo)',
        'Comportamento: 4/5 - Bom (mantém risco baixo)'
      ]
    },
    {
      id: '3',
      name: 'Carla Oliveira',
      registrationNumber: '34567',
      class: '9B',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 6.1,
      attendance: 81,
      behavior: 2,
      riskLevel: 'medium',
      actionItems: ['Apoio acadêmico', 'Intervenção comportamental'],
      parentName: 'Paulo Oliveira',
      parentContact: '(11) 99876-5432',
      decisionPath: [
        'Frequência: 81% - Adequada (risco baixo)',
        'Nota média: 6.1 - Adequada (mantém risco baixo)',
        'Comportamento: 2/5 - Preocupante (risco elevado para médio)'
      ]
    },
    {
      id: '4',
      name: 'Daniel Pereira',
      registrationNumber: '45678',
      class: '9B',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 8.5,
      attendance: 96,
      behavior: 5,
      riskLevel: 'low',
      parentName: 'Luisa Pereira',
      parentContact: '(11) 98123-4567',
      decisionPath: [
        'Frequência: 96% - Excelente (risco baixo)',
        'Nota média: 8.5 - Excelente (mantém risco baixo)',
        'Comportamento: 5/5 - Excelente (mantém risco baixo)'
      ]
    },
    {
      id: '5',
      name: 'Elena Costa',
      registrationNumber: '56789',
      class: '9C',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 4.8,
      attendance: 68,
      behavior: 3,
      riskLevel: 'high',
      actionItems: ['Reunião com pais', 'Intervenção acadêmica'],
      parentName: 'Fernando Costa',
      parentContact: '(11) 99123-8765',
      decisionPath: [
        'Frequência: 68% - Crítica (risco alto)',
        'Nota média: 4.8 - Crítica (mantém risco alto)',
        'Comportamento: 3/5 - Mediano (mantém risco alto)'
      ]
    },
    {
      id: '6',
      name: 'Felipe Martins',
      registrationNumber: '67890',
      class: '9C',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 6.9,
      attendance: 88,
      behavior: 4,
      riskLevel: 'low',
      parentName: 'Joana Martins',
      parentContact: '(11) 97654-3210',
      decisionPath: [
        'Frequência: 88% - Boa (risco baixo)',
        'Nota média: 6.9 - Adequada (mantém risco baixo)',
        'Comportamento: 4/5 - Bom (mantém risco baixo)'
      ]
    },
    {
      id: '7',
      name: 'Gabriela Lima',
      registrationNumber: '78901',
      class: '9A',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 5.9,
      attendance: 79,
      behavior: 3,
      riskLevel: 'medium',
      actionItems: ['Apoio acadêmico'],
      parentName: 'Ricardo Lima',
      parentContact: '(11) 96543-2109',
      decisionPath: [
        'Frequência: 79% - Adequada (risco baixo)',
        'Nota média: 5.9 - Limítrofe (risco médio)',
        'Comportamento: 3/5 - Mediano (mantém risco médio)'
      ]
    },
    {
      id: '8',
      name: 'Henrique Alves',
      registrationNumber: '89012',
      class: '9C',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 7.8,
      attendance: 93,
      behavior: 4,
      riskLevel: 'low',
      parentName: 'Cristina Alves',
      parentContact: '(11) 95432-1098',
      decisionPath: [
        'Frequência: 93% - Excelente (risco baixo)',
        'Nota média: 7.8 - Boa (mantém risco baixo)',
        'Comportamento: 4/5 - Bom (mantém risco baixo)'
      ]
    }
  ];
};
