// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const unifiedScheduler = require('./src/services/unifiedScheduler');

async function testUnifiedSystem() {
  console.log('\n🚀 TESTE DO SISTEMA UNIFICADO\n');
  console.log('🔄 Reengajamento + 📢 Campanhas\n');

  try {
    // 1. Verificar status inicial
    console.log('📊 1. Status inicial do sistema:');
    const initialStatus = unifiedScheduler.getStatus();
    console.log(JSON.stringify(initialStatus, null, 2));

    // 2. Teste de execução individual - Reengajamento
    console.log('\n🔄 2. Testando APENAS reengajamento...');
    const reengagementOnly = process.env.TEST_REENGAGEMENT_ONLY === 'true';
    
    if (reengagementOnly) {
      await unifiedScheduler.runReengagementOnly();
    } else {
      console.log('⏸️  Teste de reengajamento desabilitado');
      console.log('💡 Para testar, defina TEST_REENGAGEMENT_ONLY=true no .env');
    }

    // 3. Teste de execução individual - Campanhas
    console.log('\n📢 3. Testando APENAS campanhas...');
    const campaignsOnly = process.env.TEST_CAMPAIGNS_ONLY === 'true';
    
    if (campaignsOnly) {
      await unifiedScheduler.runCampaignsOnly();
    } else {
      console.log('⏸️  Teste de campanhas desabilitado');
      console.log('💡 Para testar, defina TEST_CAMPAIGNS_ONLY=true no .env');
    }

    // 4. Teste do processo unificado completo
    console.log('\n🚀 4. Testando processo UNIFICADO...');
    const runUnified = process.env.TEST_UNIFIED_PROCESS === 'true';
    
    if (runUnified) {
      await unifiedScheduler.runUnifiedProcess();
    } else {
      console.log('⏸️  Teste unificado desabilitado');
      console.log('💡 Para testar, defina TEST_UNIFIED_PROCESS=true no .env');
    }

    // 5. Teste de campanha específica
    const specificCampaignId = process.env.TEST_SPECIFIC_CAMPAIGN_ID;
    if (specificCampaignId) {
      console.log(`\n🎯 5. Testando campanha específica: ${specificCampaignId}`);
      const result = await unifiedScheduler.runSpecificCampaign(specificCampaignId);
      console.log('Resultado:', JSON.stringify(result, null, 2));
    } else {
      console.log('\n⏸️  5. Teste de campanha específica desabilitado');
      console.log('💡 Para testar, defina TEST_SPECIFIC_CAMPAIGN_ID=<id> no .env');
    }

    // 6. Teste do agendamento automático
    console.log('\n⏰ 6. Testando agendamento automático...');
    const testScheduling = process.env.TEST_SCHEDULING === 'true';
    
    if (testScheduling) {
      console.log('🔄 Iniciando agendamento...');
      unifiedScheduler.start();
      
      // Aguardar 10 segundos para ver o agendamento funcionando
      console.log('⏳ Aguardando 10 segundos para verificar agendamento...');
      await new Promise(resolve => setTimeout(resolve, 10000));
      
      // Verificar status durante execução
      const runningStatus = unifiedScheduler.getStatus();
      console.log('📊 Status durante execução:');
      console.log(JSON.stringify(runningStatus, null, 2));
      
      // Parar agendamento
      console.log('🛑 Parando agendamento...');
      unifiedScheduler.stop();
      
    } else {
      console.log('⏸️  Teste de agendamento desabilitado');
      console.log('💡 Para testar, defina TEST_SCHEDULING=true no .env');
      console.log('⚠️  CUIDADO: Isso iniciará o agendamento automático real!');
    }

    // 7. Status final
    console.log('\n📊 7. Status final do sistema:');
    const finalStatus = unifiedScheduler.getStatus();
    console.log(JSON.stringify(finalStatus, null, 2));

    console.log('\n✅ TESTE DO SISTEMA UNIFICADO CONCLUÍDO\n');

    // 8. Guia de uso
    console.log('📖 GUIA DE USO DO SISTEMA:');
    console.log('═══════════════════════════════════════');
    console.log('🔄 Para reengajamento apenas:');
    console.log('   unifiedScheduler.runReengagementOnly()');
    console.log('');
    console.log('📢 Para campanhas apenas:');
    console.log('   unifiedScheduler.runCampaignsOnly()');
    console.log('');
    console.log('🚀 Para processo unificado:');
    console.log('   unifiedScheduler.runUnifiedProcess()');
    console.log('');
    console.log('🎯 Para campanha específica:');
    console.log('   unifiedScheduler.runSpecificCampaign(campaignId)');
    console.log('');
    console.log('⏰ Para iniciar agendamento automático:');
    console.log('   unifiedScheduler.start()');
    console.log('');
    console.log('🛑 Para parar agendamento:');
    console.log('   unifiedScheduler.stop()');
    console.log('═══════════════════════════════════════');

  } catch (error) {
    console.error('💥 Erro no teste do sistema unificado:', error);
  }
}

// Verificar configurações do .env
console.log('🔧 CONFIGURAÇÕES DE TESTE:');
console.log('══════════════════════════');
console.log(`TEST_REENGAGEMENT_ONLY: ${process.env.TEST_REENGAGEMENT_ONLY || 'false'}`);
console.log(`TEST_CAMPAIGNS_ONLY: ${process.env.TEST_CAMPAIGNS_ONLY || 'false'}`);
console.log(`TEST_UNIFIED_PROCESS: ${process.env.TEST_UNIFIED_PROCESS || 'false'}`);
console.log(`TEST_SPECIFIC_CAMPAIGN_ID: ${process.env.TEST_SPECIFIC_CAMPAIGN_ID || 'não definido'}`);
console.log(`TEST_SCHEDULING: ${process.env.TEST_SCHEDULING || 'false'}`);
console.log('══════════════════════════\n');

// Executar teste
testUnifiedSystem(); 