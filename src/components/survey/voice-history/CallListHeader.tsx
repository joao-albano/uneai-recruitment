
import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const CallListHeader: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <div className="grid grid-cols-12 gap-2 p-3 bg-muted/50 text-sm font-medium border-b">
      <div className="col-span-3">{language === 'pt-BR' ? 'Estudante' : 'Student'}</div>
      <div className="col-span-2">{language === 'pt-BR' ? 'Responsável' : 'Parent'}</div>
      <div className="col-span-2">{language === 'pt-BR' ? 'Data' : 'Date'}</div>
      <div className="col-span-2">{language === 'pt-BR' ? 'Duração' : 'Duration'}</div>
      <div className="col-span-1">{language === 'pt-BR' ? 'Status' : 'Status'}</div>
      <div className="col-span-2 text-right">{language === 'pt-BR' ? 'Ações' : 'Actions'}</div>
    </div>
  );
};

export default CallListHeader;
