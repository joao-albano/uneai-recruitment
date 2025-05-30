
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Campus, Course } from '@/types/recruitment/campus';
import CourseManager from '../CourseManager';

export const campusFormSchema = z.object({
  name: z.string().min(2, { message: 'Nome da unidade é obrigatório' }),
  address: z.string().min(2, { message: 'Endereço é obrigatório' }),
  city: z.string().min(2, { message: 'Cidade é obrigatória' }),
  state: z.string().min(2, { message: 'Estado é obrigatório' }),
  zipCode: z.string().min(8, { message: 'CEP é obrigatório' }),
  phone: z.string().min(10, { message: 'Telefone é obrigatório' }),
});

export type CampusFormValues = z.infer<typeof campusFormSchema>;

interface CampusFormProps {
  defaultValues?: Partial<CampusFormValues>;
  courses: Course[];
  onCoursesChange: (courses: Course[]) => void;
  onSubmit: (values: CampusFormValues) => void;
  onCancel: () => void;
  mode: 'create' | 'edit';
}

const CampusForm: React.FC<CampusFormProps> = ({
  defaultValues,
  courses,
  onCoursesChange,
  onSubmit,
  onCancel,
  mode
}) => {
  const form = useForm<CampusFormValues>({
    resolver: zodResolver(campusFormSchema),
    defaultValues: defaultValues || {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    }
  });

  const handleSubmit = (values: CampusFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Unidade/Campus</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Campus Norte" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Endereço</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Av. Paulista, 1578" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cidade</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: São Paulo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: SP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CEP</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 01310-200" {...field} />
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
                  <Input placeholder="Ex: (11) 3333-4444" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="border rounded-md p-4 mt-6">
          <h3 className="text-lg font-medium mb-4">Cursos Disponíveis</h3>
          <CourseManager 
            courses={courses} 
            onChange={onCoursesChange} 
          />
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            {mode === 'create' ? 'Salvar' : 'Atualizar'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CampusForm;
