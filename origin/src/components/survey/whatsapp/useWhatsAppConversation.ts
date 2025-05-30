
import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useStudents } from '@/context/students/StudentsContext';
import { useAlerts } from '@/context/alerts/AlertsContext';

interface WhatsAppMessage {
  type: 'sent' | 'received';
  content: string;
  time: Date;
  id: string;
}

export const useWhatsAppConversation = () => {
  const [messages, setMessages] = useState<WhatsAppMessage[]>([]);
  const { alerts } = useAlerts();
  const { students } = useStudents();
  const conversationInitialized = useRef(false);
  const questionAnswerSequence = useRef<number>(0);
  
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
      questionAnswerSequence.current = 0;
      const lastAlert = whatsAppAlerts[whatsAppAlerts.length - 1];
      const student = students.find(s => s.id === lastAlert.studentId);
      
      if (student) {
        // Reset messages
        setMessages([]);
        
        // Initial message sent by the school
        const initialMessage = {
          type: 'sent' as const,
          content: `Olá ${student.parentName}, gostaríamos de fazer uma pesquisa sobre ${student.name}. Por favor, responda as seguintes perguntas quando puder:`,
          time: lastAlert.createdAt,
          id: uuidv4()
        };
        
        setMessages([initialMessage]);
        
        // Simulate the parent seeing the message after a delay
        setTimeout(() => {
          const responseMessage = {
            type: 'received' as const,
            content: `Olá, sou o responsável por ${student.name}. Acabei de visualizar as perguntas e responderei agora.`,
            time: new Date(),
            id: uuidv4()
          };
          
          setMessages(prevMessages => [...prevMessages, responseMessage]);
          
          // Start the question-answer sequence
          startQuestionAnswerSequence(student.name);
        }, 2000);
      }
    }
  }, [alerts, students]);

  // Function to send the next question in sequence
  const startQuestionAnswerSequence = (studentName: string) => {
    // Start with first question after short delay
    setTimeout(() => sendNextQuestionAndWaitForAnswer(studentName), 1500);
  };

  // Function to send a question and wait for answer before sending next question
  const sendNextQuestionAndWaitForAnswer = (studentName: string) => {
    const currentIndex = questionAnswerSequence.current;
    
    if (currentIndex >= surveyQuestions.length) {
      // All questions have been asked, send thank you message
      sendThankYouMessage(studentName);
      return;
    }
    
    // Send question
    const questionMessage = {
      type: 'sent' as const,
      content: `${currentIndex + 1}. ${surveyQuestions[currentIndex]}`,
      time: new Date(),
      id: uuidv4()
    };
    
    setMessages(prevMessages => [...prevMessages, questionMessage]);
    
    // Wait for answer
    setTimeout(() => {
      // Add parent response
      const answerMessage = {
        type: 'received' as const,
        content: parentResponses[currentIndex],
        time: new Date(),
        id: uuidv4()
      };
      
      setMessages(prevMessages => [...prevMessages, answerMessage]);
      
      // Increment sequence counter
      questionAnswerSequence.current += 1;
      
      // Send next question after a delay
      setTimeout(() => sendNextQuestionAndWaitForAnswer(studentName), 2000);
    }, 3000); // Parent takes time to respond
  };

  // Function to send thank you message at the end
  const sendThankYouMessage = (studentName: string) => {
    const thankYouMessage = {
      type: 'sent' as const,
      content: `Muito obrigado pelas respostas! Suas informações são muito importantes para o acompanhamento pedagógico de ${studentName}. Se precisar de algo, estamos à disposição.`,
      time: new Date(),
      id: uuidv4()
    };
    
    setMessages(prevMessages => [...prevMessages, thankYouMessage]);
    
    // Parent final acknowledgment
    setTimeout(() => {
      const finalMessage = {
        type: 'received' as const,
        content: `De nada! Agradeço o contato e a preocupação com o desenvolvimento do(a) meu/minha filho(a).`,
        time: new Date(),
        id: uuidv4()
      };
      
      setMessages(prevMessages => [...prevMessages, finalMessage]);
    }, 2000);
  };
  
  return { messages };
};
