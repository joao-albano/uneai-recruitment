require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const leadScheduler = require('./leadScheduler');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

class CampaignSchedulerService {
  constructor() {
    this.isRunning = false;
    this.logCampaigns = true;
  }

  // Buscar campanhas ativas para execução
  async getActiveCampaigns() {
    try {
      const { data: campaigns, error } = await supabase
        .from('campaigns')
        .select('*')
        .in('status', ['active', 'scheduled'])
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Erro ao buscar campanhas:', error);
        return [];
      }

      if (this.logCampaigns) {
        console.log(`✅ ${campaigns.length} campanha(s) ativa(s) encontrada(s)`);
      }

      return campaigns;

    } catch (error) {
      console.error('💥 Erro ao buscar campanhas:', error);
      return [];
    }
  }

  // Buscar leads baseado nas regras de segmentação da campanha
  async getLeadsForCampaign(campaign) {
    try {
      let query = supabase
        .from('leads')
        .select('*')
        .eq('organization_id', campaign.organization_id);

      // Aplicar filtros de segmentação
      if (campaign.segmentation_rules) {
        const rules = campaign.segmentation_rules;

        // Filtro por audience (nível educacional)
        if (rules.audience) {
          query = query.ilike('course', `%${rules.audience}%`);
        }

        // Filtro por cursos específicos
        if (rules.courses && rules.courses.length > 0) {
          const courseFilter = rules.courses.map(course => `course.ilike.%${course}%`).join(',');
          query = query.or(courseFilter);
        }

        // Filtro por localização/campus
        if (rules.location) {
          query = query.ilike('campus', `%${rules.location}%`);
        }

        // Filtro por status
        if (rules.status) {
          if (Array.isArray(rules.status)) {
            query = query.in('status', rules.status);
          } else {
            query = query.eq('status', rules.status);
          }
        } else {
          // Por padrão, incluir leads NOVO e ANDAMENTO
          query = query.in('status', ['NOVO', 'ANDAMENTO']);
        }

        // Filtro por período de criação
        if (rules.created_after) {
          query = query.gte('created_at', rules.created_after);
        }

        if (rules.created_before) {
          query = query.lte('created_at', rules.created_before);
        }
      }

      const { data: leads, error } = await query;

      if (error) {
        console.error('❌ Erro ao buscar leads para campanha:', error);
        return [];
      }

      if (this.logCampaigns) {
        console.log(`✅ ${leads.length} lead(s) encontrado(s) para campanha "${campaign.name}"`);
      }

      return leads;

    } catch (error) {
      console.error('💥 Erro ao segmentar leads:', error);
      return [];
    }
  }

  // Verificar se lead já recebeu esta campanha
  async hasLeadReceivedCampaign(leadId, campaignId) {
    try {
      const { data, error } = await supabase
        .from('recruitment.campaign_leads')
        .select('id')
        .eq('lead_id', leadId)
        .eq('campaign_id', campaignId)
        .single();

      return !error && data;

    } catch (error) {
      return false;
    }
  }

  // Registrar envio da campanha para o lead
  async recordCampaignSent(leadId, campaignId, organizationId, status = 'sent') {
    try {
      const { error } = await supabase
        .from('recruitment.campaign_leads')
        .insert([{
          lead_id: leadId,
          campaign_id: campaignId,
          organization_id: organizationId,
          status: status,
          sent_at: new Date().toISOString()
        }]);

      if (error) {
        console.error('❌ Erro ao registrar envio da campanha:', error);
      }

    } catch (error) {
      console.error('💥 Erro ao registrar campanha:', error);
    }
  }

  // Gerar mensagem personalizada para campanha
  generateCampaignMessage(lead, campaign) {
    // Template padrão caso não tenha template específico
    let message = `Olá {{name}}! 👋

Temos uma oportunidade especial para você em {{course}}!

Esta mensagem faz parte da nossa campanha: ${campaign.name}

Entre em contato para saber mais sobre nossas oportunidades educacionais! 🚀

Atenciosamente,
Equipe UNE AI 📚`;

    // Se a campanha tem template específico, usar ele
    if (campaign.message_template) {
      message = campaign.message_template;
    }

    // Substituir variáveis
    message = message.replace(/\{\{name\}\}/g, lead.name || 'Cliente');
    message = message.replace(/\{\{course\}\}/g, lead.course || 'nossos cursos');
    message = message.replace(/\{\{organization\}\}/g, 'UNE AI');
    message = message.replace(/\{\{campaign_name\}\}/g, campaign.name);
    
    return message;
  }

  // Processar campanha para um lead específico
  async processCampaignForLead(lead, campaign) {
    if (this.logCampaigns) {
      console.log(`\n🎯 Processando campanha para lead:`);
      console.log(`  Lead: ${lead.name} (${lead.id})`);
      console.log(`  Campanha: ${campaign.name}`);
    }

    try {
      // Verificar se lead já recebeu esta campanha
      const alreadyReceived = await this.hasLeadReceivedCampaign(lead.id, campaign.id);
      
      if (alreadyReceived) {
        if (this.logCampaigns) {
          console.log(`⚠️  Lead já recebeu esta campanha, pulando...`);
        }
        return { success: false, reason: 'already_received' };
      }

      // Gerar mensagem personalizada
      const message = this.generateCampaignMessage(lead, campaign);

      // Determinar canal preferido (padrão: whatsapp)
      const preferredChannel = campaign.preferred_channel || 'whatsapp';

      let result;

      // Reutilizar a infraestrutura do leadScheduler para envio
      if (preferredChannel === 'whatsapp') {
        // Buscar instância WhatsApp
        const instance = await leadScheduler.getWhatsAppInstance(lead.organization_id);
        
        if (!instance) {
          throw new Error('Instância WhatsApp não encontrada ou não conectada');
        }

        result = await leadScheduler.sendWhatsAppMessage(lead.phone, message, instance, lead.organization_id);
        
      } else if (preferredChannel === 'email') {
        result = await leadScheduler.sendEmailMessage(lead.email, message, lead.id, campaign.id, lead.organization_id);
        
      } else if (preferredChannel === 'sms') {
        result = await leadScheduler.sendSMSMessage(lead.phone, message, lead.id, campaign.id, lead.organization_id);
        
      } else {
        throw new Error(`Canal não suportado: ${preferredChannel}`);
      }

      // Registrar envio da campanha
      const status = result.success ? 'sent' : 'failed';
      await this.recordCampaignSent(lead.id, campaign.id, lead.organization_id, status);

      if (result.success && this.logCampaigns) {
        console.log(`✅ Campanha enviada com sucesso via ${preferredChannel}`);
      } else if (!result.success) {
        console.log(`❌ Falha no envio da campanha via ${preferredChannel}: ${result.error}`);
      }

      return result;

    } catch (error) {
      console.error(`💥 Erro no processamento da campanha:`, error.message);
      
      // Registrar falha
      await this.recordCampaignSent(lead.id, campaign.id, lead.organization_id, 'failed');
      
      return {
        success: false,
        error: error.message,
        channel: campaign.preferred_channel || 'whatsapp'
      };
    }
  }

  // Verificar se campanha deve ser executada agora
  shouldExecuteCampaign(campaign) {
    const now = new Date();
    
    // Se tem data de início, verificar se já chegou
    if (campaign.start_date) {
      const startDate = new Date(campaign.start_date);
      if (now < startDate) {
        return false;
      }
    }

    // Se tem data de fim, verificar se não passou
    if (campaign.end_date) {
      const endDate = new Date(campaign.end_date);
      if (now > endDate) {
        return false;
      }
    }

    // Campanhas com status 'scheduled' só executam no horário programado
    if (campaign.status === 'scheduled' && campaign.start_date) {
      const startDate = new Date(campaign.start_date);
      const timeDiff = Math.abs(now - startDate);
      
      // Executar se estiver dentro de 5 minutos do horário programado
      return timeDiff <= 5 * 60 * 1000;
    }

    // Campanhas ativas podem ser executadas a qualquer momento
    return campaign.status === 'active';
  }

  // Marcar campanha como processada
  async markCampaignAsProcessed(campaignId, status = 'completed') {
    try {
      const { error } = await supabase
        .from('campaigns')
        .update({
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', campaignId);

      if (error) {
        console.error('❌ Erro ao atualizar status da campanha:', error);
      }

    } catch (error) {
      console.error('💥 Erro ao marcar campanha:', error);
    }
  }

  // Processo principal de execução de campanhas
  async runCampaignProcess() {
    if (this.isRunning) {
      console.log('⚠️  Processo de campanhas já em execução');
      return;
    }

    this.isRunning = true;

    try {
      console.log('\n📢 INICIANDO PROCESSO DE CAMPANHAS');
      console.log(`⏰ Horário: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);

      // 1. Buscar campanhas ativas
      const campaigns = await this.getActiveCampaigns();
      if (campaigns.length === 0) {
        console.log('❌ Nenhuma campanha ativa encontrada');
        return;
      }

      let totalProcessed = 0;
      let totalSuccess = 0;

      // 2. Processar cada campanha
      for (const campaign of campaigns) {
        // Verificar se deve executar agora
        if (!this.shouldExecuteCampaign(campaign)) {
          if (this.logCampaigns) {
            console.log(`⏭️  Campanha "${campaign.name}" não está no horário de execução`);
          }
          continue;
        }

        console.log(`\n🎯 Processando campanha: ${campaign.name}`);

        // 3. Buscar leads para esta campanha
        const leads = await this.getLeadsForCampaign(campaign);
        
        if (leads.length === 0) {
          console.log(`❌ Nenhum lead encontrado para campanha "${campaign.name}"`);
          continue;
        }

        let campaignSuccess = 0;

        // 4. Processar cada lead da campanha
        for (const lead of leads) {
          const result = await this.processCampaignForLead(lead, campaign);
          totalProcessed++;

          if (result.success) {
            totalSuccess++;
            campaignSuccess++;
          }

          // Delay entre envios para evitar spam
          await new Promise(resolve => setTimeout(resolve, 2000));
        }

        // 5. Marcar campanha como processada se foi executada
        if (campaignSuccess > 0) {
          await this.markCampaignAsProcessed(campaign.id, 'completed');
        }

        console.log(`📊 Campanha "${campaign.name}": ${campaignSuccess}/${leads.length} enviados`);
      }

      console.log(`\n📊 RESULTADO DAS CAMPANHAS:`);
      console.log(`  Processados: ${totalProcessed}`);
      console.log(`  Sucessos: ${totalSuccess}`);
      console.log(`  Falhas: ${totalProcessed - totalSuccess}`);

    } catch (error) {
      console.error('💥 Erro no processo de campanhas:', error);
    } finally {
      this.isRunning = false;
      console.log('🏁 Processo de campanhas finalizado\n');
    }
  }

  // Executar campanha específica por ID
  async runSpecificCampaign(campaignId) {
    try {
      console.log(`\n🎯 Executando campanha específica: ${campaignId}`);

      const { data: campaign, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();

      if (error || !campaign) {
        throw new Error('Campanha não encontrada');
      }

      console.log(`📢 Campanha: ${campaign.name}`);

      // Buscar leads para esta campanha
      const leads = await this.getLeadsForCampaign(campaign);
      
      if (leads.length === 0) {
        console.log(`❌ Nenhum lead encontrado para esta campanha`);
        return { success: false, message: 'Nenhum lead encontrado' };
      }

      let successCount = 0;
      let totalCount = 0;

      // Processar cada lead
      for (const lead of leads) {
        const result = await this.processCampaignForLead(lead, campaign);
        totalCount++;

        if (result.success) {
          successCount++;
        }

        // Delay entre envios
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Marcar como processada
      await this.markCampaignAsProcessed(campaign.id, 'completed');

      const results = {
        success: true,
        campaign: campaign.name,
        total: totalCount,
        sent: successCount,
        failed: totalCount - successCount
      };

      console.log(`\n📊 RESULTADO:`);
      console.log(`  Campanha: ${results.campaign}`);
      console.log(`  Total: ${results.total}`);
      console.log(`  Enviados: ${results.sent}`);
      console.log(`  Falhas: ${results.failed}`);

      return results;

    } catch (error) {
      console.error('💥 Erro ao executar campanha específica:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Obter status do serviço
  getStatus() {
    return {
      isRunning: this.isRunning,
      service: 'Campaign Scheduler',
      description: 'Processamento de campanhas de marketing'
    };
  }
}

module.exports = new CampaignSchedulerService(); 