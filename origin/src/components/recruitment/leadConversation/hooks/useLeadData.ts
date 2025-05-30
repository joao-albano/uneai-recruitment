
import { useState } from 'react';

export interface LeadData {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  funnelStage: string;
  course: string;
  lastContactDate: Date;
  enrollmentScore: number;
  createdAt: Date;
  lastEmotion?: string;
  lastIntent?: string;
  lastObjection?: string;
  channel: string;
  responsiblePerson: string;
  notes?: string;
}

export const useLeadData = (leadId: string): LeadData => {
  // In a real implementation, this would fetch data from an API
  const [leadData] = useState<LeadData>({
    id: leadId || '1',
    name: 'Carlos Silva',
    email: 'carlos.silva@email.com',
    phone: '(11) 98765-4321',
    status: 'interessado',
    funnelStage: 'Contato Inicial',
    course: 'Administração',
    lastContactDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    enrollmentScore: 65,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    lastEmotion: 'interessado',
    lastIntent: 'informacao_curso',
    lastObjection: 'preco_alto',
    channel: 'whatsapp',
    responsiblePerson: 'Juliana Oliveira',
    notes: 'Interessado no curso noturno, mas preocupado com o valor. Tem experiência na área.'
  });

  return leadData;
};
