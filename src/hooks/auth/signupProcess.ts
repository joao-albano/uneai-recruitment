
import { toast } from 'sonner';
import { UserDataFormValues, PlanSelectionFormValues } from './validationSchemas';

export async function processSignup(
  userData: UserDataFormValues,
  planData: PlanSelectionFormValues
): Promise<boolean> {
  console.log('Dados completos para cadastro:', { 
    userData, 
    selectedProducts: planData.selectedProducts 
  });
  
  try {
    // Mock successful signup without any Supabase calls
    console.log('Simulando cadastro bem-sucedido (modo de teste)');
    console.log('Dados do usuário:', userData);
    console.log('Produtos selecionados:', planData.selectedProducts);
    
    // New users are created as admins of their organizations
    console.log('Usuário criado como admin da organização');
    
    // Simulate a small delay for better user experience
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Success message
    toast.success('Conta criada com sucesso! Você já pode fazer login.');
    return true;
    
  } catch (error) {
    console.error('Erro no cadastro:', error);
    toast.error('Ocorreu um erro durante o cadastro');
    return false;
  }
}
