
import { Message, RegistrySelection } from '@/components/recruitment/conversation/types';
import { RegistryRule } from '@/types/registry';

const DEFAULT_PROMPT = `Analise a conversa abaixo e determine o código de tabulação mais apropriado baseado nas seguintes regras disponíveis:

REGRAS:
{rules}

CONVERSA:
{messages}

Responda APENAS com o código e descrição da regra mais apropriada no formato:
código|descrição`;

export async function analyzeConversationForRegistry(
  messages: Message[],
  rules: RegistryRule[]
): Promise<RegistrySelection | null> {
  try {
    // Formata as mensagens para análise
    const formattedMessages = messages
      .map(msg => `[${msg.isFromLead ? 'LEAD' : 'BOT'}]: ${msg.content}`)
      .join('\n');

    // Formata as regras disponíveis
    const formattedRules = rules
      .filter(rule => rule.type === 'ai' && rule.status === 'active')
      .map(rule => `${rule.code}: ${rule.description}`)
      .join('\n');

    // Prepara o prompt substituindo os placeholders
    const prompt = DEFAULT_PROMPT
      .replace('{rules}', formattedRules)
      .replace('{messages}', formattedMessages);

    // Faz a chamada para a API da OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente especializado em analisar conversas de atendimento e classificá-las de acordo com regras predefinidas.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 100
      })
    });

    const data = await response.json();
    const result = data.choices[0].message.content;
    const [code, description] = result.split('|');

    if (!code || !description) {
      console.error('Formato de resposta inválido da IA:', result);
      return null;
    }

    return {
      code,
      description,
      type: 'ai'
    };
  } catch (error) {
    console.error('Erro ao analisar conversa:', error);
    return null;
  }
}
