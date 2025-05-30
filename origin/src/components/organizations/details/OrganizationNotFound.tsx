
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrganizationNotFound: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="p-8">
      <Button 
        variant="ghost" 
        className="mb-8" 
        onClick={() => navigate('/organizations')}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
      </Button>
      <div className="flex h-full items-center justify-center p-8">
        <div className="flex flex-col items-center space-y-4 max-w-md text-center">
          <Building className="h-12 w-12 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">
            Organização não encontrada ou você não tem permissão para visualizá-la.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrganizationNotFound;
