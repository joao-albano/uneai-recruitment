
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
}

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchPlans = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Buscando diretamente da tabela plans
      const { data, error } = await supabase
        .from('plans')
        .select('*');
          
      if (error) {
        console.error('Erro ao carregar planos:', error);
        setError('Não foi possível carregar os planos disponíveis');
        return;
      }
        
      if (data) {
        setPlans(data as Plan[]);
      }
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      setError('Ocorreu um erro ao carregar os planos');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPlans();
  }, []);
  
  return {
    plans,
    isLoading,
    error,
    fetchPlans
  };
};
