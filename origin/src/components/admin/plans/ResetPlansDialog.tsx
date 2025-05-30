
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { RefreshCw } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ResetPlansDialogProps {
  onReset: () => void;
}

const ResetPlansDialog: React.FC<ResetPlansDialogProps> = ({ onReset }) => {
  const { language } = useTheme();
  const isPtBR = language === 'pt-BR';
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          {isPtBR ? "Redefinir Padrões" : "Reset to Defaults"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isPtBR ? "Redefinir todos os planos?" : "Reset all plans?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isPtBR 
              ? "Esta ação restaurará todos os planos para suas configurações originais. Você não poderá desfazer esta ação."
              : "This action will restore all plans to their original settings. You cannot undo this action."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {isPtBR ? "Cancelar" : "Cancel"}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onReset}>
            {isPtBR ? "Redefinir" : "Reset"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ResetPlansDialog;
