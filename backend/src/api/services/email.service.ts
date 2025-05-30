import nodemailer from 'nodemailer';
import supabase from '../../config/supabaseClient'; // Corrigido para importação default

interface EmailConfig {
  id?: string;
  organization_id: string;
  smtp_host: string;
  smtp_port: number;
  smtp_secure: boolean;
  username: string;
  password: string;
  from_email: string;
  from_name?: string; // Opcional, pois pode não estar sempre presente
}

/**
 * Busca a configuração de email de uma organização no Supabase
 */
export const getEmailConfig = async (organizationId: string): Promise<EmailConfig | null> => {
  console.log(`Buscando configuração de email para organizationId: ${organizationId}`);
  console.log('[EmailService] Supabase client object:', supabase);
  try {
    const { data, error } = await supabase
      .from('email_config')
      .select('*')
      .eq('organization_id', organizationId)
      .maybeSingle(); // Use maybeSingle para retornar null se não encontrado, em vez de erro

    if (error) {
      console.error('Erro ao buscar configuração de email no Supabase:', error);
      // Não lance o erro aqui, deixe o chamador decidir como lidar com isso
      // ou lance um erro específico se preferir.
      return null;
    }
    
    if (!data) {
      console.log(`Nenhuma configuração de email encontrada para organizationId: ${organizationId}`);
      return null;
    }
    
    console.log('Configuração de email encontrada:', data);
    return data as EmailConfig;
  } catch (err: any) {
    console.error('Exceção em getEmailConfig:', err);
    return null;
  }
};

/**
 * Testa a conexão SMTP com a configuração fornecida
 */
export const testSmtpConnection = async (organizationId: string): Promise<{ success: boolean; error?: string }> => {
  console.log(`Iniciando teste de conexão SMTP para organizationId: ${organizationId}`);
  const config = await getEmailConfig(organizationId);

  if (!config) {
    const errorMessage = 'Configuração de email não encontrada.';
    console.log(errorMessage);
    return { success: false, error: errorMessage };
  }

  if (!config.smtp_host || !config.username || !config.password) {
    const errorMessage = 'Configuração SMTP incompleta (host, usuário ou senha ausentes).';
    console.log(errorMessage);
    return { success: false, error: errorMessage };
  }

  console.log('Usando configuração SMTP para teste:', {
    host: config.smtp_host,
    port: config.smtp_port,
    secure: config.smtp_secure,
    user: config.username,
  });

  const transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: config.smtp_port,
    secure: config.smtp_secure, // true para 465, false para outras portas
    auth: {
      user: config.username,
      pass: config.password,
    },
    debug: process.env.NODE_ENV !== 'production', // Ativa logs detalhados em dev
    logger: process.env.NODE_ENV !== 'production',
  });

  try {
    console.log('Verificando conexão com o servidor SMTP...');
    await transporter.verify();
    console.log('Conexão SMTP verificada com sucesso!');
    return { success: true };
  } catch (error: any) {
    console.error('Falha na verificação da conexão SMTP:', error.message);
    return { success: false, error: error.message };
  }
};

export interface SendEmailParams {
  organizationId: string;
  to: string;
  subject: string;
  htmlBody: string; // Changed from body to htmlBody for clarity
}

/**
 * Envia um email usando a configuração SMTP da organização.
 */
export const sendEmailViaSmtp = async (params: SendEmailParams): Promise<{ success: boolean; error?: string }> => {
  console.log('Tentando enviar email com os parâmetros:', params);
  const config = await getEmailConfig(params.organizationId);

  if (!config) {
    const errorMessage = 'Configuração de email não encontrada para envio.';
    console.log(errorMessage);
    return { success: false, error: errorMessage };
  }

  if (!config.smtp_host || !config.username || !config.password || !config.from_email) {
    const errorMessage = 'Configuração SMTP incompleta para envio (host, usuário, senha ou email remetente ausentes).';
    console.log(errorMessage);
    return { success: false, error: errorMessage };
  }

  const transporter = nodemailer.createTransport({
    host: config.smtp_host,
    port: config.smtp_port,
    secure: config.smtp_secure,
    auth: {
      user: config.username,
      pass: config.password,
    },
    // Adicionar debug e logger pode ser útil durante o desenvolvimento
    debug: process.env.NODE_ENV !== 'production',
    logger: process.env.NODE_ENV !== 'production',
  });

  const mailOptions = {
    from: `"${config.from_name || 'UNE Aluno'}" <${config.from_email}>`,
    to: params.to,
    subject: params.subject,
    html: params.htmlBody,
  };

  try {
    console.log('Enviando email com as opções:', mailOptions);
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso pela configuração da organização!');
    return { success: true };
  } catch (error: any) {
    console.error('Falha ao enviar email pela configuração da organização:', error.message);
    return { success: false, error: error.message };
  }
};

// Você pode adicionar as funções sendTestEmail e sendEmail aqui depois, seguindo o mesmo padrão. 