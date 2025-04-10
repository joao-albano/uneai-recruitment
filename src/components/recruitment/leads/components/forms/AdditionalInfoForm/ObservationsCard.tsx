
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../../types/leadForm';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

interface ObservationsCardProps {
  form: UseFormReturn<LeadFormValues>;
}

const ObservationsCard: React.FC<ObservationsCardProps> = ({ form }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 md:p-4">
        <CardTitle className="text-sm md:text-base flex items-center gap-2">
          <MessageSquare className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          Observações
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-4 pt-0">
        <FormField
          control={form.control}
          name="observations"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm">Observações</FormLabel>
              <FormControl>
                <Textarea 
                  className="w-full resize-y h-16 md:h-20 text-xs md:text-sm"
                  placeholder="Informações adicionais sobre o lead..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default ObservationsCard;
