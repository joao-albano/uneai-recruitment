
import React from 'react';
import { useProduct } from '@/context/ProductContext';
import { getKeyFields, InstitutionType } from '@/utils/validation/templateManager';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KeyRound } from 'lucide-react';

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
  
  if (keyFields.length === 0) {
    return null;
  }

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
      <p className="mt-1 text-xs text-muted-foreground">
        Este campo será usado para identificar registros duplicados durante a importação.
      </p>
    </div>
  );
};

export default KeyFieldSelector;
