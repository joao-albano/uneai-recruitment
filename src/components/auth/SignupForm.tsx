
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import InstitutionDataForm from './InstitutionDataForm';
import AdminDataForm from './AdminDataForm';

const signupSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  // Campos para dados da empresa
  companyName: z.string().min(3, 'O nome da empresa deve ter pelo menos 3 caracteres'),
  cnpj: z.string().min(14, 'CNPJ inválido').max(18, 'CNPJ inválido'),
  address: z.string().min(5, 'Endereço muito curto'),
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().length(2, 'Use a sigla do estado (2 letras)'),
  postalCode: z.string().min(8, 'CEP inválido').max(9, 'CEP inválido'),
  contactPhone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

interface SignupFormProps {
  onSwitchTab: () => void;
  onSuccess: (email: string) => void;
}

const SignupForm = ({ onSwitchTab, onSuccess }: SignupFormProps) => {
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      cnpj: '',
      address: '',
      city: '',
      state: '',
      postalCode: '',
      contactPhone: '',
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    console.log('Signup attempt:', values);
    
    // Mock signup success
    toast.success('Conta criada com sucesso! Você já pode fazer login.');
    onSuccess(values.email);
  };

  return (
    <>
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Use the new AdminDataForm component */}
            <AdminDataForm />
            
            <Separator />
            
            {/* Use the existing InstitutionDataForm component */}
            <InstitutionDataForm />
            
            <Button type="submit" className="w-full">Criar Conta</Button>
          </form>
        </Form>
      </FormProvider>
      <div className="flex justify-center mt-6">
        <p className="text-sm text-muted-foreground">
          Já possui uma conta?{' '}
          <Button variant="link" className="p-0" onClick={onSwitchTab}>
            Fazer login
          </Button>
        </p>
      </div>
    </>
  );
};

export default SignupForm;
