
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSwitchTab: () => void;
}

const LoginForm = ({ onSwitchTab }: LoginFormProps) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleResendConfirmationEmail = async () => {
    const email = form.getValues('email');
    
    if (!email) {
      toast.error('Por favor, digite seu email primeiro');
      return;
    }
    
    setIsResendingEmail(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      if (error) {
        console.error('Erro ao reenviar email:', error);
        toast.error('Não foi possível reenviar o email de confirmação');
      } else {
        toast.success('Email de confirmação reenviado. Por favor, verifique sua caixa de entrada');
        setEmailError(null);
      }
    } catch (error) {
      console.error('Erro ao reenviar email:', error);
      toast.error('Ocorreu um erro ao reenviar o email de confirmação');
    } finally {
      setIsResendingEmail(false);
    }
  };

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setEmailError(null);
    
    try {
      console.log('Login attempt:', values);
      
      // Use o login do AuthContext que agora usa Supabase
      const result = await login(values.email, values.password);
      
      if (result.success) {
        toast.success('Login realizado com sucesso!');
        navigate('/hub'); // Redireciona para o hub de produtos
      } else {
        // Verificar se o erro é de email não confirmado
        if (result.error?.includes('Email not confirmed')) {
          setEmailError('Email não confirmado. Por favor, verifique sua caixa de entrada ou reenvie o email de confirmação.');
        } else {
          toast.error(result.error || 'Email ou senha incorretos');
        }
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@escola.edu" {...field} />
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
          
          {emailError && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Atenção</AlertTitle>
              <AlertDescription>
                {emailError}
                <Button 
                  variant="link" 
                  className="p-0 h-auto font-normal ml-1"
                  onClick={handleResendConfirmationEmail}
                  disabled={isResendingEmail}
                >
                  {isResendingEmail ? 'Reenviando...' : 'Reenviar email de confirmação'}
                </Button>
              </AlertDescription>
            </Alert>
          )}
          
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
