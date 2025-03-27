
import { WhatsAppMessage } from '@/types/whatsapp';
import { v4 as uuidv4 } from 'uuid';

export const generateDemoMessages = (): WhatsAppMessage[] => {
  const statuses: ('sent' | 'delivered' | 'read' | 'failed')[] = ['sent', 'delivered', 'read', 'failed'];
  const studentNames = ['Maria Silva', 'João Santos', 'Ana Oliveira', 'Pedro Costa', 'Carla Pereira', 'Lucas Ferreira', 'Juliana Martins'];
  const parentNames = ['Sr. Silva', 'Sra. Santos', 'Sr. Oliveira', 'Sra. Costa', 'Sr. Pereira', 'Sra. Ferreira', 'Sr. Martins'];
  const phoneNumbers = ['5511987654321', '5511987654322', '5511987654323', '5511987654324', '5511987654325', '5511987654326', '5511987654327'];
  
  const messages: WhatsAppMessage[] = [];
  
  // Generate 25 demo messages
  for (let i = 0; i < 25; i++) {
    const randomStudentIndex = Math.floor(Math.random() * studentNames.length);
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const daysAgo = Math.floor(Math.random() * 14); // Random day in the last 2 weeks
    const createdAt = new Date();
    createdAt.setDate(createdAt.getDate() - daysAgo);
    
    // Randomly generate response for some messages
    const hasResponse = Math.random() > 0.4; // 60% chance of having a response
    const responseTime = hasResponse ? new Date(createdAt.getTime() + Math.floor(Math.random() * 3600000)) : undefined; // Response within an hour
    
    const messageId = `whatsapp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    messages.push({
      id: messageId,
      studentId: uuidv4(),
      studentName: studentNames[randomStudentIndex],
      parentName: parentNames[randomStudentIndex],
      to: phoneNumbers[randomStudentIndex],
      recipientNumber: phoneNumbers[randomStudentIndex],
      messageType: 'survey',
      status: randomStatus,
      sentAt: createdAt,
      createdAt: createdAt,
      updatedAt: responseTime,
      message: 'Olá, estamos realizando uma pesquisa sobre o desempenho escolar do seu filho(a). Poderia responder algumas perguntas?',
      content: 'Olá, estamos realizando uma pesquisa sobre o desempenho escolar do seu filho(a). Poderia responder algumas perguntas?',
      responseContent: hasResponse ? 'Sim, posso responder agora.' : undefined,
      responseTime: responseTime,
      errorMessage: randomStatus === 'failed' ? 'Falha na entrega da mensagem' : undefined
    });
  }
  
  // Sort by created date (newest first)
  messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  
  return messages;
};
