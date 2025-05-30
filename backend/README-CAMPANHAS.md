# 📢 Sistema de Campanhas - UNE AI

## 🎯 Visão Geral

O sistema de campanhas é um **módulo adicional** que foi integrado ao sistema de reengajamento existente, **sem afetar** o funcionamento atual. Ele reaproveita toda a infraestrutura de envio de mensagens e adiciona funcionalidades específicas para campanhas de marketing.

## ✨ Características Principais

### 🔄 **Não Afeta o Sistema Atual**
- Reengajamento continua funcionando normalmente
- Infraestrutura completamente reutilizada
- Módulos independentes e isolados

### 📢 **Funcionalidades de Campanhas**
- Segmentação inteligente de leads
- Templates personalizáveis de mensagens
- Múltiplos canais (WhatsApp, Email, SMS)
- Agendamento automático
- Controle de duplicatas

### 🚀 **Sistema Unificado**
- Execução combinada: Reengajamento + Campanhas
- Agendamento coordenado
- Status unificado

---

## 🏗️ Arquitetura

```
📁 src/services/
├── 🔄 leadScheduler.js      (Sistema original - INALTERADO)
├── 📢 campaignScheduler.js  (Novo módulo de campanhas)
└── 🚀 unifiedScheduler.js   (Orquestrador unificado)
```

### 📊 Tabelas do Banco

```sql
-- Tabela principal de campanhas
campaigns {
  id, name, status, segmentation_rules,
  start_date, end_date, description,
  organization_id, message_template, preferred_channel
}

-- Controle de envios
recruitment.campaign_leads {
  id, campaign_id, lead_id, organization_id,
  status, sent_at
}
```

---

## 🎯 Como Usar

### 1. **Campanhas Apenas**
```javascript
const campaignScheduler = require('./src/services/campaignScheduler');

// Executar todas as campanhas ativas
await campaignScheduler.runCampaignProcess();

// Executar campanha específica
await campaignScheduler.runSpecificCampaign('campaign-id');
```

### 2. **Sistema Unificado**
```javascript
const unifiedScheduler = require('./src/services/unifiedScheduler');

// Execução completa: Reengajamento + Campanhas
await unifiedScheduler.runUnifiedProcess();

// Apenas reengajamento
await unifiedScheduler.runReengagementOnly();

// Apenas campanhas
await unifiedScheduler.runCampaignsOnly();

// Agendamento automático (a cada 6 horas)
unifiedScheduler.start();
```

### 3. **Testes Disponíveis**

```bash
# Teste do sistema de campanhas
node test-campanhas.js

# Teste do sistema unificado
node test-sistema-unificado.js

# Com envio real (variável de ambiente)
$env:SEND_REAL_CAMPAIGN="true"; node test-campanhas.js
```

---

## 📝 Criando Campanhas

### 🎯 Estrutura de uma Campanha

```javascript
{
  name: "Nome da Campanha",
  status: "active",           // active, scheduled, completed, paused
  organization_id: "uuid",
  description: "Descrição...",
  
  // Regras de segmentação
  segmentation_rules: {
    audience: "Ensino Fundamental",     // Filtro por nível educacional
    courses: ["Administração"],        // Cursos específicos
    location: "Zona Norte",            // Campus/localização
    status: ["NOVO", "ANDAMENTO"],     // Status dos leads
    created_after: "2024-01-01",       // Data de criação
    created_before: "2024-12-31"
  },
  
  // Canal e mensagem
  preferred_channel: "whatsapp",       // whatsapp, email, sms
  message_template: "Olá {{name}}! ...", // Template com variáveis
  
  // Agendamento
  start_date: "2024-05-23T10:00:00Z",  // Quando iniciar
  end_date: "2024-06-23T10:00:00Z"     // Quando terminar (opcional)
}
```

### 🔧 Variáveis Disponíveis no Template

- `{{name}}` - Nome do lead
- `{{course}}` - Curso de interesse
- `{{organization}}` - Nome da organização
- `{{campaign_name}}` - Nome da campanha

