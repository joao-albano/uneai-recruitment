import { Request, Response } from 'express';
import * as EmailService from '../services/email.service'; // Importar o serviço de email

/**
 * Testa a conexão com o servidor SMTP
 */
export const testConnection = async (req: Request, res: Response) => {
  try {
    console.log('Requisição recebida para testar conexão:', req.body);
    const { organizationId } = req.body;
    
    if (!organizationId) {
      console.log('ID da organização não fornecido');
      return res.status(400).json({
        success: false,
        message: 'ID da organização é obrigatório'
      });
    }
    
    const result = await EmailService.testSmtpConnection(organizationId);
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Conexão com o servidor SMTP estabelecida com sucesso.',
        debug: {
          organizationId,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      res.status(500).json({ // Pode ser 400 ou 500 dependendo do erro
        success: false,
        message: result.error || 'Falha ao conectar com o servidor SMTP.',
        debug: {
          organizationId,
          timestamp: new Date().toISOString()
        }
      });
    }
  } catch (error: any) {
    console.error('Erro ao testar conexão:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno ao testar conexão',
      error: error.message
    });
  }
};

/**
 * Envia um email de teste
 */
export const sendTestEmail = async (req: Request, res: Response) => {
  try {
    console.log('Requisição recebida para enviar email de teste:', req.body);
    const { organizationId, to } = req.body;
    
    if (!organizationId || !to) {
      return res.status(400).json({
        success: false,
        message: 'ID da organização e endereço de destino são obrigatórios'
      });
    }
    
    // Buscar a configuração de email para validar
    const config = await EmailService.getEmailConfig(organizationId);
    
    if (!config) {
      return res.status(400).json({
        success: false,
        message: 'Configuração de email não encontrada. Configure o SMTP primeiro.'
      });
    }
    
    // Enviar um email de teste real usando o serviço de email
    const result = await EmailService.sendEmailViaSmtp({
      organizationId,
      to,
      subject: 'Teste de Configuração SMTP - UNE Aluno',
      htmlBody: `
        <h2>Teste de Configuração SMTP</h2>
        <p>Este é um email de teste enviado pelo sistema UNE Aluno.</p>
        <p>Se você recebeu este email, sua configuração SMTP está funcionando corretamente!</p>
        <hr>
        <p><small>Enviado em: ${new Date().toLocaleString('pt-BR')}</small></p>
        <p><small>Organização ID: ${organizationId}</small></p>
      `
    });
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Email de teste enviado com sucesso!',
        debug: {
          organizationId,
          to,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: result.error || 'Falha ao enviar email de teste',
        debug: {
          organizationId,
          to,
          timestamp: new Date().toISOString()
        }
      });
    }
  } catch (error: any) {
    console.error('Erro ao enviar email de teste:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno ao enviar email de teste',
      error: error.message
    });
  }
};

/**
 * Envia um email personalizado
 */
export const sendEmail = async (req: Request, res: Response) => {
  try {
    console.log('[EMAIL CONTROLLER] sendEmail function called');
    console.log('[EMAIL CONTROLLER] Request body:', JSON.stringify(req.body, null, 2));
    console.log('[EMAIL CONTROLLER] Request headers:', JSON.stringify(req.headers, null, 2));
    
    const { 
      organizationId, 
      to, 
      subject, 
      htmlBody, // Changed from message to htmlBody to match service
      // cc, bcc, replyTo, attachments are not used by the new service yet
    } = req.body as EmailService.SendEmailParams & { cc?: string | string[], bcc?: string | string[], replyTo?: string, attachments?: any[] }; // Added type assertion
    
    console.log('[EMAIL CONTROLLER] Extracted parameters:', { organizationId, to, subject, htmlBody });
    
    if (!organizationId || !to || !subject || !htmlBody) {
      console.log('[EMAIL CONTROLLER] Missing required fields');
      return res.status(400).json({
        success: false,
        message: 'Campos obrigatórios: organizationId, to, subject, htmlBody'
      });
    }
    
    console.log('[EMAIL CONTROLLER] Calling sendEmailViaSmtp service...');
    const result = await EmailService.sendEmailViaSmtp({
      organizationId,
      to,
      subject,
      htmlBody
    });
    
    console.log('[EMAIL CONTROLLER] Service result:', result);
    
    if (result.success) {
      console.log('[EMAIL CONTROLLER] Sending success response');
      res.json({
        success: true,
        message: 'Email enviado com sucesso!',
        // messageId: result.messageId // nodemailer's sendMail result often has a messageId
      });
    } else {
      console.log('[EMAIL CONTROLLER] Sending error response');
      res.status(500).json({ 
        success: false,
        message: result.error || 'Falha ao enviar email.',
      });
    }

  } catch (error: any) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({
      success: false,
      message: 'Erro interno ao enviar email',
      error: error.message
    });
  }
}; 