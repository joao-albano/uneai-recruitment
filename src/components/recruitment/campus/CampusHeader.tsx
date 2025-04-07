
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import CampusDialog from './CampusDialog';

const CampusHeader: React.FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Cadastro de Unidades</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os campi e unidades da sua instituição que serão utilizados no direcionamento geográfico
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Nova Unidade
        </Button>
      </div>

      <CampusDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        mode="create"
      />
    </div>
  );
};

export default CampusHeader;
