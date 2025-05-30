require('dotenv').config();
const unifiedScheduler = require('./services/unifiedScheduler');

// Classe principal da aplicação
class UNEAISchedulerApp {
  constructor() {
    this.isRunning = false;
    this.startTime = new Date();
  }

  // Inicializar aplicação
  async start() {
    console.log('🚀 INICIANDO UNE AI SCHEDULER');
    console.log('═══════════════════════════════════════');
    console.log('🔄 Reengajamento Automático');
    console.log('📢 Campanhas de Marketing');
    console.log('⏰ Execução Automática a cada 6 horas');
    console.log('═══════════════════════════════════════');
    console.log(`🕐 Iniciado em: ${this.startTime.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
    console.log('');

    try {
      // Configurar handlers para encerramento gracioso
      this.setupGracefulShutdown();

      // Verificar variáveis de ambiente
      this.checkEnvironmentVariables();

      // Iniciar sistema unificado
      console.log('🔄 Iniciando sistema unificado...');
      unifiedScheduler.start();

      this.isRunning = true;
      console.log('✅ UNE AI Scheduler iniciado com sucesso!');
      console.log('📊 Use Ctrl+C para parar o serviço\n');

      // Mostrar status inicial
      this.showStatus();

      // Log periódico de status (a cada hora)
      this.scheduleStatusLogs();

      // Manter processo vivo
      await this.keepAlive();

    } catch (error) {
      console.error('💥 Erro ao iniciar UNE AI Scheduler:', error);
      process.exit(1);
    }
  }

  // Verificar variáveis de ambiente essenciais
  checkEnvironmentVariables() {
    const required = [
      'SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY',
      'EVOLUTION_URL',
      'EVOLUTION_API_KEY'
    ];

    const missing = required.filter(key => !process.env[key]);

    if (missing.length > 0) {
      console.error('❌ Variáveis de ambiente obrigatórias não encontradas:');
      missing.forEach(key => console.error(`   - ${key}`));
      throw new Error('Configuração incompleta');
    }

    console.log('✅ Variáveis de ambiente verificadas');
  }

  // Configurar encerramento gracioso
  setupGracefulShutdown() {
    const gracefulShutdown = (signal) => {
      console.log(`\n🛑 Recebido sinal ${signal}, encerrando graciosamente...`);
      this.stop();
    };

    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // nodemon

    // Capturar erros não tratados
    process.on('uncaughtException', (error) => {
      console.error('💥 Erro não capturado:', error);
      this.stop();
    });

    process.on('unhandledRejection', (reason, promise) => {
      console.error('💥 Promise rejeitada não tratada:', reason);
      this.stop();
    });
  }

  // Mostrar status do sistema
  showStatus() {
    const status = unifiedScheduler.getStatus();
    console.log('📊 STATUS DO SISTEMA:');
    console.log('┌────────────────────────────────────┐');
    console.log(`│ Sistema Unificado: ${status.unified.isRunning ? '🟢 ATIVO' : '🔴 INATIVO'}        │`);
    console.log(`│ Agendamento: ${status.unified.hasSchedule ? '🟢 ATIVO' : '🔴 INATIVO'}            │`);
    console.log(`│ Reengajamento: ${status.reengagement.hasSchedule ? '🟢 ATIVO' : '🔴 INATIVO'}         │`);
    console.log(`│ Campanhas: 🟢 DISPONÍVEL              │`);
    console.log('└────────────────────────────────────┘');
    console.log('');
  }

  // Agendar logs de status periódicos
  scheduleStatusLogs() {
    setInterval(() => {
      const uptime = this.getUptime();
      console.log(`⏰ ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })} - Sistema ativo há ${uptime}`);
      
      // Mostrar próxima execução
      const status = unifiedScheduler.getStatus();
      if (status.unified.hasSchedule) {
        console.log('   📅 Próxima execução agendada');
      }
    }, 60 * 60 * 1000); // A cada hora
  }

  // Calcular tempo de atividade
  getUptime() {
    const uptimeMs = Date.now() - this.startTime.getTime();
    const hours = Math.floor(uptimeMs / (1000 * 60 * 60));
    const minutes = Math.floor((uptimeMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  // Manter processo vivo
  async keepAlive() {
    // Loop infinito para manter o processo rodando
    while (this.isRunning) {
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  // Parar aplicação
  stop() {
    if (!this.isRunning) return;

    console.log('🛑 Parando UNE AI Scheduler...');
    
    try {
      // Parar sistema unificado
      unifiedScheduler.stop();
      
      this.isRunning = false;
      
      const uptime = this.getUptime();
      console.log(`✅ UNE AI Scheduler parado com sucesso`);
      console.log(`⏱️  Tempo total de execução: ${uptime}`);
      console.log('👋 Obrigado por usar UNE AI Scheduler!');
      
    } catch (error) {
      console.error('❌ Erro ao parar o serviço:', error);
    } finally {
      process.exit(0);
    }
  }

  // Obter informações do sistema
  getInfo() {
    return {
      isRunning: this.isRunning,
      startTime: this.startTime,
      uptime: this.getUptime(),
      scheduler: unifiedScheduler.getStatus()
    };
  }
}

// Instanciar e iniciar aplicação se executado diretamente
if (require.main === module) {
  const app = new UNEAISchedulerApp();
  app.start().catch(error => {
    console.error('💥 Falha ao iniciar aplicação:', error);
    process.exit(1);
  });
}

module.exports = UNEAISchedulerApp; 