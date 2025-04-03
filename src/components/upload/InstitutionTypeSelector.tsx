
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { InstitutionType } from '@/utils/validation/templateManager';
import { School, GraduationCap, KeyRound } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface InstitutionTypeSelectorProps {
  value: InstitutionType;
  onChange: (value: InstitutionType) => void;
}

const InstitutionTypeSelector: React.FC<InstitutionTypeSelectorProps> = ({
  value,
  onChange
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-sm font-medium mb-2">Tipo de Instituição:</h3>
      <RadioGroup
        value={value}
        onValueChange={(val) => onChange(val as InstitutionType)}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="flex items-start">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="school" id="school" />
            <Label htmlFor="school" className="flex items-center gap-1.5 cursor-pointer">
              <School className="h-4 w-4" />
              Educação Básica
            </Label>
          </div>
          <Badge variant="outline" className="ml-2 bg-amber-50 border-amber-200 text-amber-800 text-xs">
            <KeyRound className="h-3 w-3 mr-1 inline" />
            RA obrigatório
          </Badge>
        </div>
        
        <div className="flex items-start">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="university" id="university" />
            <Label htmlFor="university" className="flex items-center gap-1.5 cursor-pointer">
              <GraduationCap className="h-4 w-4" />
              Ensino Superior (IES)
            </Label>
          </div>
          <Badge variant="outline" className="ml-2 bg-amber-50 border-amber-200 text-amber-800 text-xs">
            <KeyRound className="h-3 w-3 mr-1 inline" />
            Email ou CPF
          </Badge>
        </div>
      </RadioGroup>
    </div>
  );
};

export default InstitutionTypeSelector;
