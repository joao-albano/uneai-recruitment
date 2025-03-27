
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { SurveyData } from '@/types/data';
import { useStudents } from '@/context/students/StudentsContext';
import { processSurveyForRisk } from '@/utils/riskCalculator';
import { useAlerts } from '@/context/alerts/AlertsContext';

interface SurveysContextType {
  surveys: SurveyData[];
  addSurvey: (survey: SurveyData) => void;
  processSurveyWithRiskModel: (survey: SurveyData) => void;
}

const SurveysContext = createContext<SurveysContextType | undefined>(undefined);

export const SurveysProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const { students, setStudents } = useStudents();
  const { addAlert } = useAlerts();

  // Carregar pesquisas do localStorage na inicialização
  useEffect(() => {
    try {
      const savedSurveys = localStorage.getItem('surveys');
      if (savedSurveys) {
        setSurveys(JSON.parse(savedSurveys));
      }
    } catch (error) {
      console.error('Erro ao carregar pesquisas:', error);
    }
  }, []);

  // Salvar pesquisas no localStorage quando atualizadas
  useEffect(() => {
    if (surveys.length) {
      localStorage.setItem('surveys', JSON.stringify(surveys));
    }
  }, [surveys]);

  const addSurvey = (survey: SurveyData) => {
    setSurveys(prevSurveys => [...prevSurveys, survey]);
    processSurveyWithRiskModel(survey);
  };

  // Função para processar a pesquisa com o modelo de risco
  const processSurveyWithRiskModel = (survey: SurveyData) => {
    const student = students.find(s => s.id === survey.studentId);
    
    if (!student) {
      console.error('Estudante não encontrado para processar pesquisa:', survey.studentId);
      return;
    }
    
    // Processar a pesquisa usando o modelo de risco
    const updatedStudent = processSurveyForRisk(student, survey);
    
    // Atualizar o estudante na lista
    const updatedStudents = students.map(s => 
      s.id === updatedStudent.id ? updatedStudent : s
    );
    
    // Atualizar o estado dos estudantes
    setStudents(updatedStudents);
    
    // Salvar os estudantes atualizados no localStorage
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    
    // Criar um alerta se o nível de risco aumentou
    if (updatedStudent.riskLevel !== student.riskLevel) {
      let riskType: 'high-risk' | 'medium-risk' | 'low-risk';
      
      switch (updatedStudent.riskLevel) {
        case 'high':
          riskType = 'high-risk';
          break;
        case 'medium':
          riskType = 'medium-risk';
          break;
        default:
          riskType = 'low-risk';
      }
      
      addAlert({
        id: `risk-update-${Date.now()}`,
        studentId: updatedStudent.id,
        studentName: updatedStudent.name,
        studentClass: updatedStudent.class,
        type: riskType,
        message: `Nível de risco atualizado para ${updatedStudent.riskLevel === 'high' ? 'ALTO' : updatedStudent.riskLevel === 'medium' ? 'MÉDIO' : 'BAIXO'} com base na pesquisa diagnóstica.`,
        createdAt: new Date(),
        read: false,
        actionTaken: false,
      });
    }
  };

  const value = {
    surveys,
    addSurvey,
    processSurveyWithRiskModel,
  };

  return <SurveysContext.Provider value={value}>{children}</SurveysContext.Provider>;
};

export const useSurveys = () => {
  const context = useContext(SurveysContext);
  if (context === undefined) {
    throw new Error('useSurveys must be used within a SurveysProvider');
  }
  return context;
};
