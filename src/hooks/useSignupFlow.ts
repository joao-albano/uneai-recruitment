
import { useState } from 'react';
import { toast } from 'sonner';
import { verifyCNPJ } from './auth/cnpjVerification';
import { processSignup } from './auth/signupProcess';
import { 
  userDataSchema, 
  planSelectionSchema, 
  UserDataFormValues, 
  PlanSelectionFormValues 
} from './auth/validationSchemas';

// Re-export the schemas and types for external usage
export { 
  userDataSchema, 
  planSelectionSchema,
  type UserDataFormValues,
  type PlanSelectionFormValues
};

interface UseSignupFlowParams {
  onSuccess: (email: string) => void;
}

export const useSignupFlow = ({ onSuccess }: UseSignupFlowParams) => {
  const [currentStep, setCurrentStep] = useState<'user-data' | 'product-selection'>('user-data');
  const [userData, setUserData] = useState<UserDataFormValues | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Function to advance to the plan selection step
  const handleNextStep = async (data: UserDataFormValues) => {
    console.log('Dados do usuário:', data);
    
    try {
      setIsProcessing(true);
      
      // Verify CNPJ
      const { valid, normalizedCNPJ } = await verifyCNPJ(data.cnpj);
      
      if (!valid) {
        setIsProcessing(false);
        return;
      }
      
      // Check if CNPJ already exists (just a simulation for now)
      const simulateCnpjCheck = async (cnpj: string) => {
        // This is just a simulation - in a real app, this would be a backend check
        const deniedCnpjs = ['00.000.000/0000-00', '11.111.111/1111-11'];
        return !deniedCnpjs.includes(cnpj);
      };
      
      const cnpjIsAvailable = await simulateCnpjCheck(normalizedCNPJ);
      if (!cnpjIsAvailable) {
        toast.error('CNPJ já cadastrado em nossa base de dados');
        setIsProcessing(false);
        return;
      }
      
      // Armazenar dados do usuário e avançar para próxima etapa
      // Use a normalized CNPJ in userData to ensure consistent format
      setUserData({
        ...data,
        cnpj: normalizedCNPJ
      });
      setCurrentStep('product-selection');
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
    
    setIsProcessing(true);
    
    const success = await processSignup(userData, planData);
    
    if (success) {
      onSuccess(userData.email);
    }
    
    setIsProcessing(false);
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
