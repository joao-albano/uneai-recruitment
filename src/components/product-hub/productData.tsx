
import React from 'react';
import { Users, ShoppingCart, Calendar, UserPlus, FileText, BrainCircuit, Receipt } from 'lucide-react';
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
    },
    {
      id: 'billing',
      title: 'Faturamento',
      description: 'Sistema completo de gestão financeira, controle de mensalidades e emissão de boletos e notas fiscais.',
      icon: <Receipt className="h-6 w-6 text-white" />,
      iconColor: 'bg-emerald-500',
      isActive: true,
      segments: ['education', 'health', 'beauty', 'services']
    }
  ];

  try {
    // Try to get the user's information to check if they are a super admin
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // Check if user is super admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_super_admin, email')
        .eq('id', user.id)
        .single();
      
      // Force super admin status for paula.martins@une.cx or if is_super_admin is true in profile
      const isSuperAdmin = (profile?.email === 'paula.martins@une.cx') || 
                          (profile?.is_super_admin === true);
      
      console.log('User check:', { 
        userId: user.id, 
        email: profile?.email,
        isSuperAdmin: isSuperAdmin
      });
      
      // If super admin, return all products as active
      if (isSuperAdmin) {
        console.log('Super admin detected, showing all products');
        return allProducts;
      }
      
      // For regular users, continue with existing logic
      const { data: organization } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', user.user_metadata?.organization_id)
        .single();
      
      if (organization) {
        // Since market_segment doesn't exist in the database,
        // we'll use a default segment based on organization name
        let segment = 'other'; // Default segment
        
        // Determine segment based on organization name
        const orgName = organization.name?.toLowerCase() || '';
        
        if (orgName.includes('school') || orgName.includes('college') || orgName.includes('university') || 
            orgName.includes('escola') || orgName.includes('colégio') || orgName.includes('universidade')) {
          segment = 'education';
        } else if (orgName.includes('clinic') || orgName.includes('hospital') || 
                  orgName.includes('clínica') || orgName.includes('hospital')) {
          segment = 'health';
        } else if (orgName.includes('salon') || orgName.includes('spa') || 
                  orgName.includes('salão') || orgName.includes('beleza')) {
          segment = 'beauty';
        } else if (orgName.includes('store') || orgName.includes('shop') || 
                  orgName.includes('loja')) {
          segment = 'commerce';
        } else if (orgName.includes('service') || orgName.includes('serviço')) {
          segment = 'services';
        }
        
        // Get user's active products
        const { data: userProducts } = await supabase
          .from('user_products')
          .select('product_type, is_active')
          .eq('user_id', user.id);
        
        // If the user has products, mark them as active/inactive based on subscriptions
        if (userProducts && userProducts.length > 0) {
          // Convert to map for quick lookup
          const productMap = new Map(
            userProducts.map(p => [p.product_type, p.is_active])
          );
          
          // Filter products by segment and update active status
          return allProducts
            .filter(product => 
              product.segments.includes(segment) || product.segments.includes('all')
            )
            .map(product => ({
              ...product,
              isActive: productMap.has(product.id) 
                ? Boolean(productMap.get(product.id)) 
                : false // Only purchased products are active
            }));
        }
        
        // Filter products by segment
        return allProducts
          .filter(product => 
            product.segments.includes(segment) || product.segments.includes('all')
          )
          .map(product => ({
            ...product,
            isActive: false // Mark all as inactive until purchased
          }));
      }
    }
  } catch (error) {
    console.error('Error fetching organization segment or user data:', error);
  }
  
  // If no segment found or error occurred, return all products
  return allProducts;
};
