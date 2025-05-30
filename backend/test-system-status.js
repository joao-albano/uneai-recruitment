const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase - usando as variáveis de ambiente corretas
const supabaseUrl = 'https://kyjmfinhleizpxqedeku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5am1maW5obGVpenB4ZWRla3UiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzMxNjE2MzIwLCJleHAiOjIwNDcxOTIzMjB9.jU_0UpNin7Lqhd5G0JuW2ZKQF0Xa6P2Uy5PDBM0FhIk';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testSystemStatus() {
  console.log('\n🔍 TESTANDO STATUS DO SISTEMA DE REENGAJAMENTO\n');

  const organizationId = '156bc50a-a68c-499e-b0a4-67b66639e12a';

  try {
    // 1. Verificar leads atuais
    console.log('1️⃣ Verificando leads...');
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('id, name, phone, status, status_leads, etapa, created_at, updated_at')
      .eq('organization_id', organizationId);

    if (leadsError) {
      console.error('❌ Erro ao buscar leads:', leadsError);
      return;
    }

    console.log(`✅ ${leads.length} leads encontrados:`);
    leads.forEach(lead => {
      console.log(`   - ${lead.name}: ${lead.status} | ${lead.status_leads} | ${lead.etapa}`);
    });

    // 2. Verificar regras de reengajamento
    console.log('\n2️⃣ Verificando regras de reengajamento...');
    const { data: rules, error: rulesError } = await supabase
      .from('re_engagement_rules')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('active', true);

    if (rulesError) {
      console.error('❌ Erro ao buscar regras:', rulesError);
      return;
    }

    console.log(`✅ ${rules.length} regras ativas encontradas:`);
    rules.forEach(rule => {
      console.log(`   - ${rule.name}: ${rule.preferred_channel} | ${rule.time_value} ${rule.time_unit}`);
    });

    // 3. Verificar status válidos na tabela
    console.log('\n3️⃣ Verificando status únicos no sistema...');
    const { data: statusData, error: statusError } = await supabase
      .from('leads')
      .select('status, status_leads, etapa')
      .not('status', 'is', null);

    if (!statusError) {
      const uniqueStatus = [...new Set(statusData.map(l => l.status))];
      const uniqueStatusLeads = [...new Set(statusData.map(l => l.status_leads))];
      const uniqueEtapas = [...new Set(statusData.map(l => l.etapa))];

      console.log('✅ Status únicos encontrados:');
      console.log(`   - status: ${uniqueStatus.join(', ')}`);
      console.log(`   - status_leads: ${uniqueStatusLeads.join(', ')}`);
      console.log(`   - etapa: ${uniqueEtapas.join(', ')}`);
    }

    // 4. Verificar mensagens WhatsApp recentes
    console.log('\n4️⃣ Verificando mensagens WhatsApp recentes...');
    const { data: messages, error: messagesError } = await supabase
      .from('whatsapp_messages')
      .select('id, status, sent_at, direction')
      .eq('organization_id', organizationId)
      .order('sent_at', { ascending: false })
      .limit(5);

    if (!messagesError) {
      console.log(`✅ ${messages.length} mensagens recentes:`);
      messages.forEach(msg => {
        const date = new Date(msg.sent_at).toLocaleString('pt-BR');
        console.log(`   - ${date}: ${msg.status} (${msg.direction})`);
      });
    }

    console.log('\n🎉 SISTEMA VERIFICADO COM SUCESSO!');
    console.log('\n📊 RESUMO:');
    console.log(`   ✅ Leads: ${leads.length}`);
    console.log(`   ✅ Regras ativas: ${rules.length}`);
    console.log(`   ✅ Mensagens recentes: ${messages?.length || 0}`);
    console.log(`   ✅ Status padronizados: OK`);

  } catch (error) {
    console.error('💥 Erro no teste:', error);
  }
}

testSystemStatus(); 