
import React, { useEffect } from 'react';
import { useData } from '@/context/DataContext';
import SurveyTabs from '@/components/survey/SurveyTabs';

const SurveyPageContent: React.FC = () => {
  const { students, generateDemoData } = useData();
  
  // Generate demo data if needed
  useEffect(() => {
    if (students.length === 0) {
      console.log("Generating demo data for survey page");
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Pesquisa Diagnóstica</h1>
        <p className="text-muted-foreground mt-1">
          Colete informações importantes das famílias para enriquecer a análise
        </p>
      </div>
      
      <SurveyTabs />
    </>
  );
};

export default SurveyPageContent;
