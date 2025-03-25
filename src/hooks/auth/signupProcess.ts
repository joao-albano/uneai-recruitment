
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { UserDataFormValues, PlanSelectionFormValues } from './validationSchemas';

export async function processSignup(
  userData: UserDataFormValues,
  planData: PlanSelectionFormValues
): Promise<boolean> {
  console.log('Dados completos para cadastro:', { 
    userData, 
    planId: planData.planId 
  });
  
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
      return false;
    }
    
    console.log('Organização criada com sucesso:', newOrg);
    
    // Step 2: Get the plan information to determine associated products
    const { data: planInfo, error: planError } = await supabase
      .from('plans')
      .select('*, related_product')
      .eq('id', planData.planId)
      .single();
      
    if (planError) {
      console.error('Erro ao obter informações do plano:', planError);
      // Continue anyway as this is not critical
    }
    
    // Step 3: Create the user with the organization ID in metadata
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
          
      return false;
    }
    
    // Step 4: Update the user's profile to link to the organization
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
        return false;
      }
      
      // Step 5: Associate organization with products based on plan
      if (planInfo && planInfo.related_product) {
        const { error: productError } = await supabase
          .from('organization_products')
          .insert([{
            organization_id: newOrg.id,
            type: planInfo.related_product,
            active: true
          }]);
          
        if (productError) {
          console.error('Erro ao associar produto:', productError);
          // Non-critical, so continue
        } else {
          console.log('Produto associado com sucesso à organização!');
        }
      }
      
      // Step 6: Create subscription with trial period
      const now = new Date();
      const trialEndDate = new Date(now);
      trialEndDate.setDate(now.getDate() + 14); // 14 days trial
      
      console.log('Criando assinatura com plano:', planData.planId);
      
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
      } else {
        console.log('Assinatura criada com sucesso!');
      }
    }
    
    // Conta criada com sucesso
    toast.success('Conta criada com sucesso! Você já pode fazer login.');
    return true;
    
  } catch (error) {
    console.error('Erro no cadastro:', error);
    toast.error('Ocorreu um erro durante o cadastro');
    return false;
  }
}
