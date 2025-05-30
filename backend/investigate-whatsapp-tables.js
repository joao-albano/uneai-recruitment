#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ORGANIZATION_ID = '156bc50a-a68c-499e-b0a4-67b66639e12a';

/**
 * Script para investigar tabelas de WhatsApp no Supabase
 */

async function investigarTabelasWhatsApp() {
  console.log('🔍 INVESTIGANDO TABELAS DE WHATSAPP NO SUPABASE\n');
  
  // 1. Verificar tabelas que contêm "whatsapp" no nome
  console.log('1️⃣ Buscando tabelas com "whatsapp" no nome...');
  try {
    const { data: tabelas, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .like('table_name', '%whatsapp%');

    if (error) {
      console.log('❌ Erro ao buscar tabelas:', error.message);
      
      // Método alternativo: tentar acessar diretamente as tabelas conhecidas
      console.log('\n📋 Tentando acessar tabelas conhecidas...');
      
      const tabelasConhecidas = [
        'whatsapp_instances',
        'whatsapp_messages', 
        'whatsapp_contacts',
        'whatsapp_sessions',
        'whatsapp_webhooks'
      ];
      
      for (const tabela of tabelasConhecidas) {
        try {
          const { data, error } = await supabase
            .from(tabela)
            .select('*')
            .limit(1);
          
          if (!error) {
            console.log(`✅ Tabela "${tabela}" existe e é acessível`);
          } else {
            console.log(`❌ Tabela "${tabela}": ${error.message}`);
          }
        } catch (e) {
          console.log(`❌ Tabela "${tabela}": erro de acesso`);
        }
      }
      
    } else {
      console.log('✅ Tabelas WhatsApp encontradas:');
      tabelas.forEach(t => console.log(`  - ${t.table_name}`));
    }

  } catch (error) {
    console.log('❌ Erro na busca:', error.message);
  }

  // 2. Investigar especificamente whatsapp_instances
  console.log('\n2️⃣ Investigando tabela whatsapp_instances...');
  try {
    const { data: instances, error } = await supabase
      .from('whatsapp_instances')
      .select('*');

    if (error) {
      console.log('❌ Erro ao acessar whatsapp_instances:', error.message);
    } else {
      console.log(`✅ ${instances.length} instância(s) encontrada(s):`);
      
      instances.forEach((instance, index) => {
        console.log(`\n📱 Instância ${index + 1}:`);
        console.log(`  ID: ${instance.id || 'N/A'}`);
        console.log(`  Instance ID: ${instance.instance_id || 'N/A'}`);
        console.log(`  Instance Name: ${instance.instance_name || 'N/A'}`);
        console.log(`  Organization ID: ${instance.organization_id || 'N/A'}`);
        console.log(`  Status: ${instance.status || 'N/A'}`);
        console.log(`  Created At: ${instance.created_at || 'N/A'}`);
        console.log(`  Updated At: ${instance.updated_at || 'N/A'}`);
        
        // Mostrar todas as colunas disponíveis
        console.log(`  Colunas disponíveis: ${Object.keys(instance).join(', ')}`);
      });
    }

  } catch (error) {
    console.log('❌ Erro ao investigar whatsapp_instances:', error.message);
  }

  // 3. Verificar instâncias da organização específica
  console.log(`\n3️⃣ Buscando instâncias da organização ${ORGANIZATION_ID}...`);
  try {
    const { data: orgInstances, error } = await supabase
      .from('whatsapp_instances')
      .select('*')
      .eq('organization_id', ORGANIZATION_ID);

    if (error) {
      console.log('❌ Erro:', error.message);
    } else {
      console.log(`✅ ${orgInstances.length} instância(s) da organização:`);
      
      orgInstances.forEach((instance, index) => {
        console.log(`\n🏢 Instância ${index + 1}:`);
        console.log(`  Instance ID: ${instance.instance_id}`);
        console.log(`  Instance Name: ${instance.instance_name}`);
        console.log(`  Status: ${instance.status}`);
        console.log(`  Phone: ${instance.phone || 'N/A'}`);
        console.log(`  Token: ${instance.token ? 'Configurado' : 'Não configurado'}`);
        console.log(`  Webhook: ${instance.webhook_url || 'N/A'}`);
        console.log(`  Connected: ${instance.connected_at || 'Nunca'}`);
        console.log(`  Last Seen: ${instance.last_seen_at || 'N/A'}`);
      });
    }

  } catch (error) {
    console.log('❌ Erro ao buscar instâncias da organização:', error.message);
  }

  // 4. Verificar estrutura da tabela (colunas)
  console.log('\n4️⃣ Investigando estrutura da tabela whatsapp_instances...');
  try {
    const { data: colunas, error } = await supabase
      .rpc('get_table_columns', { table_name: 'whatsapp_instances' });

    if (error) {
      console.log('❌ Erro ao obter colunas (função RPC não disponível)');
      
      // Método alternativo: fazer select de uma linha e ver as chaves
      const { data: sample, error: sampleError } = await supabase
        .from('whatsapp_instances')
        .select('*')
        .limit(1);

      if (!sampleError && sample && sample.length > 0) {
        console.log('✅ Colunas detectadas pela amostra:');
        Object.keys(sample[0]).forEach(col => {
          const valor = sample[0][col];
          const tipo = typeof valor;
          console.log(`  - ${col}: ${tipo} (exemplo: ${valor})`);
        });
      }

    } else {
      console.log('✅ Estrutura da tabela:');
      colunas.forEach(col => {
        console.log(`  - ${col.column_name}: ${col.data_type}`);
      });
    }

  } catch (error) {
    console.log('❌ Erro ao investigar estrutura:', error.message);
  }

  // 5. Verificar outras tabelas relacionadas
  console.log('\n5️⃣ Verificando outras tabelas relacionadas ao WhatsApp...');
  
  const outrasTabelas = [
    'whatsapp_messages',
    'whatsapp_contacts', 
    'whatsapp_chats',
    'whatsapp_groups',
    'evolution_instances',
    'evolution_webhooks'
  ];

  for (const tabela of outrasTabelas) {
    try {
      const { data, error } = await supabase
        .from(tabela)
        .select('*')
        .limit(1);

      if (!error) {
        console.log(`✅ Tabela "${tabela}" existe`);
        if (data && data.length > 0) {
          console.log(`    Colunas: ${Object.keys(data[0]).join(', ')}`);
        }
      } else {
        console.log(`❌ Tabela "${tabela}": ${error.message}`);
      }

    } catch (e) {
      console.log(`❌ Tabela "${tabela}": erro de acesso`);
    }
  }

  console.log('\n🏁 Investigação concluída!');
}

// Executar investigação
investigarTabelasWhatsApp().catch(console.error); 