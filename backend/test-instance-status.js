// Teste para verificar status da instância específica
const fetch = require('node-fetch');

async function testInstanceStatus() {
  console.log('\n📊 VERIFICANDO STATUS DA INSTÂNCIA\n');

  const evolutionUrl = 'https://evo.ganchodigital.com.br';
  const apiKey = 'd083bdefae7d4f5f9d08c57ad8623456';
  const instanceName = '156bc50a-a68c-499e-b0a4-67b66639e12a';

  try {
    // Tentar endpoints para verificar status da instância
    const statusEndpoints = [
      `/instance/connectionState/${instanceName}`,
      `/instance/connect/${instanceName}`,
      `/instance/${instanceName}`,
      `/instance/status/${instanceName}`,
      `/instance/connectionState/${instanceName}`
    ];

    console.log(`🔍 Verificando instância: ${instanceName}`);
    console.log(`📡 API Key: ${apiKey.substring(0, 8)}...`);

    for (const endpoint of statusEndpoints) {
      console.log(`\n🧪 Testando: ${endpoint}`);
      
      try {
        const response = await fetch(`${evolutionUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': apiKey
          }
        });

        console.log(`   Status HTTP: ${response.status}`);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Sucesso! Dados da instância:');
          console.log(JSON.stringify(data, null, 2));
          
          // Se encontrou info da instância, verificar estado
          if (data.state || data.connectionState || data.status) {
            const state = data.state || data.connectionState || data.status;
            console.log(`\n🔗 Estado da conexão: ${state}`);
            
            if (state === 'open' || state === 'connected') {
              console.log('✅ Instância está conectada!');
              return true;
            } else {
              console.log('❌ Instância NÃO está conectada!');
              console.log('🔧 Pode ser necessário reconectar via QR Code');
              return false;
            }
          }
          
        } else {
          const errorData = await response.text();
          console.log(`   ❌ ${response.status}: ${errorData.substring(0, 150)}...`);
        }

      } catch (error) {
        console.log(`   💥 Erro: ${error.message}`);
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log('\n❌ Não foi possível verificar o status da instância');
    console.log('🔧 Possíveis soluções:');
    console.log('   1. Verificar se a API key não expirou');
    console.log('   2. Reconectar a instância via interface web');
    console.log('   3. Gerar novo QR Code se necessário');

  } catch (error) {
    console.error('💥 Erro geral:', error.message);
  }
}

testInstanceStatus(); 