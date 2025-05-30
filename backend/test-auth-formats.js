// Teste diferentes formatos de autenticação com Evolution API
const fetch = require('node-fetch');

async function testAuthFormats() {
  console.log('\n🔐 TESTANDO DIFERENTES FORMATOS DE AUTENTICAÇÃO\n');

  const evolutionUrl = 'https://evo.ganchodigital.com.br';
  const apiKey = 'd083bdefae7d4f5f9d08c57ad8623456';
  const instanceName = '156bc50a-a68c-499e-b0a4-67b66639e12a';
  
  const phone = '553195149986';
  const message = 'Teste de autenticação - UNE AI';

  // Diferentes formatos de headers para testar
  const authFormats = [
    {
      name: 'apikey header',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      }
    },
    {
      name: 'Authorization Bearer',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    },
    {
      name: 'x-api-key',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      }
    },
    {
      name: 'Api-Key',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey
      }
    },
    {
      name: 'X-API-KEY',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': apiKey
      }
    }
  ];

  const endpoints = [
    `/message/sendText/${instanceName}`,
    `/message/send-text/${instanceName}`,
    `/api/message/sendText/${instanceName}`,
    `/v1/message/sendText/${instanceName}`
  ];

  for (const endpoint of endpoints) {
    console.log(`\n📡 Testando endpoint: ${endpoint}`);
    
    for (const authFormat of authFormats) {
      console.log(`\n🔑 Formato: ${authFormat.name}`);
      
      try {
        const apiUrl = `${evolutionUrl}${endpoint}`;
        
        const payload = {
          number: phone,
          text: message,
          delay: 1200
        };

        console.log(`   URL: ${apiUrl}`);

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: authFormat.headers,
          body: JSON.stringify(payload)
        });

        console.log(`   Status: ${response.status}`);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ SUCESSO! Encontramos o formato correto!');
          console.log(`   Endpoint: ${endpoint}`);
          console.log(`   Auth: ${authFormat.name}`);
          console.log(`   Resposta:`, JSON.stringify(data, null, 2));
          
          console.log('\n🎯 FORMATO CORRETO ENCONTRADO:');
          console.log(`URL: ${apiUrl}`);
          console.log('Headers:', JSON.stringify(authFormat.headers, null, 2));
          return; // Parar quando encontrar o formato que funciona
          
        } else {
          const errorData = await response.text();
          console.log(`   ❌ ${response.status}: ${errorData.substring(0, 100)}...`);
        }

      } catch (error) {
        console.log(`   💥 Erro: ${error.message}`);
      }

      // Pequeno delay entre tentativas
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  console.log('\n❌ Nenhum formato de autenticação funcionou');
  console.log('🔍 Verifique se:');
  console.log('   - A API key não expirou');
  console.log('   - A instância está realmente conectada');
  console.log('   - Há um firewall bloqueando');
}

testAuthFormats(); 