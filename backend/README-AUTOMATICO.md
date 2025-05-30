# 🚀 Sistema Automático - UNE AI Scheduler

## 🎯 O que é?

O **UNE AI Scheduler** é um sistema que roda **automaticamente** e executa:
- 🔄 **Reengajamento** de leads (sistema original)
- 📢 **Campanhas** de marketing (novo módulo)

## ⏰ Como Funciona?

O sistema executa **automaticamente a cada 6 horas**:
- **00:00** - Meia-noite
- **06:00** - Manhã  
- **12:00** - Meio-dia
- **18:00** - Fim da tarde

## 🚀 Como Iniciar

### 🎮 Opção 1: Gerenciador Inteligente (RECOMENDADO)

```bash
# Iniciar em background
node manage-scheduler.js start

# Ver status
node manage-scheduler.js status

# Ver logs
node manage-scheduler.js logs

# Parar
node manage-scheduler.js stop

# Reiniciar
node manage-scheduler.js restart
```

### 🎯 Opção 2: Scripts NPM

```bash
# Modo interativo (tela fica presa)
npm run scheduler

# Modo background (Linux/Mac)
npm run scheduler:background
```

### 🖥️ Opção 3: PowerShell (Windows)

```powershell
# Modo interativo
.\start-scheduler.ps1

# Modo background
.\start-scheduler.ps1 -background
```

### ⚡ Opção 4: Direto

```bash
# Modo interativo (Ctrl+C para parar)
node start-scheduler.js
```

---

## 📊 Comandos de Gerenciamento

### ✅ Ver Status Atual
```bash
node manage-scheduler.js status
```
**Resultado:**
```
📊 STATUS DO UNE AI SCHEDULER
════════════════════════════
🟢 Status: RODANDO
📍 PID: 12345
📝 Log: scheduler.log
📏 Tamanho do log: 15 KB
📅 Última modificação: 23/05/2025 16:45:30
```

### 📝 Ver Logs em Tempo Real
```bash
node manage-scheduler.js logs
```

### 🛑 Parar Sistema
```bash
node manage-scheduler.js stop
```

### 🔄 Reiniciar Sistema
```bash
node manage-scheduler.js restart
```

---

## 🎯 O que Acontece Automaticamente?

### 🔄 **Processo de Reengajamento**
1. Busca leads elegíveis (NOVO, sem mensagem recente)
2. Gera mensagens personalizadas
3. Envia via WhatsApp usando Evolution API
4. Registra no banco de dados
5. Atualiza status do lead

### 📢 **Processo de Campanhas**  
1. Busca campanhas ativas
2. Segmenta leads baseado nas regras
3. Verifica duplicatas (não envia 2x para mesmo lead)
4. Gera mensagens do template da campanha
5. Envia via canal preferido (WhatsApp, email, SMS)
6. Registra histórico na tabela campaign_leads

### 🚀 **Processo Unificado**
```
🔄 FASE 1: Reengajamento (5-10 min)
   ⏳ Aguarda 30 segundos
📢 FASE 2: Campanhas (2-5 min)
   ✅ Processo concluído
   ⏰ Agenda próxima execução (6 horas)
```

---

## 📁 Arquivos Criados

Quando você inicia o sistema, ele cria:

```
📁 backend/
├── 📄 scheduler.pid      # PID do processo em execução
├── 📄 scheduler.log      # Logs detalhados do sistema
├── 🚀 start-scheduler.js # Script principal
├── 🎮 manage-scheduler.js # Gerenciador
└── 💻 start-scheduler.ps1 # Script PowerShell
```

---

## 🔧 Configuração

### 🔐 Variáveis de Ambiente (.env)

O sistema usa as **mesmas configurações** do sistema original:

```env
# Supabase
SUPABASE_URL=https://kyjmfinhleizpxqedeku.supabase.co
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service_role

# Evolution API  
EVOLUTION_URL=https://evo.ganchodigital.com.br
EVOLUTION_API_KEY=sua_chave_evolution

# Opcional: Execução imediata ao iniciar
RUN_ON_START=true
```

---

## 📈 Monitoramento

### 📊 Dashboard no Terminal
```bash
node manage-scheduler.js status
```

### 📝 Logs Detalhados
```bash
node manage-scheduler.js logs
```

### 🔍 Verificar Processo
```bash
# Windows PowerShell
Get-Process node

# Linux/Mac
ps aux | grep node
```

---

## 🛠️ Solução de Problemas

### ❌ **Sistema não inicia**
```bash
# Verificar configurações
node manage-scheduler.js

# Verificar variáveis de ambiente
node -e "console.log(process.env.SUPABASE_URL ? '✅ SUPABASE_URL OK' : '❌ SUPABASE_URL missing')"
```

### 🔄 **Sistema parou sozinho**
```bash
# Ver logs para identificar erro
node manage-scheduler.js logs

# Reiniciar
node manage-scheduler.js restart
```

### 📱 **Mensagens não estão saindo**
```bash
# Verificar logs
node manage-scheduler.js logs

# Testar manualmente
node test-sistema-unificado.js
```

### 🏃 **Sistema rodando duplicado**
```bash
# Parar todos
node manage-scheduler.js stop

# Aguardar 5 segundos
# Iniciar novamente
node manage-scheduler.js start
```

---

## ⚡ Início Rápido

**Para começar AGORA:**

```bash
# 1. Ir para a pasta backend
cd backend

# 2. Iniciar sistema automatico
node manage-scheduler.js start

# 3. Verificar se está rodando
node manage-scheduler.js status

# 4. Ver logs em tempo real
node manage-scheduler.js logs
```

**Pronto! O sistema está rodando sozinho! 🎉**

---

## 🎯 Resultados Esperados

### ✅ **O que você vai ver nos logs:**
```
🚀 INICIANDO PROCESSO UNIFICADO
📧 Reengajamento + 📢 Campanhas
⏰ Horário: 23/05/2025, 18:00:00

🔄 FASE 1: REENGAJAMENTO AUTOMATIZADO
✅ 5 lead(s) elegível(eis) encontrado(s)
✅ Mensagem enviada para João (Message ID: evo_1748...)
✅ Mensagem enviada para Maria (Message ID: evo_1748...)

📢 FASE 2: CAMPANHAS DE MARKETING  
✅ 1 campanha(s) ativa(s) encontrada(s)
🎯 Processando campanha: Volta às Aulas
✅ Campanha enviada para Pedro via whatsapp

📊 RESULTADO UNIFICADO:
  Reengajamento: 5/5 enviados
  Campanhas: 3/3 enviados
  
⏰ Próxima execução: 24/05/2025, 00:00:00
```

---

## 🏆 Benefícios

### ✅ **Automação Total**
- Sistema roda sozinho, sem intervenção manual
- Executa reengajamento + campanhas automaticamente  
- Agenda próximas execuções inteligentemente

### 🛡️ **Confiável e Robusto**
- Logs detalhados para auditoria
- Tratamento de erros automático
- Reinicia sozinho em caso de problemas

### 🎯 **Fácil de Gerenciar**
- Comandos simples: start, stop, status, logs
- Interface clara e intuitiva
- Monitoramento em tempo real

### 📊 **Transparente**
- Logs de cada ação executada
- Métricas de envios e falhas
- Histórico completo no banco

---

**🎉 Agora seu sistema de captação roda 100% automaticamente!**

*Reengajamento + Campanhas executando a cada 6 horas, 24/7* ⚡ 