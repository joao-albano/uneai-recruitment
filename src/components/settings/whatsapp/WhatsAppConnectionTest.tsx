
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare } from 'lucide-react';
import { testWhatsAppConnection } from '@/utils/whatsappIntegration';

interface WhatsAppConnectionTestProps {
  enabled: boolean;
  webhookUrl: string;
}

const WhatsAppConnectionTest: React.FC<WhatsAppConnectionTestProps> = ({ enabled, webhookUrl }) => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [isTesting, setIsTesting] = useState(false);
  
  const handleTestConnection = async () => {
    setIsTesting(true);
    
    // Create a temporary configuration based on current form values
    const testConfig = {
      provider: enabled ? 'n8n_webhook' as const : 'disabled' as const,
      webhookUrl: webhookUrl,
    };
    
    try {
      const isConnected = await testWhatsAppConnection(testConfig);
      
      if (isConnected) {
        toast({
          title: language === 'pt-BR' ? 'Conexão bem-sucedida' : 'Connection successful',
          description: language === 'pt-BR' 
            ? 'A conexão com o webhook do n8n foi estabelecida com sucesso' 
            : 'The connection with the n8n webhook was successfully established',
        });
      } else {
        toast({
          title: language === 'pt-BR' ? 'Falha na conexão' : 'Connection failed',
          description: language === 'pt-BR' 
            ? 'Não foi possível estabelecer conexão com o webhook' 
            : 'Could not establish connection with the webhook',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: language === 'pt-BR' ? 'Erro ao testar' : 'Testing error',
        description: language === 'pt-BR' 
          ? 'Ocorreu um erro ao testar a conexão' 
          : 'An error occurred while testing the connection',
        variant: 'destructive',
      });
    } finally {
      setIsTesting(false);
    }
  };
  
  return (
    <Button 
      type="button" 
      variant="outline" 
      onClick={handleTestConnection}
      disabled={isTesting || !enabled}
    >
      {isTesting ? (
        <>
          <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
          {language === 'pt-BR' ? 'Testando...' : 'Testing...'}
        </>
      ) : (
        <>
          <MessageSquare className="mr-2 h-4 w-4" />
          {language === 'pt-BR' ? 'Testar Conexão' : 'Test Connection'}
        </>
      )}
    </Button>
  );
};

export default WhatsAppConnectionTest;
