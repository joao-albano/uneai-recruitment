
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
      icon: <Users className="h-6 w-6" />,
      iconColor: 'bg-blue-50 text-blue-600',
      isActive: true,
      segments: ['education']
    },
    {
      id: 'recruitment',
      title: 'Captação de Alunos',
      description: 'Processo de captação, funil de vendas e acompanhamento de matrículas.',
      icon: <UserPlus className="h-6 w-6" />,
      iconColor: 'bg-purple-50 text-purple-600',
      isActive: true,
      segments: ['education']
    },
    {
      id: 'billing',
      title: 'Cobrança de Mensalidades',
      description: 'Gerenciamento de mensalidades, emissão de boletos e controle de inadimplência.',
      icon: <Receipt className="h-6 w-6" />,
      iconColor: 'bg-green-50 text-green-600',
      isActive: true,
      segments: ['education', 'services']
    },
    {
      id: 'secretary',
      title: 'Secretaria Online',
      description: 'Gestão de documentos e processos administrativos escolares.',
      icon: <FileText className="h-6 w-6" />,
      iconColor: 'bg-amber-50 text-amber-600',
      isActive: true,
      segments: ['education']
    },
    {
      id: 'emotional',
      title: 'Escuta Emocional',
      description: 'Sistema de suporte e acompanhamento emocional para alunos.',
      icon: <HeartPulse className="h-6 w-6" />,
      iconColor: 'bg-red-50 text-red-600',
      isActive: true,
      segments: ['education', 'health']
    },
    {
      id: 'sales',
      title: 'Vendas',
      description: 'Sistema completo para gerenciamento de vendas e conversões.',
      icon: <BrainCircuit className="h-6 w-6" />,
      iconColor: 'bg-indigo-50 text-indigo-600',
      isActive: true,
      segments: ['education', 'services']
    },
    {
      id: 'scheduling',
      title: 'Agendamentos',
      description: 'Sistema de agendamentos e gerenciamento de horários personalizado.',
      icon: <Calendar className="h-6 w-6" />,
      iconColor: 'bg-teal-50 text-teal-600',
      isActive: true,
      segments: ['education', 'health', 'services']
    }
  ];
};
