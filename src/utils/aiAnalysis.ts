
import { StudentData } from "@/types/data";

// Função para obter configurações da OpenAI do localStorage
export const getOpenAIConfig = () => {
  try {
    const savedOpenAi = localStorage.getItem('openAiSettings');
    if (savedOpenAi) {
      return JSON.parse(savedOpenAi);
    }
  } catch (error) {
    console.error('Error loading OpenAI settings:', error);
  }
  
  // Valores padrão caso não haja configurações salvas
  return {
    apiKey: '',
    model: 'gpt-4o-mini'
  };
};

// Função para analisar o comportamento do aluno usando a OpenAI
export const analyzeStudentBehavior = async (student: StudentData): Promise<{
  analysis: string;
  recommendations: string[];
}> => {
  const config = getOpenAIConfig();
  
  // Verificar se a chave da API está configurada
  if (!config.apiKey) {
    console.warn('OpenAI API key not configured');
    return {
      analysis: 'Não foi possível realizar a análise: chave da API da OpenAI não configurada.',
      recommendations: ['Configure a chave da API da OpenAI nas configurações do sistema']
    };
  }
  
  try {
    // Preparar os dados do aluno para enviar à API
    const studentData = {
      name: student.name,
      grade: student.grade,
      attendance: student.attendance,
      behavior: student.behavior,
      riskLevel: student.riskLevel,
      actionItems: student.actionItems,
      // Inclua outros dados relevantes aqui
    };
    
    const prompt = `
      Analise os dados do aluno a seguir e forneça uma avaliação detalhada do seu comportamento 
      e recomendações de intervenção. Por favor, considere todos os fatores de risco:
      
      Dados do aluno:
      ${JSON.stringify(studentData, null, 2)}
      
      Forneça:
      1. Uma análise detalhada do comportamento e desempenho do aluno
      2. Recomendações específicas para intervenção educacional
    `;
    
    // Fazer chamada à API da OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em educação que analisa dados de alunos para identificar padrões e recomendar intervenções. Seja específico e forneça recomendações práticas.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1000
      })
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Processar a resposta para extrair a análise e recomendações
    const sections = content.split(/\d+\.\s/);
    const analysis = sections[1]?.trim() || 'Análise não disponível';
    
    // Extrair recomendações (assuma que estão após "Recomendações" ou similar)
    const recommendationsPattern = /Recomenda[çc][õo]es?:?(.*?)(?=\n\n|$)/is;
    const recommendationsMatch = content.match(recommendationsPattern);
    
    let recommendations: string[] = [];
    if (recommendationsMatch && recommendationsMatch[1]) {
      recommendations = recommendationsMatch[1]
        .split(/\n-|\n\*|\n\d+\./)
        .map(item => item.trim())
        .filter(item => item.length > 0);
    } else {
      // Fallback: tente usar a segunda seção como recomendações
      recommendations = [sections[2]?.trim() || 'Recomendações não disponíveis'];
    }
    
    return {
      analysis,
      recommendations
    };
  } catch (error) {
    console.error('Error analyzing student behavior:', error);
    return {
      analysis: `Erro na análise: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
      recommendations: ['Verifique as configurações da API da OpenAI']
    };
  }
};
