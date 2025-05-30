-- Migração para adicionar colunas faltantes
-- Execute no SQL Editor do Supabase ou use o CLI

-- 1. Adicionar coluna last_contact_at na tabela leads
ALTER TABLE leads 
ADD COLUMN IF NOT EXISTS last_contact_at TIMESTAMP WITH TIME ZONE;

-- 2. Adicionar índice para otimizar consultas por last_contact_at
CREATE INDEX IF NOT EXISTS idx_leads_last_contact_at ON leads(last_contact_at);

-- 3. Adicionar índice composto para otimizar queries do scheduler
CREATE INDEX IF NOT EXISTS idx_leads_status_organization_created ON leads(status, organization_id, created_at);

-- 4. Criar tabela message_logs se não existir (para logging de mensagens)
CREATE TABLE IF NOT EXISTS message_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    lead_id UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
    rule_id UUID REFERENCES re_engagement_rules(id) ON DELETE SET NULL,
    canal VARCHAR(50) NOT NULL, -- whatsapp, email, sms
    message_content TEXT NOT NULL,
    message_preview VARCHAR(200),
    status VARCHAR(50) DEFAULT 'sent', -- sent, failed, pending
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    response_received BOOLEAN DEFAULT FALSE,
    response_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Adicionar índices na tabela message_logs
CREATE INDEX IF NOT EXISTS idx_message_logs_lead_id ON message_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_message_logs_sent_at ON message_logs(sent_at);
CREATE INDEX IF NOT EXISTS idx_message_logs_status ON message_logs(status);

-- 6. Verificar se a tabela re_engagement_rules tem todas as colunas necessárias
ALTER TABLE re_engagement_rules 
ADD COLUMN IF NOT EXISTS time_value INTEGER DEFAULT 24,
ADD COLUMN IF NOT EXISTS time_unit VARCHAR(20) DEFAULT 'hours',
ADD COLUMN IF NOT EXISTS preferred_channel VARCHAR(50) DEFAULT 'email',
ADD COLUMN IF NOT EXISTS subject VARCHAR(500),
ADD COLUMN IF NOT EXISTS message_template TEXT,
ADD COLUMN IF NOT EXISTS trigger_conditions JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS last_executed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS execution_count INTEGER DEFAULT 0;

-- 7. Adicionar trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger na tabela message_logs
DROP TRIGGER IF EXISTS update_message_logs_updated_at ON message_logs;
CREATE TRIGGER update_message_logs_updated_at
    BEFORE UPDATE ON message_logs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Aplicar trigger na tabela re_engagement_rules se não existir
DROP TRIGGER IF EXISTS update_re_engagement_rules_updated_at ON re_engagement_rules;
CREATE TRIGGER update_re_engagement_rules_updated_at
    BEFORE UPDATE ON re_engagement_rules
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 8. Atualizar dados existentes
-- Definir last_contact_at como created_at para leads existentes
UPDATE leads 
SET last_contact_at = created_at 
WHERE last_contact_at IS NULL;

-- 9. Comentários para documentação
COMMENT ON COLUMN leads.last_contact_at IS 'Último contato realizado com o lead (para controle de reengajamento)';
COMMENT ON TABLE message_logs IS 'Log de todas as mensagens enviadas pelo sistema de reengajamento';
COMMENT ON COLUMN re_engagement_rules.time_value IS 'Valor numérico do tempo (ex: 24 para 24 horas)';
COMMENT ON COLUMN re_engagement_rules.time_unit IS 'Unidade de tempo: minutes, hours, days';
COMMENT ON COLUMN re_engagement_rules.preferred_channel IS 'Canal preferido: email, whatsapp, sms';

-- 10. Verificar integridade dos dados
DO $$
BEGIN
    -- Verificar se existem leads sem organization_id
    IF EXISTS (SELECT 1 FROM leads WHERE organization_id IS NULL) THEN
        RAISE NOTICE 'ATENÇÃO: Existem leads sem organization_id definido';
    END IF;
    
    -- Verificar se existem regras ativas
    IF NOT EXISTS (SELECT 1 FROM re_engagement_rules WHERE active = true) THEN
        RAISE NOTICE 'AVISO: Não existem regras de reengajamento ativas';
    END IF;
    
    RAISE NOTICE 'Migração concluída com sucesso!';
END $$; 