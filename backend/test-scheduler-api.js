// Teste das APIs do Scheduler Integrado
require('dotenv').config();

const baseURL = `http://localhost:${process.env.PORT || 3001}`;

async function testSchedulerAPI() {
  console.log('🧪 TESTANDO APIS DO SCHEDULER INTEGRADO');
  console.log('════════════════════════════════════════');
  console.log(`🌐 Base URL: ${baseURL}`);
  console.log('');

  // Função helper para fazer requests
  const request = async (method, endpoint, body = null) => {
    try {
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
        }
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      const response = await fetch(`${baseURL}${endpoint}`, options);
      const data = await response.json();
      
      return {
        status: response.status,
        success: response.ok,
        data
      };
    } catch (error) {
      return {
        status: 0,
        success: false,
        error: error.message
      };
    }
  };

  try {
    // 1. Testar status do backend
    console.log('🏠 1. Testando endpoint raiz...');
    const rootTest = await request('GET', '/');
    if (rootTest.success) {
      console.log('✅ Backend respondendo:', rootTest.data.message);
    } else {
      console.log('❌ Backend não responde');
      return;
    }

    // 2. Testar status do scheduler
    console.log('\n📊 2. Testando status do scheduler...');
    const statusTest = await request('GET', '/api/scheduler/status');
    if (statusTest.success) {
      console.log('✅ Status obtido com sucesso');
      console.log(`   Serviço: ${statusTest.data.data.service}`);
      console.log(`   Rodando: ${statusTest.data.data.status.isRunning ? '🟢' : '🔴'}`);
      console.log(`   Agendado: ${statusTest.data.data.status.isScheduled ? '🟢' : '🔴'}`);
    } else {
      console.log('❌ Erro ao obter status:', statusTest.data?.error);
    }

    // 3. Testar dashboard
    console.log('\n📈 3. Testando dashboard...');
    const dashboardTest = await request('GET', '/api/scheduler/dashboard');
    if (dashboardTest.success) {
      console.log('✅ Dashboard obtido com sucesso');
      const dashboard = dashboardTest.data.data;
      console.log(`   Execuções totais: ${dashboard.statistics.totalExecutions}`);
      console.log(`   Taxa de sucesso: ${dashboard.statistics.successRate}%`);
    } else {
      console.log('❌ Erro ao obter dashboard:', dashboardTest.data?.error);
    }

    // 4. Testar histórico
    console.log('\n📜 4. Testando histórico...');
    const historyTest = await request('GET', '/api/scheduler/history?limit=5');
    if (historyTest.success) {
      console.log('✅ Histórico obtido com sucesso');
      console.log(`   Registros: ${historyTest.data.data.total}`);
    } else {
      console.log('❌ Erro ao obter histórico:', historyTest.data?.error);
    }

    // 5. Testar execução de reengajamento (opcional)
    const runReengagement = process.env.TEST_API_REENGAGEMENT === 'true';
    if (runReengagement) {
      console.log('\n🔄 5. Testando execução de reengajamento...');
      const reengagementTest = await request('POST', '/api/scheduler/run/reengagement');
      if (reengagementTest.success) {
        console.log('✅ Reengajamento executado com sucesso');
      } else {
        console.log('❌ Erro no reengajamento:', reengagementTest.data?.error);
      }
    } else {
      console.log('\n⏸️  5. Teste de reengajamento desabilitado');
      console.log('💡 Para testar, defina TEST_API_REENGAGEMENT=true');
    }

    // 6. Testar execução de campanhas (opcional)
    const runCampaigns = process.env.TEST_API_CAMPAIGNS === 'true';
    if (runCampaigns) {
      console.log('\n📢 6. Testando execução de campanhas...');
      const campaignsTest = await request('POST', '/api/scheduler/run/campaigns');
      if (campaignsTest.success) {
        console.log('✅ Campanhas executadas com sucesso');
      } else {
        console.log('❌ Erro nas campanhas:', campaignsTest.data?.error);
      }
    } else {
      console.log('\n⏸️  6. Teste de campanhas desabilitado');
      console.log('💡 Para testar, defina TEST_API_CAMPAIGNS=true');
    }

    // 7. Mostrar todas as rotas disponíveis
    console.log('\n📋 7. Rotas disponíveis do Scheduler:');
    console.log('═══════════════════════════════════════');
    console.log('📊 GET  /api/scheduler/status        - Status do scheduler');
    console.log('📈 GET  /api/scheduler/dashboard     - Dashboard resumido');
    console.log('📜 GET  /api/scheduler/history       - Histórico de execuções');
    console.log('🗑️  DELETE /api/scheduler/history    - Limpar histórico');
    console.log('');
    console.log('🚀 POST /api/scheduler/run/unified      - Executar processo completo');
    console.log('🔄 POST /api/scheduler/run/reengagement - Executar reengajamento');
    console.log('📢 POST /api/scheduler/run/campaigns    - Executar campanhas');
    console.log('🎯 POST /api/scheduler/run/campaign/:id - Executar campanha específica');
    console.log('');
    console.log('▶️  POST /api/scheduler/schedule/start  - Iniciar agendamento');
    console.log('⏸️  POST /api/scheduler/schedule/stop   - Parar agendamento');

    console.log('\n✅ TESTE DAS APIS CONCLUÍDO COM SUCESSO!');

  } catch (error) {
    console.error('💥 Erro no teste das APIs:', error);
  }
}

// Mostrar configurações de teste
console.log('🔧 CONFIGURAÇÕES DE TESTE:');
console.log('══════════════════════════');
console.log(`PORT: ${process.env.PORT || 3001}`);
console.log(`TEST_API_REENGAGEMENT: ${process.env.TEST_API_REENGAGEMENT || 'false'}`);
console.log(`TEST_API_CAMPAIGNS: ${process.env.TEST_API_CAMPAIGNS || 'false'}`);
console.log('══════════════════════════\n');

// Executar teste
testSchedulerAPI(); 