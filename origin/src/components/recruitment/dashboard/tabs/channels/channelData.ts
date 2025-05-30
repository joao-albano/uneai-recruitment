
import { ChannelDataType, WeeklyDataType } from './types';

// Dados fictícios para análise de canais
export const channelData: ChannelDataType[] = [
  { name: 'WhatsApp', count: 450, percentage: 32, color: '#25D366', conversion: 24.5 },
  { name: 'Facebook', count: 320, percentage: 23, color: '#1877F2', conversion: 18.2 },
  { name: 'Google', count: 280, percentage: 20, color: '#4285F4', conversion: 22.7 },
  { name: 'Email', count: 175, percentage: 12, color: '#DB4437', conversion: 15.3 },
  { name: 'Eventos', count: 110, percentage: 8, color: '#8B5CF6', conversion: 26.4 },
  { name: 'Instagram', count: 70, percentage: 5, color: '#E1306C', conversion: 19.8 },
];

// Dados de performance semanal
export const weeklyData: WeeklyDataType[] = [
  { name: 'Seg', whatsapp: 45, facebook: 32, google: 28 },
  { name: 'Ter', whatsapp: 52, facebook: 38, google: 30 },
  { name: 'Qua', whatsapp: 48, facebook: 35, google: 25 },
  { name: 'Qui', whatsapp: 65, facebook: 42, google: 32 },
  { name: 'Sex', whatsapp: 72, facebook: 48, google: 38 },
  { name: 'Sáb', whatsapp: 38, facebook: 25, google: 20 },
  { name: 'Dom', whatsapp: 30, facebook: 20, google: 18 },
];

// Função para calcular o total de leads
export const calculateTotalLeads = (): number => {
  return channelData.reduce((sum, item) => sum + item.count, 0);
};

// Função para obter o canal mais efetivo
export const getMostEffectiveChannel = (): { name: string, growth: number } => {
  return { name: 'WhatsApp', growth: 12.5 };
};

// Função para calcular a média de conversão
export const getAverageConversion = (): number => {
  return 21.3;
};
