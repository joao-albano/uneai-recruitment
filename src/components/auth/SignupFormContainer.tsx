
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import InstitutionDataForm from './InstitutionDataForm';
import AdminDataForm from './AdminDataForm';
import PlanSelection from './PlanSelection';
import { useSignupFlow, userDataSchema, planSelectionSchema, UserDataFormValues, PlanSelectionFormValues } from '@/hooks/useSignupFlow';

interface SignupFormContainerProps {
  onSwitchTab: () => void;
  onSuccess: (email: string) => void;
}

const SignupFormContainer = ({ onSwitchTab, onSuccess }: SignupFormContainerProps) => {
  const { 
    currentStep, 
    isProcessing, 
    handleNextStep, 
    handleFinishSignup, 
    handleBackToUserData 
  } = useSignupFlow({ onSuccess });
  
  // Form for user data (step 1)
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

  // Form for plan selection (step 2)
  const planSelectionForm = useForm<PlanSelectionFormValues>({
    resolver: zodResolver(planSelectionSchema),
    defaultValues: {
      planId: ''
    },
  });

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
                disabled={isProcessing}
              >
                {isProcessing ? 'Verificando dados...' : 'Próximo: Escolher Plano'}
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
                  disabled={isProcessing}
                >
                  Voltar
                </Button>
                
                <Button 
                  type="submit" 
                  className="flex-1" 
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Criando conta...' : 'Finalizar Cadastro'}
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

export default SignupFormContainer;
