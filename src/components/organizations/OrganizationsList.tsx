
import React from 'react';
import { OrganizationType } from './types';
import OrganizationCard from './OrganizationCard';
import { Building } from 'lucide-react';

interface OrganizationsListProps {
  organizations: OrganizationType[];
  onEdit: (organization: OrganizationType) => void;
  onDelete: (organization: OrganizationType) => void;
}

const OrganizationsList: React.FC<OrganizationsListProps> = ({ 
  organizations, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {organizations.map(organization => (
        <OrganizationCard 
          key={organization.id} 
          organization={organization} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
      
      {organizations.length === 0 && (
        <div className="col-span-full flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg border border-dashed text-center">
          <Building className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-1">Nenhuma organização encontrada</h3>
          <p className="text-muted-foreground">
            Clique em "Nova Organização" para adicionar.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrganizationsList;
