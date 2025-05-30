
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, Code, MessagesSquare, Phone, Database, Key, ExternalLink } from 'lucide-react';

const ApiIntegrationDocumentation: React.FC = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Documentação de API para Integrações</h1>
        <p className="text-muted-foreground">
          Guia completo para integração com as APIs do sistema de captação de alunos.
        </p>
      </div>

      <Alert className="mb-6">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Todas as requisições às APIs requerem autenticação via token JWT ou chave de API.
          Entre em contato com o suporte para obter suas credenciais.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="leads">API de Leads</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="voice">Chamadas de Voz</TabsTrigger>
          <TabsTrigger value="webhook">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral da API</CardTitle>
              <CardDescription>
                Informações básicas sobre nossa arquitetura de API RESTful.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Endpoints Base</h3>
                <div className="bg-muted p-3 rounded-md">
                  <code>https://api.captacao-alunos.com.br/v1</code>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Todos os endpoints da API são relativos a esta URL base.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Autenticação</h3>
                <p className="mb-2">
                  Todas as requisições à API devem incluir um token JWT no cabeçalho de autorização:
                </p>
                <div className="bg-muted p-3 rounded-md">
                  <code>Authorization: Bearer {'{seu_token_jwt}'}</code>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Formatos de Resposta</h3>
                <p className="mb-2">
                  Todas as respostas são retornadas no formato JSON com os seguintes campos padrão:
                </p>
                <div className="bg-muted p-3 rounded-md">
                  <pre>{`{
  "success": true,
  "data": { ... },
  "message": "Operação realizada com sucesso"
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Tratamento de Erros</h3>
                <p className="mb-2">
                  Em caso de erro, a resposta terá o seguinte formato:
                </p>
                <div className="bg-muted p-3 rounded-md">
                  <pre>{`{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Descrição detalhada do erro"
  }
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Limites de Taxa</h3>
                <p>
                  Para garantir a estabilidade do serviço, aplicamos os seguintes limites:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>1000 requisições por hora por chave de API</li>
                  <li>10 requisições por segundo</li>
                  <li>Payload máximo de 5MB</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" /> API de Leads
              </CardTitle>
              <CardDescription>
                Endpoints para gerenciamento de leads no sistema de captação.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Listar Leads</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">GET</span>
                  <code>/leads</code>
                </div>
                <p className="text-sm mb-2">Retorna uma lista paginada de leads.</p>
                <h4 className="text-sm font-medium mt-3 mb-1">Parâmetros de Consulta</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>page: Número da página (padrão: 1)</li>
                  <li>per_page: Quantidade por página (padrão: 20, máx: 100)</li>
                  <li>status: Filtrar por status (ex: novo, contato, matriculado)</li>
                  <li>source: Filtrar por origem</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Obter Lead</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">GET</span>
                  <code>/leads/{'{lead_id}'}</code>
                </div>
                <p className="text-sm mb-2">Retorna os detalhes de um lead específico.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Criar Lead</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">POST</span>
                  <code>/leads</code>
                </div>
                <p className="text-sm mb-2">Cria um novo lead no sistema.</p>
                <h4 className="text-sm font-medium mt-3 mb-1">Corpo da Requisição</h4>
                <div className="bg-muted p-3 rounded-md">
                  <pre>{`{
  "name": "Nome do Lead",
  "email": "email@exemplo.com",
  "phone": "+5511999999999",
  "source": "website",
  "interest": "Engenharia de Software",
  "notes": "Interessado em bolsas de estudo"
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Atualizar Lead</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">PUT</span>
                  <code>/leads/{'{lead_id}'}</code>
                </div>
                <p className="text-sm mb-2">Atualiza as informações de um lead existente.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Mudar Estágio do Lead</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded-md">PATCH</span>
                  <code>/leads/{'{lead_id}'}/stage</code>
                </div>
                <p className="text-sm mb-2">Altera o estágio de um lead no funil de conversão.</p>
                <div className="bg-muted p-3 rounded-md">
                  <pre>{`{
  "stage_id": "stage_xyz123",
  "reason": "Lead mostrou interesse avançado no curso"
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Adicionar Interação</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">POST</span>
                  <code>/leads/{'{lead_id}'}/interactions</code>
                </div>
                <p className="text-sm mb-2">Registra uma nova interação com o lead.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessagesSquare className="mr-2 h-5 w-5" /> Integração com WhatsApp
              </CardTitle>
              <CardDescription>
                APIs para integração com mensagens e automações via WhatsApp.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Enviar Mensagem</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">POST</span>
                  <code>/whatsapp/send</code>
                </div>
                <p className="text-sm mb-2">Envia uma mensagem de WhatsApp para um número específico.</p>
                <div className="bg-muted p-3 rounded-md">
                  <pre>{`{
  "to": "+5511999999999",
  "message": "Olá! Temos novidades sobre o curso que você demonstrou interesse.",
  "template_id": "welcome_message", // Opcional, para usar templates
  "template_params": {              // Opcional, parâmetros do template
    "name": "João",
    "course": "Engenharia"
  }
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Enviar Mídia</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">POST</span>
                  <code>/whatsapp/media</code>
                </div>
                <p className="text-sm mb-2">Envia uma mídia (imagem, PDF, vídeo) via WhatsApp.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Configurar Webhook</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">PUT</span>
                  <code>/whatsapp/webhook</code>
                </div>
                <p className="text-sm mb-2">Configura um webhook para receber notificações de mensagens recebidas.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Histórico de Conversas</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">GET</span>
                  <code>/whatsapp/chats/{'{phone_number}'}</code>
                </div>
                <p className="text-sm mb-2">Obtém o histórico de mensagens com um número específico.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="voice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Phone className="mr-2 h-5 w-5" /> API de Chamadas de Voz
              </CardTitle>
              <CardDescription>
                Endpoints para integração com o sistema de chamadas de voz.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Iniciar Chamada</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">POST</span>
                  <code>/voice/call</code>
                </div>
                <p className="text-sm mb-2">Inicia uma chamada telefônica para um número.</p>
                <div className="bg-muted p-3 rounded-md">
                  <pre>{`{
  "to": "+5511999999999",
  "from": "+5511888888888",  // Opcional, usa número padrão se não especificado
  "script_id": "welcome_call",
  "parameters": {
    "name": "João",
    "course": "Administração"
  },
  "callback_url": "https://seusite.com/webhook/call-status"
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Status de Chamada</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">GET</span>
                  <code>/voice/calls/{'{call_id}'}</code>
                </div>
                <p className="text-sm mb-2">Obtém o status e detalhes de uma chamada específica.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Agendamento de Chamadas</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">POST</span>
                  <code>/voice/schedule</code>
                </div>
                <p className="text-sm mb-2">Agenda uma chamada telefônica para uma data e hora específicas.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Cancelar Chamada</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md">DELETE</span>
                  <code>/voice/calls/{'{call_id}'}</code>
                </div>
                <p className="text-sm mb-2">Cancela uma chamada em andamento ou agendada.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhook" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ExternalLink className="mr-2 h-5 w-5" /> Webhooks
              </CardTitle>
              <CardDescription>
                Configuração e uso de webhooks para eventos em tempo real.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Configurar Webhook</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-md">POST</span>
                  <code>/webhooks</code>
                </div>
                <p className="text-sm mb-2">Registra um novo endpoint de webhook para receber notificações de eventos.</p>
                <div className="bg-muted p-3 rounded-md">
                  <pre>{`{
  "url": "https://seusite.com/webhook",
  "events": ["lead.created", "lead.updated", "message.received"],
  "secret": "seu_token_secreto_para_verificacao"
}`}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Listar Webhooks</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">GET</span>
                  <code>/webhooks</code>
                </div>
                <p className="text-sm mb-2">Lista todos os webhooks configurados para sua conta.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Excluir Webhook</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md">DELETE</span>
                  <code>/webhooks/{'{webhook_id}'}</code>
                </div>
                <p className="text-sm mb-2">Remove um webhook configurado.</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Eventos Disponíveis</h3>
                <p className="text-sm mb-2">Lista de eventos que podem ser monitorados via webhooks:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li><strong>lead.created</strong> - Quando um novo lead é criado</li>
                  <li><strong>lead.updated</strong> - Quando informações de um lead são atualizadas</li>
                  <li><strong>lead.stage_changed</strong> - Quando um lead muda de estágio no funil</li>
                  <li><strong>message.sent</strong> - Quando uma mensagem é enviada com sucesso</li>
                  <li><strong>message.received</strong> - Quando uma mensagem é recebida</li>
                  <li><strong>call.started</strong> - Quando uma chamada telefônica é iniciada</li>
                  <li><strong>call.completed</strong> - Quando uma chamada telefônica é concluída</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Segurança</h3>
                <p className="text-sm mb-2">Cada requisição de webhook incluirá um cabeçalho <code>X-Webhook-Signature</code> que deve ser validado utilizando o segredo compartilhado para garantir a autenticidade da solicitação.</p>
                <div className="bg-muted p-3 rounded-md">
                  <code>X-Webhook-Signature: sha256=a1b2c3...</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 rounded-lg border p-6 bg-card">
        <div className="flex items-center mb-4">
          <Key className="mr-2 h-5 w-5 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Obter Acesso à API</h2>
        </div>
        <p className="mb-4">
          Para solicitar acesso à nossa API e obter suas credenciais, entre em contato com nossa equipe de suporte 
          ou fale com seu gerente de conta.
        </p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Code className="mr-2 h-4 w-4" />
          <span>Documentação da API v1.0 - Última atualização: Abril de 2025</span>
        </div>
      </div>
    </div>
  );
};

export default ApiIntegrationDocumentation;
