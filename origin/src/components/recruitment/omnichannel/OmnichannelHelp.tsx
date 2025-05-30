
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { History, TestTube } from 'lucide-react';
import ContactHistoryDialog from './ContactHistoryDialog';
import TestConfigDialog from './TestConfigDialog';
import { toast } from '@/hooks/use-toast';

const OmnichannelHelp: React.FC = () => {
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [testDialogOpen, setTestDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="w-full p-4 rounded-md bg-muted/50 border">
        <h3 className="text-sm font-medium mb-2">Como funciona a orquestração omnichannel</h3>
        <p className="text-sm text-muted-foreground">
          O sistema tentará contatar o lead pelo canal prioritário. Se não houver resposta após 
          24 horas, o próximo canal na lista será utilizado automaticamente. Os fallbacks são 
          acionados apenas se um canal estiver indisponível ou apresentar falhas.
        </p>
      </div>
      
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => setHistoryDialogOpen(true)}
        >
          <History className="h-4 w-4 mr-2" />
          Ver Histórico de Contatos
        </Button>
        <Button 
          className="flex-1"
          onClick={() => setTestDialogOpen(true)}
        >
          <TestTube className="h-4 w-4 mr-2" />
          Testar Configurações
        </Button>
      </div>

      <ContactHistoryDialog 
        open={historyDialogOpen} 
        onOpenChange={setHistoryDialogOpen} 
      />
      
      <TestConfigDialog 
        open={testDialogOpen} 
        onOpenChange={setTestDialogOpen}
      />
    </div>
  );
};

export default OmnichannelHelp;
