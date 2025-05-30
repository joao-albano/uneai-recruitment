
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface UserErrorAlertProps {
  onRetry: () => void;
}

const UserErrorAlert: React.FC<UserErrorAlertProps> = ({ onRetry }) => {
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTitle>Erro ao carregar usuários</AlertTitle>
      <AlertDescription>
        Não foi possível carregar a lista de usuários.
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry}
          className="ml-4"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Tentar novamente
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default UserErrorAlert;
