
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { WhatsAppMessage } from '@/types/whatsapp';
import { LeadData } from '@/types/recruitment';

export const useWhatsAppConversation = (lead?: LeadData) => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Carregar mensagens existentes
  useEffect(() => {
    if (lead?.id) {
      // Normalmente aqui faríamos uma chamada à API para buscar o histórico
      // de mensagens para este lead. Por enquanto usaremos dados simulados.
      
      setIsLoading(true);
      
      // Simular delay de carregamento
      const timer = setTimeout(() => {
        const mockMessages: WhatsAppMessage[] = [
          {
            id: uuidv4(),
            studentId: lead.id,
            studentName: lead.name,
            parentName: lead.name,
            to: lead.phone,
            recipientNumber: lead.phone,
            messageType: 'notification',
            status: 'sent',
            sentAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
            message: `Olá ${lead.name}, seja bem-vindo(a)! Notamos seu interesse em nossa instituição. Como posso ajudar?`,
            content: `Olá ${lead.name}, seja bem-vindo(a)! Notamos seu interesse em nossa instituição. Como posso ajudar?`,
          },
          {
            id: uuidv4(),
            studentId: lead.id,
            studentName: lead.name,
            parentName: lead.name,
            to: lead.phone,
            recipientNumber: lead.phone,
            messageType: 'survey',
            status: 'read',
            sentAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5), // 1.5 horas atrás
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1.5),
            message: `Gostaria de mais informações sobre os cursos disponíveis.`,
            content: `Gostaria de mais informações sobre os cursos disponíveis.`,
            responseContent: 'Claro! Temos vários cursos disponíveis.',
            responseTime: new Date(Date.now() - 1000 * 60 * 60 * 1.4),
          },
          {
            id: uuidv4(),
            studentId: lead.id,
            studentName: lead.name,
            parentName: lead.name,
            to: lead.phone,
            recipientNumber: lead.phone,
            messageType: 'notification',
            status: 'sent',
            sentAt: new Date(Date.now() - 1000 * 60 * 60 * 1.4), // 1.4 horas atrás
            createdAt: new Date(Date.now() - 1000 * 60 * 60 * 1.4),
            message: `Claro! Temos cursos em diversas áreas. Com base no seu perfil, recomendamos ${lead.course || 'nossos cursos principais'}. Gostaria de agendar uma visita para conhecer melhor?`,
            content: `Claro! Temos cursos em diversas áreas. Com base no seu perfil, recomendamos ${lead.course || 'nossos cursos principais'}. Gostaria de agendar uma visita para conhecer melhor?`,
          },
        ];
        
        setMessages(mockMessages);
        setIsLoading(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [lead?.id, lead?.name, lead?.phone, lead?.course]);

  const sendMessage = (content: string) => {
    if (!lead) return;
    
    setIsLoading(true);
    
    // Criar mensagem do usuário
    const userMessage: WhatsAppMessage = {
      id: uuidv4(),
      studentId: lead.id,
      studentName: lead.name,
      parentName: lead.name,
      to: lead.phone,
      recipientNumber: lead.phone,
      messageType: 'survey',
      status: 'sent',
      sentAt: new Date(),
      createdAt: new Date(),
      message: content,
      content: content,
    };
    
    // Adicionar a mensagem do usuário
    setMessages(prev => [...prev, userMessage]);
    
    // Simular resposta da IA após um breve delay
    setTimeout(() => {
      let aiResponse = '';
      
      // Lógica simples para gerar respostas contextuais
      if (content.toLowerCase().includes('preço') || content.toLowerCase().includes('valor') || content.toLowerCase().includes('custo')) {
        aiResponse = `Os valores variam de acordo com o curso e modalidade. Para ${lead.course || 'o curso de seu interesse'}, temos opções a partir de R$ 800,00 mensais. Também oferecemos bolsas de estudo!`;
      } else if (content.toLowerCase().includes('visita') || content.toLowerCase().includes('conhecer') || content.toLowerCase().includes('agendar')) {
        aiResponse = `Ótimo! Podemos agendar uma visita para você conhecer nossas instalações. Temos disponibilidade na próxima semana. Qual seria o melhor dia para você?`;
      } else if (content.toLowerCase().includes('matrícula') || content.toLowerCase().includes('inscr')) {
        aiResponse = `Para realizar a matrícula, você precisará dos seguintes documentos: RG, CPF, comprovante de residência e histórico escolar. Posso te ajudar a iniciar o processo online se preferir.`;
      } else {
        aiResponse = `Obrigado pelo seu contato! Estamos sempre à disposição para ajudar com qualquer informação sobre ${lead.course || 'nossos cursos'} ou o processo de matrícula. Há algo específico que gostaria de saber?`;
      }
      
      // Criar mensagem de resposta da IA
      const aiMessage: WhatsAppMessage = {
        id: uuidv4(),
        studentId: lead.id,
        studentName: lead.name,
        parentName: lead.name,
        to: lead.phone,
        recipientNumber: lead.phone,
        messageType: 'notification',
        status: 'sent',
        sentAt: new Date(),
        createdAt: new Date(),
        message: aiResponse,
        content: aiResponse,
      };
      
      // Adicionar a resposta da IA
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return {
    messages,
    isLoading,
    sendMessage,
  };
};
