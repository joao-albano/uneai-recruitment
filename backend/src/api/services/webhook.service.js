const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Map WhatsApp status to our database status
const STATUS_MAP = {
  'DELIVERY_ACK': 'delivered',
  'READ': 'read',
  'PLAYED': 'played',
  'DELETED': 'deleted',
  'ERROR': 'failed',
  'PENDING': 'pending'
};

class WebhookService {
  static async processWhatsAppMessage(payload) {
    try {
      console.log('Processing webhook payload:', JSON.stringify(payload, null, 2));

      // Only process message upsert events
      if (payload.event !== 'messages.upsert') {
        console.log('Ignoring non-upsert event:', payload.event);
        return { success: true, message: 'Ignored non-upsert event' };
      }

      // Extract phone number from remoteJid (remove @s.whatsapp.net)
      const phoneNumber = payload.data.key.remoteJid.split('@')[0];
      console.log('Processing message from phone number:', phoneNumber);

      // Find the WhatsApp instance by instance (que agora é o organization_id)
      const { data: instance, error: instanceError } = await supabase
        .from('whatsapp_instances')
        .select('id, organization_id')
        .eq('instance_id', payload.instance)
        .single();

      if (instanceError) {
        console.error('Error finding instance:', instanceError);
        throw new Error('WhatsApp instance not found');
      }

      // Find or create contact
      const { data: existingContact, error: contactError } = await supabase
        .from('whatsapp_contacts')
        .select('id')
        .eq('organization_id', instance.organization_id)
        .eq('phone', phoneNumber)
        .single();

      let contactId;
      if (contactError) {
        // Create new contact
        const { data: newContact, error: createError } = await supabase
          .from('whatsapp_contacts')
          .insert({
            organization_id: instance.organization_id,
            instance_id: instance.id,
            phone: phoneNumber,
            push_name: payload.data.pushName,
            status: 'active'
          })
          .select('id')
          .single();

        if (createError) {
          console.error('Error creating contact:', createError);
          throw createError;
        }

        contactId = newContact.id;
      } else {
        contactId = existingContact.id;
      }

      // Save the message
      const messageData = {
        contact_id: contactId,
        organization_id: instance.organization_id,
        message: payload.data.message.conversation || '',
        direction: payload.data.key.fromMe ? 'outbound' : 'inbound',
        sent_at: new Date(payload.data.messageTimestamp * 1000).toISOString(),
        status: STATUS_MAP[payload.data.status] || 'sent',
        is_ai_response: false
      };

      console.log('Saving message:', messageData);

      const { error: messageError } = await supabase
        .from('whatsapp_messages')
        .insert(messageData);

      if (messageError) {
        console.error('Error saving message:', messageError);
        throw messageError;
      }

      return { success: true, message: 'Message processed successfully' };
    } catch (error) {
      console.error('Error in processWhatsAppMessage:', error);
      throw error;
    }
  }
}

module.exports = {
  WebhookService
}; 