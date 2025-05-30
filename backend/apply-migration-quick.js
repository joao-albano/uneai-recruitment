#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function aplicarMigracaoEssencial() {
  console.log('🚀 Aplicando migração essencial...');
  
  try {
    // 1. Adicionar coluna last_contact_at
    console.log('📝 Adicionando coluna last_contact_at...');
    const { error: alterError } = await supabase.rpc('exec_sql', {
      sql_query: `
        ALTER TABLE leads 
        ADD COLUMN IF NOT EXISTS last_contact_at TIMESTAMP WITH TIME ZONE;
        
        -- Atualizar leads existentes para NULL (elegíveis para reengajamento)
        UPDATE leads 
        SET last_contact_at = NULL 
        WHERE last_contact_at IS NULL;
      `
    });

    if (alterError) {
      console.error('❌ Erro ao adicionar coluna:', alterError);
      
      // Tentar método alternativo
      console.log('🔄 Tentando método direto...');
      
      const { error: directError } = await supabase
        .from('information_schema.columns')
        .select('column_name')
        .eq('table_name', 'leads')
        .eq('column_name', 'last_contact_at');
        
      if (directError) {
        console.log('💡 Execute manualmente no SQL Editor do Supabase:');
        console.log('ALTER TABLE leads ADD COLUMN IF NOT EXISTS last_contact_at TIMESTAMP WITH TIME ZONE;');
        return false;
      }
    } else {
      console.log('✅ Coluna last_contact_at adicionada!');
    }

    // 2. Verificar se funcionou
    console.log('\n🔍 Verificando se a coluna foi criada...');
    const { data: lead, error: testError } = await supabase
      .from('leads')
      .select('id, last_contact_at')
      .limit(1);

    if (testError) {
      console.error('❌ Coluna ainda não foi criada:', testError.message);
      
      if (testError.message.includes('last_contact_at')) {
        console.log('\n💡 SOLUÇÃO MANUAL:');
        console.log('1. Vá para dashboard.supabase.com');
        console.log('2. Selecione o projeto UNEAI');
        console.log('3. Vá para SQL Editor');
        console.log('4. Execute este comando:');
        console.log('   ALTER TABLE leads ADD COLUMN last_contact_at TIMESTAMP WITH TIME ZONE;');
        console.log('5. Execute novamente: node test-joao-direto.js');
      }
      
      return false;
    }

    console.log('✅ Migração aplicada com sucesso!');
    console.log('📊 Teste com um lead:', lead);
    
    return true;

  } catch (error) {
    console.error('💥 Erro geral:', error);
    return false;
  }
}

// Executar
aplicarMigracaoEssencial(); 