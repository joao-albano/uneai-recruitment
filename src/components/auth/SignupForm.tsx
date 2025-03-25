
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import InstitutionDataForm from './InstitutionDataForm';
import AdminDataForm from './AdminDataForm';
import PlanSelection from './PlanSelection';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Etapa 1: Schema para dados do usuário e instituição
const userDataSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  companyName: z.string().min(3, 'O nome da empresa deve ter pelo menos 3 caracteres'),
  cnpj: z.string().min(14, 'CNPJ inválido').max(18, 'CNPJ inválido'),
  address: z.string().min(5, 'Endereço muito curto'),
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().length(2, 'Use a sigla do estado (2 letras)'),
  postalCode: z.string().min(8, 'CEP inválido').max(9, 'CEP inválido'),
  contactPhone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido')
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// Etapa 2: Schema para seleção de plano
const planSelectionSchema = z.object({
  planId: z.string().min(1, 'Selecione um plano')
});

type UserDataFormValues = z.infer<typeof userDataSchema>;
type PlanSelectionFormValues = z.infer<typeof planSelectionSchema>;

interface SignupFormProps {
  onSwitchTab: () => void;
  onSuccess: (email: string) => void;
}

const SignupForm = ({ onSwitchTab, onSuccess }: SignupFormProps) => {
  // Estado para controlar as etapas do cadastro
  const [currentStep, setCurrentStep] = useState<'user-data' | 'plan-selection'>('user-data');
  const [userData, setUserData] = useState<UserDataFormValues | null>(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  
  // Form para dados do usuário (etapa 1)
  const userDataForm = useForm<UserDataFormValues>({
    resolver: zodResolver(userDataSchema),
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
      contactPhone: ''
    },
  });

  // Form para seleção de plano (etapa 2)
  const planSelectionForm = useForm<PlanSelectionFormValues>({
    resolver: zodResolver(planSelectionSchema),
    defaultValues: {
      planId: ''
    },
  });

  // Função para avançar para a etapa de seleção de plano
  const handleNextStep = async (data: UserDataFormValues) => {
    console.log('Dados do usuário:', data);
    
    // Verificar CNPJ
    try {
      setIsCreatingAccount(true);
      
      // Verificar se o CNPJ já existe
      const { data: existingOrg, error: checkError } = await supabase
        .from('organizations')
        .select('id, name')
        .eq('cnpj', data.cnpj)
        .maybeSingle();
      
      if (checkError) {
        console.error('Erro ao verificar CNPJ:', checkError);
        toast.error('Erro ao verificar disponibilidade do CNPJ');
        setIsCreatingAccount(false);
        return;
      }
      
      // Se CNPJ já existe, mostrar erro e parar
      if (existingOrg) {
        console.log('CNPJ já cadastrado:', existingOrg);
        toast.error(`CNPJ já cadastrado para a organização "${existingOrg.name}"`);
        setIsCreatingAccount(false);
        return;
      }
      
      // Armazenar dados do usuário e avançar para próxima etapa
      setUserData(data);
      setCurrentStep('plan-selection');
      setIsCreatingAccount(false);
    } catch (error) {
      console.error('Erro ao verificar dados:', error);
      toast.error('Ocorreu um erro ao verificar seus dados');
      setIsCreatingAccount(false);
    }
  };

  // Função para finalizar o cadastro
  const handleFinishSignup = async (planData: PlanSelectionFormValues) => {
    if (!userData) {
      toast.error('Dados do usuário não encontrados');
      return;
    }
    
    console.log('Dados completos:', { ...userData, planId: planData.planId });
    setIsCreatingAccount(true);
    
    try {
      // Step 1: Create the organization first
      const { data: newOrg, error: orgError } = await supabase
        .from('organizations')
        .insert([{ 
          name: userData.companyName,
          cnpj: userData.cnpj,
          address: userData.address,
          city: userData.city,
          state: userData.state,
          postal_code: userData.postalCode,
          contact_phone: userData.contactPhone,
          is_main_org: false 
        }])
        .select('id')
        .single();
      
      if (orgError) {
        console.error('Erro ao criar organização:', orgError);
        toast.error('Não foi possível criar a organização');
        setIsCreatingAccount(false);
        return;
      }
      
      console.log('Organização criada com sucesso:', newOrg);
      
      // Step 2: Create the user with the organization ID in metadata
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.name,
            company_name: userData.companyName,
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
          
        setIsCreatingAccount(false);
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
          setIsCreatingAccount(false);
          return;
        }
        
        // Step 4: Create subscription with trial period
        const now = new Date();
        const trialEndDate = new Date(now);
        trialEndDate.setDate(now.getDate() + 14); // 14 days trial
        
        const { error: subscriptionError } = await supabase
          .from('subscriptions')
          .insert([{
            user_id: data.user.id,
            organization_id: newOrg.id,
            plan_id: planData.planId,
            status: 'trial',
            trial_start_date: now.toISOString(),
            trial_end_date: trialEndDate.toISOString()
          }]);
          
        if (subscriptionError) {
          console.error('Erro ao criar assinatura:', subscriptionError);
          toast.error('Erro ao configurar período de teste');
          // Continue anyway since the user account is created
        }
      }
      
      // Conta criada com sucesso
      toast.success('Conta criada com sucesso! Você já pode fazer login.');
      onSuccess(userData.email);
      
    } catch (error) {
      console.error('Erro no cadastro:', error);
      toast.error('Ocorreu um erro durante o cadastro');
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const handleBackToUserData = () => {
    setCurrentStep('user-data');
  };

  return (
    <>
      {currentStep === 'user-data' ? (
        <FormProvider {...userDataForm}>
          <Form {...userDataForm}>
            <form onSubmit={userDataForm.handleSubmit(handleNextStep)} className="space-y-6">
              <AdminDataForm />
              
              <Separator />
              
              <InstitutionDataForm />
              
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isCreatingAccount}
              >
                {isCreatingAccount ? 'Verificando dados...' : 'Próximo: Escolher Plano'}
              </Button>
            </form>
          </Form>
        </FormProvider>
      ) : (
        <FormProvider {...planSelectionForm}>
          <Form {...planSelectionForm}>
            <form onSubmit={planSelectionForm.handleSubmit(handleFinishSignup)} className="space-y-6">
              <PlanSelection />
              
              <div className="flex gap-3">
                <Button 
                  type="button" 
                  variant="outline"
                  className="flex-1" 
                  onClick={handleBackToUserData}
                  disabled={isCreatingAccount}
                >
                  Voltar
                </Button>
                
                <Button 
                  type="submit" 
                  className="flex-1" 
                  disabled={isCreatingAccount}
                >
                  {isCreatingAccount ? 'Criando conta...' : 'Finalizar Cadastro'}
                </Button>
              </div>
            </form>
          </Form>
        </FormProvider>
      )}
      
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
