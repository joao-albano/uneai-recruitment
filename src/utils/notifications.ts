
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
  
  // Cria um objeto de mensagem para o histórico
  const whatsAppMessage: WhatsAppMessage = {
    id: `whatsapp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    studentId: student.id,
    studentName: student.name,
    parentName: student.parentName || 'Responsável',
    recipientNumber: student.parentContact,
    message,
    status: 'sent',
    createdAt: new Date(),
  };
  
  // Se temos uma configuração de WhatsApp, usamos a integração configurada
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
      
      // Atualiza o status da mensagem no histórico
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
      
      // Atualiza o status da mensagem no histórico com erro
      if (addToHistory) {
        whatsAppMessage.status = 'failed';
        whatsAppMessage.errorMessage = errorMessage;
      }
    }
  } else {
    // Simulação do envio (comportamento anterior)
    console.log('Usando simulação de envio (sem integração configurada)');
    console.log(message);
    success = true;
  }
  
  // Adiciona a mensagem ao histórico
  if (addToHistory) {
    addToHistory(whatsAppMessage);
  }
  
  // Sempre adiciona o alerta, independente do sucesso do envio
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
      
      // Atualiza o status da mensagem no histórico (apenas para simulação)
      if (addToHistory) {
        setTimeout(() => {
          const readMessage = { ...whatsAppMessage, status: 'read' as const, updatedAt: new Date() };
          addToHistory(readMessage);
        }, 3000);
      }
    }, 2000);
  }
};
