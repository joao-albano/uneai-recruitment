# Migrações do Banco de Dados UNEAI

Este diretório contém as migrações necessárias para o sistema de reengajamento automático funcionar corretamente.

## ⚠️ Colunas Faltantes Detectadas

Durante os testes do sistema de reengajamento, foram identificadas as seguintes colunas faltantes:

1. **`last_contact_at`** na tabela `leads` - Essencial para controlar quando foi o último contato
2. **Tabela `message_logs`** - Para logging de mensagens enviadas  
3. **Colunas adicionais em `re_engagement_rules`** - Para funcionalidades avançadas

## 🚀 Como Aplicar as Migrações

### Opção 1: Via SQL Editor do Supabase (Recomendado)

1. Acesse [dashboard.supabase.com](https://dashboard.supabase.com)
2. Selecione seu projeto **UNEAI**
3. Vá para **SQL Editor**
4. Copie todo o conteúdo do arquivo `migrations/add_missing_columns.sql`
5. Cole no SQL Editor
6. Clique em **Run** para executar

### Opção 2: Via Script Node.js

```bash
# No diretório database/
node apply-migration.js apply
```

### Opção 3: Via CLI do Supabase

```bash
# Se tiver o CLI do Supabase instalado
supabase db push --file migrations/add_missing_columns.sql
```

## 📋 O que a Migração Faz

### 1. Adiciona coluna `last_contact_at` em `leads`
```sql
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS last_contact_at TIMESTAMP WITH TIME ZONE;
```

### 2. Cria tabela `message_logs`
Para registrar todas as mensagens enviadas pelo sistema:
- `lead_id` - Referência ao lead
- `canal` - whatsapp, email, sms
- `message_content` - Conteúdo completo da mensagem
- `status` - sent, failed, pending
- `sent_at` - Quando foi enviada

### 3. Adiciona colunas em `re_engagement_rules`
- `time_value` - Valor numérico (ex: 24)
- `time_unit` - Unidade de tempo (hours, days, minutes)
- `preferred_channel` - Canal preferido
- `message_template` - Template da mensagem
- `subject` - Assunto para emails

### 4. Cria índices para performance
- Índice em `last_contact_at` para consultas rápidas
- Índices compostos para otimizar o scheduler
- Índices na tabela de logs

### 5. Adiciona triggers para `updated_at`
Atualiza automaticamente timestamps quando registros são modificados

## 🔍 Verificar se a Migração Foi Aplicada

Execute o script de verificação:

```bash
node apply-migration.js verify
```

Ou verifique manualmente no SQL Editor:

```sql
-- Verificar se a coluna last_contact_at existe
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'leads' AND column_name = 'last_contact_at';

-- Verificar se a tabela message_logs existe
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'message_logs';
```

## 🧪 Após Aplicar a Migração

1. **Teste o sistema de reengajamento:**
   ```bash
   # No diretório backend/
   node test-reengagement.js full-test
   ```

2. **Verifique se o scheduler funciona:**
   ```bash
   npm start
   ```

3. **Teste as APIs:**
   ```bash
   curl -X POST http://localhost:3001/api/admin/check-leads
   ```

## 📝 Estrutura dos Arquivos

```
database/
├── README.md                    # Este arquivo
├── migrations/
│   └── add_missing_columns.sql  # SQL da migração
└── apply-migration.js           # Script para aplicar migração
```

## ⚡ Solução de Problemas

### Se der erro de permissão:
- Certifique-se de estar usando a `SUPABASE_SERVICE_ROLE_KEY`
- Verifique se as variáveis de ambiente estão corretas

### Se alguns comandos falharem:
- Execute os comandos SQL individualmente no SQL Editor
- Alguns comandos podem falhar se já existirem (isso é normal)

### Se a tabela `message_logs` não for criada:
- Execute manualmente no SQL Editor:
```sql
CREATE TABLE message_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    canal VARCHAR(50) NOT NULL,
    message_content TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'sent',
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎯 Status Esperado Após Migração

- ✅ Coluna `last_contact_at` adicionada em `leads`
- ✅ Tabela `message_logs` criada
- ✅ Colunas adicionais em `re_engagement_rules`
- ✅ Índices criados para performance
- ✅ Triggers de `updated_at` funcionando
- ✅ Sistema de reengajamento totalmente funcional

---

**💡 Dica:** Após aplicar a migração, execute `node test-reengagement.js full-test` para verificar se tudo está funcionando corretamente! 