import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { testWhatsAppConnection } from '@/utils/whatsappIntegration';
import { Loader2, SendHorizonal, TestTube } from 'lucide-react';
import { useChannels } from './useChannels';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface TestConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TestConfigDialog: React.FC<TestConfigDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { channels } = useChannels();
  const [selectedChannel, setSelectedChannel] = useState('whatsapp');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('Olá! Esta é uma mensagem de teste do sistema de orquestração omnichannel.');
  const [testingConnection, setTestingConnection] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'untested' | 'success' | 'failed'>('untested');

  const getSelectedChannelConfig = () => {
    return channels.find(channel => channel.id === selectedChannel);
  };

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionStatus('untested');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const success = Math.random() < 0.8;
      
      if (success) {
        setConnectionStatus('success');
        toast({
          title: "Conexão estabelecida",
          description: `O canal ${getSelectedChannelConfig()?.name} está disponível e funcionando.`,
        });
      } else {
        setConnectionStatus('failed');
        toast({
          title: "Falha na conexão",
          description: `Não foi possível estabelecer conexão com o canal ${getSelectedChannelConfig()?.name}.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      setConnectionStatus('failed');
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao testar a conexão.",
        variant: "destructive",
      });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSendTestMessage = async () => {
    if (!phoneNumber) {
      toast({
        title: "Número não informado",
        description: "Informe um número de telefone para enviar a mensagem de teste.",
        variant: "destructive",
      });
      return;
    }

    setSendingMessage(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = Math.random() < 0.7;
      
      if (success) {
        toast({
          title: "Mensagem enviada",
          description: `A mensagem de teste foi enviada com sucesso para ${phoneNumber}.`,
        });
      } else {
        toast({
          title: "Falha no envio",
          description: `Não foi possível enviar a mensagem para ${phoneNumber}.`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao enviar a mensagem de teste.",
        variant: "destructive",
      });
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Testar Configurações</DialogTitle>
          <DialogDescription>
            Teste a conexão com os canais de comunicação e envie mensagens de teste
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="channel">Canal</Label>
            <Select 
              defaultValue={selectedChannel} 
              onValueChange={setSelectedChannel}
            >
              <SelectTrigger id="channel">
                <SelectValue placeholder="Selecione um canal" />
              </SelectTrigger>
              <SelectContent>
                {channels.map(channel => (
                  <SelectItem key={channel.id} value={channel.id}>
                    {channel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="connection">Status da conexão</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleTestConnection}
                disabled={testingConnection}
              >
                {testingConnection ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testando...
                  </>
                ) : (
                  <>
                    <TestTube className="h-4 w-4 mr-2" />
                    Testar Conexão
                  </>
                )}
              </Button>
            </div>
            <div 
              className={cn(
                "p-2 rounded text-sm border",
                connectionStatus === 'untested' && "bg-muted text-muted-foreground",
                connectionStatus === 'success' && "bg-green-50 text-green-700 border-green-200",
                connectionStatus === 'failed' && "bg-red-50 text-red-700 border-red-200"
              )}
            >
              {connectionStatus === 'untested' && "A conexão não foi testada ainda"}
              {connectionStatus === 'success' && "Conexão estabelecida com sucesso"}
              {connectionStatus === 'failed' && "Falha ao estabelecer conexão"}
            </div>
          </div>

          <div className="space-y-2 border-t pt-4 mt-4">
            <Label htmlFor="phone">Número de telefone ou e-mail para teste</Label>
            <Input
              id="phone"
              placeholder="Ex: +5511999999999 ou email@exemplo.com"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Mensagem de teste</Label>
            <Textarea
              id="message"
              placeholder="Digite a mensagem de teste"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
        </div>

        <DialogFooter className="space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button 
            onClick={handleSendTestMessage}
            disabled={sendingMessage || !phoneNumber}
          >
            {sendingMessage ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <SendHorizonal className="h-4 w-4 mr-2" />
                Enviar Mensagem de Teste
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TestConfigDialog;
