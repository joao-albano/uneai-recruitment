
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ValidationError } from '@/utils/validation/types';

interface ValidationErrorsDisplayProps {
  errors: ValidationError[];
}

const ValidationErrorsDisplay: React.FC<ValidationErrorsDisplayProps> = ({ errors }) => {
  if (errors.length === 0) return null;
  
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Erros de validação</AlertTitle>
      <AlertDescription>
        <div className="mt-2 max-h-40 overflow-auto text-sm">
          <ul className="list-disc pl-5 space-y-1">
            {errors.map((error, index) => (
              <li key={index}>
                Linha {error.row}: {error.message} (coluna: {error.column})
              </li>
            ))}
          </ul>
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default ValidationErrorsDisplay;
