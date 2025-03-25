
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
      // Tentando primeiro usar a função RPC
      let { data, error } = await supabase.rpc('get_plans') as { data: Plan[] | null, error: any };
      
      // Se falhar com a função RPC, tenta buscar diretamente da tabela
      if (error) {
        console.log('Erro ao buscar planos via RPC, tentando tabela direta:', error);
        
        const result = await supabase
          .from('plans')
          .select('id, name, description, price');
          
        data = result.data;
        error = result.error;
      }
          
      if (error) {
        console.error('Erro ao carregar planos:', error);
        setError('Não foi possível carregar os planos disponíveis');
        toast.error('Falha ao carregar planos');
        return;
      }
        
      if (data && data.length > 0) {
        console.log('Planos carregados:', data);
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
