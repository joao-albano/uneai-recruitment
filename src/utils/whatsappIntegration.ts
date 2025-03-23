
import { useToast } from "@/components/ui/use-toast";

export type WhatsAppProvider = 'n8n_webhook' | 'disabled';

export interface WhatsAppConfig {
  provider: WhatsAppProvider;
  webhookUrl?: string;
}

export const testWhatsAppConnection = async (config: WhatsAppConfig): Promise<boolean> => {
  console.log('Testando conexão com WhatsApp:', config);
  
  try {
    if (config.provider === 'disabled') {
      console.log('WhatsApp integration is disabled');
      return false;
    }
    
    if (config.provider === 'n8n_webhook') {
      if (!config.webhookUrl) {
        console.error('Missing webhook URL for n8n integration');
        return false;
      }
      
      // Simulando um teste de webhook
      console.log('Testando conexão com webhook n8n:', config.webhookUrl);
      
      // Em um ambiente real, faríamos uma requisição para verificar se o webhook está acessível
      // Usando no-cors para evitar problemas de CORS ao testar
      const response = await fetch(config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          type: 'test_connection',
          timestamp: new Date().toISOString()
        }),
      });
      
      // Como estamos usando no-cors, não podemos verificar o status da resposta
      // Em um cenário real, o webhook poderia retornar um status para confirmar
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao testar conexão com WhatsApp:', error);
    return false;
  }
};

// Função para enviar mensagem via WhatsApp usando a configuração atual
export const sendWhatsAppMessage = async (
  config: WhatsAppConfig,
  phoneNumber: string,
  message: string
): Promise<{ success: boolean; message?: string }> => {
  console.log(`Tentando enviar mensagem para ${phoneNumber} via ${config.provider}`);
  
  try {
    if (config.provider === 'disabled') {
      return { 
        success: false, 
        message: 'Integração com WhatsApp está desativada' 
      };
    }
    
    if (config.provider === 'n8n_webhook') {
      if (!config.webhookUrl) {
        return { 
          success: false, 
          message: 'URL do webhook não configurada' 
        };
      }
      
      // Enviando via webhook n8n
      console.log('Enviando via webhook n8n:', config.webhookUrl);
      
      await fetch(config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors',
        body: JSON.stringify({
          type: 'send_message',
          phoneNumber,
          message,
          timestamp: new Date().toISOString()
        }),
      });
      
      return { success: true };
    }
    
    return { 
      success: false, 
      message: 'Provedor não reconhecido' 
    };
  } catch (error) {
    console.error('Erro ao enviar mensagem via WhatsApp:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Erro desconhecido' 
    };
  }
};
