
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FormLabel } from '@/components/ui/form';
import { Building2 } from 'lucide-react';
import { LeadFormValues } from '../../../types/leadForm';

interface InstitutionTypeCardProps {
  form: UseFormReturn<LeadFormValues>;
}

const InstitutionTypeCard: React.FC<InstitutionTypeCardProps> = ({ form }) => {
  const institutionType = form.watch('institutionType');

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 md:p-4">
        <CardTitle className="text-sm md:text-base flex items-center gap-2">
          <Building2 className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          Tipo de Instituição
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-4 pt-0">
        <RadioGroup
          value={institutionType}
          onValueChange={(value) => {
            form.setValue('institutionType', value as 'school' | 'university');
            // Resetar curso quando muda o tipo de instituição
            form.setValue('course', '');
          }}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="school" id="school" />
            <FormLabel htmlFor="school" className="font-normal text-xs md:text-sm">Educação Básica</FormLabel>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="university" id="university" />
            <FormLabel htmlFor="university" className="font-normal text-xs md:text-sm">Ensino Superior</FormLabel>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default InstitutionTypeCard;
