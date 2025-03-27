
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { PhoneOff } from 'lucide-react';

interface SettingsEmptyCallStateProps {
  hasSearch: boolean;
}

const SettingsEmptyCallState: React.FC<SettingsEmptyCallStateProps> = ({ hasSearch }) => {
  const { language } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-muted rounded-full h-12 w-12 flex items-center justify-center mb-4">
        <PhoneOff className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium mb-1">
        {hasSearch 
          ? (language === 'pt-BR' ? 'Nenhuma ligação encontrada' : 'No calls found') 
          : (language === 'pt-BR' ? 'Nenhuma ligação registrada' : 'No calls recorded yet')}
      </h3>
      <p className="text-muted-foreground text-sm max-w-md">
        {hasSearch 
          ? (language === 'pt-BR' 
              ? 'Não encontramos ligações que correspondam aos seus filtros.' 
              : 'We couldn\'t find any calls matching your filters.')
          : (language === 'pt-BR' 
              ? 'Quando o sistema realizar ligações automáticas, elas aparecerão aqui.' 
              : 'When the system makes automated calls, they will appear here.')}
      </p>
    </div>
  );
};

export default SettingsEmptyCallState;
