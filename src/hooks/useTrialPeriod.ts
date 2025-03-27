
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
          .select('status, trial_start_date, trial_end_date, product_type')
          .eq('user_id', currentUser.id)
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error('Erro ao verificar assinatura:', error);
          setErrorMessage(error.message);
          setIsLoading(false);
          return;
        }
        
        // If no subscriptions or none are in trial period, don't show banner
        if (!data || data.length === 0) {
          setShowBanner(false);
          setIsLoading(false);
          return;
        }
        
        // Filter only trial subscriptions
        const trialSubscriptions = data.filter(sub => sub.status === 'trial');
        
        if (trialSubscriptions.length === 0) {
          setShowBanner(false);
          setIsLoading(false);
          return;
        }
        
        // Find the subscription with the furthest end date
        const latestEndDate = trialSubscriptions.reduce((latest, sub) => {
          const endDate = new Date(sub.trial_end_date);
          return endDate > latest ? endDate : latest;
        }, new Date(trialSubscriptions[0].trial_end_date));
        
        // Calculate days remaining from the furthest end date
        const now = new Date();
        const msRemaining = latestEndDate.getTime() - now.getTime();
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
