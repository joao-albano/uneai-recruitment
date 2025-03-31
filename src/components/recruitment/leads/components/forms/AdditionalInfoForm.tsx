
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../types/leadForm';

interface AdditionalInfoFormProps {
  form: UseFormReturn<LeadFormValues>;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="observations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações</FormLabel>
            <FormControl>
              <Textarea 
                className="w-full resize-y h-24"
                placeholder="Informações adicionais sobre o lead..."
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="enrollmentIntention"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Intenção de Matrícula</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a intenção" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="indefinida">Indefinida</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="contactTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Melhor Horário para Contato</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="manha">Manhã</SelectItem>
                  <SelectItem value="tarde">Tarde</SelectItem>
                  <SelectItem value="noite">Noite</SelectItem>
                  <SelectItem value="qualquer">Qualquer horário</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
