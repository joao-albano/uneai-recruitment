
import React from 'react';
import { Calendar } from 'lucide-react';

interface OrganizationMetadataProps {
  createdAt?: string;
}

const OrganizationMetadata: React.FC<OrganizationMetadataProps> = ({ createdAt }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não disponível';
    
    try {
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Data não disponível';
      }
      
      return new Intl.DateTimeFormat('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(date);
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Data não disponível';
    }
  };

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Calendar className="h-4 w-4" />
      <span>Criada em {formatDate(createdAt)}</span>
    </div>
  );
};

export default OrganizationMetadata;
