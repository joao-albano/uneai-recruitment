# 🚀 UNE AI - Sistema de Scheduler Integrado

## 📋 Visão Geral

O **Sistema de Scheduler Integrado** roda **junto com seu backend**, eliminando a necessidade de processos separados. Toda a funcionalidade de reengajamento e campanhas agora está integrada à sua aplicação web.

## 🏗️ Arquitetura

```
Backend Principal (src/index.ts)
├── 🌐 API Routes (Express)
├── 🔄 Scheduler Integrado
│   ├── leadScheduler.js (reengajamento)
│   ├── campaignScheduler.js (campanhas)
│   └── integratedScheduler.js (orquestrador)
└── 📊 API de Controle (/api/scheduler)
```

## 🚀 Como Usar

### 1. Iniciar Backend (com Scheduler)

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

O scheduler **inicia automaticamente** junto com o backend!

### 2. Verificar Status

```bash
curl http://localhost:3001/api/scheduler/status
```

### 3. Controlar via API

Todas as funcionalidades estão disponíveis via API REST:

## 📊 Endpoints da API

### Status e Monitoramento

```http
GET /api/scheduler/status
```
Retorna status completo do scheduler.

```http
GET /api/scheduler/dashboard  
```
Dashboard resumido com estatísticas.

```http
GET /api/scheduler/history?limit=10
```
Histórico de execuções.

### Execução Manual

```http
POST /api/scheduler/run/unified
```
Executa processo completo (reengajamento + campanhas).

```http
POST /api/scheduler/run/reengagement
```
Executa apenas reengajamento.

```http
POST /api/scheduler/run/campaigns
```
Executa apenas campanhas.

```http
POST /api/scheduler/run/campaign/:id
```
Executa campanha específica.

### Controle do Agendamento

```http
POST /api/scheduler/schedule/start
```
Inicia agendamento automático.

```http
POST /api/scheduler/schedule/stop
```
Para agendamento automático.

### Utilidades

```http
DELETE /api/scheduler/history
```
Limpa histórico de execuções.

## ⚙️ Configuração

### Variáveis de Ambiente

```env
# Executar imediatamente ao iniciar backend
RUN_ON_START=false

# Teste das APIs
TEST_API_REENGAGEMENT=false
TEST_API_CAMPAIGNS=false

# Configurações existentes do sistema
SUPABASE_URL=sua_url
SUPABASE_ANON_KEY=sua_key
EVOLUTION_API_URL=sua_url
EVOLUTION_API_KEY=sua_key
```

## 🕒 Agendamento Automático

O scheduler roda **automaticamente a cada 6 horas**:
- **00:00** (meia-noite)
- **06:00** (manhã)
- **12:00** (meio-dia)
- **18:00** (noite)

### Sequência de Execução:
1. 🔄 **Reengajamento** (processo original)
2. ⏳ **Aguarda 30 segundos**
3. 📢 **Campanhas** (novo sistema)

## 🧪 Testando o Sistema

### 1. Testar APIs

```bash
npm run test:api
```

### 2. Testar com Execução Real

```bash
# No .env
TEST_API_REENGAGEMENT=true
TEST_API_CAMPAIGNS=true

# Executar teste
npm run test:api
```

### 3. Exemplos com curl

```bash
# Ver status
curl http://localhost:3001/api/scheduler/status

# Executar reengajamento
curl -X POST http://localhost:3001/api/scheduler/run/reengagement

# Ver dashboard
curl http://localhost:3001/api/scheduler/dashboard

# Parar agendamento
curl -X POST http://localhost:3001/api/scheduler/schedule/stop
```

## 🔧 Integração com Frontend

### JavaScript/React

```javascript
const API_BASE = 'http://localhost:3001/api/scheduler';

// Ver status
const getStatus = async () => {
  const response = await fetch(`${API_BASE}/status`);
  return response.json();
};

// Executar processo
const runProcess = async () => {
  const response = await fetch(`${API_BASE}/run/unified`, {
    method: 'POST'
  });
  return response.json();
};

// Dashboard
const getDashboard = async () => {
  const response = await fetch(`${API_BASE}/dashboard`);
  return response.json();
};
```

