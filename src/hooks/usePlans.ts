
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
      // Usando a função RPC get_plans
      const { data, error } = await supabase
        .rpc('get_plans') as { data: Plan[] | null, error: any };
          
      if (error) {
        console.error('Erro ao carregar planos:', error);
        setError('Não foi possível carregar os planos disponíveis');
        toast.error('Falha ao carregar planos');
        return;
      }
        
      if (data) {
        console.log('Planos carregados:', data);
        setPlans(data as Plan[]);
        if (data.length === 0) {
          toast.warning('Nenhum plano disponível no momento');
        }
      } else {
        setPlans([]);
        toast.warning('Nenhum plano disponível no momento');
      }
    } catch (error) {
      console.error('Erro ao buscar planos:', error);
      setError('Ocorreu um erro ao carregar os planos');
      toast.error('Erro inesperado ao carregar planos');
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
