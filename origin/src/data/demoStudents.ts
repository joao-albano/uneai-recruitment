
import { StudentData } from '@/types/data';
import { v4 as uuidv4 } from 'uuid';

export const generateDemoStudents = (): StudentData[] => {
  return [
    {
      id: '1',
      name: 'Ana Silva',
      registrationNumber: '2023001',
      class: '9A',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 5.8,
      attendance: 75,
      behavior: 3,
      riskLevel: 'high',
      parentName: 'Maria Silva',
      parentContact: '5511999991111',
      actionItems: [
        'Agendar reunião com responsável',
        'Reforço em matemática e língua portuguesa',
        'Acompanhamento psicopedagógico'
      ],
      decisionPath: [
        'Frequência abaixo de 80% (75%)',
        'Notas abaixo da média em 3 disciplinas',
        'Comportamento: nível 3 (neutro)',
        'Conclusão: Aluno com alto risco de evasão'
      ]
    },
    {
      id: '2',
      name: 'Bruno Santos',
      registrationNumber: '2023002',
      class: '9A',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 9.2,
      attendance: 95,
      behavior: 5,
      riskLevel: 'low',
      parentName: 'João Santos',
      parentContact: '5511999992222',
      actionItems: [
        'Incentivo a participar de olimpíadas acadêmicas',
        'Oportunidades de liderança em projetos'
      ],
      decisionPath: [
        'Frequência acima de 90% (95%)',
        'Excelente desempenho acadêmico (9.2)',
        'Comportamento exemplar (nível 5)',
        'Conclusão: Baixo risco, potencial para destaque acadêmico'
      ]
    },
    {
      id: '3',
      name: 'Carla Oliveira',
      registrationNumber: '2023003',
      class: '9B',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 6.8,
      attendance: 85,
      behavior: 4,
      riskLevel: 'medium',
      parentName: 'Paula Oliveira',
      parentContact: '5511999993333',
      actionItems: [
        'Monitoramento do desempenho em matemática',
        'Feedback quinzenal sobre progresso'
      ],
      decisionPath: [
        'Frequência adequada (85%)',
        'Notas limítrofes em matemática',
        'Comportamento bom (nível 4)',
        'Conclusão: Risco médio, necessita acompanhamento preventivo'
      ]
    },
    {
      id: '4',
      name: 'Daniel Pereira',
      registrationNumber: '2023004',
      class: '9B',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 8.7,
      attendance: 92,
      behavior: 4,
      riskLevel: 'low',
      parentName: 'Roberto Pereira',
      parentContact: '5511999994444',
      actionItems: [
        'Incentivo à participação em projetos científicos',
        'Desenvolvimento de habilidades de comunicação'
      ],
      decisionPath: [
        'Frequência excelente (92%)',
        'Bom desempenho acadêmico (8.7)',
        'Comportamento adequado (nível 4)',
        'Conclusão: Baixo risco, bom engajamento acadêmico'
      ]
    },
    {
      id: '5',
      name: 'Elena Costa',
      registrationNumber: '2023005',
      class: '9C',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 5.3,
      attendance: 65,
      behavior: 2,
      riskLevel: 'high',
      parentName: 'Sandra Costa',
      parentContact: '5511999995555',
      actionItems: [
        'Intervenção imediata - reunião com família',
        'Plano de recuperação intensivo',
        'Acompanhamento diário de frequência',
        'Apoio psicológico'
      ],
      decisionPath: [
        'Frequência crítica (65%, abaixo do mínimo legal)',
        'Desempenho insuficiente em todas as disciplinas',
        'Comportamento preocupante (nível 2)',
        'Histórico de faltas consecutivas sem justificativa',
        'Conclusão: Alto risco de evasão, necessita intervenção imediata'
      ]
    },
    {
      id: '6',
      name: 'Felipe Martins',
      registrationNumber: '2023006',
      class: '9C',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 7.3,
      attendance: 82,
      behavior: 3,
      riskLevel: 'medium',
      parentName: 'Marcelo Martins',
      parentContact: '5511999996666',
      actionItems: [
        'Apoio em disciplinas específicas',
        'Conversa com orientador educacional'
      ],
      decisionPath: [
        'Frequência aceitável (82%)',
        'Desempenho irregular entre disciplinas',
        'Comportamento neutro (nível 3)',
        'Conclusão: Risco médio, necessita acompanhamento'
      ]
    },
    {
      id: '7',
      name: 'Gabriela Lima',
      registrationNumber: '2023007',
      class: '9D',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 6.0,
      attendance: 78,
      behavior: 3,
      riskLevel: 'medium',
      parentName: 'Ricardo Lima',
      parentContact: '5511999997777',
      actionItems: [
        'Monitoramento de frequência',
        'Reforço nas disciplinas de exatas'
      ],
      decisionPath: [
        'Frequência limítrofe (78%)',
        'Notas mínimas para aprovação',
        'Comportamento regular (nível 3)',
        'Conclusão: Risco médio, potencial para deterioração'
      ]
    },
    {
      id: '8',
      name: 'Henrique Alves',
      registrationNumber: '2023008',
      class: '9D',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 9.5,
      attendance: 98,
      behavior: 5,
      riskLevel: 'low',
      parentName: 'Cristina Alves',
      parentContact: '5511999998888',
      actionItems: [
        'Programa de enriquecimento curricular',
        'Mentoria para outros alunos'
      ],
      decisionPath: [
        'Frequência excepcional (98%)',
        'Desempenho acadêmico excelente',
        'Comportamento exemplar (nível 5)',
        'Conclusão: Baixo risco, aluno destaque'
      ]
    }
  ];
};
