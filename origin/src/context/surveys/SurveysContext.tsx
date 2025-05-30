
import React, { createContext, useContext, useState } from 'react';
import { SurveyData } from '@/types/data';

interface SurveysContextType {
  surveys: SurveyData[];
  addSurvey: (survey: SurveyData) => void;
}

const SurveysContext = createContext<SurveysContextType | undefined>(undefined);

export const SurveysProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [surveys, setSurveys] = useState<SurveyData[]>([]);

  const addSurvey = (survey: SurveyData) => {
    setSurveys(prev => [...prev, survey]);
  };

  return (
    <SurveysContext.Provider value={{
      surveys,
      addSurvey
    }}>
      {children}
    </SurveysContext.Provider>
  );
};

export const useSurveys = () => {
  const context = useContext(SurveysContext);
  if (context === undefined) {
    throw new Error('useSurveys must be used within a SurveysProvider');
  }
  return context;
};
