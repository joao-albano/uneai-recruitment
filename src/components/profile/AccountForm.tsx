
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { Badge } from '@/components/ui/badge';

const profileSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  role: z.string(),
});

interface AccountFormProps {
  user: {
    name: string;
    email: string;
    role: string;
  };
}

const AccountForm: React.FC<AccountFormProps> = ({ user }) => {
  const { currentUser, isSuperAdmin } = useAuth();
  
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser?.name || user.name,
      email: currentUser?.email || user.email,
      role: isSuperAdmin ? 'Super Admin' : (currentUser?.role || user.role),
    },
  });

  // Update form values when currentUser changes
  useEffect(() => {
    if (currentUser) {
      form.reset({
        name: currentUser.name || user.name,
        email: currentUser.email || user.email,
        role: isSuperAdmin ? 'Super Admin' : (currentUser.role || user.role),
      });
    }
  }, [currentUser, user, form, isSuperAdmin]);

  const onSubmit = (values: z.infer<typeof profileSchema>) => {
    console.log('Profile update:', values);
    toast.success('Perfil atualizado com sucesso!');
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Função</FormLabel>
              <FormControl>
                <div className="flex items-center">
                  <Input {...field} disabled className="flex-1" />
                  {isSuperAdmin && (
                    <Badge className="ml-2 bg-amber-500 text-white">UNE CX</Badge>
                  )}
                </div>
              </FormControl>
              <FormMessage />
              {isSuperAdmin && (
                <p className="text-xs text-muted-foreground mt-1">
                  Como Super Admin, você tem acesso completo a todo o sistema e todas as organizações.
                </p>
              )}
            </FormItem>
          )}
        />
        <Button type="submit">Salvar Alterações</Button>
      </form>
    </Form>
  );
};

export default AccountForm;
