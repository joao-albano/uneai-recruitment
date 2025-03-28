
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const IntegrationsDocumentation: React.FC = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Integrações do Sistema</CardTitle>
          <CardDescription>Documentação das integrações com serviços externos</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Integrações de IA</h3>
            <p className="text-muted-foreground mt-1">
              O sistema integra-se com múltiplas plataformas de IA:
            </p>
            <ul className="mt-2 space-y-2 list-disc pl-5">
              <li>
                <span className="font-medium">OpenAI</span> - Utilizada para análise de texto e geração de recomendações.
                Configurável através das configurações de administrador.
              </li>
              <li>
                <span className="font-medium">Claude (Anthropic)</span> - Alternativa para processamento de linguagem natural.
                Configurada na seção de integrações de IA.
              </li>
              <li>
                <span className="font-medium">Google AI</span> - Utilizada para processamento de dados e análises preditivas.
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Webhooks</h3>
            <p className="text-muted-foreground mt-1">
              O sistema suporta webhooks para integração com sistemas externos:
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Notificações de eventos importantes</li>
              <li>Sincronização de dados</li>
              <li>Automações externas</li>
            </ul>
            <p className="text-muted-foreground mt-2">
              Webhooks podem ser configurados na seção de configurações de administrador, onde chaves de acesso 
              podem ser geradas e gerenciadas.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Integrações de Comunicação</h3>
            <p className="text-muted-foreground mt-1">
              O sistema oferece integração com plataformas de comunicação:
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>
                <span className="font-medium">WhatsApp</span> - Para comunicação direta com responsáveis.
                Configurável nas configurações de WhatsApp.
              </li>
              <li>
                <span className="font-medium">Chamadas de Voz</span> - Para comunicação automatizada.
                Configurável nas configurações de chamadas de voz.
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium">Supabase</h3>
            <p className="text-muted-foreground mt-1">
              O sistema utiliza o Supabase como backend para:
            </p>
            <ul className="mt-2 space-y-1 list-disc pl-5">
              <li>Autenticação de usuários</li>
              <li>Armazenamento de dados</li>
              <li>Funções serverless</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsDocumentation;
