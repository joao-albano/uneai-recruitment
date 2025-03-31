
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const LeadCreateDialogHeader: React.FC = () => {
  return (
    <DialogHeader>
      <DialogTitle>Cadastrar Novo Lead</DialogTitle>
      <DialogDescription>
        Preencha as informações do lead para iniciar o processo de captação
      </DialogDescription>
    </DialogHeader>
  );
};

export default LeadCreateDialogHeader;
