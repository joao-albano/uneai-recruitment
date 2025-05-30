export type LeadStatus = 
  'novo' 
  | 'contatado' 
  | 'interessado' 
  | 'nao_interessado' 
  | 'agendado' 
  | 'matriculado' 
  | 'desistente'
  | 'quente'      // Added
  | 'convertido'  // Added
  | 'perdido';    // Added

export type ChannelType = 'site' | 'facebook' | 'instagram' | 'whatsapp' | 'indicacao' | 'google' | 'eventos' | 'presencial' | 'mail' | 'sms' | 'voice' | 'outros';

export type EmotionType = 'neutro' | 'positivo' | 'negativo' | 'confuso' | 'interessado' | 'hesitante' | 'entusiasmado';

export type IntentType = 
  | 'informacao_curso' 
  | 'informacao_preco' 
  | 'agendar_visita' 
  | 'solicitar_bolsa' 
  | 'reclamacao' 
  | 'elogio'
  | 'duvida_processo'
  | 'informacao_turno'
  | 'informacao_modalidade'
  | 'comparacao_concorrente'
  | 'desistencia'
  | 'outra';

export type ObjectionType = 
  | 'preco_alto' 
  | 'distancia' 
  | 'horario_incompativel' 
  | 'falta_informacao' 
  | 'concorrente_melhor' 
  | 'aguardando_decisao'
  | 'estrutura'
  | 'reputacao'
  | 'nenhuma';
