
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../types/leadForm';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { MessageSquare, Gauge, Clock } from 'lucide-react';

interface AdditionalInfoFormProps {
  form: UseFormReturn<LeadFormValues>;
}

const AdditionalInfoForm: React.FC<AdditionalInfoFormProps> = ({ form }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 md:p-6">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <MessageSquare className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          Informações Adicionais
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 md:p-6 pt-0 space-y-4">
        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm">Observações</FormLabel>
              <FormControl>
                <Textarea 
                  className="w-full resize-y h-20 md:h-24 text-xs md:text-sm"
                  placeholder="Informações adicionais sobre o lead..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="enrollmentIntention"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                  <Gauge className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  Intenção de Matrícula
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-xs md:text-sm">
                      <SelectValue placeholder="Selecione a intenção" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="bg-white">
                    <SelectItem value="alta">Alta</SelectItem>
                    <SelectItem value="media">Média</SelectItem>
                    <SelectItem value="baixa">Baixa</SelectItem>
                    <SelectItem value="indefinida">Indefinida</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="contactTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  Melhor Horário para Contato
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-xs md:text-sm">
                      <SelectValue placeholder="Selecione o horário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="bg-white">
                    <SelectItem value="manha">Manhã</SelectItem>
                    <SelectItem value="tarde">Tarde</SelectItem>
                    <SelectItem value="noite">Noite</SelectItem>
                    <SelectItem value="qualquer">Qualquer horário</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfoForm;
