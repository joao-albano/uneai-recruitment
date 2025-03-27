
import { WhatsAppProvider } from '@/types/whatsapp';

export interface WhatsAppConfig {
  provider: WhatsAppProvider;
  apiKey?: string;
  enabled?: boolean;
  webhookUrl?: string;
  reminderTiming?: number; // Days before appointment to send reminder
  templateMessages?: {
    introduction: string;
    followUp: string;
    thankYou: string;
    surveyQuestion1: string;
    surveyQuestion2: string;
    surveyQuestion3: string;
    appointmentReminder: string; // Template for appointment reminders
  };
}

export interface SendMessageResult {
  success: boolean;
  message?: string;
}

export const sendWhatsAppMessage = async (
  config: WhatsAppConfig,
  to: string,
  message: string
): Promise<SendMessageResult> => {
  // This is a mock implementation for demonstration purposes
  console.log(`[WhatsApp] Sending message to ${to}: ${message}`);
  
  if (config.provider === 'disabled' || !config.enabled) {
    console.log('[WhatsApp] Disabled - message would have been sent');
    return { success: false, message: 'WhatsApp integration is disabled' };
  }
  
  try {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simulate a 10% failure rate for demo purposes
    if (Math.random() < 0.1) {
      throw new Error('Simulação de falha de conexão com API WhatsApp');
    }
    
    // In a real implementation, you would make an API request to your WhatsApp provider
    console.log(`[WhatsApp] Successfully sent message via ${config.provider}`);
    
    return { success: true };
  } catch (error) {
    console.error('[WhatsApp] Error sending message:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// Add the test connection function
export const testWhatsAppConnection = async (config: WhatsAppConfig): Promise<boolean> => {
  console.log(`[WhatsApp] Testing connection with provider: ${config.provider}`);
  
  if (config.provider === 'disabled' || !config.enabled) {
    console.log('[WhatsApp] Cannot test connection - provider is disabled');
    return false;
  }

  try {
    // Simulate API request to test the connection
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (config.provider === 'n8n_webhook' && (!config.webhookUrl || !config.webhookUrl.startsWith('http'))) {
      console.log('[WhatsApp] Invalid webhook URL');
      return false;
    }
    
    // In a real implementation, you would make an API request to your provider to test the connection
    console.log(`[WhatsApp] Connection test successful for ${config.provider}`);
    return true;
  } catch (error) {
    console.error('[WhatsApp] Error testing connection:', error);
    return false;
  }
};

// Function to format date and time for WhatsApp messages
export const formatAppointmentDateTime = (date: Date): string => {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }) + ' às ' + 
  date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Gera uma mensagem de template personalizada com os dados do estudante
export const generateTemplateMessage = (
  template: string,
  student: { name: string; parentName?: string },
  date?: Date,
  appointmentTime?: string
): string => {
  let message = template;
  
  // Substituir variáveis padrão
  message = message
    .replace(/\{\{studentName\}\}/g, student.name)
    .replace(/\{\{parentName\}\}/g, student.parentName || 'Responsável');
    
  // Substituir data e hora se fornecidas
  if (date) {
    message = message.replace(/\{\{appointmentDate\}\}/g, formatAppointmentDateTime(date));
  }
  
  if (appointmentTime) {
    message = message.replace(/\{\{appointmentTime\}\}/g, appointmentTime);
  }
  
  // Substituir variáveis com valores padrão se não forem substituídas
  message = message
    .replace(/\{\{appointmentDate\}\}/g, 'data agendada')
    .replace(/\{\{appointmentTime\}\}/g, 'hora agendada');
    
  return message;
};

// Mensagens de template padrão
export const defaultTemplateMessages = {
  introduction: "Olá {{parentName}}, sou da escola do(a) {{studentName}}. Gostaria de fazer algumas perguntas sobre o desempenho e bem-estar dele(a). Você tem alguns minutos?",
  followUp: "Obrigado pelas informações. Estaremos acompanhando o progresso do(a) {{studentName}} com atenção especial baseado em seus comentários.",
  thankYou: "Agradecemos por seu tempo e colaboração. Juntos podemos apoiar o desenvolvimento escolar do(a) {{studentName}}.",
  surveyQuestion1: "Como você avalia o envolvimento do(a) {{studentName}} com as atividades escolares em casa?",
  surveyQuestion2: "Você percebeu alguma dificuldade específica que o(a) {{studentName}} tem demonstrado recentemente?",
  surveyQuestion3: "Existe algo mais que gostaria de compartilhar conosco para ajudarmos no desenvolvimento do(a) {{studentName}}?",
  appointmentReminder: "Olá {{parentName}}, lembramos que {{studentName}} tem um atendimento agendado para {{appointmentDate}}. Por favor, confirme sua presença respondendo esta mensagem. Obrigado!"
};
