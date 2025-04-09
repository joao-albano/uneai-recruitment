
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RulesInfo: React.FC = () => {
  return (
    <Alert>
      <AlertDescription>
        As regras de discagem controlam quando e como as ligações automáticas são realizadas. 
        Você pode configurar o número de canais simultâneos, horários permitidos e intervalos 
        de rediscagem para diferentes situações de falha.
      </AlertDescription>
    </Alert>
  );
};

export default RulesInfo;
