
import { useState } from 'react';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { normalizeCNPJ } from '@/utils/formatters';

// Schema for user and institution data (first step)
export const userDataSchema = z.object({
  name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  companyName: z.string().min(3, 'O nome da empresa deve ter pelo menos 3 caracteres'),
  cnpj: z.string()
    .min(14, 'CNPJ inválido')
    .max(18, 'CNPJ inválido')
    .refine(val => isValidCNPJ(val), 'CNPJ em formato inválido'),
  address: z.string().min(5, 'Endereço muito curto'),
  city: z.string().min(2, 'Cidade inválida'),
  state: z.string().length(2, 'Use a sigla do estado (2 letras)'),
  postalCode: z.string().min(8, 'CEP inválido').max(9, 'CEP inválido'),
  contactPhone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido')
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// Schema for plan selection (second step)
export const planSelectionSchema = z.object({
  planId: z.string().min(1, 'Selecione um plano')
});

// Import isValidCNPJ from formatters
import { isValidCNPJ } from '@/utils/formatters';

export type UserDataFormValues = z.infer<typeof userDataSchema>;
export type PlanSelectionFormValues = z.infer<typeof planSelectionSchema>;

interface UseSignupFlowParams {
  onSuccess: (email: string) => void;
}

export const useSignupFlow = ({ onSuccess }: UseSignupFlowParams) => {
  const [currentStep, setCurrentStep] = useState<'user-data' | 'plan-selection'>('user-data');
  const [userData, setUserData] = useState<UserDataFormValues | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Function to advance to the plan selection step
  const handleNextStep = async (data: UserDataFormValues) => {
    console.log('Dados do usuário:', data);
    
    try {
      setIsProcessing(true);
      
      // Normalize CNPJ for database comparison
      const normalizedCNPJ = normalizeCNPJ(data.cnpj);
      
      console.log('Verificando CNPJ normalizado:', normalizedCNPJ);
      
      // Verificar se o CNPJ já existe
      const { data: existingOrg, error: checkError } = await supabase
        .from('organizations')
        .select('id, name, cnpj')
        .eq('cnpj', normalizedCNPJ)
        .maybeSingle();
      
      if (checkError) {
        console.error('Erro ao verificar CNPJ:', checkError);
        toast.error('Erro ao verificar disponibilidade do CNPJ');
        setIsProcessing(false);
        return;
      }
      
      // Se CNPJ já existe, mostrar erro e parar
      if (existingOrg) {
        console.log('CNPJ já cadastrado:', existingOrg);
        toast.error(`CNPJ já cadastrado para a organização "${existingOrg.name}"`);
        setIsProcessing(false);
        return;
      }
      
      // Armazenar dados do usuário e avançar para próxima etapa
      // Use a normalized CNPJ in userData to ensure consistent format
      setUserData({
        ...data,
        cnpj: normalizedCNPJ
      });
      setCurrentStep('plan-selection');
      setIsProcessing(false);
    } catch (error) {
      console.error('Erro ao verificar dados:', error);
      toast.error('Ocorreu um erro ao verificar seus dados');
      setIsProcessing(false);
    }
  };

  // Function to finalize the signup
  const handleFinishSignup = async (planData: PlanSelectionFormValues) => {
    if (!userData) {
      toast.error('Dados do usuário não encontrados');
      return;
    }
    
    console.log('Dados completos:', { ...userData, planId: planData.planId });
    setIsProcessing(true);
    
    try {
      // Step 1: Create the organization first with normalized CNPJ
      const { data: newOrg, error: orgError } = await supabase
        .from('organizations')
        .insert([{ 
          name: userData.companyName,
          cnpj: userData.cnpj,  // Already normalized in handleNextStep
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
        setIsProcessing(false);
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
          
        setIsProcessing(false);
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
          setIsProcessing(false);
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
      setIsProcessing(false);
    }
  };

  const handleBackToUserData = () => {
    setCurrentStep('user-data');
  };

  return {
    currentStep,
    isProcessing,
    handleNextStep,
    handleFinishSignup,
    handleBackToUserData
  };
};
