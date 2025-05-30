
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LeadFormValues } from '../../../types/leadForm';
import { UserCircle, Mail, Phone, CreditCard, MapPin } from 'lucide-react';

interface PersonalInfoCardProps {
  form: UseFormReturn<LeadFormValues>;
  isBasicEducation: boolean;
}

const PersonalInfoCard: React.FC<PersonalInfoCardProps> = ({ form, isBasicEducation }) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-3 md:p-4">
        <CardTitle className="text-sm md:text-base flex items-center gap-2">
          <UserCircle className="h-3 w-3 md:h-4 md:w-4 text-primary" />
          Informações Pessoais
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 md:p-4 pt-0 space-y-3 md:space-y-4">
        <FormField
          control={form.control}
          name="parentName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs md:text-sm">{isBasicEducation ? 'Nome do Responsável' : 'Nome do Interessado'}</FormLabel>
              <FormControl>
                <Input className="text-xs md:text-sm" placeholder={isBasicEducation ? "Nome do responsável" : "Nome do interessado"} {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        {/* Removed student name field for basic education */}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                  <Mail className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  E-mail {isBasicEducation ? 'do Responsável' : ''}
                </FormLabel>
                <FormControl>
                  <Input className="text-xs md:text-sm" placeholder="email@exemplo.com" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                  <Phone className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  Telefone {isBasicEducation ? 'do Responsável' : ''}
                </FormLabel>
                <FormControl>
                  <Input className="text-xs md:text-sm" placeholder="(00) 00000-0000" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name={isBasicEducation ? "parentCPF" : "cpf"}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                <CreditCard className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                CPF {isBasicEducation ? 'do Responsável' : ''}
              </FormLabel>
              <FormControl>
                <Input className="text-xs md:text-sm" placeholder="000.000.000-00" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        
        {isBasicEducation && (
          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                  <MapPin className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                  CEP
                </FormLabel>
                <FormControl>
                  <Input className="text-xs md:text-sm" placeholder="00000-000" {...field} />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        )}
        
        {!isBasicEducation && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <FormField
              control={form.control}
              name="studentPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                    <Phone className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    Telefone Alternativo
                  </FormLabel>
                  <FormControl>
                    <Input className="text-xs md:text-sm" placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="studentEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-xs md:text-sm">
                    <Mail className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
                    E-mail Alternativo
                  </FormLabel>
                  <FormControl>
                    <Input className="text-xs md:text-sm" placeholder="email.alternativo@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
