#!/usr/bin/env node

// Script para iniciar o UNE AI Scheduler automaticamente
require('dotenv').config();

console.log('🚀 INICIANDO UNE AI SCHEDULER AUTOMÁTICO');
console.log('========================================');

// Importar e iniciar a aplicação principal
const UNEAISchedulerApp = require('./src/app');

// Criar e iniciar aplicação
const app = new UNEAISchedulerApp();

// Iniciar com tratamento de erro
app.start()
  .then(() => {
    console.log('✅ Sistema iniciado com sucesso!');
  })
  .catch(error => {
    console.error('💥 Erro ao iniciar sistema:', error);
    process.exit(1);
  }); 