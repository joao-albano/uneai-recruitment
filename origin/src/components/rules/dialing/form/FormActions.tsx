
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
  isEditing: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({
  onCancel,
  isSubmitting,
  isEditing
}) => {
  return (
    <div className="flex justify-end space-x-4 mt-6">
      <Button 
        type="button" 
        variant="outline" 
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Cancelar
      </Button>
      <Button 
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isEditing ? 'Atualizando...' : 'Criando...'}
          </>
        ) : (
          isEditing ? 'Atualizar Regra' : 'Criar Regra'
        )}
      </Button>
    </div>
  );
};

export default FormActions;
