#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ORGANIZATION_ID = '156bc50a-a68c-499e-b0a4-67b66639e12a';
const PHONE_NUMBER = '553195149986';
const LEAD_NAME = 'joao_teste';

/**
 * Teste COMPLETO com tabelas nativas do Supabase
 */

async function buscarInstanciaWhatsAppNativa() {
  console.log('🔍 Buscando instância WhatsApp nas tabelas nativas...');
  
  try {
    const { data: instance, error } = await supabase
      .from('whatsapp_instances')
      .select('*')
      .eq('organization_id', ORGANIZATION_ID)
      .eq('status', 'connected')
      .single();

    if (error || !instance) {
      console.log('❌ Instância WhatsApp não encontrada ou não conectada');
      console.log('Erro:', error);
      return null;
    }

    console.log('✅ Instância WhatsApp encontrada na tabela nativa:');
    console.log(`  ID: ${instance.id}`);
    console.log(`  Instance ID: ${instance.instance_id}`);
    console.log(`  Instance Name: ${instance.instance_name}`);
    console.log(`  Status: ${instance.status}`);
    console.log(`  Organization: ${instance.organization_id}`);
    console.log(`  Token: ${instance.token ? 'Configurado' : 'Não configurado'}`);
    console.log(`  Created: ${instance.created_at}`);

    return instance;

  } catch (error) {
    console.error('💥 Erro ao buscar instância nativa:', error);
    return null;
  }
}

async function buscarOuCriarContatoNativo(phone, instanceId, organizationId) {
  console.log('\n📞 Gerenciando contato na tabela whatsapp_contacts...');
  
  try {
    const formattedPhone = phone.replace(/\D/g, '');

    // 1. Buscar contato existente
    const { data: existingContact, error: searchError } = await supabase
      .from('whatsapp_contacts')
      .select('*')
      .eq('phone', formattedPhone)
      .eq('organization_id', organizationId);

    if (!searchError && existingContact && existingContact.length > 0) {
      console.log('✅ Contato já existe na tabela nativa:');
      existingContact.forEach((contact, index) => {
        console.log(`  Contato ${index + 1}:`);
        console.log(`    ID: ${contact.id}`);
        console.log(`    Phone: ${contact.phone}`);
        console.log(`    Name: ${contact.name || 'N/A'}`);
        console.log(`    Status: ${contact.status}`);
        console.log(`    Lead ID: ${contact.lead_id || 'N/A'}`);
        console.log(`    AI Active: ${contact.ai_active}`);
      });
      return existingContact[0].id;
    }

    // 2. Criar novo contato
    console.log('📝 Criando novo contato...');
    const { data: newContact, error: createError } = await supabase
      .from('whatsapp_contacts')
      .insert([{
        organization_id: organizationId,
        instance_id: instanceId,
        phone: formattedPhone,
        name: LEAD_NAME,
        status: 'active',
        ai_active: false,
        metadata: {
          created_by: 'reengagement_system',
          timestamp: new Date().toISOString()
        }
      }])
      .select('*')
      .single();

    if (createError) {
      console.error('❌ Erro ao criar contato:', createError);
      return null;
    }

    console.log('✅ Novo contato criado:');
    console.log(`  ID: ${newContact.id}`);
    console.log(`  Phone: ${newContact.phone}`);
    console.log(`  Name: ${newContact.name}`);
    console.log(`  Status: ${newContact.status}`);

    return newContact.id;

  } catch (error) {
    console.error('💥 Erro ao gerenciar contato:', error);
    return null;
  }
}

