
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
    icon: React.createElement(Users, { className: "h-6 w-6 text-white" }),
    bgColor: 'bg-blue-500'
  },
  {
    id: 'sales',
    title: 'Vendas',
    description: 'Plataforma de vendas customizável para qualquer nicho',
    price: 249.90,
    icon: React.createElement(ShoppingCart, { className: "h-6 w-6 text-white" }),
    bgColor: 'bg-green-500'
  },
  {
    id: 'scheduling',
    title: 'Agendamento',
    description: 'Sistema de agendamentos adaptável para qualquer nicho',
    price: 179.90,
    icon: React.createElement(Calendar, { className: "h-6 w-6 text-white" }),
    bgColor: 'bg-purple-500'
  },
  {
    id: 'recruitment',
    title: 'Captação',
    description: 'Ferramentas para captação de alunos/clientes',
    price: 219.90,
    icon: React.createElement(UserPlus, { className: "h-6 w-6 text-white" }),
    bgColor: 'bg-orange-500'
  },
  {
    id: 'secretary',
    title: 'Secretaria',
    description: 'Sistema de gestão acadêmica e administrativa',
    price: 189.90,
    icon: React.createElement(FileText, { className: "h-6 w-6 text-white" }),
    bgColor: 'bg-amber-500'
  },
  {
    id: 'pedagogical',
    title: 'Pedagógico',
    description: 'Sistema de gestão pedagógica com IA',
    price: 259.90,
    icon: React.createElement(BrainCircuit, { className: "h-6 w-6 text-white" }),
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
  // Se não houver segmento selecionado, retornar array vazio
  if (!marketSegment) {
    return [];
  }
  
  console.log('Buscando produtos para o segmento:', marketSegment);
  
  let productIds: string[] = [];
  
  switch (marketSegment) {
    case 'education':
      productIds = ['retention', 'recruitment', 'secretary', 'pedagogical'];
      break;
    case 'health':
      productIds = ['sales', 'scheduling', 'retention'];
      break;
    case 'beauty':
      productIds = ['sales', 'scheduling', 'retention'];
      break;
    case 'services':
      productIds = ['sales', 'retention', 'scheduling'];
      break;
    case 'commerce':
      productIds = ['sales', 'retention'];
      break;
    case 'other':
      // Para segmento personalizado, mostrar vendas e retenção como padrão
      productIds = ['sales', 'retention'];
      break;
    default:
      // Se for um valor desconhecido, mostrar todos os produtos
      return allProducts;
  }
  
  // Filtrar e retornar apenas os produtos correspondentes ao segmento
  const filteredProducts = allProducts.filter(product => productIds.includes(product.id));
  console.log('Produtos filtrados:', filteredProducts);
  return filteredProducts;
};

export const calculateTotalPrice = (selectedProductIds: string[]): number => {
  return selectedProductIds.reduce((total, productId) => {
    const product = allProducts.find(p => p.id === productId);
    return total + (product?.price || 0);
  }, 0);
};
