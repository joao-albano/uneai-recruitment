
import { StudentData, AlertItem, ScheduleItem } from '../types/data';

export const generateDemoStudents = (): StudentData[] => {
  return [
    {
      id: '1',
      name: 'Ana Silva',
      registrationNumber: '12345',
      class: '9A',
      grade: 5.5,
      attendance: 75,
      behavior: 3,
      riskLevel: 'high',
      actionItems: ['Contact parents', 'Schedule counseling'],
      parentName: 'Roberto Silva',
      parentContact: '(11) 98765-4321'
    },
    {
      id: '2',
      name: 'Bruno Santos',
      registrationNumber: '23456',
      class: '9A',
      grade: 7.2,
      attendance: 92,
      behavior: 4,
      riskLevel: 'low',
      actionItems: ['Monitor performance'],
      parentName: 'Marta Santos',
      parentContact: '(11) 91234-5678'
    },
    {
      id: '3',
      name: 'Carla Oliveira',
      registrationNumber: '34567',
      class: '9B',
      grade: 6.1,
      attendance: 81,
      behavior: 2,
      riskLevel: 'medium',
      actionItems: ['Academic support', 'Behavior intervention'],
      parentName: 'Paulo Oliveira',
      parentContact: '(11) 99876-5432'
    },
    {
      id: '4',
      name: 'Daniel Pereira',
      registrationNumber: '45678',
      class: '9B',
      grade: 8.5,
      attendance: 96,
      behavior: 5,
      riskLevel: 'low',
      parentName: 'Luisa Pereira',
      parentContact: '(11) 98123-4567'
    },
    {
      id: '5',
      name: 'Elena Costa',
      registrationNumber: '56789',
      class: '9C',
      grade: 4.8,
      attendance: 68,
      behavior: 3,
      riskLevel: 'high',
      actionItems: ['Parent meeting', 'Academic intervention'],
      parentName: 'Fernando Costa',
      parentContact: '(11) 99123-8765'
    },
    {
      id: '6',
      name: 'Felipe Martins',
      registrationNumber: '67890',
      class: '9C',
      grade: 6.9,
      attendance: 88,
      behavior: 4,
      riskLevel: 'low',
      parentName: 'Joana Martins',
      parentContact: '(11) 97654-3210'
    },
    {
      id: '7',
      name: 'Gabriela Lima',
      registrationNumber: '78901',
      class: '9A',
      grade: 5.9,
      attendance: 79,
      behavior: 3,
      riskLevel: 'medium',
      actionItems: ['Academic support'],
      parentName: 'Ricardo Lima',
      parentContact: '(11) 96543-2109'
    },
    {
      id: '8',
      name: 'Henrique Alves',
      registrationNumber: '89012',
      class: '9C',
      grade: 7.8,
      attendance: 93,
      behavior: 4,
      riskLevel: 'low',
      parentName: 'Cristina Alves',
      parentContact: '(11) 95432-1098'
    }
  ];
};

export const generateDemoAlerts = (): AlertItem[] => {
  return [
    {
      id: '1',
      studentId: '1',
      studentName: 'Ana Silva',
      studentClass: '9A',
      type: 'high-risk',
      message: 'Ana Silva has multiple risk factors: low grades, attendance below 80%, and behavioral issues.',
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
      message: 'Elena Costa has critical attendance issues (68%) and failing grades.',
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
      message: 'Carla Oliveira has borderline grades and behavioral concerns.',
      createdAt: new Date(),
      read: false,
      actionTaken: false
    }
  ];
};

export const generateDemoSchedules = (): ScheduleItem[] => {
  return [
    {
      id: '1',
      studentId: '1',
      studentName: 'Ana Silva',
      date: new Date(Date.now() + 86400000),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Discuss attendance and academic performance'
    },
    {
      id: '2',
      studentId: '5',
      studentName: 'Elena Costa',
      date: new Date(Date.now() + 86400000 * 3),
      agentName: 'Coord. Mariana',
      status: 'scheduled',
      notes: 'Parent meeting to address attendance issues'
    }
  ];
};
