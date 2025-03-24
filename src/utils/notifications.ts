
import { StudentData, AlertItem } from '../types/data';
import { WhatsAppMessage } from '../types/whatsapp';
import { sendWhatsAppMessage, WhatsAppConfig } from './whatsappIntegration';

export const sendWhatsAppSurvey = async (
  student: StudentData,
  addAlert: (alert: AlertItem) => void,
  addToHistory?: (message: WhatsAppMessage) => void,
  whatsappConfig?: WhatsAppConfig
): Promise<void> => {
  if (!student || !student.parentContact) return;
  
  const message = `Olá ${student.parentName}, gostaríamos de fazer uma pesquisa sobre ${student.name}. Por favor, responda as seguintes perguntas:
  1. A família mudou de residência nos últimos 6 meses?
  2. O aluno relatou episódios de bullying ou tratamento inadequado?
  3. Como você avalia a integração social do aluno na escola? (1-5)
  4. Com que frequência o aluno enfrenta dificuldades para chegar à escola?
  5. Alguma observação adicional?`;
  
  console.log(`Preparando envio de WhatsApp para ${student.parentName}: ${student.parentContact}`);
  
  let success = false;
  let errorMessage = '';
  
  // Create a message object for history
  const whatsAppMessage: WhatsAppMessage = {
    id: `whatsapp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    studentId: student.id,
    studentName: student.name,
    parentName: student.parentName || 'Responsável',
    to: student.parentContact,
    recipientNumber: student.parentContact,
    message,
    status: 'sent',
    createdAt: new Date(),
  };
  
  // If we have a WhatsApp configuration, use the configured integration
  if (whatsappConfig && whatsappConfig.provider !== 'disabled') {
    console.log(`Usando integração ${whatsappConfig.provider} para envio`);
    
    try {
      const result = await sendWhatsAppMessage(
        whatsappConfig,
        student.parentContact,
        message
      );
      
      success = result.success;
      errorMessage = result.message || '';
      
      // Update message status in history
      if (addToHistory) {
        whatsAppMessage.status = success ? 'delivered' : 'failed';
        if (!success && errorMessage) {
          whatsAppMessage.errorMessage = errorMessage;
        }
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      success = false;
      errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      // Update message status in history with error
      if (addToHistory) {
        whatsAppMessage.status = 'failed';
        whatsAppMessage.errorMessage = errorMessage;
      }
    }
  } else {
    // Simulation of sending (previous behavior)
    console.log('Usando simulação de envio (sem integração configurada)');
    console.log(message);
    success = true;
  }
  
  // Add message to history
  if (addToHistory) {
    addToHistory(whatsAppMessage);
  }
  
  // Always add alert, regardless of send success
  addAlert({
    id: `whatsapp-${Date.now()}`,
    studentId: student.id,
    studentName: student.name,
    studentClass: student.class,
    type: 'survey-requested',
    message: success 
      ? `Pesquisa diagnóstica enviada via WhatsApp para ${student.parentName} (${student.parentContact}).`
      : `Falha ao enviar WhatsApp para ${student.parentName}: ${errorMessage}`,
    createdAt: new Date(),
    read: false,
    actionTaken: false,
  });
  
  if (success) {
    setTimeout(() => {
      console.log(`Simulação: ${student.parentName} visualizou a mensagem.`);
      
      // Update message status in history (for simulation only)
      if (addToHistory) {
        setTimeout(() => {
          const readMessage = { ...whatsAppMessage, status: 'read' as const, updatedAt: new Date() };
          addToHistory(readMessage);
        }, 3000);
      }
    }, 2000);
  }
};
