
export interface WhatsAppConfig {
  provider: 'disabled' | 'twilio' | 'messagebird' | 'whatsapp-web';
  apiKey: string;
  enabled: boolean;
  templateMessages: {
    introduction: string;
    followUp: string;
    thankYou: string;
    surveyQuestion1: string;
    surveyQuestion2: string;
    surveyQuestion3: string;
  };
}

export const sendWhatsAppMessage = async (
  to: string,
  message: string,
  config: WhatsAppConfig
): Promise<boolean> => {
  // This is a mock implementation for demonstration purposes
  console.log(`[WhatsApp] Sending message to ${to}: ${message}`);
  
  if (config.provider === 'disabled' || !config.enabled) {
    console.log('[WhatsApp] Disabled - message would have been sent');
    return false;
  }
  
  try {
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, you would make an API request to your WhatsApp provider
    console.log(`[WhatsApp] Successfully sent message via ${config.provider}`);
    
    return true;
  } catch (error) {
    console.error('[WhatsApp] Error sending message:', error);
    return false;
  }
};
