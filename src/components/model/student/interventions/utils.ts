
import { Calendar, Clock, Phone, FileText, LineChart, Info } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Intervention } from './types';
import React from 'react';

// Função para renderizar o ícone baseado no tipo de intervenção
export const getInterventionIcon = (type: Intervention['interventionType']) => {
  switch (type) {
    case 'meeting': return <Calendar className="h-4 w-4" />;
    case 'call': return <Phone className="h-4 w-4" />;
    case 'material': return <FileText className="h-4 w-4" />;
    case 'monitoring': return <LineChart className="h-4 w-4" />;
    default: return <Info className="h-4 w-4" />;
  }
};

// Função para formatar data em português
export const formatDate = (date: Date): string => {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};
