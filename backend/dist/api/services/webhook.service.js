"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookService = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
class WebhookService {
    static async processWhatsAppMessage(payload) {
        try {
            // Only process message upsert events
            if (payload.event !== 'messages.upsert') {
                return;
            }
            // Extract phone number from remoteJid (remove @s.whatsapp.net)
            const phoneNumber = payload.data.key.remoteJid.split('@')[0];
            // Try to find the lead by phone number
            const { data: lead, error: leadError } = await supabase
                .from('leads')
                .select('id, organization_id')
                .eq('phone', phoneNumber)
                .single();
            if (leadError) {
                console.error('Error finding lead:', leadError);
                return;
            }
            if (!lead) {
                console.error('No lead found for phone number:', phoneNumber);
                return;
            }
            // Insert the message into whatsapp_messages table
            const { error: messageError } = await supabase
                .from('whatsapp_messages')
                .insert({
                organization_id: lead.organization_id,
                student_id: lead.id,
                message: payload.data.message.conversation || '',
                direction: payload.data.key.fromMe ? 'outbound' : 'inbound',
                is_ai_response: false,
                status: payload.data.status.toLowerCase(),
                sent_at: new Date(payload.data.messageTimestamp * 1000).toISOString(),
            });
            if (messageError) {
                console.error('Error inserting message:', messageError);
                return;
            }
            return { success: true };
        }
        catch (error) {
            console.error('Error processing WhatsApp message:', error);
            throw error;
        }
    }
}
exports.WebhookService = WebhookService;
