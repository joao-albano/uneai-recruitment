#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Script de teste para o Lead Scheduler
 * 
 * Como usar:
 * node test-scheduler.js [comando]
 * 
 * Comandos disponíveis:
 * - create-test-data: Cria dados de teste (campanha + leads)
 * - manual-run: Executa o scheduler manualmente
 * - fast-test: Inicia teste rápido via API
 * - check-status: Verifica status do scheduler
 * - clean-test-data: Remove dados de teste
 */

async function criarDadosDeTeste() {
  console.log('🔧 Criando dados de teste...');
  
  try {
    // Criar campanha de teste
    const { data: campanha, error: campanhaError } = await supabase
      .from('campaigns')
      .insert([{
        name: 'Campanha de Teste Scheduler',
        status: 'active',
        organization_id: '123e4567-e89b-12d3-a456-426614174000', // Use um ID real da sua org
        created_at: new Date().toISOString()
      }])
      .select()
      .single();

    if (campanhaError) {
      console.error('❌ Erro ao criar campanha:', campanhaError);
      return;
    }

    console.log('✅ Campanha criada:', campanha.name);

    // Criar leads de teste
    const leadsTest = [
      {
        name: 'João Teste',
        email: 'joao.teste@scheduler.com',
        phone: '11999999001',
        status: 'pendente',
        course: 'Teste Scheduler',
        channel: 'teste',
        created_by: '123e4567-e89b-12d3-a456-426614174000',
        organization_id: campanha.organization_id,
        created_at: new Date().toISOString()
      },
      {
        name: 'Maria Teste',
        email: 'maria.teste@scheduler.com',
        phone: '11999999002',
        status: 'pendente',
        course: 'Teste Scheduler',
        channel: 'teste',
        created_by: '123e4567-e89b-12d3-a456-426614174000',
        organization_id: campanha.organization_id,
        created_at: new Date().toISOString()
      },
      {
        name: 'Pedro Teste',
        email: 'pedro.teste@scheduler.com',
        phone: '11999999003',
        status: 'pendente',
        course: 'Teste Scheduler',
        channel: 'teste',
        created_by: '123e4567-e89b-12d3-a456-426614174000',
        organization_id: campanha.organization_id,
        created_at: new Date().toISOString()
      }
    ];

    const { data: leads, error: leadsError } = await supabase
      .from('leads')
      .insert(leadsTest)
      .select();

    if (leadsError) {
      console.error('❌ Erro ao criar leads:', leadsError);
      return;
    }

    console.log(`✅ ${leads.length} leads criados com sucesso`);
    console.log('📋 Leads criados:');
    leads.forEach(lead => {
      console.log(`  - ${lead.name} (${lead.email}) - Status: ${lead.status}`);
    });

    console.log('\n🎯 Dados de teste criados! Agora você pode testar o scheduler.');
    
  } catch (error) {
    console.error('💥 Erro geral:', error);
  }
}

async function executarManualmente() {
  console.log('🔧 Executando scheduler manualmente via API...');
  
  try {
    const response = await fetch('http://localhost:3001/api/admin/check-leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Execução manual concluída!');
      console.log('📊 Resultados:', JSON.stringify(result.data, null, 2));
    } else {
      console.error('❌ Erro na execução:', result.message);
    }
  } catch (error) {
    console.error('💥 Erro ao executar:', error.message);
    console.log('💡 Certifique-se de que o servidor está rodando em http://localhost:3001');
  }
}

async function iniciarTesteRapido() {
  console.log('🔬 Iniciando teste rápido (a cada minuto)...');
  
  try {
    const response = await fetch('http://localhost:3001/api/admin/test/fast-schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Teste rápido iniciado!');
      console.log('⏱️  O scheduler executará a cada minuto por 5 minutos');
      console.log('📺 Acompanhe os logs no console do servidor para ver os resultados');
    } else {
      console.error('❌ Erro ao iniciar teste:', result.message);
    }
  } catch (error) {
    console.error('💥 Erro ao iniciar teste:', error.message);
  }
}

async function verificarStatus() {
  console.log('📊 Verificando status do scheduler...');
  
  try {
    const response = await fetch('http://localhost:3001/api/admin/scheduler/status');
    const result = await response.json();
    
    if (result.success) {
      console.log('✅ Status do Scheduler:');
      console.log(`  🔄 Está rodando: ${result.isRunning ? 'SIM' : 'NÃO'}`);
      console.log(`  📋 Total de tasks: ${result.totalTasks}`);
      console.log(`  🌍 Ambiente: ${result.environment}`);
      console.log(`  ⚙️  Scheduler habilitado: ${result.schedulerEnabled ? 'SIM' : 'NÃO'}`);
      console.log(`  🔬 Modo teste: ${result.testMode ? 'SIM' : 'NÃO'}`);
      console.log(`  ⚡ Teste rápido: ${result.fastTest ? 'SIM' : 'NÃO'}`);
    } else {
      console.error('❌ Erro ao verificar status:', result.message);
    }
  } catch (error) {
    console.error('💥 Erro ao verificar status:', error.message);
  }
}

async function limparDadosDeTeste() {
  console.log('🧹 Limpando dados de teste...');
  
  try {
    // Remover leads de teste
    const { error: leadsError } = await supabase
      .from('leads')
      .delete()
      .like('email', '%scheduler.com');

    if (leadsError) {
      console.error('❌ Erro ao remover leads:', leadsError);
    } else {
      console.log('✅ Leads de teste removidos');
    }

    // Remover campanha de teste
    const { error: campanhaError } = await supabase
      .from('campaigns')
      .delete()
      .like('name', '%Teste Scheduler%');

    if (campanhaError) {
      console.error('❌ Erro ao remover campanha:', campanhaError);
    } else {
      console.log('✅ Campanha de teste removida');
    }

    console.log('🎯 Limpeza concluída!');
    
  } catch (error) {
    console.error('💥 Erro na limpeza:', error);
  }
}

function mostrarAjuda() {
  console.log(`
🚀 Script de Teste do Lead Scheduler

Uso: node test-scheduler.js [comando]

Comandos disponíveis:

  create-test-data    Cria dados de teste (campanha ativa + 3 leads pendentes)
  manual-run          Executa o scheduler manualmente via API
  fast-test           Inicia teste rápido (executa a cada minuto por 5 min)
  check-status        Verifica o status atual do scheduler
  clean-test-data     Remove todos os dados de teste criados
  help                Mostra esta ajuda

Exemplos:
  node test-scheduler.js create-test-data
  node test-scheduler.js fast-test
  node test-scheduler.js check-status

💡 Dicas:
- Certifique-se de que o servidor backend está rodando em localhost:3001
- Use ENABLE_SCHEDULER=true para ativar o scheduler em desenvolvimento
- Os logs detalhados aparecem no console do servidor
`);
}

// Executar comando
const comando = process.argv[2];

switch (comando) {
  case 'create-test-data':
    criarDadosDeTeste();
    break;
  case 'manual-run':
    executarManualmente();
    break;
  case 'fast-test':
    iniciarTesteRapido();
    break;
  case 'check-status':
    verificarStatus();
    break;
  case 'clean-test-data':
    limparDadosDeTeste();
    break;
  case 'help':
  default:
    mostrarAjuda();
    break;
} 