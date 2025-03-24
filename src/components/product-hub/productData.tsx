
import React from 'react';
import { ProductType } from '@/context/ProductContext';
import { ProductInfo } from './ProductsGrid';
import { BrainCircuit, Receipt, Users } from 'lucide-react';

// Informações dos produtos
export const getProducts = (): ProductInfo[] => [
  {
    id: 'retention' as ProductType,
    title: 'Retenção de Alunos',
    description: 'Sistema para monitoramento e prevenção de evasão escolar com inteligência artificial.',
    icon: <BrainCircuit className="w-7 h-7 text-white" />,
    iconColor: 'bg-purple-600',
    isActive: true
  },
  {
    id: 'billing' as ProductType,
    title: 'Cobrança de Mensalidades',
    description: 'Gerenciamento de mensalidades, emissão de boletos e controle de inadimplência.',
    icon: <Receipt className="w-7 h-7 text-white" />,
    iconColor: 'bg-green-600',
    isActive: false
  },
  {
    id: 'recruitment' as ProductType,
    title: 'Captação de Alunos',
    description: 'Processo de captação, funil de vendas e acompanhamento de matrículas.',
    icon: <Users className="w-7 h-7 text-white" />,
    iconColor: 'bg-blue-600',
    isActive: false
  }
];
