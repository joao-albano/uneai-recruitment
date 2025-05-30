
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useSupabaseAuth = () => {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Funções de autenticação
  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Erro de login",
          description: error.message,
          variant: "destructive"
        });
        return { success: false, error: error.message };
      }

      toast({
        title: "Login bem-sucedido",
        description: "Você está conectado agora."
      });
      
      return { success: true };
    } catch (error: any) {
      toast({
        title: "Erro de login",
        description: error.message || "Erro desconhecido",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        toast({
          title: "Erro ao sair",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }
      
      toast({
        title: "Logout bem-sucedido",
        description: "Você desconectou com sucesso."
      });
      
      navigate('/login');
      return true;
    } catch (error: any) {
      toast({
        title: "Erro ao sair",
        description: error.message || "Erro desconhecido",
        variant: "destructive"
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, [toast, navigate]);

  return {
    loading,
    login,
    logout
  };
};
