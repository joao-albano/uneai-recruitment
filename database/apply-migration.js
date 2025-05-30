#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function aplicarMigracao() {
  console.log('🚀 Iniciando aplicação da migração...');
  
  try {
    // Ler o arquivo SQL
    const sqlPath = path.join(__dirname, 'migrations', 'add_missing_columns.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📄 SQL carregado, aplicando migração...');
    
    // Executar a migração
    const { data, error } = await supabase.rpc('exec_sql', {
      sql_query: sqlContent
    });
    
    if (error) {
      console.error('❌ Erro ao aplicar migração:', error);
      
      // Tentar executar comando por comando
      console.log('🔄 Tentando executar comandos individualmente...');
      await executarComandosIndividualmente(sqlContent);
    } else {
      console.log('✅ Migração aplicada com sucesso!');
      console.log('📊 Resultado:', data);
    }
    
    // Verificar se as colunas foram criadas
    await verificarMigracao();
    
  } catch (error) {
    console.error('💥 Erro geral:', error);
  }
}

async function executarComandosIndividualmente(sqlContent) {
  // Separar comandos SQL
  const comandos = sqlContent
    .split(';')
    .map(cmd => cmd.trim())
    .filter(cmd => cmd && !cmd.startsWith('--'));
  
  console.log(`📝 Executando ${comandos.length} comandos...`);
  
  for (let i = 0; i < comandos.length; i++) {
    const comando = comandos[i];
    
    if (!comando) continue;
    
    try {
      console.log(`⏳ Executando comando ${i + 1}/${comandos.length}...`);
      
      const { error } = await supabase
        .from('_meta') // Usar uma tabela dummy
        .select('*')
        .limit(0); // Não retornar dados
      
      // Executar SQL direto se possível
      await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY
        },
        body: JSON.stringify({
          sql_query: comando
        })
      });
      
      console.log(`✅ Comando ${i + 1} executado`);
      
    } catch (error) {
      console.warn(`⚠️  Erro no comando ${i + 1}:`, error.message);
      console.log(`📝 Comando: ${comando.substring(0, 100)}...`);
    }
  }
}

async function verificarMigracao() {
  console.log('\n🔍 Verificando resultados da migração...');
  
  try {
    // Verificar se a coluna last_contact_at foi criada
    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .select('id, last_contact_at')
      .limit(1);
    
    if (!leadsError && leads) {
      console.log('✅ Coluna last_contact_at criada na tabela leads');
    } else {
      console.log('❌ Problema com coluna last_contact_at:', leadsError);
    }
    
    // Verificar se a tabela message_logs foi criada
    const { data: logs, error: logsError } = await supabase
      .from('message_logs')
      .select('id')
      .limit(1);
    
    if (!logsError) {
      console.log('✅ Tabela message_logs criada');
    } else {
      console.log('❌ Problema com tabela message_logs:', logsError);
    }
    
    // Verificar colunas da re_engagement_rules
    const { data: rules, error: rulesError } = await supabase
      .from('re_engagement_rules')
      .select('id, time_value, time_unit, preferred_channel')
      .limit(1);
    
    if (!rulesError) {
      console.log('✅ Colunas adicionadas na tabela re_engagement_rules');
    } else {
      console.log('❌ Problema com re_engagement_rules:', rulesError);
    }
    
    console.log('\n🎯 Verificação concluída!');
    
  } catch (error) {
    console.error('💥 Erro na verificação:', error);
  }
}

async function criarFuncaoExecutarSQL() {
  console.log('🔧 Criando função exec_sql se não existir...');
  
  const createFunctionSQL = `
    CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
    RETURNS TEXT
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql_query;
      RETURN 'SUCCESS';
    EXCEPTION
      WHEN OTHERS THEN
        RETURN 'ERROR: ' || SQLERRM;
    END;
    $$;
  `;
  
  try {
    // Este é um workaround - em produção use o SQL Editor do Supabase
    console.log('⚠️  Para criar a função exec_sql, execute este SQL no SQL Editor do Supabase:');
    console.log(createFunctionSQL);
  } catch (error) {
    console.log('💡 Use o SQL Editor do Supabase para executar as migrações');
  }
}

// Verificar argumentos da linha de comando
const comando = process.argv[2];

switch (comando) {
  case 'apply':
    aplicarMigracao();
    break;
    
  case 'verify':
    verificarMigracao();
    break;
    
  case 'help':
  default:
    console.log(`
🗄️  Script de Migração do Banco de Dados UNEAI

Comandos:
  apply     Aplicar a migração (adicionar colunas faltantes)
  verify    Verificar se a migração foi aplicada
  help      Mostrar esta ajuda

Uso:
  node apply-migration.js apply
  node apply-migration.js verify

⚠️  IMPORTANTE:
Se houver erros, execute o SQL manualmente no Supabase:
1. Vá para o SQL Editor em dashboard.supabase.com
2. Cole o conteúdo do arquivo migrations/add_missing_columns.sql
3. Execute o SQL

Variáveis de ambiente necessárias:
- SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
`);
    break;
} 