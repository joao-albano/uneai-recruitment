
import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { generateDemoStudents, generateDemoAlerts, generateDemoSchedules } from '@/data/demoData';
import { useStudents } from '../students/StudentsContext';
import { useAlerts } from '../alerts/AlertsContext';
import { useSchedules } from '../schedules/SchedulesContext';
import { useUploads } from '../uploads/UploadsContext';

interface AppStateContextType {
  isLoading: boolean;
  generateDemoData: () => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { setStudents } = useStudents();
  const { setAlerts } = useAlerts();
  const { setSchedules } = useSchedules();
  const { addUploadRecord } = useUploads();

  const generateDemoData = useCallback(() => {
    console.log('Gerando dados de demonstração...');
    setIsLoading(true);
    
    // Gerar dados de demonstração
    const demoStudents = generateDemoStudents();
    const demoAlerts = generateDemoAlerts();
    const demoSchedules = generateDemoSchedules();
    
    // Definir os dados nos contextos
    setStudents(demoStudents);
    setAlerts(demoAlerts);
    setSchedules(demoSchedules);
    
    // Adicionar registro de upload fictício
    addUploadRecord({
      filename: 'demo_dados.csv',
      uploadDate: new Date(Date.now() - 86400000), // ontem
      recordCount: demoStudents.length,
      status: 'success'
    });
    
    // Simular um tempo de carregamento
    setTimeout(() => {
      setIsLoading(false);
      console.log('Dados de demonstração carregados com sucesso!');
    }, 800);
  }, [setStudents, setAlerts, setSchedules, addUploadRecord]);

  // Inicializar com dados de demonstração ao carregar o componente
  useEffect(() => {
    console.log('AppStateProvider montado');
  }, []);

  const value = {
    isLoading,
    generateDemoData,
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};
