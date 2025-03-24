
import React, { useState, useEffect, useRef } from 'react';
import { useData } from '@/context/DataContext';
import { MessageSquare, Clock, User, ArrowRight, Check } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const WhatsAppSimulation: React.FC = () => {
  const [messages, setMessages] = useState<{type: 'sent' | 'received', content: string, time: Date, id: string}[]>([]);
  const { alerts, students } = useData();
  const conversationInitialized = useRef(false);
  
  // Complete survey questions array to simulate a full conversation
  const surveyQuestions = [
    "A família mudou de residência nos últimos 6 meses?",
    "O aluno relatou episódios de bullying ou tratamento inadequado?",
    "Como você avalia a integração social do aluno na escola? (1-5)",
    "Com que frequência o aluno enfrenta dificuldades para chegar à escola?",
    "Alguma observação adicional que gostaria de compartilhar com a escola?"
  ];
  
  // Parent responses - somewhat random to simulate real responses
  const parentResponses = [
    "Não, estamos no mesmo endereço há mais de 2 anos.",
    "Sim, ela mencionou que alguns colegas fizeram comentários desagradáveis sobre o cabelo dela na semana passada.",
    "Eu diria 3. Ela tem alguns amigos próximos, mas às vezes se sente excluída de alguns grupos.",
    "Raramente. Apenas quando há problemas no transporte público, o que acontece uma ou duas vezes por mês.",
    "Gostaria de mencionar que ela tem demonstrado bastante interesse em aulas de música. Seria possível a escola oferecer atividades extracurriculares nessa área?"
  ];
  
  // Listen for new WhatsApp-related alerts and simulate a full conversation
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
  
  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
        <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
        <p>Nenhuma mensagem de WhatsApp enviada ainda.</p>
        <p className="text-sm mt-2">
          Utilize o botão "Enviar via WhatsApp" no formulário para simular o envio.
        </p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col space-y-4 pt-4 max-h-[500px] overflow-y-auto pr-2">
      {messages.map((message, index) => (
        <div 
          key={message.id} 
          className={`flex ${message.type === 'sent' ? 'justify-end' : 'justify-start'}`}
        >
          {message.type === 'received' && (
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2">
              <User className="h-4 w-4" />
            </div>
          )}
          <div 
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.type === 'sent' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
          >
            <p className="text-sm">{message.content}</p>
            <div className="flex justify-end items-center mt-1">
              <Clock className="h-3 w-3 mr-1 opacity-70" />
              <span className="text-xs opacity-70">
                {format(message.time, 'HH:mm', { locale: ptBR })}
              </span>
              {message.type === 'sent' && (
                <Check className="h-3 w-3 ml-1 opacity-70" />
              )}
            </div>
          </div>
          {message.type === 'sent' && (
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center ml-2">
              <MessageSquare className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default WhatsAppSimulation;
