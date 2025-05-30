// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const campaignScheduler = require('./src/services/campaignScheduler');

async function testCampaignSystem() {
  console.log('\n📢 TESTE DO SISTEMA DE CAMPANHAS\n');

  try {
    // 1. Testar busca de campanhas ativas
    console.log('🔍 1. Testando busca de campanhas ativas...');
    const campaigns = await campaignScheduler.getActiveCampaigns();
    
    if (campaigns.length === 0) {
      console.log('⚠️  Nenhuma campanha ativa encontrada');
      console.log('💡 Vamos criar uma campanha de teste...');
      
      // Criar campanha de teste (seria feito via interface do sistema)
      await createTestCampaign();
      return;
    }

    // 2. Testar campanha específica
    const testCampaign = campaigns[0];
    console.log(`✅ Campanha encontrada: ${testCampaign.name}`);
    console.log(`   Status: ${testCampaign.status}`);
    console.log(`   Organização: ${testCampaign.organization_id}`);

    // 3. Testar segmentação de leads
    console.log('\n🎯 2. Testando segmentação de leads...');
    const leads = await campaignScheduler.getLeadsForCampaign(testCampaign);
    console.log(`✅ ${leads.length} lead(s) encontrado(s) para a campanha`);

    if (leads.length === 0) {
      console.log('⚠️  Nenhum lead encontrado para esta campanha');
      console.log('💡 Verifique as regras de segmentação:');
      console.log(JSON.stringify(testCampaign.segmentation_rules, null, 2));
      return;
    }

    // 4. Testar processamento para um lead específico
    console.log('\n📱 3. Testando processamento de campanha...');
    const testLead = leads[0];
    console.log(`   Lead de teste: ${testLead.name} (${testLead.phone})`);

    // Verificar se já recebeu esta campanha
    const alreadyReceived = await campaignScheduler.hasLeadReceivedCampaign(testLead.id, testCampaign.id);
    console.log(`   Já recebeu campanha: ${alreadyReceived ? 'Sim' : 'Não'}`);

    // Gerar mensagem
    const message = campaignScheduler.generateCampaignMessage(testLead, testCampaign);
    console.log('\n📝 Mensagem gerada:');
    console.log('───────────────────');
    console.log(message);
    console.log('───────────────────');

    // 5. Testar envio real (opcional)
    const shouldSendReal = process.env.SEND_REAL_CAMPAIGN === 'true';
    
    if (shouldSendReal) {
      console.log('\n🚀 4. Enviando campanha real...');
      const result = await campaignScheduler.processCampaignForLead(testLead, testCampaign);
      
      if (result.success) {
        console.log('✅ Campanha enviada com sucesso!');
        console.log(`   Status: ${result.status}`);
        if (result.messageId) {
          console.log(`   Message ID: ${result.messageId}`);
        }
      } else {
        console.log('❌ Falha no envio da campanha');
        console.log(`   Erro: ${result.error}`);
        console.log(`   Motivo: ${result.reason || 'Erro técnico'}`);
      }
    } else {
      console.log('\n⏸️  4. Envio real desabilitado');
      console.log('💡 Para testar envio real, defina SEND_REAL_CAMPAIGN=true no .env');
    }

    // 6. Testar status do serviço
    console.log('\n📊 5. Status do serviço de campanhas:');
    const status = campaignScheduler.getStatus();
    console.log(JSON.stringify(status, null, 2));

  } catch (error) {
    console.error('💥 Erro no teste de campanhas:', error);
  }
}

// Função auxiliar para criar campanha de teste
async function createTestCampaign() {
  console.log('\n🔧 Criando campanha de teste...');
  
  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  try {
    const testCampaignData = {
      name: 'Campanha de Teste - Sistema Automatizado',
      status: 'active',
      description: 'Campanha criada automaticamente para teste do sistema',
      organization_id: '156bc50a-a68c-499e-b0a4-67b66639e12a',
      segmentation_rules: {
        audience: 'Ensino Fundamental', // Buscar leads de Ensino Fundamental
        status: ['NOVO', 'ANDAMENTO']   // Apenas leads novos ou em andamento
      },
      preferred_channel: 'whatsapp',
      message_template: `Olá {{name}}! 👋

Espero que esteja bem! 

Notei seu interesse em {{course}} e queria compartilhar uma oportunidade especial que pode interessar você.

Esta é uma mensagem da nossa campanha: {{campaign_name}} 📢

Nossa equipe está disponível para esclarecer qualquer dúvida sobre nossas oportunidades educacionais.

Que tal conversarmos? Responda este WhatsApp! 🚀

Atenciosamente,
Equipe UNE AI 📚`,
      start_date: new Date().toISOString(),
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('campaigns')
      .insert([testCampaignData])
      .select()
      .single();

    if (error) {
      console.error('❌ Erro ao criar campanha de teste:', error);
      return;
    }

    console.log('✅ Campanha de teste criada com sucesso!');
    console.log(`   ID: ${data.id}`);
    console.log(`   Nome: ${data.name}`);
    console.log('\n🎯 Execute o teste novamente para usar esta campanha');

  } catch (error) {
    console.error('💥 Erro ao criar campanha:', error);
  }
}

// Executar teste
testCampaignSystem(); 