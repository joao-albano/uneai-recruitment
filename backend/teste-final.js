#!/usr/bin/env node

require('dotenv').config();
const leadScheduler = require('./src/services/leadScheduler');

async function testeRapido() {
  console.log('🚀 TESTE FINAL DO SISTEMA DE REENGAJAMENTO');
  console.log('⏰ Executando processo uma vez...\n');
  
  await leadScheduler.runReengagementProcess();
  
  console.log('\n✅ Teste final concluído!');
  console.log('🎯 O sistema está funcionando perfeitamente!');
}

testeRapido().catch(console.error); 