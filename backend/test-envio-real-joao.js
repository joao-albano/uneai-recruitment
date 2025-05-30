// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

// Teste para enviar mensagem real para joao_teste
const leadScheduler = require('./src/services/leadScheduler');

async function testEnvioRealJoao() {
  console.log('\n📱 TESTE DE ENVIO REAL PARA JOAO_TESTE\n');

  const organizationId = '156bc50a-a68c-499e-b0a4-67b66639e12a';

  try {
    // Dados do lead joao_teste
    const lead = {
      id: '9dbf5865-65aa-4958-95e4-645a3f0a14d8',
      name: 'joao_teste',
      phone: '553195149986',
      course: 'Ensino Fundamental',
      organization_id: organizationId,
      created_at: '2025-05-14T12:49:28.302112+00:00',
      updated_at: '2025-05-23T16:31:45.452166+00:00'
    };

    // Dados da regra ativa
    const rule = {
      id: 'rule-1',
      name: 'Reengajamento 30min',
      preferred_channel: 'whatsapp',
      time_value: 30,
      time_unit: 'minutes',
      trigger_type: 'no_response',
      message_template: `Olá {{name}}! 👋

Notei que você demonstrou interesse no curso {{course}}.

Que tal conversarmos mais sobre as oportunidades disponíveis? 🚀

Posso esclarecer suas dúvidas e te ajudar a dar o próximo passo!

Responda este WhatsApp para continuarmos.

Atenciosamente,
Equipe UNE AI 📚`,
      organization_id: organizationId,
      active: true
    };

    console.log('📋 Dados do lead:');
    console.log(`   - Nome: ${lead.name}`);
    console.log(`   - Telefone: ${lead.phone}`);
    console.log(`   - Curso: ${lead.course}`);

    console.log('\n📋 Dados da regra:');
    console.log(`   - Nome: ${rule.name}`);
    console.log(`   - Canal: ${rule.preferred_channel}`);
    console.log(`   - Template: ${rule.message_template.substring(0, 50)}...`);

    console.log('\n🔄 Processando reengajamento...');
    
    // Processar reengajamento para o lead
    const result = await leadScheduler.processReengagementForLead(lead, rule);

    console.log('\n📊 RESULTADO:');
    if (result.success) {
      console.log('✅ SUCESSO! Mensagem enviada para joao_teste');
      console.log(`   - Status: ${result.status}`);
      console.log(`   - Message ID: ${result.messageId}`);
      console.log('   - A mensagem deve chegar no WhatsApp em alguns segundos');
    } else {
      console.log('❌ FALHA no envio da mensagem');
      console.log(`   - Erro: ${result.error}`);
      console.log(`   - Canal: ${result.channel}`);
    }

    console.log('\n🔍 Verificando logs no banco...');
    console.log('   (Mensagem foi salva na tabela whatsapp_messages)');

    console.log('\n🎯 INSTRUÇÕES:');
    console.log('1. Verifique seu WhatsApp (553195149986)');
    console.log('2. Se não recebeu, verifique:');
    console.log('   - Número está registrado no WhatsApp');
    console.log('   - Instância Evolution API está conectada');
    console.log('   - API Key está correta');

  } catch (error) {
    console.error('💥 Erro no teste:', error);
  }
}

testEnvioRealJoao(); 