
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Campus, Course } from '@/types/recruitment/campus';
import { useCampus } from './hooks/useCampus';
import { toast } from '@/hooks/use-toast';
import CourseManager from './CourseManager';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome da unidade é obrigatório' }),
  address: z.string().min(2, { message: 'Endereço é obrigatório' }),
  city: z.string().min(2, { message: 'Cidade é obrigatória' }),
  state: z.string().min(2, { message: 'Estado é obrigatório' }),
  zipCode: z.string().min(8, { message: 'CEP é obrigatório' }),
  phone: z.string().min(10, { message: 'Telefone é obrigatório' }),
});

type FormValues = z.infer<typeof formSchema>;

interface CampusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campus?: Campus;
  mode: 'create' | 'edit';
}

const CampusDialog: React.FC<CampusDialogProps> = ({ 
  open, 
  onOpenChange, 
  campus, 
  mode 
}) => {
  const { addCampus, updateCampus } = useCampus();
  const [courses, setCourses] = useState<Course[]>(campus?.courses || []);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: campus ? {
      name: campus.name,
      address: campus.address,
      city: campus.city,
      state: campus.state,
      zipCode: campus.zipCode,
      phone: campus.phone
    } : {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    }
  });
  
  const onSubmit = async (values: FormValues) => {
    try {
      if (mode === 'create') {
        // Values will now have all required fields because of the zod schema validation
        await addCampus({
          name: values.name,
          address: values.address,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
          phone: values.phone,
          courses: courses
        });
        toast({
          title: "Unidade criada",
          description: "A unidade foi criada com sucesso."
        });
      } else if (mode === 'edit' && campus) {
        await updateCampus(campus.id, {
          ...values,
          courses: courses
        });
        toast({
          title: "Unidade atualizada",
          description: "As informações foram atualizadas com sucesso."
        });
      }
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Houve um erro ao salvar a unidade. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const handleCoursesChange = (updatedCourses: Course[]) => {
    setCourses(updatedCourses);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Cadastrar Nova Unidade' : 'Editar Unidade'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                onChange={handleCoursesChange} 
              />
            </div>

            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {mode === 'create' ? 'Salvar' : 'Atualizar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CampusDialog;
