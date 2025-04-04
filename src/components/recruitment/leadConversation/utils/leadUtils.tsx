
import { Badge } from '@/components/ui/badge';
import React from 'react';

export const getStatusBadge = (status: string) => {
  switch(status) {
    case 'novo': return <Badge className="bg-blue-500">Novo</Badge>;
    case 'contatado': return <Badge className="bg-purple-500">Contatado</Badge>;
    case 'interessado': return <Badge className="bg-green-500">Interessado</Badge>;
    case 'agendado': return <Badge className="bg-amber-500">Agendado</Badge>;
    case 'matriculado': return <Badge className="bg-emerald-500">Matriculado</Badge>;
    case 'desistente': return <Badge className="bg-red-500">Desistente</Badge>;
    default: return <Badge className="bg-gray-500">Indefinido</Badge>;
  }
};

export const getEmotionBadge = (emotion?: string) => {
  if (!emotion) return null;
  
  switch(emotion) {
    case 'positivo': return <Badge className="bg-green-500">Positivo</Badge>;
    case 'negativo': return <Badge className="bg-red-500">Negativo</Badge>;
    case 'interessado': return <Badge className="bg-blue-500">Interessado</Badge>;
    case 'hesitante': return <Badge className="bg-amber-500">Hesitante</Badge>;
    case 'confuso': return <Badge className="bg-orange-500">Confuso</Badge>;
    case 'entusiasmado': return <Badge className="bg-purple-500">Entusiasmado</Badge>;
    default: return <Badge className="bg-gray-500">Neutro</Badge>;
  }
};

export const getLeadScore = (score: number) => {
  if (score >= 80) return <Badge className="bg-green-500">Alto ({score}%)</Badge>;
  if (score >= 50) return <Badge className="bg-amber-500">Médio ({score}%)</Badge>;
  return <Badge className="bg-red-500">Baixo ({score}%)</Badge>;
};
