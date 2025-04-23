import { ConversationHistory } from "../../types/history";
import { v4 as uuidv4 } from 'uuid';

export const useConversationHistory = () => {
  const demoHistory: ConversationHistory[] = [
    {
      id: '1',
      leadId: 'lead-001',
      channel: 'whatsapp',
      date: new Date(2024, 3, 15, 14, 30),
      agent: 'Ana Silva',
      status: 'completed',
      registryCode: 'INT001',
      registryDescription: 'Interesse em matrícula',
      messages: [
        { 
          id: uuidv4(),
          content: "Olá, gostaria de informações sobre o curso de Administração", 
          isFromLead: true, 
          timestamp: new Date(2024, 3, 15, 14, 25), 
          isFromAi: false 
        },
        { 
          id: uuidv4(),
          content: "Claro! Temos turmas nos períodos matutino e noturno. Qual seria sua preferência?", 
          isFromLead: false, 
          timestamp: new Date(2024, 3, 15, 14, 27), 
          isFromAi: false 
        },
        { 
          id: uuidv4(),
          content: "Noturno, pois trabalho durante o dia", 
          isFromLead: true, 
          timestamp: new Date(2024, 3, 15, 14, 30), 
          isFromAi: false 
        }
      ]
    },
    {
      id: '2',
      leadId: 'lead-001',
      channel: 'email',
      date: new Date(2024, 3, 14, 10, 15),
      agent: 'Carlos Santos',
      status: 'completed',
      registryCode: 'MAT002',
      registryDescription: 'Matrícula efetivada',
      messages: [
        { 
          id: uuidv4(),
          content: "Prezado(a), seguem os documentos necessários para matrícula...", 
          isFromLead: false, 
          timestamp: new Date(2024, 3, 14, 10, 10), 
          isFromAi: false 
        },
        { 
          id: uuidv4(),
          content: "Recebi os documentos, obrigado!", 
          isFromLead: true, 
          timestamp: new Date(2024, 3, 14, 10, 15), 
          isFromAi: false 
        }
      ]
    },
    {
      id: '3',
      leadId: 'lead-001',
      channel: 'voz',
      date: new Date(2024, 3, 13, 16, 45),
      agent: 'Roberto Oliveira',
      status: 'completed',
      duration: 485, // duração em segundos
      registryCode: 'DUV003',
      registryDescription: 'Dúvidas sobre financiamento',
      transcription: "Conversa sobre opções de financiamento estudantil e bolsas disponíveis. Cliente demonstrou interesse no FIES.",
      messages: [] // Empty array for voice calls since we use transcription instead
    }
  ];

  const filterHistoryByChannel = (history: ConversationHistory[], channel: string) => {
    return history.filter(h => h.channel === channel);
  };

  return {
    demoHistory,
    filterHistoryByChannel,
  };
};
