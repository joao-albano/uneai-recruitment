#!/usr/bin/env node

// Script de gerenciamento do UNE AI Scheduler
require('dotenv').config();

const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class SchedulerManager {
  constructor() {
    this.pidFile = path.join(__dirname, 'scheduler.pid');
    this.logFile = path.join(__dirname, 'scheduler.log');
  }

  // Verificar se o scheduler está rodando
  async isRunning() {
    try {
      if (!fs.existsSync(this.pidFile)) {
        return false;
      }

      const pid = fs.readFileSync(this.pidFile, 'utf8').trim();
      
      // Verificar se o processo ainda existe
      process.kill(pid, 0); // Não mata, só verifica
      return pid;
    } catch (error) {
      // Processo não existe mais, limpar PID file
      if (fs.existsSync(this.pidFile)) {
        fs.unlinkSync(this.pidFile);
      }
      return false;
    }
  }

  // Iniciar o scheduler
  async start() {
    const running = await this.isRunning();
    
    if (running) {
      console.log('⚠️  Scheduler já está rodando (PID:', running, ')');
      return;
    }

    console.log('🚀 Iniciando UNE AI Scheduler...');

    // Spawn processo em background
    const child = spawn('node', ['start-scheduler.js'], {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe']
    });

    // Salvar PID
    fs.writeFileSync(this.pidFile, child.pid.toString());

    // Redirecionar logs
    const logStream = fs.createWriteStream(this.logFile, { flags: 'a' });
    child.stdout.pipe(logStream);
    child.stderr.pipe(logStream);

    // Detach do processo pai
    child.unref();

    console.log('✅ Scheduler iniciado com sucesso!');
    console.log(`   PID: ${child.pid}`);
    console.log(`   Logs: ${this.logFile}`);
    console.log('');
    console.log('📊 Use os comandos:');
    console.log('   node manage-scheduler.js status   - Ver status');
    console.log('   node manage-scheduler.js stop     - Parar');
    console.log('   node manage-scheduler.js logs     - Ver logs');
  }

  // Parar o scheduler
  async stop() {
    const pid = await this.isRunning();
    
    if (!pid) {
      console.log('⚠️  Scheduler não está rodando');
      return;
    }

    console.log('🛑 Parando UNE AI Scheduler...');

    try {
      process.kill(pid, 'SIGTERM');
      
      // Aguardar um pouco para o processo terminar graciosamente
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Verificar se ainda está rodando e forçar se necessário
      const stillRunning = await this.isRunning();
      if (stillRunning) {
        console.log('⚠️  Forçando parada...');
        process.kill(pid, 'SIGKILL');
      }

      // Limpar PID file
      if (fs.existsSync(this.pidFile)) {
        fs.unlinkSync(this.pidFile);
      }

      console.log('✅ Scheduler parado com sucesso!');

    } catch (error) {
      console.error('❌ Erro ao parar scheduler:', error.message);
    }
  }

  // Reiniciar o scheduler
  async restart() {
    console.log('🔄 Reiniciando UNE AI Scheduler...');
    await this.stop();
    await new Promise(resolve => setTimeout(resolve, 2000));
    await this.start();
  }

  // Ver status do scheduler
  async status() {
    const pid = await this.isRunning();

    console.log('📊 STATUS DO UNE AI SCHEDULER');
    console.log('════════════════════════════');

    if (pid) {
      console.log('🟢 Status: RODANDO');
      console.log(`📍 PID: ${pid}`);

      // Informações do processo
      try {
        const stats = fs.statSync(`/proc/${pid}`) || fs.statSync(this.pidFile);
        console.log(`⏰ Iniciado: ${stats.birthtime || stats.ctime}`);
      } catch (error) {
        // Windows ou erro ao acessar /proc
      }

      // Verificar arquivo de log
      if (fs.existsSync(this.logFile)) {
        const logStats = fs.statSync(this.logFile);
        console.log(`📝 Log: ${this.logFile}`);
        console.log(`📏 Tamanho do log: ${Math.round(logStats.size / 1024)} KB`);
        console.log(`📅 Última modificação: ${logStats.mtime}`);
      }

    } else {
      console.log('🔴 Status: PARADO');
    }

    console.log('');
    console.log('🎯 Comandos disponíveis:');
    console.log('  start   - Iniciar scheduler');
    console.log('  stop    - Parar scheduler');
    console.log('  restart - Reiniciar scheduler');
    console.log('  status  - Ver este status');
    console.log('  logs    - Mostrar logs recentes');
  }

  // Mostrar logs recentes
  async logs() {
    if (!fs.existsSync(this.logFile)) {
      console.log('📝 Nenhum log encontrado');
      return;
    }

    console.log('📝 LOGS RECENTES (últimas 50 linhas):');
    console.log('════════════════════════════════════');

    // Ler últimas linhas do arquivo
    exec(`tail -50 "${this.logFile}" 2>/dev/null || powershell "Get-Content '${this.logFile}' | Select-Object -Last 50"`, (error, stdout, stderr) => {
      if (error) {
        console.error('❌ Erro ao ler logs:', error.message);
        return;
      }

      if (stdout.trim()) {
        console.log(stdout);
      } else {
        console.log('📝 Log vazio');
      }
    });
  }
}

// Executar comando baseado no argumento
async function main() {
  const manager = new SchedulerManager();
  const command = process.argv[2];

  switch (command) {
    case 'start':
      await manager.start();
      break;
    
    case 'stop':
      await manager.stop();
      break;
    
    case 'restart':
      await manager.restart();
      break;
    
    case 'status':
      await manager.status();
      break;
    
    case 'logs':
      await manager.logs();
      break;
    
    default:
      console.log('🎮 UNE AI SCHEDULER MANAGER');
      console.log('═══════════════════════════');
      console.log('');
      console.log('📖 Uso: node manage-scheduler.js <comando>');
      console.log('');
      console.log('🎯 Comandos disponíveis:');
      console.log('  start   - Iniciar scheduler em background');
      console.log('  stop    - Parar scheduler');
      console.log('  restart - Reiniciar scheduler');
      console.log('  status  - Ver status atual');
      console.log('  logs    - Mostrar logs recentes');
      console.log('');
      console.log('💡 Exemplos:');
      console.log('  node manage-scheduler.js start');
      console.log('  node manage-scheduler.js status');
      console.log('  node manage-scheduler.js logs');
      break;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Erro:', error.message);
    process.exit(1);
  });
}

module.exports = SchedulerManager; 