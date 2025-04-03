
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { InstitutionType } from '@/utils/validation/templateManager';
import { School, GraduationCap } from 'lucide-react';

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
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="school" id="school" />
          <Label htmlFor="school" className="flex items-center gap-1.5 cursor-pointer">
            <School className="h-4 w-4" />
            Educação Básica
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="university" id="university" />
          <Label htmlFor="university" className="flex items-center gap-1.5 cursor-pointer">
            <GraduationCap className="h-4 w-4" />
            Ensino Superior (IES)
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default InstitutionTypeSelector;
