
import React from 'react';
import { 
  Users, 
  Receipt, 
  UserPlus,
  Calendar,
  BookOpen,
  FileText,
  BrainCircuit
} from 'lucide-react';
import { ProductType } from '@/context/ProductContext';
import { ProductInfo } from './ProductsGrid';

// Mock product data with proper icons and descriptions
export const getProducts = async (): Promise<ProductInfo[]> => {
  // In a real app, this would fetch from an API
  return [
    {
      id: 'retention',
      title: 'Retenção de Alunos',
      description: 'Sistema para monitoramento e prevenção de evasão escolar com inteligência artificial.',
      icon: <Users className="h-6 w-6 text-white" />,
      iconColor: 'bg-blue-600',
      isActive: true,
      segments: ['education']
    },
    {
      id: 'billing',
      title: 'Cobrança de Mensalidades',
      description: 'Gerenciamento de mensalidades, emissão de boletos e controle de inadimplência.',
      icon: <Receipt className="h-6 w-6 text-white" />,
      iconColor: 'bg-green-600',
      isActive: false,
      segments: ['education', 'services']
    },
    {
      id: 'recruitment',
      title: 'Captação de Alunos',
      description: 'Processo de captação, funil de vendas e acompanhamento de matrículas.',
      icon: <UserPlus className="h-6 w-6 text-white" />,
      iconColor: 'bg-purple-600',
      isActive: false,
      segments: ['education']
    },
    {
      id: 'scheduling',
      title: 'Agendamento',
      description: 'Sistema de agendamentos e gerenciamento de horários personalizado.',
      icon: <Calendar className="h-6 w-6 text-white" />,
      iconColor: 'bg-teal-600',
      isActive: false,
      segments: ['education', 'health', 'services']
    },
    {
      id: 'pedagogical',
      title: 'Pedagógico',
      description: 'Acompanhamento pedagógico, avaliações e planos de estudo personalizados.',
      icon: <BookOpen className="h-6 w-6 text-white" />,
      iconColor: 'bg-indigo-600',
      isActive: false,
      segments: ['education']
    },
    {
      id: 'secretary',
      title: 'Secretaria',
      description: 'Gestão de documentos e processos administrativos escolares.',
      icon: <FileText className="h-6 w-6 text-white" />,
      iconColor: 'bg-amber-600',
      isActive: false,
      segments: ['education']
    }
  ];
};
