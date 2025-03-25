
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import InstitutionDataForm from './InstitutionDataForm';
import AdminDataForm from './AdminDataForm';
import PlanSelection from './PlanSelection';
import { useSignup, signupSchema, SignupFormValues } from '@/hooks/useSignup';
import { usePlans } from '@/hooks/usePlans';

interface SignupFormProps {
  onSwitchTab: () => void;
  onSuccess: (email: string) => void;
}

const SignupForm = ({ onSwitchTab, onSuccess }: SignupFormProps) => {
  const { plans, isLoading: plansLoading, error: plansError, fetchPlans } = usePlans();
  const { isLoading, handleSignup } = useSignup(onSuccess);
  
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
      planId: ''
    },
  });

  const onSubmit = (values: SignupFormValues) => {
    handleSignup(values);
  };

  return (
    <>
      <FormProvider {...form}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AdminDataForm />
            
            <Separator />
            
            <InstitutionDataForm />
            
            <Separator />
            
            <PlanSelection 
              plans={plans} 
              isLoading={plansLoading} 
              error={plansError || undefined}
              onRetry={fetchPlans}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || plansLoading || (plans.length === 0 && !plansError)}
            >
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
