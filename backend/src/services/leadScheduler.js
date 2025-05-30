require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fetch = require('node-fetch');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

class LeadSchedulerService {
  constructor() {
    this.isRunning = false;
    this.scheduleTimer = null;
    this.logScheduler = true;
  }

  // Buscar instância WhatsApp da organização nas tabelas nativas
  async getWhatsAppInstance(organizationId) {
    if (this.logScheduler) {
      console.log(`🔍 Buscando instância WhatsApp para organização: ${organizationId}`);
    }

    try {
      const { data: instance, error } = await supabase
        .from('whatsapp_instances')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('status', 'connected')
        .single();

      if (error || !instance) {
        console.log(`❌ Instância WhatsApp não encontrada para organização ${organizationId}`);
        return null;
      }

      if (this.logScheduler) {
        console.log(`✅ Instância WhatsApp encontrada:`);
        console.log(`  Instance ID: ${instance.instance_id}`);
        console.log(`  Instance Name: ${instance.instance_name}`);
        console.log(`  Status: ${instance.status}`);
      }

      return instance;

    } catch (error) {
      console.error(`💥 Erro ao buscar instância WhatsApp:`, error);
      return null;
    }
  }

  // Enviar mensagem via Evolution API usando as configurações do Supabase
  async sendWhatsAppMessage(phone, message, instance, organizationId) {
    try {
      const evolutionUrl = process.env.EVOLUTION_URL;
      const apiKey = process.env.EVOLUTION_API_KEY;

      if (!evolutionUrl || !apiKey) {
        throw new Error('Configurações Evolution API não encontradas nas variáveis de ambiente');
      }

      // Formatar número: garantir DDI 55
      let formattedPhone = phone.replace(/\D/g, '');
      if (!formattedPhone.startsWith('55')) {
        formattedPhone = '55' + formattedPhone;
      }
      
      // URL da API Evolution usando o instance_name da tabela
      const apiUrl = `${evolutionUrl}/message/sendText/${instance.instance_name}`;
      
      const payload = {
        number: formattedPhone,
        text: message,
        delay: 1200,
        message: {
          conversation: message
        }
      };

      if (this.logScheduler) {
        console.log(`📱 Enviando WhatsApp via Evolution API:`);
        console.log(`  Para: ${formattedPhone}`);
        console.log(`  Instância: ${instance.instance_name}`);
        console.log(`  URL: ${apiUrl}`);
        console.log(`  API Key: ${apiKey.substring(0, 8)}...`);
      }

      const response = await fetch(apiUrl, {
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

      if (!response.ok) {
        throw new Error(`Evolution API erro ${response.status}: ${JSON.stringify(responseData)}`);
      }

      // Salvar na tabela whatsapp_messages
      await this.saveWhatsAppMessage({
        organization_id: organizationId,
        message: message,
        status: 'sent',
        direction: 'outbound',
        is_ai_response: false,
        contact_id: await this.getOrCreateContact(formattedPhone, instance.id, organizationId)
      });

      return {
        success: true,
        status: 'sent',
        messageId: responseData.messageId || responseData.id || `evo_${Date.now()}`,
        response: responseData
      };

    } catch (error) {
      console.error(`❌ Erro ao enviar WhatsApp:`, error.message);
      
      // Salvar erro na tabela whatsapp_messages
      await this.saveWhatsAppMessage({
        organization_id: organizationId,
        message: message,
        status: 'failed',
        direction: 'outbound',
        is_ai_response: false,
        contact_id: await this.getOrCreateContact(phone, instance?.id, organizationId)
      });

      return {
        success: false,
        status: 'failed',
        error: error.message
      };
    }
  }

  // Salvar mensagem na tabela whatsapp_messages
  async saveWhatsAppMessage(messageData) {
    try {
      const { error } = await supabase
        .from('whatsapp_messages')
        .insert([{
          ...messageData,
          sent_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('❌ Erro ao salvar mensagem WhatsApp:', error);
      } else if (this.logScheduler) {
        console.log('✅ Mensagem salva na tabela whatsapp_messages');
      }

    } catch (error) {
      console.error('💥 Erro ao salvar mensagem:', error);
    }
  }

  // Buscar ou criar contato na tabela whatsapp_contacts
  async getOrCreateContact(phone, instanceId, organizationId) {
    try {
      const formattedPhone = phone.replace(/\D/g, '');

      // Buscar contato existente
      const { data: existingContact, error: searchError } = await supabase
        .from('whatsapp_contacts')
        .select('id')
        .eq('phone', formattedPhone)
        .eq('organization_id', organizationId)
        .single();

      if (!searchError && existingContact) {
        return existingContact.id;
      }

      // Criar novo contato
      const { data: newContact, error: createError } = await supabase
        .from('whatsapp_contacts')
        .insert([{
          organization_id: organizationId,
          instance_id: instanceId,
          phone: formattedPhone,
          status: 'active',
          ai_active: false
        }])
        .select('id')
        .single();

      if (createError) {
        console.error('❌ Erro ao criar contato:', createError);
        return null;
      }

      return newContact.id;

    } catch (error) {
      console.error('💥 Erro ao gerenciar contato:', error);
      return null;
    }
  }

  async sendEmailMessage(email, message, leadId, ruleId, organizationId) {
    try {
      if (this.logScheduler) {
        console.log(`📧 Enviando email para: ${email}`);
      }

      // Importar o serviço de email real
      const EmailService = require('../api/services/email.service');
      
      // Enviar email real usando o serviço
      const result = await EmailService.sendEmailViaSmtp({
        organizationId,
        to: email,
        subject: 'Contato - Reengajamento UNE Aluno',
        htmlBody: message.replace(/\n/g, '<br>') // Convert line breaks to HTML
      });

      if (result.success) {
        const emailResult = {
          success: true,
          status: 'sent',
          messageId: `email_${Date.now()}`,
          service: 'email'
        };

        await this.logMessage(leadId, ruleId, 'email', message, emailResult, organizationId);
        return emailResult;
      } else {
        throw new Error(result.error || 'Falha ao enviar email');
      }

    } catch (error) {
      console.error(`❌ Erro ao enviar email:`, error.message);
      const errorResult = {
        success: false,
        status: 'failed',
        error: error.message,
        service: 'email'
      };
      await this.logMessage(leadId, ruleId, 'email', message, errorResult, organizationId);
      return errorResult;
    }
  }

  async sendSMSMessage(phone, message, leadId, ruleId, organizationId) {
    try {
      if (this.logScheduler) {
        console.log(`📱 Simulando envio de SMS para: ${phone}`);
      }

      // Simular envio de SMS (implementar integração real conforme necessário)
      const smsResult = {
        success: true,
        status: 'sent',
        messageId: `sms_${Date.now()}`,
        service: 'sms'
      };

      await this.logMessage(leadId, ruleId, 'sms', message, smsResult, organizationId);
      return smsResult;

    } catch (error) {
      console.error(`❌ Erro ao enviar SMS:`, error.message);
      const errorResult = {
        success: false,
        status: 'failed',
        error: error.message,
        service: 'sms'
      };
      await this.logMessage(leadId, ruleId, 'sms', message, errorResult, organizationId);
      return errorResult;
    }
  }

  async processReengagementForLead(lead, rule) {
    if (this.logScheduler) {
      console.log(`\n🚀 Processando reengajamento:`);
      console.log(`  Lead: ${lead.name} (${lead.id})`);
      console.log(`  Regra: ${rule.name}`);
      console.log(`  Canal: ${rule.preferred_channel}`);
    }

    try {
      // Gerar mensagem personalizada
      const message = this.generatePersonalizedMessage(lead, rule);

      let result;
      
      if (rule.preferred_channel === 'whatsapp') {
        // Buscar instância WhatsApp específica da organização
        const instance = await this.getWhatsAppInstance(lead.organization_id);
        
        if (!instance) {
          throw new Error('Instância WhatsApp não encontrada ou não conectada');
        }

        result = await this.sendWhatsAppMessage(lead.phone, message, instance, lead.organization_id);
        
      } else if (rule.preferred_channel === 'email') {
        result = await this.sendEmailMessage(lead.email, message, lead.id, rule.id, lead.organization_id);
        
      } else if (rule.preferred_channel === 'sms') {
        result = await this.sendSMSMessage(lead.phone, message, lead.id, rule.id, lead.organization_id);
        
      } else {
        throw new Error(`Canal não suportado: ${rule.preferred_channel}`);
      }

      // Atualizar status do lead se envio foi bem-sucedido
      if (result.success) {
        await this.updateLeadStatus(lead.id, 'NOVO', 'CONTATO');
        
        if (this.logScheduler) {
          console.log(`✅ Reengajamento enviado com sucesso via ${rule.preferred_channel}`);
        }
      } else {
        console.log(`❌ Falha no reengajamento via ${rule.preferred_channel}: ${result.error}`);
      }

      return result;

    } catch (error) {
      console.error(`💥 Erro no processamento de reengajamento:`, error.message);
      return {
        success: false,
        error: error.message,
        channel: rule.preferred_channel
      };
    }
  }

  generatePersonalizedMessage(lead, rule) {
    let message = rule.message_template || `Olá {{name}}! Estamos entrando em contato sobre {{course}}.`;
    
    // Substituir variáveis
    message = message.replace(/\{\{name\}\}/g, lead.name || 'Cliente');
    message = message.replace(/\{\{course\}\}/g, lead.course || 'nossos cursos');
    message = message.replace(/\{\{organization\}\}/g, 'UNE AI');
    
    return message;
  }

  async logMessage(leadId, ruleId, channel, message, result, organizationId) {
    try {
      // Tentar salvar na tabela message_logs (se existir)
      const logData = {
        lead_id: leadId,
        rule_id: ruleId,
        channel: channel,
        message_content: message,
        message_preview: message.substring(0, 200),
        status: result.status,
        sent_at: new Date().toISOString(),
        organization_id: organizationId,
        metadata: {
          messageId: result.messageId,
          service: result.service,
          timestamp: new Date().toISOString()
        }
      };

      const { error } = await supabase
        .from('message_logs')
        .insert([logData]);

      if (error) {
        // Fallback: salvar nas notes do lead
        const logNote = `[${new Date().toLocaleString('pt-BR')}] Reengajamento via ${channel}: ${result.status}`;
        await supabase
          .from('leads')
          .update({
            notes: logNote
          })
          .eq('id', leadId);
      }

    } catch (error) {
      if (this.logScheduler) {
        console.log(`⚠️  Erro ao salvar log: ${error.message}`);
      }
    }
  }

  async updateLeadStatus(leadId, newStatus, newEtapa) {
    try {
      const { error } = await supabase
        .from('leads')
        .update({
          status: newStatus,
          status_leads: newStatus,
          etapa: newEtapa,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (error) {
        console.error(`❌ Erro ao atualizar status do lead:`, error);
      } else if (this.logScheduler) {
        console.log(`✅ Status do lead atualizado para: ${newStatus} - Etapa: ${newEtapa}`);
      }

    } catch (error) {
      console.error(`💥 Erro ao atualizar lead:`, error);
    }
  }

  async getLeadsForReengagement() {
    try {
      const { data: leads, error } = await supabase
        .from('leads')
        .select('*')
        .in('status', ['NOVO', 'ANDAMENTO'])
        .order('created_at', { ascending: true });

      if (error) {
        console.error('❌ Erro ao buscar leads:', error);
        return [];
      }

      if (this.logScheduler) {
        console.log(`✅ ${leads.length} leads encontrados para análise`);
      }

      return leads;

    } catch (error) {
      console.error('💥 Erro ao buscar leads:', error);
      return [];
    }
  }

  async getActiveReengagementRules() {
    try {
      const { data: rules, error } = await supabase
        .from('re_engagement_rules')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Erro ao buscar regras:', error);
        return [];
      }

      if (this.logScheduler) {
        console.log(`✅ ${rules.length} regra(s) de reengajamento ativa(s)`);
      }

      return rules;

    } catch (error) {
      console.error('💥 Erro ao buscar regras:', error);
      return [];
    }
  }

  isLeadEligibleForRule(lead, rule) {
    const now = new Date();
    const leadCreatedAt = new Date(lead.created_at);
    const leadUpdatedAt = new Date(lead.updated_at || lead.created_at);
    
    // Calcular tempo desde criação/última atualização
    const timeSinceCreated = now - leadCreatedAt;
    const timeSinceUpdated = now - leadUpdatedAt;
    
    // Converter time_value e time_unit para milliseconds
    let ruleTimeMs = rule.time_value * 60 * 1000; // padrão: minutos
    
    if (rule.time_unit === 'hours') {
      ruleTimeMs = rule.time_value * 60 * 60 * 1000;
    } else if (rule.time_unit === 'days') {
      ruleTimeMs = rule.time_value * 24 * 60 * 60 * 1000;
    }
    
    // Verificar condições baseadas no tipo de trigger
    if (rule.trigger_type === 'no_response') {
      return timeSinceUpdated >= ruleTimeMs;
    } else if (rule.trigger_type === 'time_based') {
      return timeSinceCreated >= ruleTimeMs;
    } else if (rule.trigger_type === 'status_change') {
      return timeSinceUpdated >= ruleTimeMs;
    }
    
    return false;
  }

  async runReengagementProcess() {
    if (this.isRunning) {
      console.log('⚠️  Processo de reengajamento já em execução');
      return;
    }

    this.isRunning = true;

    try {
      console.log('\n🔄 INICIANDO PROCESSO DE REENGAJAMENTO');
      console.log(`⏰ Horário: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);

      // 1. Buscar regras ativas
      const rules = await this.getActiveReengagementRules();
      if (rules.length === 0) {
        console.log('❌ Nenhuma regra de reengajamento ativa encontrada');
        return;
      }

      // 2. Buscar leads elegíveis
      const leads = await this.getLeadsForReengagement();
      if (leads.length === 0) {
        console.log('❌ Nenhum lead encontrado para reengajamento');
        return;
      }

      // 3. Processar cada combinação lead-regra
      let processedCount = 0;
      let successCount = 0;

      for (const lead of leads) {
        for (const rule of rules) {
          // Verificar se o lead é elegível para esta regra
          if (this.isLeadEligibleForRule(lead, rule)) {
            if (this.logScheduler) {
              console.log(`✅ Lead ${lead.name} elegível para regra ${rule.name}`);
            }

            const result = await this.processReengagementForLead(lead, rule);
            processedCount++;

            if (result.success) {
              successCount++;
            }

            // Adicionar delay entre envios para evitar spam
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        }
      }

      console.log(`\n📊 RESULTADO DO REENGAJAMENTO:`);
      console.log(`  Processados: ${processedCount}`);
      console.log(`  Sucessos: ${successCount}`);
      console.log(`  Falhas: ${processedCount - successCount}`);

    } catch (error) {
      console.error('💥 Erro no processo de reengajamento:', error);
    } finally {
      this.isRunning = false;
      console.log('🏁 Processo de reengajamento finalizado\n');
    }
  }

  start() {
    console.log('🚀 Iniciando Lead Scheduler Service');
    console.log('⏰ Executará a cada 6 horas: 00:00, 06:00, 12:00, 18:00 (horário de Brasília)');

    // Executar imediatamente na inicialização (opcional)
    if (process.env.RUN_ON_START === 'true') {
      this.runReengagementProcess();
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
      
      console.log(`⏰ Próxima execução em: ${new Date(nextExecution).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
      
      this.scheduleTimer = setTimeout(() => {
        this.runReengagementProcess();
        scheduleExecution(); // Reagendar para próxima execução
      }, timeUntilNext);
    };

    scheduleExecution();
  }

  stop() {
    console.log('🛑 Parando Lead Scheduler Service');
    
    if (this.scheduleTimer) {
      clearTimeout(this.scheduleTimer);
      this.scheduleTimer = null;
    }
    
    this.isRunning = false;
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      hasSchedule: !!this.scheduleTimer,
      nextExecution: this.scheduleTimer ? 'Agendado' : 'Não agendado'
    };
  }
}

module.exports = new LeadSchedulerService(); 