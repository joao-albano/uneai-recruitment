
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
      grade: 8,
      attendance: 78,
      behavior: 6,
      riskLevel: 'high',
      parentName: 'Maria Silva',
      parentContact: '5511999991111',
    },
    {
      id: '2',
      name: 'Bruno Santos',
      registrationNumber: '2023002',
      class: '9A',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 9,
      attendance: 95,
      behavior: 9,
      riskLevel: 'low',
      parentName: 'João Santos',
      parentContact: '5511999992222',
    },
    {
      id: '3',
      name: 'Carla Oliveira',
      registrationNumber: '2023003',
      class: '9B',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 7,
      attendance: 85,
      behavior: 6,
      riskLevel: 'medium',
      parentName: 'Paula Oliveira',
      parentContact: '5511999993333',
    },
    {
      id: '4',
      name: 'Daniel Pereira',
      registrationNumber: '2023004',
      class: '9B',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 9,
      attendance: 92,
      behavior: 8,
      riskLevel: 'low',
      parentName: 'Roberto Pereira',
      parentContact: '5511999994444',
    },
    {
      id: '5',
      name: 'Elena Costa',
      registrationNumber: '2023005',
      class: '9C',
      segment: 'ENSINO FUNDAMENTAL II',
      grade: 6,
      attendance: 68,
      behavior: 5,
      riskLevel: 'high',
      parentName: 'Sandra Costa',
      parentContact: '5511999995555',
    }
  ];
};
