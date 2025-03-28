
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useWhatsAppConfig } from '@/hooks/useWhatsAppConfig';

const WhatsAppQRCodeScanner: React.FC = () => {
  const { language } = useTheme();
  const { toast } = useToast();
  const { config, updateConfig } = useWhatsAppConfig();
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  
  const generateQRCode = async () => {
    setIsGenerating(true);
    
    try {
      // In a real implementation, this would make an API call to generate a QR code
      // For now, we'll simulate it with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock QR code image (replace with actual QR code generation in production)
      setQrCodeUrl('data:image/png;base64,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');
      
      toast({
        title: language === 'pt-BR' ? 'QR Code gerado' : 'QR Code generated',
        description: language === 'pt-BR' 
          ? 'Escaneie o código com seu WhatsApp Business' 
          : 'Scan the code with your WhatsApp Business app',
      });
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: language === 'pt-BR' ? 'Erro ao gerar QR code' : 'Error generating QR code',
        description: String(error),
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleConnect = () => {
    // In a real implementation, this would verify the connection status
    updateConfig({ connected: true });
    
    toast({
      title: language === 'pt-BR' ? 'WhatsApp conectado' : 'WhatsApp connected',
      description: language === 'pt-BR' 
        ? 'Conexão estabelecida com sucesso' 
        : 'Connection established successfully',
    });
    
    // Reset QR code after connection
    setQrCodeUrl(null);
  };
  
  // Auto-reset QR code after 2 minutes (QR codes typically expire)
  useEffect(() => {
    if (qrCodeUrl) {
      const timer = setTimeout(() => {
        setQrCodeUrl(null);
      }, 120000); // 2 minutes
      
      return () => clearTimeout(timer);
    }
  }, [qrCodeUrl]);
  
  if (config.connected) {
    return (
      <div className="text-center py-2">
        <Button
          variant="outline"
          onClick={() => updateConfig({ connected: false })}
        >
          {language === 'pt-BR' ? 'Desconectar WhatsApp' : 'Disconnect WhatsApp'}
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {qrCodeUrl ? (
        <div className="flex flex-col items-center space-y-4">
          <div className="border p-4 bg-white">
            <img 
              src={qrCodeUrl} 
              alt="WhatsApp QR Code" 
              className="w-64 h-64"
            />
          </div>
          <p className="text-sm text-center text-muted-foreground">
            {language === 'pt-BR' 
              ? 'Escaneie este código com o WhatsApp Business para conectar' 
              : 'Scan this code with WhatsApp Business to connect'}
          </p>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setQrCodeUrl(null)}
            >
              {language === 'pt-BR' ? 'Cancelar' : 'Cancel'}
            </Button>
            
            {/* This button is for demo purposes only */}
            <Button onClick={handleConnect}>
              {language === 'pt-BR' ? 'Simular conexão' : 'Simulate connection'}
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <Button
            onClick={generateQRCode}
            disabled={isGenerating}
            className="space-x-2"
          >
            {isGenerating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                <span>{language === 'pt-BR' ? 'Gerando...' : 'Generating...'}</span>
              </>
            ) : (
              <>
                <QrCode className="mr-2 h-4 w-4" />
                <span>{language === 'pt-BR' ? 'Gerar QR Code' : 'Generate QR Code'}</span>
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WhatsAppQRCodeScanner;
