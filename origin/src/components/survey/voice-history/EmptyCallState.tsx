
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { PhoneOff } from 'lucide-react';

const EmptyCallState: React.FC = () => {
  const { language } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="bg-muted rounded-full h-16 w-16 flex items-center justify-center mb-4">
        <PhoneOff className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-medium mb-2">
        {language === 'pt-BR' ? 'Sem histórico de ligações' : 'No call history'}
      </h3>
      <p className="text-muted-foreground max-w-md">
        {language === 'pt-BR' 
          ? 'Nenhuma ligação foi realizada ainda. Quando o sistema fizer ligações automáticas, elas aparecerão aqui.' 
          : 'No calls have been made yet. When the system makes automated calls, they will appear here.'}
      </p>
    </div>
  );
};

export default EmptyCallState;
