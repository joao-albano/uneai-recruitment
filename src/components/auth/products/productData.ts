
import React from 'react';
import { 
  Users, 
  ShoppingCart, 
  Calendar, 
  UserPlus, 
  FileText, 
  BrainCircuit 
} from 'lucide-react';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  bgColor: string;
}

// All available products
export const allProducts: Product[] = [
  {
    id: 'retention',
    title: 'Retenção',
    description: 'Sistema para gestão e retenção de clientes/alunos',
    price: 199.90,
    icon: <Users className="h-6 w-6 text-white" />,
    bgColor: 'bg-blue-500'
  },
  {
    id: 'sales',
    title: 'Vendas',
    description: 'Plataforma de vendas customizável para qualquer nicho',
    price: 249.90,
    icon: <ShoppingCart className="h-6 w-6 text-white" />,
    bgColor: 'bg-green-500'
  },
  {
    id: 'scheduling',
    title: 'Agendamento',
    description: 'Sistema de agendamentos adaptável para qualquer nicho',
    price: 179.90,
    icon: <Calendar className="h-6 w-6 text-white" />,
    bgColor: 'bg-purple-500'
  },
  {
    id: 'recruitment',
    title: 'Captação',
    description: 'Ferramentas para captação de alunos/clientes',
    price: 219.90,
    icon: <UserPlus className="h-6 w-6 text-white" />,
    bgColor: 'bg-orange-500'
  },
  {
    id: 'secretary',
    title: 'Secretaria',
    description: 'Sistema de gestão acadêmica e administrativa',
    price: 189.90,
    icon: <FileText className="h-6 w-6 text-white" />,
    bgColor: 'bg-amber-500'
  },
  {
    id: 'pedagogical',
    title: 'Pedagógico',
    description: 'Sistema de gestão pedagógica com IA',
    price: 259.90,
    icon: <BrainCircuit className="h-6 w-6 text-white" />,
    bgColor: 'bg-rose-500'
  }
];

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

export const getProductsBySegment = (marketSegment: string) => {
  let productIds: string[] = [];
  
  switch (marketSegment) {
    case 'education':
      productIds = ['retention', 'recruitment', 'secretary', 'pedagogical'];
      break;
    case 'health':
    case 'beauty':
      productIds = ['sales', 'scheduling'];
      break;
    case 'services':
    case 'commerce':
    case 'other':
      productIds = ['sales'];
      break;
    default:
      // If no segment is selected, don't show any products
      productIds = [];
      break;
  }
  
  return allProducts.filter(product => productIds.includes(product.id));
};

export const calculateTotalPrice = (selectedProductIds: string[]): number => {
  return selectedProductIds.reduce((total, productId) => {
    const product = allProducts.find(p => p.id === productId);
    return total + (product?.price || 0);
  }, 0);
};
