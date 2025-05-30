const express = require('express');
const router = express.Router();
const leadScheduler = require('../../services/leadScheduler');

// Rota para executar verificação manual de leads
router.post('/check-leads', async (req, res) => {
  try {
    console.log('🔧 [ADMIN] Execução manual solicitada via API');
    const result = await leadScheduler.executarManualmente();
    res.json({ 
      success: true, 
      message: 'Processamento de todas as regras executado com sucesso',
      data: result
    });
  } catch (error) {
    console.error('❌ [ADMIN] Erro na execução manual:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao executar processamento das regras',
      error: error.message 
    });
  }
});

// Nova rota específica para processar todas as regras
router.post('/process-all-rules', async (req, res) => {
  try {
    console.log('🔧 [ADMIN] Processamento completo de regras solicitado via API');
    const result = await leadScheduler.processarTodasAsRegras();
    res.json({ 
      success: true, 
      message: 'Todas as regras de reengajamento foram processadas com sucesso',
      data: result
    });
  } catch (error) {
    console.error('❌ [ADMIN] Erro no processamento completo:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao processar todas as regras',
      error: error.message 
    });
  }
});

// Rota para iniciar teste rápido (a cada minuto)
router.post('/test/fast-schedule', (req, res) => {
  try {
    leadScheduler.iniciarTesteRapido();
    res.json({ 
      success: true, 
      message: 'Teste rápido iniciado! Executará a cada minuto por 5 minutos com envios simulados.',
      info: 'O teste parará automaticamente após 5 minutos'
    });
  } catch (error) {
    console.error('❌ [ADMIN] Erro ao iniciar teste rápido:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao iniciar teste rápido',
      error: error.message 
    });
  }
});

// Rota para testar envio para um lead específico
router.post('/test/send-message', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Nome e email são obrigatórios'
      });
    }

    const testLead = { id: 'test', name, email, phone };
    
    // Testar envio
    const resultado = await leadScheduler.enviarMensagemParaLead(testLead);
    
    res.json({
      success: true,
      message: 'Teste de envio executado',
      data: resultado
    });
  } catch (error) {
    console.error('❌ [ADMIN] Erro no teste de envio:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao testar envio',
      error: error.message 
    });
  }
});

// Rota para iniciar agendamento
router.post('/scheduler/start', (req, res) => {
  try {
    leadScheduler.iniciarAgendamento();
    res.json({ 
      success: true, 
      message: 'Agendamento iniciado com sucesso' 
    });
  } catch (error) {
    console.error('❌ [ADMIN] Erro ao iniciar agendamento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao iniciar agendamento',
      error: error.message 
    });
  }
});

// Rota para parar agendamento
router.post('/scheduler/stop', (req, res) => {
  try {
    leadScheduler.pararAgendamento();
    res.json({ 
      success: true, 
      message: 'Agendamento parado com sucesso' 
    });
  } catch (error) {
    console.error('❌ [ADMIN] Erro ao parar agendamento:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao parar agendamento',
      error: error.message 
    });
  }
});

// Rota para verificar status do scheduler
router.get('/scheduler/status', (req, res) => {
  try {
    const cron = require('node-cron');
    const tasks = cron.getTasks();
    
    res.json({ 
      success: true, 
      isRunning: tasks.size > 0,
      totalTasks: tasks.size,
      environment: process.env.NODE_ENV || 'development',
      schedulerEnabled: process.env.ENABLE_SCHEDULER === 'true' || process.env.NODE_ENV === 'production',
      testMode: process.env.TEST_MODE === 'true',
      fastTest: process.env.FAST_TEST === 'true'
    });
  } catch (error) {
    console.error('❌ [ADMIN] Erro ao verificar status:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erro ao verificar status do agendamento',
      error: error.message 
    });
  }
});

module.exports = router; 