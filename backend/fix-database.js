#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verificarColuna() {
  console.log('🔍 Verificando se a coluna last_contact_at já existe...');
  
  try {
    // Tentar fazer uma query que use a coluna
    const { data, error } = await supabase
      .from('leads')
      .select('id, last_contact_at')
      .limit(1);

    if (error && error.message.includes('last_contact_at')) {
      console.log('❌ Coluna last_contact_at NÃO existe');
      return false;
    }

    if (!error) {
      console.log('✅ Coluna last_contact_at JÁ existe!');
      return true;
    }

    console.log('🤔 Status indefinido, tentando corrigir...');
    return false;

  } catch (error) {
    console.log('❌ Erro ao verificar coluna');
    return false;
  }
}

async function aplicarCorrecaoViaRPC() {
  console.log('🔧 Tentando aplicar correção via RPC...');
  
  try {
    // Criar função temporária para executar DDL
    const createFunctionSQL = `
      CREATE OR REPLACE FUNCTION add_last_contact_column()
      RETURNS text
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      BEGIN
        -- Verificar se a coluna já existe
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns 
          WHERE table_name = 'leads' AND column_name = 'last_contact_at'
        ) THEN
          -- Adicionar a coluna
          ALTER TABLE leads ADD COLUMN last_contact_at TIMESTAMP WITH TIME ZONE;
          RETURN 'Coluna adicionada com sucesso';
        ELSE
          RETURN 'Coluna já existe';
        END IF;
      END;
      $$;
    `;

    console.log('📝 Criando função temporária...');
    const { data: createResult, error: createError } = await supabase.rpc('create_function', {
      sql: createFunctionSQL
    });

    if (createError) {
      console.log('⚠️  Não foi possível criar função via RPC');
      return false;
    }

    // Executar a função
    console.log('🚀 Executando função para adicionar coluna...');
    const { data: execResult, error: execError } = await supabase.rpc('add_last_contact_column');

    if (execError) {
      console.log('❌ Erro ao executar função:', execError.message);
      return false;
    }

    console.log('✅ Resultado:', execResult);
    return true;

  } catch (error) {
    console.log('💥 Erro geral na aplicação via RPC:', error.message);
    return false;
  }
}

async function aplicarCorrecaoViaUpdate() {
  console.log('🔄 Tentando aplicação alternativa...');
  
  try {
    // Tentar usar uma abordagem indireta
    // Primeiro, vamos ver a estrutura atual da tabela
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .limit(1);

    if (leadsError) {
      console.log('❌ Erro ao acessar tabela leads:', leadsError.message);
      return false;
    }

    console.log('📋 Estrutura atual dos leads:');
    if (leads && leads.length > 0) {
      console.log('Colunas existentes:', Object.keys(leads[0]));
      
      if (Object.keys(leads[0]).includes('last_contact_at')) {
        console.log('✅ Coluna last_contact_at JÁ está presente!');
        return true;
      }
    }

    console.log('❌ Coluna last_contact_at NÃO encontrada na estrutura');
    return false;

  } catch (error) {
    console.log('💥 Erro na verificação alternativa:', error.message);
    return false;
  }
}

async function mostrarInstrucaoManual() {
  console.log('\n🛠️  INSTRUÇÕES PARA CORREÇÃO MANUAL:');
  console.log('1. Acesse: https://dashboard.supabase.com');
  console.log('2. Selecione o projeto UNEAI');
  console.log('3. Vá para "SQL Editor"');
  console.log('4. Cole e execute este comando:');
  console.log('\n📋 SQL PARA EXECUTAR:');
  console.log('```sql');
  console.log('ALTER TABLE leads ADD COLUMN last_contact_at TIMESTAMP WITH TIME ZONE;');
  console.log('CREATE INDEX idx_leads_last_contact_at ON leads(last_contact_at);');
  console.log('UPDATE leads SET last_contact_at = NULL;');
  console.log('```');
  console.log('\n5. Depois execute: node test-joao-direto.js');
}

async function executarCorrecao() {
  console.log('🚀 === CORREÇÃO DO BANCO DE DADOS ===\n');

  // 1. Verificar se já existe
  const jaExiste = await verificarColuna();
  if (jaExiste) {
    console.log('\n🎉 Banco já está correto! Executando teste...\n');
    return true;
  }

  // 2. Tentar via RPC
  console.log('\n🔧 Tentativa 1: Via RPC...');
  const rpcSucesso = await aplicarCorrecaoViaRPC();
  if (rpcSucesso) {
    return true;
  }

  // 3. Tentar via update
  console.log('\n🔧 Tentativa 2: Verificação alternativa...');
  const altSucesso = await aplicarCorrecaoViaUpdate();
  if (altSucesso) {
    return true;
  }

  // 4. Mostrar instruções manuais
  console.log('\n❌ Não foi possível aplicar automaticamente');
  await mostrarInstrucaoManual();
  
  return false;
}

// Executar correção
executarCorrecao()
  .then(sucesso => {
    if (sucesso) {
      console.log('\n✅ Correção aplicada! Agora você pode executar:');
      console.log('node test-joao-direto.js');
    }
    process.exit(sucesso ? 0 : 1);
  })
  .catch(error => {
    console.error('💥 Erro fatal:', error);
    process.exit(1);
  }); 