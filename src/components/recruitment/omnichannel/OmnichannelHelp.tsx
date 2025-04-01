
import React from 'react';
import { Button } from '@/components/ui/button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const OmnichannelHelp: React.FC = () => {
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
        <a 
          href="#" 
          className={cn(buttonVariants({ variant: "outline" }), "flex-1")}
        >
          Ver Histórico de Contatos
        </a>
        <Button className="flex-1">
          Testar Configurações
        </Button>
      </div>
    </div>
  );
};

export default OmnichannelHelp;
