
import React from 'react';
import { Settings } from 'lucide-react';

interface EmptyStateProps {
  searchTerm?: string;
  type?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, type }) => {
  let message = "Nenhum alerta encontrado";
  
  if (searchTerm) {
    message = `Nenhum alerta encontrado para "${searchTerm}"`;
  } else if (type === "unread") {
    message = "Não há alertas não lidos";
  } else if (type === "read") {
    message = "Não há alertas lidos";
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <Settings className="h-6 w-6 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">{message}</p>
      <p className="text-muted-foreground text-sm mt-2">
        Os alertas de captação aparecerão aqui quando o sistema identificar oportunidades
      </p>
    </div>
  );
};

export default EmptyState;
