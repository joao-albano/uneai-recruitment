
import React from 'react';
import { Users, ShoppingCart, Calendar, UserPlus, FileText, BrainCircuit } from 'lucide-react';
import { ProductType } from '@/context/ProductContext';
import { ProductInfo } from './ProductsGrid';

export const getProducts = (): ProductInfo[] => {
  return [
    {
      id: 'retention',
      title: 'Retenção',
      description: 'Sistema para gestão e retenção de clientes/alunos com análise preditiva e ações preventivas.',
      icon: <Users className="h-6 w-6 text-white" />,
      iconColor: 'bg-blue-500',
      isActive: true
    },
    {
      id: 'sales',
      title: 'Vendas',
      description: 'Plataforma de vendas customizável para qualquer nicho, com funil de vendas e automações.',
      icon: <ShoppingCart className="h-6 w-6 text-white" />,
      iconColor: 'bg-green-500',
      isActive: true
    },
    {
      id: 'scheduling',
      title: 'Agendamento',
      description: 'Sistema de agendamentos adaptável para qualquer nicho com confirmações automáticas e lembretes.',
      icon: <Calendar className="h-6 w-6 text-white" />,
      iconColor: 'bg-purple-500',
      isActive: true
    },
    {
      id: 'recruitment',
      title: 'Captação',
      description: 'Ferramentas para captação de alunos/clientes com automação de marketing e gestão de leads.',
      icon: <UserPlus className="h-6 w-6 text-white" />,
      iconColor: 'bg-orange-500',
      isActive: true
    },
    {
      id: 'secretary',
      title: 'Secretaria',
      description: 'Sistema de gestão acadêmica e administrativa para instituições de ensino ou empresas.',
      icon: <FileText className="h-6 w-6 text-white" />,
      iconColor: 'bg-amber-500',
      isActive: true
    },
    {
      id: 'pedagogical',
      title: 'Pedagógico',
      description: 'Sistema de gestão pedagógica com IA para acompanhamento de aprendizagem e recomendações personalizadas.',
      icon: <BrainCircuit className="h-6 w-6 text-white" />,
      iconColor: 'bg-rose-500',
      isActive: true
    }
  ];
};
