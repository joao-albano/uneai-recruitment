
import React from 'react';
import { 
  Users, 
  Receipt, 
  UserPlus,
  Calendar,
  BookOpen,
  FileText,
  BrainCircuit,
  HeartPulse
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
      iconColor: 'bg-blue-100 text-blue-700',
      isActive: true,
      segments: ['education']
    },
    {
      id: 'recruitment',
      title: 'Captação de Alunos',
      description: 'Processo de captação, funil de vendas e acompanhamento de matrículas.',
      icon: <UserPlus className="h-6 w-6 text-white" />,
      iconColor: 'bg-purple-100 text-purple-700',
      isActive: false,
      segments: ['education']
    },
    {
      id: 'billing',
      title: 'Cobrança de Mensalidades',
      description: 'Gerenciamento de mensalidades, emissão de boletos e controle de inadimplência.',
      icon: <Receipt className="h-6 w-6 text-white" />,
      iconColor: 'bg-green-100 text-green-700',
      isActive: false,
      segments: ['education', 'services']
    },
    {
      id: 'secretary',
      title: 'Secretaria Online',
      description: 'Gestão de documentos e processos administrativos escolares.',
      icon: <FileText className="h-6 w-6 text-white" />,
      iconColor: 'bg-amber-100 text-amber-700',
      isActive: false,
      segments: ['education']
    },
    {
      id: 'emotional',
      title: 'Escuta Emocional',
      description: 'Sistema de suporte e acompanhamento emocional para alunos.',
      icon: <HeartPulse className="h-6 w-6 text-white" />,
      iconColor: 'bg-red-100 text-red-700',
      isActive: false,
      segments: ['education', 'health']
    },
    {
      id: 'sales',
      title: 'Vendas',
      description: 'Sistema completo para gerenciamento de vendas e conversões.',
      icon: <BrainCircuit className="h-6 w-6 text-white" />,
      iconColor: 'bg-indigo-100 text-indigo-700',
      isActive: false,
      segments: ['education', 'services']
    },
    {
      id: 'scheduling',
      title: 'Agendamentos',
      description: 'Sistema de agendamentos e gerenciamento de horários personalizado.',
      icon: <Calendar className="h-6 w-6 text-white" />,
      iconColor: 'bg-teal-100 text-teal-700',
      isActive: false,
      segments: ['education', 'health', 'services']
    }
  ];
};
