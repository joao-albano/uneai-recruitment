#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ORGANIZATION_ID = '156bc50a-a68c-499e-b0a4-67b66639e12a';

async function desativarRegrasDuplicadas() {
  console.log('🔍 Buscando regras de reengajamento ativas para WhatsApp...');
  const { data: regras, error } = await supabase
    .from('re_engagement_rules')
    .select('id, name, active, preferred_channel, created_at')
    .eq('organization_id', ORGANIZATION_ID)
    .eq('active', true)
    .eq('preferred_channel', 'whatsapp')
    .order('created_at', { ascending: true });

  if (error || !regras || regras.length === 0) {
    console.log('❌ Nenhuma regra ativa encontrada:', error?.message);
    return;
  }

  console.log(`✅ ${regras.length} regra(s) ativa(s) encontrada(s):`);
  regras.forEach((r, i) => console.log(`  ${i+1}. ${r.name} (${r.id})`));

  // Manter apenas a mais antiga ativa
  const regrasParaDesativar = regras.slice(1); // Mantém a primeira

  if (regrasParaDesativar.length === 0) {
    console.log('✅ Apenas uma regra ativa, nada a fazer.');
    return;
  }

  const idsParaDesativar = regrasParaDesativar.map(r => r.id);
  console.log(`
🔧 Desativando ${idsParaDesativar.length} regra(s):`, idsParaDesativar.join(', '));

  const { error: updateError } = await supabase
    .from('re_engagement_rules')
    .update({ active: false })
    .in('id', idsParaDesativar);

  if (updateError) {
    console.log('❌ Erro ao desativar regras:', updateError.message);
  } else {
    console.log('✅ Regras duplicadas desativadas com sucesso!');
  }
}

desativarRegrasDuplicadas().catch(console.error); 