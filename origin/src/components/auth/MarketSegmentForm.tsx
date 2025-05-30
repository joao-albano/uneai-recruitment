
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const MarketSegmentForm = () => {
  const { control, watch } = useFormContext();
  const selectedSegment = watch('marketSegment');

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Segmento de Atuação</h3>
      <p className="text-sm text-muted-foreground mb-3">
        Informe o segmento principal de atuação da sua empresa
      </p>

      <FormField
        control={control}
        name="marketSegment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Segmento</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o segmento" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="education">Educação</SelectItem>
                <SelectItem value="health">Saúde</SelectItem>
                <SelectItem value="beauty">Estética e Beleza</SelectItem>
                <SelectItem value="services">Serviços Gerais</SelectItem>
                <SelectItem value="commerce">Comércio</SelectItem>
                <SelectItem value="other">Outro</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {selectedSegment === 'other' && (
        <FormField
          control={control}
          name="customSegment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Especifique o segmento</FormLabel>
              <FormControl>
                <Input placeholder="Descreva seu segmento de atuação" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default MarketSegmentForm;
