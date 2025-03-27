
import React from 'react';
import { Users, ShoppingCart, Calendar, UserPlus, FileText, BrainCircuit } from 'lucide-react';
import { ProductInfo } from './ProductsGrid';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';

export const getProducts = async (): Promise<ProductInfo[]> => {
  const allProducts = [
    {
      id: 'retention',
      title: 'Retenção',
      description: 'Sistema para gestão e retenção de clientes/alunos com análise preditiva e ações preventivas.',
      icon: <Users className="h-6 w-6 text-white" />,
      iconColor: 'bg-blue-500',
      isActive: true,
      segments: ['education']
    },
    {
      id: 'sales',
      title: 'Vendas',
      description: 'Plataforma de vendas customizável para qualquer nicho, com funil de vendas e automações.',
      icon: <ShoppingCart className="h-6 w-6 text-white" />,
      iconColor: 'bg-green-500',
      isActive: true,
      segments: ['health', 'beauty', 'services', 'commerce', 'other']
    },
    {
      id: 'scheduling',
      title: 'Agendamento',
      description: 'Sistema de agendamentos adaptável para qualquer nicho com confirmações automáticas e lembretes.',
      icon: <Calendar className="h-6 w-6 text-white" />,
      iconColor: 'bg-purple-500',
      isActive: true,
      segments: ['health', 'beauty']
    },
    {
      id: 'recruitment',
      title: 'Captação',
      description: 'Ferramentas para captação de alunos/clientes com automação de marketing e gestão de leads.',
      icon: <UserPlus className="h-6 w-6 text-white" />,
      iconColor: 'bg-orange-500',
      isActive: true,
      segments: ['education']
    },
    {
      id: 'secretary',
      title: 'Secretaria',
      description: 'Sistema de gestão acadêmica e administrativa para instituições de ensino ou empresas.',
      icon: <FileText className="h-6 w-6 text-white" />,
      iconColor: 'bg-amber-500',
      isActive: true,
      segments: ['education']
    },
    {
      id: 'pedagogical',
      title: 'Pedagógico',
      description: 'Sistema de gestão pedagógica com IA para acompanhamento de aprendizagem e recomendações personalizadas.',
      icon: <BrainCircuit className="h-6 w-6 text-white" />,
      iconColor: 'bg-rose-500',
      isActive: true,
      segments: ['education']
    }
  ];

  try {
    // Try to get the user's organization to check market segment
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: organization, error } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', user.user_metadata?.organization_id)
        .single();
      
      if (organization) {
        // Check for custom segment first
        let segment = 'other';
        
        if (organization.custom_segment) {
          segment = 'other'; // If there's a custom segment, use 'other' category
        } else if (organization.market_segment) {
          segment = organization.market_segment;
        }
        
        // If the user is super admin, show all products
        const authResponse = await supabase.rpc('is_super_admin');
        const isSuperAdmin = authResponse || false;
        
        if (isSuperAdmin) {
          return allProducts;
        }
        
        // Filter products by segment
        return allProducts.filter(product => 
          product.segments.includes(segment) || product.segments.includes('all')
        );
      }
    }
  } catch (error) {
    console.error('Error fetching organization segment:', error);
  }
  
  // If no segment found or error occurred, return all products
  return allProducts;
};
