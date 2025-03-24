
import React from 'react';
import { ProductType } from '@/context/ProductContext';
import { ProductInfo } from './ProductsGrid';

// Informações dos produtos
export const getProducts = (): ProductInfo[] => [
  {
    id: 'retention' as ProductType,
    title: 'Retenção de Alunos',
    description: 'Sistema para monitoramento e prevenção de evasão escolar com inteligência artificial.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <circle cx="9" cy="9" r="5" />
        <path d="M15 5.6l1-1" />
        <path d="m21.5 12-1-1" />
        <path d="M16 16.6l-1-1" />
        <path d="m10.5 21-1-1" />
        <path d="m3.5 12-1-1" />
        <path d="M4 5.6l1-1" />
      </svg>
    ),
    iconColor: 'text-blue-500',
    isActive: true
  },
  {
    id: 'billing' as ProductType,
    title: 'Cobrança de Mensalidades',
    description: 'Gerenciamento de mensalidades, emissão de boletos e controle de inadimplência.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <path d="M16 14v.01" />
        <path d="M12 14v.01" />
        <path d="M8 14v.01" />
        <path d="M16 10v.01" />
        <path d="M12 10v.01" />
        <path d="M8 10v.01" />
        <path d="M2 10h20" />
      </svg>
    ),
    iconColor: 'text-green-500',
    isActive: false
  },
  {
    id: 'recruitment' as ProductType,
    title: 'Captação de Alunos',
    description: 'Processo de captação, funil de vendas e acompanhamento de matrículas.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M4.9 19a2 2 0 0 1-1.8-1.1 7.2 7.2 0 0 1-.4-6.1 5.8 5.8 0 0 1 3.5-3.7A5.8 5.8 0 0 1 9.1 8h0a5.8 5.8 0 0 1 3 .1 5.8 5.8 0 0 1 3.5 3.8c.3.9.4 1.9.3 2.8a7.4 7.4 0 0 1-.7 3.2A2 2 0 0 1 13.1 19z" />
        <path d="M9 12v-3" />
        <path d="m13 9-4 3" />
        <path d="M9 13v2" />
      </svg>
    ),
    iconColor: 'text-purple-500',
    isActive: false
  }
];
