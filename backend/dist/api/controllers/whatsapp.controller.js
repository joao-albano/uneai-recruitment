"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.sendTextMessage = exports.checkConnectionState = exports.createWhatsAppInstance = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const supabaseClient_1 = __importDefault(require("../../config/supabaseClient"));
console.log('[DEBUG] process.env.EVOLUTION_API_KEY:', process.env.EVOLUTION_API_KEY);
console.log('[DEBUG] process.env.EVOLUTION_URL:', process.env.EVOLUTION_URL);
const createWhatsAppInstance = async (req, res) => {
    try {
        const { organizationId, token } = req.body;
        if (!organizationId) {
            res.status(400).json({ error: 'Organization ID is required' });
            return;
        }
        // Usa o organization_id como instance_id
        const instanceId = organizationId;
        const instanceName = `WhatsApp_${organizationId}`;
        // Verifica se já existe uma instância para esta organização
        const { data: existingInstance, error: checkError } = await supabaseClient_1.default
            .from('whatsapp_instances')
            .select('*')
            .eq('organization_id', organizationId)
            .single();
        if (checkError && checkError.code !== 'PGRST116') { // PGRST116 é o código para "não encontrado"
            console.error('Error checking existing instance:', checkError);
            res.status(500).json({ error: 'Failed to check existing WhatsApp instance' });
            return;
        }
        let instance;
        if (existingInstance) {
            // Atualiza a instância existente
            const { data: updatedInstance, error: updateError } = await supabaseClient_1.default
                .from('whatsapp_instances')
                .update({
                instance_name: instanceName,
                status: 'connecting',
                updated_at: new Date().toISOString(),
                token: token || existingInstance.token || null
            })
                .eq('organization_id', organizationId)
                .select()
                .single();
            if (updateError) {
                console.error('Error updating WhatsApp instance:', updateError);
                res.status(500).json({ error: 'Failed to update WhatsApp instance' });
                return;
            }
            instance = updatedInstance;
        }
        else {
            // Cria uma nova instância
            const { data: newInstance, error: createError } = await supabaseClient_1.default
                .from('whatsapp_instances')
                .insert({
                organization_id: organizationId,
                instance_id: instanceId,
                instance_name: instanceName,
                status: 'connecting',
                token: token || null
            })
                .select()
                .single();
            if (createError) {
                console.error('Error creating WhatsApp instance:', createError);
                res.status(500).json({ error: 'Failed to create WhatsApp instance' });
                return;
            }
            instance = newInstance;
        }
        // In a real implementation, you would integrate with WhatsApp API here
        // For now, we'll return a mock QR code
        const mockQRCode = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
        res.json({
            success: true,
            qrcode: mockQRCode,
            instance: {
                id: instance.instance_id,
                name: instance.instance_name,
                status: instance.status
            }
        });
    }
    catch (err) {
        console.error('Error in createWhatsAppInstance:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createWhatsAppInstance = createWhatsAppInstance;
const checkConnectionState = async (req, res) => {
    try {
        const { instanceId } = req.params;
        if (!instanceId) {
            res.status(400).json({ error: 'Instance ID is required' });
            return;
        }
        // Check instance in database
        const { data: instance, error } = await supabaseClient_1.default
            .from('whatsapp_instances')
            .select('*')
            .eq('instance_id', instanceId)
            .single();
        if (error || !instance) {
            res.status(404).json({ error: 'Instance not found' });
            return;
        }
        // In a real implementation, you would check actual WhatsApp connection state
        // For now, we'll simulate a successful connection
        res.json({
            instance: {
                instanceName: instance.instance_name,
                state: 'open'
            }
        });
    }
    catch (err) {
        console.error('Error in checkConnectionState:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.checkConnectionState = checkConnectionState;
const sendTextMessage = async (req, res) => {
    try {
        console.log('[WhatsApp] Corpo da requisição recebida:', req.body);
        const { instanceId } = req.params;
        const { number, text, delay = 1200, message } = req.body;
        if (!instanceId || !number || !text) {
            console.log('[WhatsApp] Faltam parâmetros obrigatórios:', { instanceId, number, text });
            res.status(400).json({ error: 'Instance ID, number, and text are required' });
            return;
        }
        // Validate phone number format (559999999999)
        const phoneNumberRegex = /^55\d{10,11}$/;
        if (!phoneNumberRegex.test(number)) {
            console.log('[WhatsApp] Número de telefone inválido:', number);
            res.status(400).json({ error: 'Invalid phone number format. Must be in format: 559999999999' });
            return;
        }
        // Buscar dados da instância pelo instance_name (que é o id da organização)
        const { data: instance, error: instanceError } = await supabaseClient_1.default
            .from('whatsapp_instances')
            .select('*')
            .eq('instance_name', instanceId)
            .eq('status', 'connected')
            .single();
        if (instanceError || !instance) {
            console.log('[WhatsApp] Instância não encontrada ou não conectada:', { instanceId, instanceError });
            res.status(404).json({ error: 'WhatsApp instance not found or not connected' });
            return;
        }
        // Usar apenas variáveis de ambiente
        const apiKey = process.env.EVOLUTION_API_KEY;
        const apiUrl = process.env.EVOLUTION_URL;
        if (!apiKey || !apiUrl) {
            console.log('[WhatsApp] Variáveis de ambiente ausentes:', { apiKey, apiUrl });
            res.status(500).json({ error: 'EVOLUTION_API_KEY or EVOLUTION_URL env var is missing' });
            return;
        }
        const evolutionApiUrl = `${apiUrl}/message/sendText/${instanceId}`;
        const evolutionPayload = {
            number,
            text,
            delay,
            message: message || { conversation: text }
        };
        console.log('[WhatsApp] Enviando para Evolution API:', {
            url: evolutionApiUrl,
            payload: evolutionPayload
        });
        let response;
        let responseBody;
        try {
            response = await (0, node_fetch_1.default)(evolutionApiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': apiKey
                },
                body: JSON.stringify(evolutionPayload)
            });
            responseBody = await response.text();
            try {
                responseBody = JSON.parse(responseBody);
            }
            catch { }
            console.log('[WhatsApp] Resposta Evolution API:', {
                status: response.status,
                body: responseBody
            });
        }
        catch (err) {
            console.error('[WhatsApp] Erro ao chamar Evolution API:', err);
            res.status(500).json({ error: 'Erro ao chamar Evolution API', details: err instanceof Error ? err.message : err });
            return;
        }
        if (!response.ok) {
            // Log detalhado do erro
            if (responseBody && responseBody.response && Array.isArray(responseBody.response.message)) {
                console.error('[WhatsApp] Evolution API retornou erro detalhado:', JSON.stringify(responseBody.response.message, null, 2));
            }
            console.error('[WhatsApp] Evolution API retornou erro:', responseBody);
            res.status(response.status).json(responseBody);
            return;
        }
        res.json(responseBody);
    }
    catch (err) {
        console.error('Error sending text message:', err);
        res.status(500).json({ error: 'Failed to send text message', details: err instanceof Error ? err.message : err });
    }
};
exports.sendTextMessage = sendTextMessage;
// Log para endpoints não encontrados
const notFound = (req, res) => {
    console.log(`[WhatsApp] Endpoint não encontrado: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ error: 'Endpoint não encontrado' });
};
exports.notFound = notFound;
