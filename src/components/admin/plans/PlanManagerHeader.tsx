
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import ResetPlansDialog from './ResetPlansDialog';

interface PlanManagerHeaderProps {
  onResetToDefaults: () => void;
}

const PlanManagerHeader: React.FC<PlanManagerHeaderProps> = ({ onResetToDefaults }) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold tracking-tight">
        {isPtBR ? "Gerenciar Planos" : "Manage Plans"}
      </h2>
      
      <ResetPlansDialog onReset={onResetToDefaults} />
    </div>
  );
};

export default PlanManagerHeader;
