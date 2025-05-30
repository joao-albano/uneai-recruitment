
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormValues } from './SurveyFormSchema';

interface ParentInfoProps {
  form: UseFormReturn<FormValues>;
}

const ParentInfo: React.FC<ParentInfoProps> = ({ form }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 mt-2">
      <FormField
        control={form.control}
        name="parentName"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium mb-2 block">Nome do responsável</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Nome completo" className="h-12 px-3" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="parentContact"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium mb-2 block">Contato</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Telefone ou email" className="h-12 px-3" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ParentInfo;
