
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const SettingsEmptyMessageState: React.FC<{ hasSearch: boolean }> = ({ hasSearch }) => {
  const { language } = useTheme();
  
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center">
      <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">
        {language === 'pt-BR' ? 'Nenhuma mensagem encontrada' : 'No messages found'}
      </h3>
      <p className="text-muted-foreground mt-1">
        {hasSearch 
          ? (language === 'pt-BR' ? 'Tente uma busca diferente' : 'Try a different search') 
          : (language === 'pt-BR' ? 'Nenhuma mensagem foi enviada ainda' : 'No messages have been sent yet')}
      </p>
    </div>
  );
};

export default SettingsEmptyMessageState;
