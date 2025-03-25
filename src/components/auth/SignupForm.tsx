
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import InstitutionDataForm from './InstitutionDataForm';
import AdminDataForm from './AdminDataForm';
import { supabase } from '@/integrations/supabase/client';

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
  const [isLoading, setIsLoading] = useState(false);
  
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

  const onSubmit = async (values: SignupFormValues) => {
    setIsLoading(true);
    console.log('Signup attempt:', values);
    
    try {
      // First, check if the CNPJ already exists
      const { data: existingOrg, error: checkError } = await supabase
        .from('organizations')
        .select('id, name')
        .eq('cnpj', values.cnpj)
        .maybeSingle();
      
      if (checkError) {
        console.error('Erro ao verificar CNPJ:', checkError);
        toast.error('Erro ao verificar disponibilidade do CNPJ');
        setIsLoading(false);
        return;
      }
      
      // If CNPJ already exists, show error and stop
      if (existingOrg) {
        console.log('CNPJ já cadastrado:', existingOrg);
        toast.error(`CNPJ já cadastrado para a organização "${existingOrg.name}"`);
        setIsLoading(false);
        return;
      }
      
      // Step 1: Create the organization first
      const { data: newOrg, error: orgError } = await supabase
        .from('organizations')
        .insert([{ 
          name: values.companyName,
          cnpj: values.cnpj,
          address: values.address,
          city: values.city,
          state: values.state,
          postal_code: values.postalCode,
          contact_phone: values.contactPhone,
          is_main_org: false 
        }])
        .select('id')
        .single();
      
      if (orgError) {
        console.error('Erro ao criar organização:', orgError);
        toast.error('Não foi possível criar a organização');
        setIsLoading(false);
        return;
      }
      
      console.log('Organização criada com sucesso:', newOrg);
      
      // Step 2: Create the user with the organization ID in metadata
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name,
            company_name: values.companyName,
            organization_id: newOrg.id
          }
        }
      });
      
      if (error) {
        console.error('Erro ao criar conta:', error);
        toast.error(error.message || 'Erro ao criar conta');
        
        // Attempt to cleanup the organization if user creation fails
        await supabase
          .from('organizations')
          .delete()
          .eq('id', newOrg.id);
          
        setIsLoading(false);
        return;
      }
      
      // Step 3: Update the user's profile to link to the organization
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            organization_id: newOrg.id,
            is_admin: true // New users are admins of their organization
          })
          .eq('id', data.user.id);
        
        if (profileError) {
          console.error('Erro ao atualizar perfil:', profileError);
          toast.error('Erro ao configurar perfil do usuário');
          setIsLoading(false);
          return;
        }
      }
      
      // Conta criada com sucesso
      toast.success('Conta criada com sucesso! Você já pode fazer login.');
      onSuccess(values.email);
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast.error('Ocorreu um erro durante o cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AdminDataForm />
            
            <Separator />
            
            <InstitutionDataForm />
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Criando conta...' : 'Criar Conta'}
            </Button>
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
