
import React from 'react';
import { Settings, FileText } from 'lucide-react';
import { useProduct } from '@/context/ProductContext';

interface EmptyStateProps {
  searchTerm?: string;
  type?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ searchTerm, type }) => {
  const { currentProduct } = useProduct();
  let message = "Nenhum alerta encontrado";
  let description = "Os alertas aparecerão aqui quando o sistema identificar oportunidades";
  
  if (searchTerm) {
    message = `Nenhum alerta encontrado para "${searchTerm}"`;
  } else if (type === "unread") {
    message = "Não há alertas não lidos";
  } else if (type === "read") {
    message = "Não há alertas lidos";
  }
  
  // Product-specific customization
  if (currentProduct === 'retention') {
    description = "Os alertas de risco de evasão aparecerão aqui após o processamento dos dados dos alunos";
  } else if (currentProduct === 'recruitment') {
    description = "Os alertas de captação aparecerão aqui quando o sistema identificar oportunidades";
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        {currentProduct === 'retention' ? (
          <FileText className="h-6 w-6 text-muted-foreground" />
        ) : (
          <Settings className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
      <p className="text-muted-foreground">{message}</p>
      <p className="text-muted-foreground text-sm mt-2">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;
