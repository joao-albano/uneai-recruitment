
import { WhatsAppProvider } from '@/types/whatsapp';

export interface WhatsAppConfig {
  provider: WhatsAppProvider;
  apiKey?: string;
  enabled?: boolean;
  webhookUrl?: string;
  templateMessages?: {
    introduction: string;
    followUp: string;
    thankYou: string;
    surveyQuestion1: string;
    surveyQuestion2: string;
    surveyQuestion3: string;
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

// Add the missing test connection function
export const testWhatsAppConnection = async (config: Pick<WhatsAppConfig, 'provider' | 'webhookUrl'>): Promise<boolean> => {
  console.log(`[WhatsApp] Testing connection with provider: ${config.provider}`);
  
  if (config.provider === 'disabled') {
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
