
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/hooks/use-toast';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';
import { Scan } from 'lucide-react';

export const WhatsAppQRCodeScanner: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { updateConfig } = useWhatsAppConfig();
  const [isScanning, setIsScanning] = useState(false);
  
  const handleConnect = () => {
    setIsScanning(true);
    
    // Simulate QR code scanning process
    setTimeout(() => {
      updateConfig({ connected: true });
      
      toast({
        title: language === 'pt-BR' ? 'WhatsApp conectado' : 'WhatsApp connected',
        description: language === 'pt-BR' 
          ? 'Seu WhatsApp Business foi conectado com sucesso' 
          : 'Your WhatsApp Business has been successfully connected',
      });
      
      setIsScanning(false);
    }, 2000);
  };
  
  return (
    <div className="mt-4">
      <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center justify-center">
        <div className="border-4 border-gray-300 rounded-md p-4 mb-4 w-48 h-48 flex items-center justify-center">
          {isScanning ? (
            <div className="animate-pulse text-center">
              <Scan size={80} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                {language === 'pt-BR' ? 'Escaneando...' : 'Scanning...'}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <img 
                src="/placeholder.svg" 
                alt="QR Code" 
                className="w-32 h-32 mx-auto" 
              />
              <p className="text-xs text-gray-500 mt-2">
                {language === 'pt-BR' ? 'QR Code de exemplo' : 'Sample QR Code'}
              </p>
            </div>
          )}
        </div>
        <Button 
          onClick={handleConnect} 
          disabled={isScanning}
          className="w-full"
        >
          {isScanning ? (
            <>
              <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-background border-t-transparent" />
              {language === 'pt-BR' ? 'Conectando...' : 'Connecting...'}
            </>
          ) : (
            <>
              <Scan className="mr-2 h-4 w-4" />
              {language === 'pt-BR' ? 'Conectar WhatsApp' : 'Connect WhatsApp'}
            </>
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-2 text-center">
        {language === 'pt-BR'
          ? 'Abra o WhatsApp no seu telefone, toque em Menu > WhatsApp Web e escaneie o código'
          : 'Open WhatsApp on your phone, tap Menu > WhatsApp Web and scan the code'}
      </p>
    </div>
  );
};

export default WhatsAppQRCodeScanner;
