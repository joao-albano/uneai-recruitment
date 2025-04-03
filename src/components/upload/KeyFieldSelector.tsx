
import React, { useEffect } from 'react';
import { useProduct } from '@/context/ProductContext';
import { getKeyFields, InstitutionType } from '@/utils/validation/templateManager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KeyRound } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface KeyFieldSelectorProps {
  institutionType: InstitutionType;
  value: string;
  onChange: (value: string) => void;
}

const KeyFieldSelector: React.FC<KeyFieldSelectorProps> = ({
  institutionType,
  value,
  onChange
}) => {
  const { currentProduct } = useProduct();
  
  // Get available key fields for this product and institution type
  const keyFields = getKeyFields(currentProduct, institutionType);
  
  // When institution type changes, reset the selected key field if it's not valid for the new type
  useEffect(() => {
    const validKeyHeaders = keyFields.map(field => field.header);
    if (value && !validKeyHeaders.includes(value)) {
      onChange(''); // Reset the value if current selection is not valid for this institution type
    } else if (!value && validKeyHeaders.length === 1) {
      // Automatically select the only available key field
      onChange(validKeyHeaders[0]);
    }
  }, [institutionType, value, keyFields, onChange]);
  
  if (keyFields.length === 0) {
    return null;
  }

  // For schools, RA is required and should be the only key field
  if (institutionType === 'school' && currentProduct === 'recruitment') {
    return (
      <div className="mb-4">
        <div className="text-sm font-medium mb-2 flex items-center gap-1.5">
          <KeyRound className="h-4 w-4 text-amber-500" />
          Campo chave único:
        </div>
        <Select value="ra" onValueChange={onChange} disabled>
          <SelectTrigger className="w-full sm:w-72">
            <SelectValue placeholder="Selecione o campo chave para evitar duplicidades" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ra">ra - Número de registro/matrícula do aluno</SelectItem>
          </SelectContent>
        </Select>
        <p className="mt-1 text-xs text-muted-foreground">
          Para educação básica, o campo RA (número de matrícula) é obrigatoriamente usado como chave única.
        </p>
      </div>
    );
  }

  // For universities, allow selection between CPF and email
  return (
    <div className="mb-4">
      <div className="text-sm font-medium mb-2 flex items-center gap-1.5">
        <KeyRound className="h-4 w-4 text-amber-500" />
        Campo para usar como chave única:
      </div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full sm:w-72">
          <SelectValue placeholder="Selecione o campo chave para evitar duplicidades" />
        </SelectTrigger>
        <SelectContent>
          {keyFields.map((field) => (
            <SelectItem key={field.header} value={field.header}>
              {field.header} - {field.description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {institutionType === 'university' && currentProduct === 'recruitment' && (
        <Alert variant="outline" className="mt-2 py-2 border-amber-200 bg-amber-50">
          <AlertDescription className="text-xs text-amber-700">
            Para Ensino Superior, você deve escolher entre Email ou CPF como campo chave.
            Um destes campos deve estar presente em todos os registros.
          </AlertDescription>
        </Alert>
      )}
      <p className="mt-1 text-xs text-muted-foreground">
        Este campo será usado para identificar registros duplicados durante a importação.
      </p>
    </div>
  );
};

export default KeyFieldSelector;
