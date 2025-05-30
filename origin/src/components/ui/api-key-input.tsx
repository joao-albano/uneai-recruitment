
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Copy, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '@/context/ThemeContext';

interface ApiKeyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
}

const ApiKeyInput = React.forwardRef<HTMLInputElement, ApiKeyInputProps>(
  ({ value, onChange, placeholder = '', className, name, ...props }, ref) => {
    const [showKey, setShowKey] = useState(false);
    const [copied, setCopied] = useState(false);
    const { toast } = useToast();
    const { language } = useTheme();

    const toggleVisibility = () => {
      setShowKey(!showKey);
    };

    const copyToClipboard = () => {
      if (!value) return;
      
      navigator.clipboard.writeText(value);
      setCopied(true);
      
      toast({
        title: language === 'pt-BR' ? 'Chave copiada' : 'Key copied',
        description: language === 'pt-BR' 
          ? 'A chave foi copiada para a área de transferência' 
          : 'The key has been copied to your clipboard',
      });
      
      setTimeout(() => setCopied(false), 2000);
    };

    return (
      <div className="relative flex items-center">
        <Input
          type={showKey ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={className}
          name={name}
          ref={ref}
          {...props}
        />
        <div className="absolute right-0 flex items-center gap-1 mr-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0"
            onClick={toggleVisibility}
            title={showKey ? (language === 'pt-BR' ? 'Ocultar chave' : 'Hide key') : (language === 'pt-BR' ? 'Mostrar chave' : 'Show key')}
          >
            {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
          
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-7 w-7 p-0"
              onClick={copyToClipboard}
              title={language === 'pt-BR' ? 'Copiar chave' : 'Copy key'}
            >
              {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          )}
        </div>
      </div>
    );
  }
);

ApiKeyInput.displayName = "ApiKeyInput";

export { ApiKeyInput };
