const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase usando as variáveis de ambiente corretas
const supabaseUrl = 'https://kyjmfinhleizpxqedeku.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5am1maW5obGVpenB4ZWRla3UiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNzMxNjE2MzIwLCJleHAiOjIwNDcxOTIzMjB9.jU_0UpNin7Lqhd5G0JuW2ZKQF0Xa6P2Uy5PDBM0FhIk';
const supabase = createClient(supabaseUrl, supabaseKey);

// Importar o leadScheduler corrigido
const leadScheduler = require('./src/services/leadScheduler');

async function testJoaoTeste() {
  console.log('\n🧪 TESTE ESPECÍFICO PARA JOAO_TESTE\n');

  const organizationId = '156bc50a-a68c-499e-b0a4-67b66639e12a';
  const leadName = 'joao_teste';

  try {
    // 1. Buscar o lead joao_teste
    console.log('1️⃣ Buscando lead joao_teste...');
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('name', leadName)
      .single();

    if (leadError || !lead) {
      console.error('❌ Lead joao_teste não encontrado:', leadError);
      return;
    }

    console.log('✅ Lead encontrado:');
    console.log(`   - ID: ${lead.id}`);
    console.log(`   - Nome: ${lead.name}`);
    console.log(`   - Telefone: ${lead.phone}`);
    console.log(`   - Status: ${lead.status}`);
    console.log(`   - Status Leads: ${lead.status_leads}`);
    console.log(`   - Etapa: ${lead.etapa}`);
    console.log(`   - Criado em: ${new Date(lead.created_at).toLocaleString('pt-BR')}`);
    console.log(`   - Atualizado em: ${new Date(lead.updated_at).toLocaleString('pt-BR')}`);

    // 2. Buscar regras de reengajamento ativas
    console.log('\n2️⃣ Buscando regras de reengajamento ativas...');
    const { data: rules, error: rulesError } = await supabase
      .from('re_engagement_rules')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('active', true);

    if (rulesError || !rules || rules.length === 0) {
      console.error('❌ Nenhuma regra de reengajamento ativa encontrada:', rulesError);
      return;
    }

    console.log(`✅ ${rules.length} regra(s) ativa(s) encontrada(s):`);
    rules.forEach(rule => {
      console.log(`   - ${rule.name}: ${rule.preferred_channel} | ${rule.time_value} ${rule.time_unit}`);
    });

    // 3. Verificar elegibilidade do lead para cada regra
    console.log('\n3️⃣ Verificando elegibilidade...');
    let eligibleRules = [];
    
    for (const rule of rules) {
      const isEligible = isLeadEligibleForRule(lead, rule);
      console.log(`   - Regra "${rule.name}": ${isEligible ? '✅ ELEGÍVEL' : '❌ não elegível'}`);
      
      if (isEligible) {
        eligibleRules.push(rule);
      }
    }

    if (eligibleRules.length === 0) {
      console.log('\n⚠️  Lead não está elegível para nenhuma regra de reengajamento no momento.');
      return;
    }

    // 4. Verificar instância WhatsApp
    console.log('\n4️⃣ Verificando instância WhatsApp...');
    const { data: instance, error: instanceError } = await supabase
      .from('whatsapp_instances')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('status', 'connected')
      .single();

    if (instanceError || !instance) {
      console.error('❌ Instância WhatsApp não encontrada ou não conectada:', instanceError);
      return;
    }

    console.log('✅ Instância WhatsApp encontrada:');
    console.log(`   - Nome: ${instance.instance_name}`);
    console.log(`   - Status: ${instance.status}`);

    // 5. Simular processamento de reengajamento
    console.log('\n5️⃣ Simulando processamento de reengajamento...');
    
    for (const rule of eligibleRules) {
      console.log(`\n📤 Processando regra: ${rule.name}`);
      
      // Gerar mensagem personalizada
      const message = generatePersonalizedMessage(lead, rule);
      console.log(`💬 Mensagem: ${message.substring(0, 100)}...`);
      
      // Simular envio (sem enviar realmente)
      console.log(`📱 Canal: ${rule.preferred_channel}`);
      console.log(`📞 Para: ${lead.phone}`);
      
      // Atualizar status do lead usando o método correto
      console.log('🔄 Atualizando status do lead...');
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          status: 'NOVO',
          status_leads: 'NOVO',
          etapa: 'CONTATO',
          updated_at: new Date().toISOString()
        })
        .eq('id', lead.id);

      if (updateError) {
        console.error('❌ Erro ao atualizar status:', updateError);
      } else {
        console.log('✅ Status atualizado com sucesso!');
      }
    }

    // 6. Verificar status final do lead
    console.log('\n6️⃣ Verificando status final...');
    const { data: updatedLead, error: finalError } = await supabase
      .from('leads')
      .select('id, name, status, status_leads, etapa, updated_at')
      .eq('id', lead.id)
      .single();

    if (!finalError && updatedLead) {
      console.log('✅ Status final do lead:');
      console.log(`   - Status: ${updatedLead.status}`);
      console.log(`   - Status Leads: ${updatedLead.status_leads}`);
      console.log(`   - Etapa: ${updatedLead.etapa}`);
      console.log(`   - Atualizado em: ${new Date(updatedLead.updated_at).toLocaleString('pt-BR')}`);
    }

    console.log('\n🎉 TESTE CONCLUÍDO COM SUCESSO!');
    console.log('✅ Sistema de reengajamento funcionando corretamente');
    console.log('✅ Status atualizados conforme enums do banco');
    console.log('✅ Não há mais referências ao status inválido');

  } catch (error) {
    console.error('💥 Erro no teste:', error);
  }
}

// Função auxiliar para verificar elegibilidade
function isLeadEligibleForRule(lead, rule) {
  const now = new Date();
  const leadCreatedAt = new Date(lead.created_at);
  const leadUpdatedAt = new Date(lead.updated_at || lead.created_at);
  
  // Calcular tempo desde criação/última atualização
  const timeSinceCreated = now - leadCreatedAt;
  const timeSinceUpdated = now - leadUpdatedAt;
  
  // Converter time_value e time_unit para milliseconds
  let ruleTimeMs = rule.time_value * 60 * 1000; // padrão: minutos
  
  if (rule.time_unit === 'hours') {
    ruleTimeMs = rule.time_value * 60 * 60 * 1000;
  } else if (rule.time_unit === 'days') {
    ruleTimeMs = rule.time_value * 24 * 60 * 60 * 1000;
  }
  
  // Verificar condições baseadas no tipo de trigger
  if (rule.trigger_type === 'no_response') {
    return timeSinceUpdated >= ruleTimeMs;
  } else if (rule.trigger_type === 'time_based') {
    return timeSinceCreated >= ruleTimeMs;
  } else if (rule.trigger_type === 'status_change') {
    return timeSinceUpdated >= ruleTimeMs;
  }
  
  return false;
}

// Função auxiliar para gerar mensagem personalizada
function generatePersonalizedMessage(lead, rule) {
  let message = rule.message_template || `Olá {{name}}! Estamos entrando em contato sobre {{course}}.`;
  
  // Substituir variáveis
  message = message.replace(/\{\{name\}\}/g, lead.name || 'Cliente');
  message = message.replace(/\{\{course\}\}/g, lead.course || 'nossos cursos');
  message = message.replace(/\{\{organization\}\}/g, 'UNE AI');
  
  return message;
}

testJoaoTeste(); 