
import React from 'react';
import { Calendar } from 'lucide-react';

interface OrganizationMetadataProps {
  createdAt: string;
}

const OrganizationMetadata: React.FC<OrganizationMetadataProps> = ({ createdAt }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Calendar className="h-4 w-4" />
      <span>Criada em {formatDate(createdAt)}</span>
    </div>
  );
};

export default OrganizationMetadata;
