
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { UserProfile, Organization } from './types';

export const useAuthOperations = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log('Auth state changed:', event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        if (newSession) {
          setIsAuthenticated(true);
          setUserEmail(newSession.user.email);
          
          // Buscar o perfil do usuário no Supabase
          fetchUserProfile(newSession.user.id);
        } else {
          // Limpar o estado quando não há sessão
          setIsAuthenticated(false);
          setIsAdmin(false);
          setIsSuperAdmin(false);
          setUserEmail(null);
          setCurrentUser(null);
          setCurrentOrganization(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: existingSession } }) => {
      setSession(existingSession);
      setUser(existingSession?.user ?? null);
      
      if (existingSession) {
        setIsAuthenticated(true);
        setUserEmail(existingSession.user.email);
        
        // Buscar o perfil do usuário no Supabase
        fetchUserProfile(existingSession.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  
  // Função para buscar o perfil do usuário e sua organização
  const fetchUserProfile = async (userId: string) => {
    try {
      // Buscar o usuário de auth.users para obter metadados
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Erro ao buscar dados do usuário:', userError);
        return;
      }
      
      // Extrair o nome completo dos metadados
      const fullName = userData.user?.user_metadata?.full_name;
      
      // Buscar perfil do usuário
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error('Erro ao buscar perfil:', profileError);
        return;
      }
      
      if (profile) {
        setIsAdmin(profile.is_admin);
        setIsSuperAdmin(profile.is_super_admin);
        
        // Se tiver organization_id, buscar dados da organização
        if (profile.organization_id) {
          const { data: org, error: orgError } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', profile.organization_id)
            .single();
          
          if (orgError) {
            console.error('Erro ao buscar organização:', orgError);
          } else if (org) {
            const organization: Organization = {
              id: org.id,
              name: org.name,
              isMainOrg: org.is_main_org
            };
            
            setCurrentOrganization(organization);
            
            // Atualizar o currentUser com todos os dados
            setCurrentUser({
              name: fullName || profile.email.split('@')[0],
              email: profile.email,
              role: profile.role,
              organizationId: org.id,
              organization: organization,
              isSuperAdmin: profile.is_super_admin
            });
          }
        } else {
          // Se não tiver organização, atualizar apenas com os dados do perfil
          setCurrentUser({
            name: fullName || profile.email.split('@')[0],
            email: profile.email,
            role: profile.role,
            isSuperAdmin: profile.is_super_admin
          });
        }
      }
    } catch (error) {
      console.error('Erro ao buscar dados do usuário:', error);
    }
  };
  
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Erro de login:', error.message);
        
        // Fornecer mensagem de erro mais específica para email não confirmado
        if (error.message.includes('Email not confirmed')) {
          return { success: false, error: 'Email not confirmed. Please check your inbox for the confirmation email.' };
        }
        
        return { success: false, error: error.message };
      }
      
      // Login bem-sucedido - onAuthStateChange vai atualizar o estado
      console.log('Login bem-sucedido:', data);
      return { success: true };
    } catch (error) {
      console.error('Erro de login:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao fazer login' 
      };
    }
  };
  
  const loginWithPhone = async (phone: string, password: string) => {
    try {
      // Formatando o telefone para padrão internacional (adicionando +55 para Brasil)
      const formattedPhone = phone.startsWith('+') ? phone : `+55${phone.replace(/\D/g, '')}`;
      
      const { data, error } = await supabase.auth.signInWithPassword({
        phone: formattedPhone,
        password
      });
      
      if (error) {
        console.error('Erro de login com telefone:', error.message);
        return { success: false, error: error.message };
      }
      
      // Login bem-sucedido - onAuthStateChange vai atualizar o estado
      console.log('Login com telefone bem-sucedido:', data);
      return { success: true };
    } catch (error) {
      console.error('Erro de login com telefone:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erro ao fazer login com telefone' 
      };
    }
  };
  
  const logout = async () => {
    try {
      await supabase.auth.signOut();
      
      // Limpar o estado - onAuthStateChange também vai lidar com isso
      setIsAuthenticated(false);
      setIsAdmin(false);
      setIsSuperAdmin(false);
      setUserEmail(null);
      setCurrentUser(null);
      setCurrentOrganization(null);
      setSession(null);
      setUser(null);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return {
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    userEmail,
    currentUser,
    currentOrganization,
    session,
    login,
    loginWithPhone,
    logout
  };
};
