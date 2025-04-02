
import React, { useEffect } from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { LeadFormValues } from '../../types/leadForm';

interface BasicInfoFormProps {
  form: UseFormReturn<LeadFormValues>;
}

// Cursos de educação básica que exigem informações de filhos
const BASIC_EDUCATION_COURSES = [
  'Ensino Fundamental',
  'Ensino Médio',
  'Educação Infantil'
];

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ form }) => {
  // Detectar mudanças no curso selecionado e atualizar requiresChildrenInfo
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'course') {
        const course = value.course as string;
        const requiresChildren = BASIC_EDUCATION_COURSES.includes(course);
        
        form.setValue('requiresChildrenInfo', requiresChildren);
        
        // Se não requer informações de filhos, certificar que há pelo menos um filho vazio
        // para manter a estrutura de dados consistente
        if (!requiresChildren && (!value.children || value.children.length === 0)) {
          form.setValue('children', []);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="parentName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome Completo</FormLabel>
            <FormControl>
              <Input placeholder="Nome do responsável/interessado" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="email@exemplo.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="(00) 00000-0000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="course"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso de Interesse</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ensino Fundamental">Ensino Fundamental</SelectItem>
                  <SelectItem value="Ensino Médio">Ensino Médio</SelectItem>
                  <SelectItem value="Educação Infantil">Educação Infantil</SelectItem>
                  <SelectItem value="Graduação">Graduação</SelectItem>
                  <SelectItem value="Pós-Graduação">Pós-Graduação</SelectItem>
                  <SelectItem value="MBA">MBA</SelectItem>
                  <SelectItem value="Mestrado">Mestrado</SelectItem>
                  <SelectItem value="Doutorado">Doutorado</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="channel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Canal</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um canal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Site">Site</SelectItem>
                  <SelectItem value="Facebook">Facebook</SelectItem>
                  <SelectItem value="Instagram">Instagram</SelectItem>
                  <SelectItem value="Google">Google</SelectItem>
                  <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                  <SelectItem value="Indicação">Indicação</SelectItem>
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

export default BasicInfoForm;
