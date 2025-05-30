
import React from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface AlertsEmptyStateProps {
  type: 'unread' | 'filtered';
}

const AlertsEmptyState: React.FC<AlertsEmptyStateProps> = ({ type }) => {
  if (type === 'unread') {
    return (
      <Alert>
        <CheckCircle2 className="h-4 w-4" />
        <AlertTitle>Não há alertas não lidos</AlertTitle>
        <AlertDescription>
          Todos os alertas foram visualizados. Verifique a aba "Todos os alertas" para histórico.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Nenhum alerta encontrado</AlertTitle>
      <AlertDescription>
        Não há alertas que correspondam aos critérios de filtro atuais.
      </AlertDescription>
    </Alert>
  );
};

export default AlertsEmptyState;
