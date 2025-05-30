// Teste direto com Evolution API
const fetch = require('node-fetch');

async function testEvolutionAPI() {
  console.log('\n🧪 TESTE DIRETO COM EVOLUTION API\n');

  const evolutionUrl = 'https://evo.ganchodigital.com.br';
  const apiKey = 'd083bdefae7d4f5f9d08c57ad8623456';
  const instanceName = '156bc50a-a68c-499e-b0a4-67b66639e12a';
  
  const phone = '553195149986';
  const message = `🧪 TESTE DIRETO DA EVOLUTION API

Olá! Esta é uma mensagem de teste do sistema UNE AI.

Se você recebeu esta mensagem, significa que:
✅ Evolution API está funcionando
✅ Instância WhatsApp está conectada
✅ Sistema de envio está operacional

Horário: ${new Date().toLocaleString('pt-BR')}`;

  try {
    const apiUrl = `${evolutionUrl}/message/sendText/${instanceName}`;
    
    const payload = {
      number: phone,
      text: message,
      delay: 1200
    };

    console.log('📱 Dados do envio:');
    console.log(`   URL: ${apiUrl}`);
    console.log(`   Para: ${phone}`);
    console.log(`   API Key: ${apiKey.substring(0, 8)}...`);
    console.log(`   Instância: ${instanceName}`);

    console.log('\n🚀 Enviando mensagem...');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify(payload)
    });

    console.log(`📊 Status HTTP: ${response.status}`);

    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      responseData = await response.text();
    }

    console.log('📄 Resposta da API:');
    console.log(JSON.stringify(responseData, null, 2));

    if (response.ok) {
      console.log('\n✅ SUCESSO! Mensagem enviada');
      console.log('🔍 Verifique seu WhatsApp agora');
    } else {
      console.log('\n❌ FALHA no envio');
      console.log('🔍 Verifique:');
      console.log('   - API Key está correta');
      console.log('   - Instância está conectada');
      console.log('   - Número de telefone está correto');
    }

  } catch (error) {
    console.error('💥 Erro na requisição:', error.message);
  }
}

testEvolutionAPI(); 