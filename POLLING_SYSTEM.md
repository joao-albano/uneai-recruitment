# Sistema de Polling para Atualizações Automáticas de Mensagens

Este documento explica o sistema de polling implementado para garantir que as mensagens do WhatsApp sejam atualizadas automaticamente no frontend sem necessidade de recarregar a página.

## Como Funciona

### 1. Polling de Conversas
- **Frequência**: A cada 5 segundos
- **Escopo**: Lista todas as conversas ativas da organização
- **Comportamento**: Atualiza a lista de conversas para detectar novas conversas e mensagens mais recentes

### 2. Polling de Mensagens
- **Frequência**: A cada 2 segundos (apenas quando uma conversa está selecionada)
- **Escopo**: Mensagens da conversa selecionada
- **Comportamento**: 
  - Busca apenas mensagens mais recentes que a última mensagem já carregada
  - Evita recarregar todas as mensagens, otimizando performance
  - Para automaticamente quando nenhuma conversa está selecionada

### 3. Indicadores Visuais

#### Lista de Conversas
- **Mensagens não lidas**: Badge com contador animado (bounce)
- **Conversas com novas mensagens**: 
  - Background destacado (`bg-accent/50`)
  - Borda azul à esquerda
  - Efeito de pulse
- **Conversa selecionada**: Borda roxa à esquerda
- **Nome em destaque**: Fonte em negrito para conversas com mensagens não lidas

#### Container de Mensagens
- **Scroll automático**: Rola automaticamente para a mensagem mais recente
- **Detecção de novas mensagens**: Logs no console quando novas mensagens chegam
- **Delay inteligente**: 100ms de delay para garantir que o DOM seja atualizado

## Implementação Técnica

### Hooks e Estados
```typescript
// Refs para controle de polling
const conversationsPollingRef = useRef<NodeJS.Timeout | null>(null);
const messagesPollingRef = useRef<NodeJS.Timeout | null>(null);
const lastMessageTimestampRef = useRef<string | null>(null);
```

### Funções de Controle
- `startConversationsPolling()`: Inicia polling de conversas
- `stopConversationsPolling()`: Para polling de conversas
- `startMessagesPolling()`: Inicia polling de mensagens para conversa específica
- `stopMessagesPolling()`: Para polling de mensagens

### Otimizações
1. **Consultas incrementais**: Busca apenas mensagens mais recentes usando timestamp
2. **Polling condicional**: Mensagens só são monitoradas quando há conversa selecionada
3. **Cleanup automático**: Intervals são limpos quando componentes desmontam
4. **Loading inteligente**: Não mostra loading para requests de polling

## Fluxo de Dados

### Quando uma nova mensagem chega via webhook:

1. **Webhook** processa a mensagem e salva no banco
2. **Polling de conversas** (5s) detecta mudança na última mensagem
3. **Polling de mensagens** (2s) busca a nova mensagem se a conversa estiver selecionada
4. **Frontend** atualiza automaticamente:
   - Lista de conversas mostra nova última mensagem
   - Contador de não lidas incrementa
   - Container de mensagens adiciona nova mensagem
   - Scroll automático vai para a mensagem mais recente
   - Efeitos visuais destacam a conversa

### Limpar mensagens não lidas:
- Quando uma conversa é selecionada, o contador de não lidas é zerado
- Efeitos visuais são removidos

## Configurações

### Intervalos de Polling
- **Conversas**: 5000ms (5 segundos)
- **Mensagens**: 2000ms (2 segundos)
- **Scroll delay**: 100ms

### Classes CSS Utilizadas
- `animate-pulse`: Efeito visual para conversas com novas mensagens
- `animate-bounce`: Efeito para badge de mensagens não lidas
- `border-l-4 border-primary`: Borda para conversa selecionada
- `border-l-4 border-blue-500`: Borda para conversas com novas mensagens

## Benefícios

1. **Experiência em tempo real**: Usuário vê mensagens chegando automaticamente
2. **Performance otimizada**: Apenas dados necessários são buscados
3. **Feedback visual**: Indicadores claros de atividade
4. **Responsive**: Adapta-se ao comportamento do usuário
5. **Cleanup automático**: Não deixa intervals órfãos

## Logs de Debug

O sistema inclui logs detalhados para facilitar debug:
- `[Polling] Started conversations polling`
- `[Polling] Started messages polling for contact: {id}`
- `[Polling] Added {count} new messages to conversation {id}`
- `[MessagesContainer] New messages detected, scrolling to bottom`

## Considerações Futuras

Para melhorar ainda mais a experiência, considerações para implementações futuras:

1. **WebSockets**: Para comunicação bidirecional em tempo real
2. **Server-Sent Events**: Para push de notificações do servidor
3. **Notificações do navegador**: Para alertas quando a aba não está ativa
4. **Throttling inteligente**: Reduzir polling quando não há atividade
5. **Offline detection**: Pausar polling quando não há conexão 