
import React, { useEffect } from 'react';
import { useData } from '@/context/DataContext';
import ModelPageHeader from './ModelPageHeader';
import ModelTabsContent from './ModelTabsContent';

const ModelPageContent: React.FC = () => {
  const { students, generateDemoData } = useData();
  
  // Make sure we have demo data
  useEffect(() => {
    if (students.length === 0) {
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  return (
    <div className="animate-fade-in">
      <ModelPageHeader />
      <ModelTabsContent />
    </div>
  );
};

export default ModelPageContent;
