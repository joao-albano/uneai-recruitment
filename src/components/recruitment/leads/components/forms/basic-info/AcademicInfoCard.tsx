
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LeadFormValues } from '../../../types/leadForm';
import { BookOpen, Book, MapPin, Clock } from 'lucide-react';

// Campi disponíveis
const CAMPI = [
  'Campus Centro',
  'Campus Norte',
  'Campus Sul',
  'Campus Leste',
  'Campus Oeste'
];

// Modalidades de ensino
const MODALITIES = [
  'Presencial',
  'EAD',
  'Híbrido'
];

// Períodos
const PERIODS = [
  'Matutino',
  'Vespertino',
  'Noturno',
  'Integral'
];

interface AcademicInfoCardProps {
  form: UseFormReturn<LeadFormValues>;
  isBasicEducation: boolean;
}

const AcademicInfoCard: React.FC<AcademicInfoCardProps> = ({ form, isBasicEducation }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 md:p-4">
        <CardTitle className="text-sm md:text-base flex items-center gap-2">
          <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          Informações Acadêmicas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-4 pt-0 space-y-3 md:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <FormField
            control={form.control}
            name="course"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                  <Book className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  Curso de Interesse
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-xs md:text-sm">
                      <SelectValue placeholder="Selecione um curso" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="bg-white">
                    {isBasicEducation ? (
                      <>
                        <SelectItem value="Ensino Fundamental">Ensino Fundamental</SelectItem>
                        <SelectItem value="Ensino Médio">Ensino Médio</SelectItem>
                        <SelectItem value="Educação Infantil">Educação Infantil</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Administração">Administração</SelectItem>
                        <SelectItem value="Direito">Direito</SelectItem>
                        <SelectItem value="Engenharia">Engenharia</SelectItem>
                        <SelectItem value="Medicina">Medicina</SelectItem>
                        <SelectItem value="Pedagogia">Pedagogia</SelectItem>
                        <SelectItem value="Psicologia">Psicologia</SelectItem>
                        <SelectItem value="Ciência da Computação">Ciência da Computação</SelectItem>
                        <SelectItem value="MBA">MBA</SelectItem>
                        <SelectItem value="Mestrado">Mestrado</SelectItem>
                        <SelectItem value="Doutorado">Doutorado</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="channel"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm">Canal</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="text-xs md:text-sm">
                      <SelectValue placeholder="Selecione um canal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="bg-white">
                    <SelectItem value="Site">Site</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Google">Google</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Indicação">Indicação</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="campus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                Unidade/Campus
              </FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
                value={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger className="text-xs md:text-sm">
                    <SelectValue placeholder="Selecione uma unidade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent position="popper" className="bg-white">
                  {CAMPI.map((campus) => (
                    <SelectItem key={campus} value={campus}>{campus}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <FormField
            control={form.control}
            name="modality"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs md:text-sm">Modalidade</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger className="text-xs md:text-sm">
                      <SelectValue placeholder="Selecione uma modalidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="bg-white">
                    {MODALITIES.map((modality) => (
                      <SelectItem key={modality} value={modality}>{modality}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                  <Clock className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  Período
                </FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger className="text-xs md:text-sm">
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent position="popper" className="bg-white">
                    {PERIODS.map((period) => (
                      <SelectItem key={period} value={period}>{period}</SelectItem>
                    ))}
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

export default AcademicInfoCard;
