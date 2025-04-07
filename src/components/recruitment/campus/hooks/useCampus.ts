
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Campus } from '@/types/recruitment/campus';
import Papa from 'papaparse';

// Mock de dados (em produção seria substituído por chamadas de API)
const mockCampuses: Campus[] = [
  {
    id: uuidv4(),
    name: 'Campus Centro',
    address: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    phone: '(11) 3333-4444',
    courses: [
      { id: uuidv4(), name: 'Administração', modalities: ['presencial', 'ead'] },
      { id: uuidv4(), name: 'Direito', modalities: ['presencial'] },
      { id: uuidv4(), name: 'Engenharia Civil', modalities: ['presencial'] }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: uuidv4(),
    name: 'Campus Norte',
    address: 'Rua das Flores, 500',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '02345-000',
    phone: '(11) 4444-5555',
    courses: [
      { id: uuidv4(), name: 'Enfermagem', modalities: ['presencial'] },
      { id: uuidv4(), name: 'Psicologia', modalities: ['presencial', 'semipresencial'] }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Funções para persistir e recuperar localmente
const saveCampuses = (campuses: Campus[]) => {
  localStorage.setItem('campuses', JSON.stringify(campuses));
};

const loadCampuses = (): Campus[] => {
  const stored = localStorage.getItem('campuses');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Erro ao carregar campuses do localStorage:', error);
    }
  }
  
  // Se não tiver dados salvos, usa os mocks e salva
  saveCampuses(mockCampuses);
  return mockCampuses;
};

export const useCampus = () => {
  const [campuses, setCampuses] = useState<Campus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula carregamento de dados
    const timer = setTimeout(() => {
      const loadedCampuses = loadCampuses();
      setCampuses(loadedCampuses);
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const addCampus = async (campusData: Omit<Campus, 'id' | 'createdAt' | 'updatedAt' | 'courses'>) => {
    const newCampus: Campus = {
      ...campusData,
      id: uuidv4(),
      courses: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedCampuses = [...campuses, newCampus];
    setCampuses(updatedCampuses);
    saveCampuses(updatedCampuses);
    return newCampus;
  };

  const updateCampus = async (id: string, campusData: Partial<Omit<Campus, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const updatedCampuses = campuses.map(campus => {
      if (campus.id === id) {
        return {
          ...campus,
          ...campusData,
          updatedAt: new Date()
        };
      }
      return campus;
    });

    setCampuses(updatedCampuses);
    saveCampuses(updatedCampuses);
    return updatedCampuses.find(campus => campus.id === id);
  };

  const deleteCampus = async (id: string) => {
    const updatedCampuses = campuses.filter(campus => campus.id !== id);
    setCampuses(updatedCampuses);
    saveCampuses(updatedCampuses);
    return true;
  };

  const importCampuses = async (file: File) => {
    return new Promise<Campus[]>((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(results.errors);
            return;
          }

          const importedCampuses: Campus[] = results.data.map((row: any) => ({
            id: uuidv4(),
            name: row.nome,
            address: row.endereco,
            city: row.cidade,
            state: row.estado,
            zipCode: row.cep,
            phone: row.telefone,
            courses: [],
            createdAt: new Date(),
            updatedAt: new Date()
          }));

          const updatedCampuses = [...campuses, ...importedCampuses];
          setCampuses(updatedCampuses);
          saveCampuses(updatedCampuses);
          resolve(importedCampuses);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  };

  return {
    campuses,
    isLoading,
    addCampus,
    updateCampus,
    deleteCampus,
    importCampuses
  };
};
