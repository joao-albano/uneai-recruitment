
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface OrganizationsHeaderProps {
  count: number;
  onCreateNew: () => void;
}

const OrganizationsHeader: React.FC<OrganizationsHeaderProps> = ({ count, onCreateNew }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Organizações</h1>
        <p className="text-muted-foreground">
          Gerencie as organizações cadastradas ({count})
        </p>
      </div>
      <Button onClick={onCreateNew}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Nova Organização
      </Button>
    </div>
  );
};

export default OrganizationsHeader;