## 📈 Monitoramento

### Logs do Sistema

Os logs aparecem no console do backend:

```
🚀 Inicializando UNE AI Backend + Scheduler Integrado
✅ UNE AI Backend rodando na porta 3001
📊 API do Scheduler: http://localhost:3001/api/scheduler
🔄 Reengajamento + 📢 Campanhas ativos
⏰ Próxima execução automática: 24/05/2025, 18:00:00
```

### Status em Tempo Real

```javascript
// Polling para status em tempo real
setInterval(async () => {
  const status = await getStatus();
  console.log('Scheduler:', status.data.status.isScheduled ? '🟢' : '🔴');
}, 30000); // a cada 30 segundos
```

## 🛡️ Tratamento de Erros

### Parada Graceful

O sistema trata **SIGINT** e **SIGTERM** automaticamente:

```
^C
🛑 Recebido sinal SIGINT, parando servidor...
🛑 Parando UNE AI Scheduler Integrado...
✅ Scheduler integrado parado
```

### Recuperação de Erros

- **Erro no reengajamento**: Campanhas ainda executam
- **Erro nas campanhas**: Não afeta próximas execuções
- **Erro crítico**: Registrado no histórico

## 🔄 Migração do Sistema Anterior

### Diferenças Principais

| Aspecto | Sistema Anterior | Sistema Integrado |
|---------|------------------|-------------------|
| **Processo** | Separado | Junto com backend |
| **Controle** | Scripts manuais | API REST |
| **Monitoramento** | Logs em arquivo | API + Logs console |
| **Inicialização** | Manual | Automática |
| **Parada** | Kill manual | Graceful shutdown |

### Arquivos Removidos

Não precisamos mais destes arquivos:
- ❌ `src/app.js` (processo independente)
- ❌ `start-scheduler.js`
- ❌ `manage-scheduler.js`
- ❌ `start-scheduler.ps1`

### Funcionalidades Mantidas

✅ **Tudo funciona igual**:
- Mesmo sistema de reengajamento
- Mesmas campanhas
- Mesmos horários (a cada 6 horas)
- Mesmas integrações (Supabase, Evolution API)
- Mesmo delay entre processos (30s)

## 🎯 Vantagens do Sistema Integrado

### ✅ **Simplicidade**
- Um só processo para gerenciar
- Inicia junto com o backend
- Para junto com o backend

### ✅ **Controle Total**
- API REST completa
- Monitoramento em tempo real
- Histórico detalhado

### ✅ **Integração Perfeita**
- Mesma conexão de banco
- Mesmo sistema de logs
- Mesmas variáveis de ambiente

### ✅ **Facilidade de Deploy**
- Um único processo em produção
- Sem gerenciamento de PIDs
- Sem scripts separados

## 🚀 Deploy em Produção

### 1. Build

```bash
npm run build
```

### 2. Variáveis de Ambiente

```env
NODE_ENV=production
RUN_ON_START=true  # Executar imediatamente
```

### 3. Iniciar

```bash
npm start
```

### 4. Verificar

```bash
curl https://seudominio.com/api/scheduler/status
```

## 📞 Suporte

### Logs Importantes

```bash
# Status do scheduler
curl localhost:3001/api/scheduler/status | jq .

# Últimas execuções
curl localhost:3001/api/scheduler/history?limit=5 | jq .

# Dashboard resumido
curl localhost:3001/api/scheduler/dashboard | jq .
```

### Reiniciar Sistema

```bash
# Para o backend (Ctrl+C)
# Inicia novamente
npm run dev  # ou npm start
```

### Forçar Execução

```bash
# Executar imediatamente
curl -X POST localhost:3001/api/scheduler/run/unified
```

---

🎉 **Sistema totalmente integrado e funcionando junto com seu backend!** 