
import React, { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle2, Eye, EyeOff } from 'lucide-react';

interface AccessKeyCardProps {
  keyValue: string;
  title: string;
  description: string;
  keyType?: string; // Type of key for analytics or display purposes
}

const AccessKeyCard: React.FC<AccessKeyCardProps> = ({
  keyValue,
  title,
  description,
  keyType = 'access',
}) => {
  const { language } = useTheme();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const copyKey = () => {
    navigator.clipboard.writeText(keyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: language === 'pt-BR' ? 'Chave copiada' : 'Key copied',
      description: language === 'pt-BR' 
        ? `A chave de ${keyType} foi copiada para a área de transferência` 
        : `The ${keyType} key has been copied to your clipboard`,
    });
  };

  const toggleVisibility = () => {
    setShowKey(!showKey);
  };

  // Create a masked version of the key
  const maskedKey = keyValue.substring(0, 16) + '••••••••••••';

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50">
          <div className="font-mono text-sm overflow-hidden text-ellipsis">
            {showKey ? keyValue : maskedKey}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={toggleVisibility}>
              {showKey ? (
                <>
                  <EyeOff className="h-4 w-4 mr-1" />
                  {language === 'pt-BR' ? 'Ocultar' : 'Hide'}
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4 mr-1" />
                  {language === 'pt-BR' ? 'Mostrar' : 'Show'}
                </>
              )}
            </Button>
            <Button variant="outline" size="sm" onClick={copyKey}>
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-1" />
                  {language === 'pt-BR' ? 'Copiado' : 'Copied'}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-1" />
                  {language === 'pt-BR' ? 'Copiar' : 'Copy'}
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessKeyCard;
