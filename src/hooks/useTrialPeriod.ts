
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export const useTrialPeriod = () => {
  const { currentUser } = useAuth();
  const [daysRemaining, setDaysRemaining] = useState<number>(0);
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [trialPeriodDays] = useState<number>(14);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (!currentUser) {
        setShowBanner(false);
        setIsLoading(false);
        return;
      }
      
      try {
        setErrorMessage(null);
        const { data, error } = await supabase
          .from('subscriptions')
          .select('status, trial_start_date, trial_end_date')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
          
        if (error) {
          console.error('Erro ao verificar assinatura:', error);
          setErrorMessage(error.message);
          setIsLoading(false);
          return;
        }
        
        // Se não tem assinatura ou não está em período de teste, não mostrar banner
        if (!data || data.status !== 'trial') {
          setShowBanner(false);
          setIsLoading(false);
          return;
        }
        
        // Calcular dias restantes do período de teste
        const now = new Date();
        const endDate = new Date(data.trial_end_date);
        const msRemaining = endDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(msRemaining / (1000 * 60 * 60 * 24));
        
        setDaysRemaining(daysLeft);
        setIsExpired(daysLeft <= 0);
        setShowBanner(true);
        setIsLoading(false);
        
      } catch (error) {
        console.error('Erro ao buscar dados da assinatura:', error);
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Erro desconhecido ao verificar assinatura');
        }
        setIsLoading(false);
      }
    };
    
    fetchSubscriptionStatus();
  }, [currentUser]);
  
  return {
    daysRemaining,
    showBanner,
    isExpired,
    trialPeriodDays,
    isLoading,
    errorMessage
  };
};
