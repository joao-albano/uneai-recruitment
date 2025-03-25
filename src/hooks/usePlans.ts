
import { useState, useEffect, useCallback } from 'react';
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
  
  const fetchPlans = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Buscando planos da tabela plans...');
      const { data, error } = await supabase
        .from('plans')
        .select('*');
          
      if (error) {
        console.error('Erro ao carregar planos:', error);
        setError('Não foi possível carregar os planos disponíveis');
        toast.error('Falha ao carregar planos');
        return;
      }
        
      if (data && data.length > 0) {
        console.log('Planos carregados com sucesso:', data);
        setPlans(data as Plan[]);
      } else {
        console.log('Nenhum plano encontrado');
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
  }, []);

  // Automatically fetch plans when component mounts
  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);
  
  return {
    plans,
    isLoading,
    error,
    fetchPlans
  };
};
