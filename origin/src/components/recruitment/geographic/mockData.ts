
import { Campus, Course } from './types';

// Demo data for campuses
export const DEMO_CAMPUSES: Campus[] = [
  {
    id: '1',
    name: 'Campus Centro',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    distance: 0,
    availableCourses: ['1', '2', '3', '4'],
    availableModalities: ['presencial', 'semipresencial']
  },
  {
    id: '2',
    name: 'Campus Zona Sul',
    address: 'Av. Santo Amaro, 500',
    city: 'São Paulo',
    state: 'SP',
    distance: 5.2,
    availableCourses: ['1', '3', '5'],
    availableModalities: ['presencial', 'semipresencial', 'ead']
  },
  {
    id: '3',
    name: 'Campus Guarulhos',
    address: 'Rua Guarulhos, 100',
    city: 'Guarulhos',
    state: 'SP',
    distance: 22.7,
    availableCourses: ['1', '2', '5'],
    availableModalities: ['presencial', 'ead']
  },
];

// Demo data for courses
export const DEMO_COURSES: Course[] = [
  {
    id: '1',
    name: 'Administração',
    modalities: ['presencial', 'semipresencial', 'ead'],
    campusIds: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Direito',
    modalities: ['presencial', 'semipresencial'],
    campusIds: ['1', '3']
  },
  {
    id: '3',
    name: 'Engenharia Civil',
    modalities: ['presencial'],
    campusIds: ['1', '2']
  },
  {
    id: '4',
    name: 'Psicologia',
    modalities: ['presencial'],
    campusIds: ['1']
  },
  {
    id: '5',
    name: 'Análise e Desenvolvimento de Sistemas',
    modalities: ['presencial', 'ead'],
    campusIds: ['2', '3']
  },
];
