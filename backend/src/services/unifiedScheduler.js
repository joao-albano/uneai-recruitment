require('dotenv').config();
const leadScheduler = require('./leadScheduler');
const campaignScheduler = require('./campaignScheduler');

class UnifiedSchedulerService {
  constructor() {
    this.isRunning = false;
    this.scheduleTimer = null;
    this.logUnified = true;
  }

  // Executar ambos os processos: reengajamento e campanhas
  async runUnifiedProcess() {
    if (this.isRunning) {
      console.log('⚠️  Processo unificado já em execução');
      return;
    }

    this.isRunning = true;

    try {
      console.log('\n🚀 INICIANDO PROCESSO UNIFICADO');
      console.log('📧 Reengajamento + 📢 Campanhas');
      console.log(`⏰ Horário: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);

      // 1. Executar reengajamento primeiro
      console.log('\n🔄 FASE 1: REENGAJAMENTO AUTOMATIZADO');
      await leadScheduler.runReengagementProcess();

      // 2. Aguardar 30 segundos entre processos
      console.log('\n⏳ Aguardando 30 segundos...');
      await new Promise(resolve => setTimeout(resolve, 30000));

      // 3. Executar campanhas
      console.log('\n📢 FASE 2: CAMPANHAS DE MARKETING');
      await campaignScheduler.runCampaignProcess();

      console.log('\n✅ PROCESSO UNIFICADO CONCLUÍDO');

    } catch (error) {
      console.error('💥 Erro no processo unificado:', error);
    } finally {
      this.isRunning = false;
      console.log('🏁 Processo unificado finalizado\n');
    }
  }

  // Executar apenas reengajamento
  async runReengagementOnly() {
    console.log('\n🔄 EXECUTANDO APENAS REENGAJAMENTO');
    return await leadScheduler.runReengagementProcess();
  }

  // Executar apenas campanhas
  async runCampaignsOnly() {
    console.log('\n📢 EXECUTANDO APENAS CAMPANHAS');
    return await campaignScheduler.runCampaignProcess();
  }

  // Executar campanha específica
  async runSpecificCampaign(campaignId) {
    return await campaignScheduler.runSpecificCampaign(campaignId);
  }

  // Iniciar agendamento unificado
  start() {
    console.log('🚀 Iniciando Unified Scheduler Service');
    console.log('🔄 Reengajamento + 📢 Campanhas');
    console.log('⏰ Executará a cada 6 horas: 00:00, 06:00, 12:00, 18:00 (horário de Brasília)');

    // Executar imediatamente na inicialização (opcional)
    if (process.env.RUN_ON_START === 'true') {
      this.runUnifiedProcess();
    }

    // Agendar execução a cada 6 horas
    const scheduleExecution = () => {
      const now = new Date();
      const brazilTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
      const currentHour = brazilTime.getHours();
      
      // Horários de execução: 0, 6, 12, 18
      const nextExecutionHours = [0, 6, 12, 18];
      let nextHour = nextExecutionHours.find(h => h > currentHour);
      
      if (!nextHour) {
        nextHour = nextExecutionHours[0]; // próximo dia
      }
      
      const nextExecution = new Date(brazilTime);
      nextExecution.setHours(nextHour, 0, 0, 0);
      
      if (nextHour <= currentHour) {
        nextExecution.setDate(nextExecution.getDate() + 1);
      }
      
      const timeUntilNext = nextExecution.getTime() - brazilTime.getTime();
      
      console.log(`⏰ Próxima execução unificada em: ${new Date(nextExecution).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
      
      this.scheduleTimer = setTimeout(() => {
        this.runUnifiedProcess();
        scheduleExecution(); // Reagendar para próxima execução
      }, timeUntilNext);
    };

    scheduleExecution();
  }

  // Parar agendamento
  stop() {
    console.log('🛑 Parando Unified Scheduler Service');
    
    if (this.scheduleTimer) {
      clearTimeout(this.scheduleTimer);
      this.scheduleTimer = null;
    }
    
    this.isRunning = false;
  }

  // Obter status geral
  getStatus() {
    const reengagementStatus = leadScheduler.getStatus();
    const campaignStatus = campaignScheduler.getStatus();

    return {
      unified: {
        isRunning: this.isRunning,
        hasSchedule: !!this.scheduleTimer,
        nextExecution: this.scheduleTimer ? 'Agendado' : 'Não agendado'
      },
      reengagement: reengagementStatus,
      campaigns: campaignStatus
    };
  }
}

module.exports = new UnifiedSchedulerService(); 