async function salvarMensagemWhatsAppNativa(messageData) {
  console.log('\n💾 Salvando mensagem na tabela whatsapp_messages...');
  
  try {
    const { data: savedMessage, error } = await supabase
      .from('whatsapp_messages')
      .insert([{
        ...messageData,
        sent_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select('*')
      .single();

    if (error) {
      console.error('❌ Erro ao salvar mensagem:', error);
      return null;
    }

    console.log('✅ Mensagem salva na tabela nativa:');
    console.log(`  ID: ${savedMessage.id}`);
    console.log(`  Organization: ${savedMessage.organization_id}`);
    console.log(`  Status: ${savedMessage.status}`);
    console.log(`  Direction: ${savedMessage.direction}`);
    console.log(`  Contact ID: ${savedMessage.contact_id}`);
    console.log(`  Sent At: ${savedMessage.sent_at}`);

    return savedMessage;

  } catch (error) {
    console.error('💥 Erro ao salvar mensagem:', error);
    return null;
  }
}

async function enviarMensagemEvolutionNativo(telefone, mensagem, instance, organizationId) {
  console.log('\n📱 ENVIANDO VIA EVOLUTION COM TABELAS NATIVAS:');
  console.log(`📞 Para: ${telefone}`);
  console.log(`🏢 Instância: ${instance.instance_name}`);
  console.log(`📝 Mensagem: ${mensagem.substring(0, 100)}...`);

  let contactId = null;

  try {
    // 1. Gerenciar contato
    contactId = await buscarOuCriarContatoNativo(telefone, instance.id, organizationId);

    // 2. Preparar dados da mensagem ANTES do envio
    const messageData = {
      organization_id: organizationId,
      message: mensagem,
      status: 'pending',
      direction: 'outbound',
      is_ai_response: false,
      contact_id: contactId
    };

    // 3. Salvar mensagem como 'pending'
    let savedMessage = await salvarMensagemWhatsAppNativa(messageData);

    // 4. Enviar via Evolution API
    const evolutionUrl = process.env.EVOLUTION_URL;
    const apiKey = process.env.EVOLUTION_API_KEY;

    if (!evolutionUrl || !apiKey) {
      throw new Error('Configurações Evolution API não encontradas');
    }

    const numeroFormatado = telefone.replace(/\D/g, '');
    const evolutionApiUrl = `${evolutionUrl}/message/sendText/${instance.instance_name}`;
    
    const payload = {
      number: numeroFormatado,
      text: mensagem,
      delay: 1200,
      message: {
        conversation: mensagem
      }
    };

    console.log('\n⏳ Enviando via Evolution API...');
    const response = await fetch(evolutionApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      },
      body: JSON.stringify(payload)
    });

    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      responseData = await response.text();
    }

    console.log(`📊 Resposta Evolution: Status ${response.status}`);
    console.log(`📦 Dados:`, responseData);

    // 5. Atualizar status da mensagem baseado na resposta
    const newStatus = response.ok ? 'sent' : 'failed';
    
    if (savedMessage) {
      const { error: updateError } = await supabase
        .from('whatsapp_messages')
        .update({
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', savedMessage.id);

      if (!updateError) {
        console.log(`✅ Status da mensagem atualizado para: ${newStatus}`);
      }
    }

    if (!response.ok) {
      throw new Error(`Evolution API erro ${response.status}: ${JSON.stringify(responseData)}`);
    }

    console.log('\n🎉 SUCESSO! Mensagem processada com tabelas nativas!');
    
    return {
      success: true,
      status: 'sent',
      messageId: responseData.messageId || responseData.id || `evo_${Date.now()}`,
      response: responseData,
      phone: numeroFormatado,
      instance: instance.instance_name,
      savedMessage: savedMessage,
      contactId: contactId
    };

  } catch (error) {
    console.error('\n❌ ERRO no processamento nativo:', error.message);
    
    // Atualizar mensagem como falha se foi salva
    if (contactId) {
      await salvarMensagemWhatsAppNativa({
        organization_id: organizationId,
        message: mensagem,
        status: 'failed',
        direction: 'outbound',
        is_ai_response: false,
        contact_id: contactId
      });
    }
    
    return {
      success: false,
      status: 'failed',
      error: error.message,
      phone: telefone,
      instance: instance?.instance_name
    };
  }
}

async function buscarLeadJoaoTeste() {
  console.log('🔍 Buscando lead joao_teste...');
  
  try {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*')
      .or(`name.ilike.%${LEAD_NAME}%,phone.eq.${PHONE_NUMBER}`)
      .eq('organization_id', ORGANIZATION_ID)
      .order('created_at', { ascending: false });

    if (error || !leads || leads.length === 0) {
      console.log('❌ Lead não encontrado!');
      return null;
    }

    const lead = leads[0];
    console.log('✅ Lead encontrado!');
    console.log(`  Nome: ${lead.name}`);
    console.log(`  Telefone: ${lead.phone}`);
    console.log(`  Email: ${lead.email}`);
    console.log(`  Curso: ${lead.course}`);
    console.log(`  Status: ${lead.status}`);
    console.log(`  Organization: ${lead.organization_id}`);

    return lead;

  } catch (error) {
    console.error('💥 Erro ao buscar lead:', error);
    return null;
  }
}

async function verificarTodasTabelasWhatsApp() {
  console.log('\n📊 VERIFICANDO TODAS AS TABELAS WHATSAPP:');
  
  // 1. whatsapp_instances
  console.log('\n1️⃣ Tabela whatsapp_instances:');
  try {
    const { data: instances, error } = await supabase
      .from('whatsapp_instances')
      .select('*')
      .eq('organization_id', ORGANIZATION_ID);

    if (!error && instances) {
      console.log(`✅ ${instances.length} instância(s) encontrada(s)`);
      instances.forEach(inst => {
        console.log(`  - ${inst.instance_name} (${inst.status})`);
      });
    } else {
      console.log('❌ Erro:', error);
    }
  } catch (e) {
    console.log('❌ Erro de acesso:', e.message);
  }

  // 2. whatsapp_contacts
  console.log('\n2️⃣ Tabela whatsapp_contacts:');
  try {
    const { data: contacts, error } = await supabase
      .from('whatsapp_contacts')
      .select('*')
      .eq('organization_id', ORGANIZATION_ID)
      .limit(10);

    if (!error && contacts) {
      console.log(`✅ ${contacts.length} contato(s) encontrado(s)`);
      contacts.forEach(contact => {
        console.log(`  - ${contact.phone} (${contact.name || 'Sem nome'}) - ${contact.status}`);
      });
    } else {
      console.log('❌ Erro:', error);
    }
  } catch (e) {
    console.log('❌ Erro de acesso:', e.message);
  }

  // 3. whatsapp_messages
  console.log('\n3️⃣ Tabela whatsapp_messages:');
  try {
    const { data: messages, error } = await supabase
      .from('whatsapp_messages')
      .select('*')
      .eq('organization_id', ORGANIZATION_ID)
      .order('sent_at', { ascending: false })
      .limit(5);

    if (!error && messages) {
      console.log(`✅ ${messages.length} mensagem(ns) encontrada(s)`);
      messages.forEach(msg => {
        console.log(`  - ${msg.direction} | ${msg.status} | ${msg.sent_at}`);
        console.log(`    "${msg.message.substring(0, 50)}..."`);
      });
    } else {
      console.log('❌ Erro:', error);
    }
  } catch (e) {
    console.log('❌ Erro de acesso:', e.message);
  }
}

async function executarTesteCompletoTabelasNativas() {
  console.log('🚀 === TESTE COMPLETO COM TABELAS NATIVAS DO SUPABASE ===\n');
  
  // 1. Verificar configurações
  console.log('🔧 Verificando configurações...');
  if (!process.env.EVOLUTION_URL || !process.env.EVOLUTION_API_KEY) {
    console.log('❌ Configurações Evolution não encontradas');
    return;
  }
  console.log('✅ Configurações OK');
  
  // 2. Verificar todas as tabelas WhatsApp
  await verificarTodasTabelasWhatsApp();
  
  // 3. Buscar instância WhatsApp nativa
  const instance = await buscarInstanciaWhatsAppNativa();
  if (!instance) {
    console.log('❌ Teste abortado: instância não encontrada');
    return;
  }
  
  // 4. Buscar o lead
  const lead = await buscarLeadJoaoTeste();
  if (!lead) {
    console.log('❌ Teste abortado: lead não encontrado');
    return;
  }
  
  // 5. Gerar mensagem de teste
  const mensagem = `Olá ${lead.name}! Este é um teste do sistema de reengajamento usando as tabelas nativas do Supabase. Curso: ${lead.course}. Data: ${new Date().toLocaleString('pt-BR')}`;
  
  // 6. Confirmar envio
  console.log('\n⚠️  ATENÇÃO: Este teste enviará mensagem REAL via tabelas nativas!');
  console.log(`📱 Destinatário: ${lead.name} (${lead.phone})`);
  console.log(`🏢 Instância: ${instance.instance_name}`);
  console.log(`💾 Dados serão salvos nas tabelas nativas`);
  
  console.log('\n⏳ Iniciando em 3 segundos...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // 7. Executar envio com tabelas nativas
  const resultado = await enviarMensagemEvolutionNativo(lead.phone, mensagem, instance, lead.organization_id);
  
  // 8. Resultado final
  console.log('\n🎯 RESULTADO FINAL DO TESTE NATIVO:');
  if (resultado.success) {
    console.log('🎉 SUCESSO TOTAL!');
    console.log(`📊 Status: ${resultado.status}`);
    console.log(`🆔 Message ID: ${resultado.messageId}`);
    console.log(`📱 Para: ${resultado.phone}`);
    console.log(`🏢 Instância: ${resultado.instance}`);
    console.log(`💾 Mensagem salva: ${resultado.savedMessage ? 'Sim' : 'Não'}`);
    console.log(`📞 Contato ID: ${resultado.contactId}`);
    
    // Verificar dados salvos
    console.log('\n🔍 Verificando dados salvos...');
    await verificarTodasTabelasWhatsApp();
    
  } else {
    console.log('❌ FALHA NO TESTE');
    console.log(`💥 Erro: ${resultado.error}`);
    console.log(`📊 Status: ${resultado.status}`);
  }
  
  console.log('\n🏁 Teste com tabelas nativas finalizado!');
}

// Executar teste
executarTesteCompletoTabelasNativas().catch(console.error); 