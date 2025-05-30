const { createClient } = require('@supabase/supabase-js');
const { AIService } = require('./aiService');
const axios = require('axios');

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

// Normalize phone number for consistent matching
function normalizePhoneNumber(phone) {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // If starts with 55 (Brazil country code), remove it for local comparison
  if (cleaned.startsWith('55')) {
    return cleaned.substring(2);
  }
  
  return cleaned;
}

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
      const rawPhoneNumber = payload.data.key.remoteJid.split('@')[0];
      const phoneNumber = normalizePhoneNumber(rawPhoneNumber);
      const phoneWithDDI = rawPhoneNumber; // Keep original format for storage
      
      console.log('Processing message from phone number:', { raw: rawPhoneNumber, normalized: phoneNumber, withDDI: phoneWithDDI });

      // Find the WhatsApp instance by instance (que agora é o organization_id)
      const { data: instance, error: instanceError } = await supabase
        .from('whatsapp_instances')
        .select('id, organization_id, instance_name')
        .eq('instance_id', payload.instance)
        .single();

      if (instanceError) {
        console.error('Error finding instance:', instanceError);
        throw new Error('WhatsApp instance not found');
      }

      // Try to find existing contact by phone number (try both formats)
      console.log('Searching for existing contact...');
      
      let existingContact = null;
      let contactError = null;

      // Try exact match first (with DDI)
      const { data: exactMatch, error: exactError } = await supabase
        .from('whatsapp_contacts')
        .select(`
          id, 
          lead_id, 
          ai_active, 
          conversation_status,
          leads ( name, course, email )
        `)
        .eq('organization_id', instance.organization_id)
        .eq('phone', phoneWithDDI)
        .single();

      if (exactMatch) {
        existingContact = exactMatch;
        console.log('Found exact match contact:', existingContact);
      } else {
        // Try normalized match (without DDI)
        const { data: normalizedMatch, error: normalizedError } = await supabase
          .from('whatsapp_contacts')
          .select(`
            id, 
            lead_id, 
            ai_active, 
            conversation_status,
            leads ( name, course, email )
          `)
          .eq('organization_id', instance.organization_id)
          .eq('phone', phoneNumber)
          .single();

        if (normalizedMatch) {
          existingContact = normalizedMatch;
          console.log('Found normalized match contact:', normalizedMatch);
        } else {
          contactError = normalizedError;
          console.log('No existing contact found, will create new one');
        }
      }

      let contactId;
      let leadId = null;
      let contactData = null;

      if (existingContact) {
        contactId = existingContact.id;
        leadId = existingContact.lead_id;
        contactData = existingContact;
        
        // Update the contact with the latest phone format and push name
        // Automatically reactivate completed conversations when new messages arrive
        const { data: currentContact } = await supabase
          .from('whatsapp_contacts')
          .select('conversation_status')
          .eq('id', contactId)
          .single();
        
        const updateData = {
          phone: phoneWithDDI, // Store with DDI for consistency
          push_name: payload.data.pushName,
          updated_at: new Date().toISOString()
        };
        
        // Reactivate any non-active conversation when new messages arrive
        if (currentContact?.conversation_status !== 'active') {
          updateData.conversation_status = 'active';
          updateData.is_archived = false;
          console.log(`🔄 Reactivating conversation ${contactId} from status '${currentContact?.conversation_status}' to 'active' due to new message`);
        }
        
        await supabase
          .from('whatsapp_contacts')
          .update(updateData)
          .eq('id', contactId);
          
        console.log('Updated existing contact with latest info and reactivated if needed');
      } else {
        // No existing contact found, try to find a lead with this phone number
        console.log('Searching for lead with phone number:', phoneNumber);
        
        const { data: lead, error: leadError } = await supabase
          .from('leads')
          .select('id, name, course, email')
          .eq('organization_id', instance.organization_id)
          .or(`phone.eq.${phoneNumber},phone.eq.${phoneWithDDI}`)
          .single();

        if (lead) {
          leadId = lead.id;
          console.log('Found matching lead:', lead.id);
        }

        // Create new contact
        const { data: newContact, error: createError } = await supabase
          .from('whatsapp_contacts')
          .insert({
            organization_id: instance.organization_id,
            instance_id: instance.id,
            phone: phoneWithDDI, // Store with DDI
            lead_id: leadId, // Link to lead if found
            push_name: payload.data.pushName,
            conversation_status: 'active',
            is_archived: false,
            ai_active: true // Default AI to active for new contacts
          })
          .select(`
            id, 
            lead_id, 
            ai_active, 
            conversation_status,
            leads ( name, course, email )
          `)
          .single();

        if (createError) {
          console.error('Error creating contact:', createError);
          throw createError;
        }

        contactId = newContact.id;
        contactData = newContact;
        console.log('Created new contact:', newContact.id, 'linked to lead:', leadId);
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

      // Check if this is an inbound message - no longer need to warn about completed conversations
      // All conversations are automatically reactivated when messages arrive
      if (!payload.data.key.fromMe) {
        console.log('📨 Inbound message received for contact:', contactId);
      }

      console.log('Saving message:', messageData);

      const { data: savedMessage, error: messageError } = await supabase
        .from('whatsapp_messages')
        .insert(messageData)
        .select()
        .single();

      if (messageError) {
        console.error('Error saving message:', messageError);
        throw messageError;
      }

      // Update contact's last activity
      await supabase
        .from('whatsapp_contacts')
        .update({
          updated_at: new Date().toISOString()
        })
        .eq('id', contactId);

      console.log('Message processed successfully, contact updated');

      // 🤖 AI RESPONSE LOGIC
      if (AIService.shouldAIRespond(contactData, messageData.direction)) {
        try {
          console.log('🤖 [AI] Generating automatic response...');
          
          // Get conversation history for context
          const { data: conversationHistory } = await supabase
            .from('whatsapp_messages')
            .select('message, direction, is_ai_response, sent_at')
            .eq('contact_id', contactId)
            .order('sent_at', { ascending: false })
            .limit(10);

          // Format history for AI context
          const formattedHistory = (conversationHistory || [])
            .reverse() // Oldest first
            .map(msg => ({
              content: msg.message,
              isFromLead: msg.direction === 'inbound',
              timestamp: msg.sent_at
            }));

          // Get lead information for context
          const leadInfo = contactData.leads ? {
            name: contactData.leads.name,
            course: contactData.leads.course,
            email: contactData.leads.email
          } : {};

          // Generate AI response
          const aiResponse = await AIService.generateResponse(
            messageData.message,
            formattedHistory,
            leadInfo,
            contactId
          );

          // Handle different types of AI responses
          if (aiResponse.type === 'function_call' && aiResponse.function === 'end_conversation') {
            console.log('🤖 [AI] Ending conversation:', aiResponse.reason);
            
            // Send final message first
            if (aiResponse.message) {
              const whatsappResponse = await axios.post(
                `${process.env.EVOLUTION_URL}/message/sendText/${instance.instance_name}`,
                {
                  number: phoneWithDDI,
                  text: aiResponse.message,
                  delay: 1200
                },
                {
                  headers: {
                    'apikey': process.env.EVOLUTION_API_KEY,
                    'Content-Type': 'application/json'
                  }
                }
              );

              if (whatsappResponse.data) {
                console.log('🤖 [AI] Final message sent successfully');
                
                // Save final AI message to database
                const finalMessageData = {
                  contact_id: contactId,
                  organization_id: instance.organization_id,
                  message: aiResponse.message,
                  direction: 'outbound',
                  sent_at: new Date().toISOString(),
                  status: 'sent',
                  is_ai_response: true,
                  agent_id: null
                };

                await supabase
                  .from('whatsapp_messages')
                  .insert(finalMessageData);

                console.log('🤖 [AI] Final message saved to database');
              }
            }

            // End the conversation
            console.log('🔚 [AI] Ending conversation for contact:', contactId, 'Reason:', aiResponse.reason);
            
            // Update conversation status to completed
            await supabase
              .from('whatsapp_contacts')
              .update({
                conversation_status: 'completed',
                updated_at: new Date().toISOString()
              })
              .eq('id', contactId);

            // Save conversation to history
            const conversationData = {
              contact_id: contactId,
              organization_id: instance.organization_id,
              ended_at: new Date().toISOString(),
              ended_by: 'ai',
              end_reason: aiResponse.reason
            };

            await supabase
              .from('conversation_history')
              .insert(conversationData);

            console.log('🔚 [AI] Conversation ended successfully and saved to history');

          } else if (aiResponse.type === 'message') {
            // Regular message response
            console.log('🤖 [AI] Sending regular response via WhatsApp:', aiResponse.message);
            
            const whatsappResponse = await axios.post(
              `${process.env.EVOLUTION_URL}/message/sendText/${instance.instance_name}`,
              {
                number: phoneWithDDI,
                text: aiResponse.message,
                delay: 1200
              },
              {
                headers: {
                  'apikey': process.env.EVOLUTION_API_KEY,
                  'Content-Type': 'application/json'
                }
              }
            );

            if (whatsappResponse.data) {
              console.log('🤖 [AI] Message sent successfully via WhatsApp');
              
              // Save AI response to database
              const aiMessageData = {
                contact_id: contactId,
                organization_id: instance.organization_id,
                message: aiResponse.message,
                direction: 'outbound',
                sent_at: new Date().toISOString(),
                status: 'sent',
                is_ai_response: true,
                agent_id: null
              };

              await supabase
                .from('whatsapp_messages')
                .insert(aiMessageData);

              console.log('🤖 [AI] Response saved to database');
            }
          }

        } catch (aiError) {
          console.error('🤖 [AI] Error generating/sending AI response:', aiError);
          // Continue without AI response - don't fail the webhook
        }
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