
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../../types/leadForm';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Gauge, Clock } from 'lucide-react';

interface PreferenceCardProps {
  form: UseFormReturn<LeadFormValues>;
}

const PreferenceCard: React.FC<PreferenceCardProps> = ({ form }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 md:p-4">
        <CardTitle className="text-sm md:text-base flex items-center gap-2">
          <Gauge className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          Preferências de Contato
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-4 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <FormField
            control={form.control}
            name="enrollmentIntention"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                  <Gauge className="h-3 w-3 text-muted-foreground" />
                  Intenção de Matrícula
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="text-xs md:text-sm h-8 md:h-10">
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
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  Melhor Horário para Contato
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <FormControl>
                    <SelectTrigger className="text-xs md:text-sm h-8 md:h-10">
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

export default PreferenceCard;
