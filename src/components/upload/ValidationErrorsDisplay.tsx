
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ValidationError } from '@/utils/validation/types';

interface ValidationErrorsDisplayProps {
  errors: ValidationError[];
}

const ValidationErrorsDisplay: React.FC<ValidationErrorsDisplayProps> = ({ errors }) => {
  if (errors.length === 0) return null;
  
  // Group errors by type for better organization
  const groupedErrors = errors.reduce((acc: Record<string, ValidationError[]>, error) => {
    const key = error.column || 'outros';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(error);
    return acc;
  }, {});
  
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Erros de validação</AlertTitle>
      <AlertDescription>
        <div className="mt-2 max-h-60 overflow-auto text-sm">
          <ul className="list-disc pl-5 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>
                Linha {error.row}: {error.message} {error.column ? `(coluna: ${error.column})` : ''}
              </li>
            ))}
          </ul>
          
          {groupedErrors['contato_responsavel'] && groupedErrors['contato_responsavel'].length > 0 && (
            <div className="mt-3 p-2 bg-red-50 rounded">
              <p className="font-medium">Dica para os erros de contato:</p>
              <p>Certifique-se de que o formato do telefone seja: (99) 99999-9999 ou (99) 9999-9999</p>
              <p>Exemplo correto: (11) 98765-4321</p>
            </div>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ValidationErrorsDisplay;