### 📱 Exemplo de Template

```text
Olá {{name}}! 👋

Espero que esteja bem!

Notei seu interesse em {{course}} e queria compartilhar uma oportunidade especial.

Esta mensagem faz parte da nossa campanha: {{campaign_name}} 📢

Nossa equipe está disponível para esclarecer dúvidas sobre nossas oportunidades educacionais.

Que tal conversarmos? Responda este WhatsApp! 🚀

Atenciosamente,
Equipe {{organization}} 📚
```

---

## ⚙️ Configuração

### 🔐 Variáveis de Ambiente

As mesmas do sistema original:

```env
# Supabase
SUPABASE_URL=https://seu-projeto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua-chave

# Evolution API
EVOLUTION_URL=https://sua-evolution-api.com
EVOLUTION_API_KEY=sua-chave

# Testes (opcionais)
SEND_REAL_CAMPAIGN=true
TEST_CAMPAIGNS_ONLY=true
TEST_UNIFIED_PROCESS=true
```

### 🕐 Agendamento Automático

O sistema executa automaticamente a cada 6 horas:
- **00:00** - Meia-noite
- **06:00** - Manhã
- **12:00** - Meio-dia  
- **18:00** - Fim da tarde

---

## 🛡️ Segurança e Controles

### ✅ **Controle de Duplicatas**
- Leads não recebem a mesma campanha duas vezes
- Registro completo na tabela `campaign_leads`

### 🎯 **Segmentação Inteligente**
- Filtros múltiplos e combinados
- Validação de regras de negócio
- Leads elegíveis verificados automaticamente

### 📊 **Monitoramento**
- Logs detalhados de cada envio
- Status de sucesso/falha
- Métricas de campanha

### ⏸️ **Não Interferência**
- Sistema de reengajamento **totalmente preservado**
- Execução isolada e independente
- Infraestrutura compartilhada sem conflitos

---

## 📈 Resultados e Métricas

### 📊 Durante a Execução
```
📢 RESULTADO DAS CAMPANHAS:
  Processados: 15
  Sucessos: 14
  Falhas: 1

📊 Campanha "Volta às Aulas": 8/10 enviados
📊 Campanha "Matrículas Abertas": 6/6 enviados
```

### 🔍 Status do Sistema
```javascript
{
  "unified": {
    "isRunning": false,
    "hasSchedule": true,
    "nextExecution": "Agendado"
  },
  "reengagement": { /* status do reengajamento */ },
  "campaigns": { /* status das campanhas */ }
}
```

---

## 🚀 Principais Benefícios

### ✅ **Para o Sistema Atual**
- **Zero impacto** no reengajamento existente
- Mesma infraestrutura, mesma confiabilidade
- Logs e monitoramento preservados

### 📢 **Para as Campanhas**
- Segmentação avançada de leads
- Templates personalizáveis
- Controle total de duplicatas
- Múltiplos canais de comunicação

### 🔄 **Para a Operação**
- Processo unificado e automatizado
- Agendamento inteligente
- Métricas detalhadas
- Fácil manutenção

---

## 🧪 Testado e Validado

✅ Sistema de campanhas funcionando  
✅ Envio real de mensagens testado  
✅ Segmentação de leads validada  
✅ Controle de duplicatas funcionando  
✅ Sistema unificado operacional  
✅ Infraestrutura original preservada  

**Message ID de teste**: `evo_1748028848952`  
**Lead de teste**: joao_teste (553195149986)  
**Resultado**: ✅ Mensagem entregue com sucesso

---

## 📞 Próximos Passos

1. **Criar campanhas via interface administrativa**
2. **Definir templates para diferentes segmentos**
3. **Configurar agendamento automático em produção**
4. **Monitorar métricas e ajustar estratégias**

---

*Sistema desenvolvido mantendo 100% de compatibilidade com a infraestrutura existente* 🛡️ 