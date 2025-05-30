"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.sendTestEmail = exports.testConnection = void 0;
const EmailService = __importStar(require("../services/email.service")); // Importar o serviço de email
/**
 * Testa a conexão com o servidor SMTP
 */
const testConnection = async (req, res) => {
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
        }
        else {
            res.status(500).json({
                success: false,
                message: result.error || 'Falha ao conectar com o servidor SMTP.',
                debug: {
                    organizationId,
                    timestamp: new Date().toISOString()
                }
            });
        }
    }
    catch (error) {
        console.error('Erro ao testar conexão:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno ao testar conexão',
            error: error.message
        });
    }
};
exports.testConnection = testConnection;
/**
 * Envia um email de teste
 */
const sendTestEmail = async (req, res) => {
    try {
        console.log('Requisição recebida para enviar email de teste:', req.body);
        const { organizationId, to } = req.body;
        if (!organizationId || !to) {
            return res.status(400).json({
                success: false,
                message: 'ID da organização e endereço de destino são obrigatórios'
            });
        }
        // Simulação de envio para testes
        console.log('Retornando sucesso simulado de envio');
        res.json({
            success: true,
            message: 'Email de teste enviado com sucesso (simulação)',
            messageId: 'test-' + Date.now(),
            debug: {
                organizationId,
                to,
                timestamp: new Date().toISOString()
            }
        });
    }
    catch (error) {
        console.error('Erro ao enviar email de teste:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno ao enviar email de teste',
            error: error.message
        });
    }
};
exports.sendTestEmail = sendTestEmail;
/**
 * Envia um email personalizado
 */
const sendEmail = async (req, res) => {
    try {
        console.log('[EMAIL CONTROLLER] sendEmail function called');
        console.log('[EMAIL CONTROLLER] Request body:', JSON.stringify(req.body, null, 2));
        console.log('[EMAIL CONTROLLER] Request headers:', JSON.stringify(req.headers, null, 2));
        const { organizationId, to, subject, htmlBody, // Changed from message to htmlBody to match service
        // cc, bcc, replyTo, attachments are not used by the new service yet
         } = req.body; // Added type assertion
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
        }
        else {
            console.log('[EMAIL CONTROLLER] Sending error response');
            res.status(500).json({
                success: false,
                message: result.error || 'Falha ao enviar email.',
            });
        }
    }
    catch (error) {
        console.error('Erro ao enviar email:', error);
        res.status(500).json({
            success: false,
            message: 'Erro interno ao enviar email',
            error: error.message
        });
    }
};
exports.sendEmail = sendEmail;
