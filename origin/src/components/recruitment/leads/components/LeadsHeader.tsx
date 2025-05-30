
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

interface LeadsHeaderProps {
  onOpenDialog: () => void;
}

const LeadsHeader: React.FC<LeadsHeaderProps> = ({ onOpenDialog }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Gestão de Leads</h1>
        <p className="text-muted-foreground">
          Cadastro, perfilamento e acompanhamento de leads
        </p>
      </div>
      <Button 
        onClick={onOpenDialog}
        className="gap-2"
      >
        <UserPlus className="h-4 w-4" />
        <span>Novo Lead</span>
      </Button>
    </div>
  );
};

export default LeadsHeader;
