
import React from 'react';
import { Building } from 'lucide-react';

interface OrganizationsHeaderProps {
  organizationCount: number;
}

const OrganizationsHeader: React.FC<OrganizationsHeaderProps> = ({ organizationCount }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-2">
        <Building className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Organizações</h1>
      </div>
      
      <p className="text-muted-foreground">
        Gerencie todas as organizações do sistema. {organizationCount} {organizationCount === 1 ? 'organização cadastrada' : 'organizações cadastradas'}.
      </p>
    </div>
  );
};

export default OrganizationsHeader;
