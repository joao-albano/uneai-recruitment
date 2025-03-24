
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const loginSchema = z.object({
  phone: z.string().min(10, 'Telefone inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchTab: () => void;
}

const LoginForm = ({ onSwitchTab }: LoginFormProps) => {
  const navigate = useNavigate();
  const { loginWithPhone } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      console.log('Login attempt:', values);
      
      // Use o login do AuthContext que agora usa telefone
      const result = await loginWithPhone(values.phone, values.password);
      
      if (result.success) {
        toast.success('Login realizado com sucesso!');
        navigate('/hub'); // Redireciona para o hub de produtos
      } else {
        toast.error(result.error || 'Telefone ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      toast.error('Ocorreu um erro durante o login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Form>
      <div className="flex justify-center mt-6">
        <p className="text-sm text-muted-foreground">
          Ainda não tem uma conta?{' '}
          <Button variant="link" className="p-0" onClick={onSwitchTab}>
            Criar conta
          </Button>
        </p>
      </div>
    </>
  );
};

export default LoginForm;
