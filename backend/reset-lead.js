#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function resetLead() {
  console.log('🔄 Atualizando telefone e resetando status do lead joao_teste...');
  
  // Buscar todos os leads com esse nome
  const { data: leads, error: findError } = await supabase
    .from('leads')
    .select('*')
    .eq('name', 'joao_teste')
    .eq('organization_id', '156bc50a-a68c-499e-b0a4-67b66639e12a');
  
  if (findError || !leads || leads.length === 0) {
    console.log('❌ Leads não encontrados:', findError?.message);
    return;
  }
  
  console.log(`✅ ${leads.length} lead(s) encontrado(s):`);
  
  for (let i = 0; i < leads.length; i++) {
    const lead = leads[i];
    console.log(`\n📱 Lead ${i + 1}:`);
    console.log(`   ID: ${lead.id}`);
    console.log(`   Nome: ${lead.name}`);
    console.log(`   Telefone atual: ${lead.phone}`);
    console.log(`   Status atual: ${lead.status}`);
    console.log(`   Criado: ${lead.created_at}`);
    
    // Atualizar telefone e resetar status
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        phone: '553195149986',
        status: 'novo',
        updated_at: new Date().toISOString()
      })
      .eq('id', lead.id);
    
    if (updateError) {
      console.log('   ❌ Erro ao atualizar:', updateError.message);
    } else {
      console.log('   ✅ Telefone atualizado para 553195149986 e status resetado para "novo"');
    }
  }
  
  console.log('\n🎉 Processo de atualização concluído!');
  console.log('✅ Lead joao_teste agora está elegível para reengajamento com o novo número!');
}

resetLead().catch(console.error); 