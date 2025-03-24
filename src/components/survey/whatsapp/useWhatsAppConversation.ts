
import { useState, useEffect, useRef } from 'react';
import { useData } from '@/context/DataContext';

interface WhatsAppMessage {
  type: 'sent' | 'received';
  content: string;
  time: Date;
  id: string;
}

export const useWhatsAppConversation = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const { alerts, students } = useData();
  const conversationInitialized = useRef(false);
  
  // Survey questions
  const surveyQuestions = [
    "A família mudou de residência nos últimos 6 meses?",
    "O aluno relatou episódios de bullying ou tratamento inadequado?",
    "Como você avalia a integração social do aluno na escola? (1-5)",
    "Com que frequência o aluno enfrenta dificuldades para chegar à escola?",
    "Alguma observação adicional que gostaria de compartilhar com a escola?"
  ];
  
  // Parent responses
  const parentResponses = [
    "Não, estamos no mesmo endereço há mais de 2 anos.",
    "Sim, ela mencionou que alguns colegas fizeram comentários desagradáveis sobre o cabelo dela na semana passada.",
    "Eu diria 3. Ela tem alguns amigos próximos, mas às vezes se sente excluída de alguns grupos.",
    "Raramente. Apenas quando há problemas no transporte público, o que acontece uma ou duas vezes por mês.",
    "Gostaria de mencionar que ela tem demonstrado bastante interesse em aulas de música. Seria possível a escola oferecer atividades extracurriculares nessa área?"
  ];

  // Listen for new WhatsApp-related alerts and simulate a conversation
  useEffect(() => {
    const whatsAppAlerts = alerts.filter(alert => 
      alert.type === 'survey-requested' && 
      alert.message.includes('WhatsApp')
    );
    
    // Only initialize the conversation once when there's at least one alert
    if (whatsAppAlerts.length > 0 && !conversationInitialized.current) {
      conversationInitialized.current = true;
      const lastAlert = whatsAppAlerts[whatsAppAlerts.length - 1];
      const student = students.find(s => s.id === lastAlert.studentId);
      
      if (student) {
        // Reset messages
        setMessages([]);
        
        // Create a unique ID for each message
        const createMessageId = (prefix: string, index: number) => 
          `${prefix}-${lastAlert.id}-${index}-${Date.now()}`;
        
        // Initial message sent by the school
        const initialMessage = {
          type: 'sent' as const,
          content: `Olá ${student.parentName}, gostaríamos de fazer uma pesquisa sobre ${student.name}. Por favor, responda as seguintes perguntas quando puder:`,
          time: lastAlert.createdAt,
          id: createMessageId('initial', 0)
        };
        
        setMessages([initialMessage]);
        
        // Simulate the parent seeing the message after a delay
        setTimeout(() => {
          const responseMessage = {
            type: 'received' as const,
            content: `Olá, sou o responsável por ${student.name}. Acabei de visualizar as perguntas e responderei agora.`,
            time: new Date(new Date().getTime() + 2 * 60 * 1000), // 2 minutes later
            id: createMessageId('response', 0)
          };
          
          setMessages(prevMessages => [...prevMessages, responseMessage]);
          
          // Start questions and answers sequence with delays
          surveyQuestions.forEach((question, index) => {
            // Send question with progressive delay
            setTimeout(() => {
              const questionMessage = {
                type: 'sent' as const,
                content: `${index + 1}. ${question}`,
                time: new Date(new Date().getTime() + (index + 1) * 60 * 1000),
                id: createMessageId('question', index)
              };
              
              setMessages(prevMessages => [...prevMessages, questionMessage]);
              
              // Simulate parent response with delay
              setTimeout(() => {
                const answerMessage = {
                  type: 'received' as const,
                  content: parentResponses[index],
                  time: new Date(new Date().getTime() + (index + 1.5) * 60 * 1000),
                  id: createMessageId('answer', index)
                };
                
                setMessages(prevMessages => [...prevMessages, answerMessage]);
                
                // Add the final thank you message after the last answer
                if (index === surveyQuestions.length - 1) {
                  setTimeout(() => {
                    const thankYouMessage = {
                      type: 'sent' as const,
                      content: `Muito obrigado pelas respostas! Suas informações são muito importantes para o acompanhamento pedagógico de ${student.name}. Se precisar de algo, estamos à disposição.`,
                      time: new Date(new Date().getTime() + 10 * 60 * 1000),
                      id: createMessageId('thanks', 0)
                    };
                    
                    setMessages(prevMessages => [...prevMessages, thankYouMessage]);
                    
                    // Parent final acknowledgment
                    setTimeout(() => {
                      const finalMessage = {
                        type: 'received' as const,
                        content: `De nada! Agradeço o contato e a preocupação com o desenvolvimento do(a) meu/minha filho(a).`,
                        time: new Date(new Date().getTime() + 12 * 60 * 1000),
                        id: createMessageId('final', 0)
                      };
                      
                      setMessages(prevMessages => [...prevMessages, finalMessage]);
                    }, 2000);
                  }, 2000);
                }
              }, 2000 + index * 500); // Staggered response times
            }, 3000 + index * 3000); // Staggered question times
          });
        }, 3000);
      }
    }
  }, [alerts, students, surveyQuestions, parentResponses]);
  
  return { messages };
};
