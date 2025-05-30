const OpenAI = require('openai');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class AIService {
  /**
   * Generate an AI response for a WhatsApp conversation
   * @param {string} userMessage - The message from the user
   * @param {Array} conversationHistory - Array of previous messages for context
   * @param {Object} leadInfo - Information about the lead (name, course, etc.)
   * @param {string} contactId - Contact ID for potential conversation ending
   * @returns {Promise<Object>} - Object containing response and potential actions
   */
  static async generateResponse(userMessage, conversationHistory = [], leadInfo = {}, contactId = null) {
    try {
      console.log('[AIService] Generating response for message:', userMessage);
      
      // Build conversation context
      const messages = [
        {
          role: 'system',
          content: `Você é uma assistente virtual especializada em atendimento educacional da instituição de ensino. 

INSTRUÇÕES IMPORTANTES:
- Seja sempre cordial, profissional e prestativa
- Responda de forma clara e objetiva
- Use linguagem natural e amigável
- Seja empática e compreensiva
- Mantenha foco em ajudar com questões educacionais
- Se não souber uma informação específica, oriente a falar com um atendente humano
- Mantenha respostas concisas (máximo 200 caracteres quando possível)

ENCERRAMENTO DE CONVERSA:
Você pode encerrar a conversa nas seguintes situações:
- Quando o lead demonstrar claramente que não tem interesse no momento
- Quando disser "tchau", "obrigado, até mais", "não preciso mais de ajuda"
- Quando a conversa chegar a uma conclusão natural
- Quando o lead solicitar para parar o atendimento
- Quando perceber que todas as dúvidas foram esclarecidas

INFORMAÇÕES DO LEAD:
${leadInfo.name ? `Nome: ${leadInfo.name}` : ''}
${leadInfo.course ? `Curso de interesse: ${leadInfo.course}` : ''}
${leadInfo.email ? `Email: ${leadInfo.email}` : ''}

CONTEXTO:
Esta é uma conversa de WhatsApp para atendimento educacional. Ajude o lead com informações sobre cursos, matrículas, processos seletivos e dúvidas gerais.`
        }
      ];

      // Add conversation history for context (last 10 messages)
      const recentHistory = conversationHistory.slice(-10);
      for (const msg of recentHistory) {
        messages.push({
          role: msg.isFromLead ? 'user' : 'assistant',
          content: msg.content
        });
      }

      // Add current user message
      messages.push({
        role: 'user',
        content: userMessage
      });

      console.log('[AIService] Sending request to OpenAI with context:', {
        messagesCount: messages.length,
        leadName: leadInfo.name,
        leadCourse: leadInfo.course
      });

      // Define tools available to the AI (newer format)
      const tools = [
        {
          type: 'function',
          function: {
            name: 'end_conversation',
            description: 'Encerra a conversa atual quando apropriado (lead não interessado, despedida, conclusão natural)',
            parameters: {
              type: 'object',
              properties: {
                reason: {
                  type: 'string',
                  description: 'Motivo do encerramento (ex: "lead_not_interested", "natural_conclusion", "goodbye", "request_to_stop")'
                },
                final_message: {
                  type: 'string',
                  description: 'Mensagem final para enviar antes de encerrar a conversa'
                }
              },
              required: ['reason', 'final_message']
            }
          }
        }
      ];

      // Generate response using GPT-4o-mini with tools
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        max_tokens: 150,
        temperature: 0.7,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
        tools: tools,
        tool_choice: 'auto'
      });

      console.log('[AIService] OpenAI response:', JSON.stringify(completion, null, 2));

      const response = completion.choices[0];
      
      console.log('[AIService] Response object:', JSON.stringify(response, null, 2));
      
      // Check if AI wants to call a tool/function
      if (response.message.tool_calls && response.message.tool_calls.length > 0) {
        const toolCall = response.message.tool_calls[0];
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        
        console.log('[AIService] AI called tool:', functionName, 'with args:', functionArgs);
        
        if (functionName === 'end_conversation') {
          return {
            type: 'function_call',
            function: 'end_conversation',
            message: functionArgs.final_message,
            reason: functionArgs.reason,
            contactId: contactId
          };
        }
      }
      
      // Regular text response - only check content if there's no tool call
      const messageContent = response.message?.content?.trim();
      
      console.log('[AIService] Message content:', messageContent);
      console.log('[AIService] Has tool calls:', !!(response.message.tool_calls && response.message.tool_calls.length > 0));
      
      // If there's no tool call and no content, that's an error
      if ((!response.message.tool_calls || response.message.tool_calls.length === 0) && !messageContent) {
        console.log('[AIService] No tool call and no content - error');
        throw new Error('No response generated from OpenAI');
      }
      
      // If there was a tool call but we didn't handle it, fall back to content
      if ((response.message.tool_calls && response.message.tool_calls.length > 0) && !messageContent) {
        console.log('[AIService] Unhandled tool call, using fallback response');
        const fallbackResponses = [
          'Obrigada pelo contato! Se precisar de mais alguma coisa, estarei aqui.',
          'Foi um prazer ajudar! Tenha um ótimo dia.',
          'Qualquer dúvida, pode entrar em contato novamente.'
        ];
        const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
        
        return {
          type: 'message',
          message: randomResponse
        };
      }

      console.log('[AIService] Generated response:', messageContent);
      
      return {
        type: 'message',
        message: messageContent
      };

    } catch (error) {
      console.error('[AIService] Error generating AI response:', error);
      
      // Fallback response
      const fallbackResponses = [
        'Olá! Obrigada por entrar em contato. Em que posso ajudar você hoje?',
        'Oi! Estou aqui para ajudar com suas dúvidas sobre nossos cursos. Como posso auxiliar?',
        'Olá! Seja bem-vindo(a)! Em que posso ajudar você?'
      ];
      
      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      console.log('[AIService] Using fallback response:', randomResponse);
      
      return {
        type: 'message',
        message: randomResponse
      };
    }
  }

  /**
   * Check if AI should respond to a message
   * @param {Object} contact - WhatsApp contact information
   * @param {string} messageDirection - 'inbound' or 'outbound'
   * @returns {boolean}
   */
  static shouldAIRespond(contact, messageDirection) {
    // Only respond to inbound messages (from lead)
    if (messageDirection !== 'inbound') {
      return false;
    }

    // Check if AI is active for this contact
    if (!contact.ai_active) {
      console.log('[AIService] AI is disabled for contact:', contact.id);
      return false;
    }

    return true;
  }
}

module.exports = { AIService }; 