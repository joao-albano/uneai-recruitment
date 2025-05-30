// Teste para listar instâncias na Evolution API
const fetch = require('node-fetch');

async function testListInstances() {
  console.log('\n🔍 VERIFICANDO INSTÂNCIAS NA EVOLUTION API\n');

  const evolutionUrl = 'https://evo.ganchodigital.com.br';
  const apiKey = 'd083bdefae7d4f5f9d08c57ad8623456';

  try {
    console.log('📋 Tentando listar instâncias...');
    console.log(`   URL: ${evolutionUrl}/instance/fetchInstances`);
    console.log(`   API Key: ${apiKey.substring(0, 8)}...`);

    // Tentar diferentes endpoints comuns da Evolution API
    const endpoints = [
      '/instance/fetchInstances',
      '/instances',
      '/manager/instances',
      '/instance'
    ];

    for (const endpoint of endpoints) {
      console.log(`\n🧪 Testando endpoint: ${endpoint}`);
      
      try {
        const response = await fetch(`${evolutionUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey
          }
        });

        console.log(`   Status: ${response.status}`);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Sucesso! Resposta:');
          console.log(JSON.stringify(data, null, 2));
          break;
        } else {
          const errorData = await response.text();
          console.log(`❌ Erro ${response.status}: ${errorData}`);
        }
      } catch (error) {
        console.log(`💥 Erro de conexão: ${error.message}`);
      }
    }

  } catch (error) {
    console.error('💥 Erro geral:', error.message);
  }
}

testListInstances(); 