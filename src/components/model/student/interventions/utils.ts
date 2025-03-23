
import { Calendar, Clock, Phone, FileText, LineChart, Info } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Intervention } from './types';
import React from 'react';

// Função para retornar o componente de ícone baseado no tipo de intervenção
export const getInterventionIcon = (type: Intervention['interventionType']) => {
  switch (type) {
    case 'meeting': return Calendar;
    case 'call': return Phone;
    case 'material': return FileText;
    case 'monitoring': return LineChart;
    default: return Info;
  }
};

// Função para formatar data em português
export const formatDate = (date: Date): string => {
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};
