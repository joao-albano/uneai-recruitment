
import React, { useEffect } from 'react';
import { useData } from '@/context/DataContext';
import ModelPageHeader from './ModelPageHeader';
import ModelTabsContent from './ModelTabsContent';
import { useIsMobile } from '@/hooks/use-mobile';

const ModelPageContent: React.FC = () => {
  const { students, generateDemoData } = useData();
  const isMobile = useIsMobile();
  
  // Make sure we have demo data
  useEffect(() => {
    if (students.length === 0) {
      generateDemoData();
    }
  }, [students.length, generateDemoData]);
  
  return (
    <div className={`animate-fade-in ${isMobile ? 'px-2' : ''}`}>
      <ModelPageHeader />
      <ModelTabsContent />
    </div>
  );
};

export default ModelPageContent;
