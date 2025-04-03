import { Alert } from '@/types/alert';

export const getAlertTitle = (alert: Alert): string => {
  switch(alert.type) {
    case 'lead-opportunity':
      return `Nova oportunidade: ${alert.studentName}`;
    case 'stage-change':
      return `Mudança de estágio: ${alert.studentName}`;
    case 'campaign-performance':
      return 'Performance de campanha';
    case 'lead-assigned':
      return `Lead designado: ${alert.studentName}`;
    case 'high-risk':
      return `Aluno em risco: ${alert.studentName}`;
    case 'medium-risk':
      return `Atenção necessária: ${alert.studentName}`;
    case 'low-risk':
      return `Acompanhamento: ${alert.studentName}`;
    case 'info':
      return 'Informação importante';
    case 'error':
      return 'Erro do sistema';
    case 'survey-requested':
      return `Pesquisa solicitada: ${alert.studentName}`;
    case 'meeting-scheduled':
      return `Reunião agendada: ${alert.studentName}`;
    case 'appointment-reminder':
      return `Lembrete de compromisso: ${alert.studentName}`;
    default:
      return alert.studentName || 'Alerta do sistema';
  }
};

export const getDefaultAlertMessage = (alert: Alert): string => {
  switch(alert.type) {
    case 'lead-opportunity':
      return `Detectado interesse de ${alert.studentName} com alta probabilidade de conversão`;
    case 'stage-change':
      return `${alert.studentName} teve uma mudança no estágio no funil de captação`;
    case 'campaign-performance':
      return 'Uma campanha está performando acima do esperado';
    case 'lead-assigned':
      return `${alert.studentName} foi designado para você acompanhar`;
    case 'high-risk':
      return `${alert.studentName} apresenta alto risco de evasão`;
    case 'medium-risk':
      return `${alert.studentName} requer atenção para evitar problemas futuros`;
    case 'low-risk':
      return `${alert.studentName} apresenta indicadores que merecem acompanhamento`;
    case 'info':
      return 'Informação relevante para o processo';
    case 'error':
      return 'Ocorreu um erro no sistema que requer atenção';
    case 'survey-requested':
      return `Uma nova pesquisa foi solicitada para ${alert.studentName}`;
    case 'meeting-scheduled':
      return `Uma reunião foi agendada com ${alert.studentName}`;
    case 'appointment-reminder':
      return `Lembrete de compromisso com ${alert.studentName}`;
    default:
      return 'Alerta do sistema';
  }
};

export const filterRecruitmentAlerts = (alerts: Alert[], searchTerm: string) => {
  const recruitmentAlertTypes = ['lead-opportunity', 'stage-change', 'campaign-performance', 'lead-assigned'];
  
  return alerts.filter(alert => {
    const isRecruitmentAlert = 
      recruitmentAlertTypes.includes(alert.type) || 
      ['info', 'error'].includes(alert.type);
    
    const matchesSearch = 
      (alert.studentName && alert.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alert.message && alert.message.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return isRecruitmentAlert && matchesSearch;
  });
};

export const filterRetentionAlerts = (alerts: Alert[], searchTerm: string) => {
  const retentionAlertTypes = ['high-risk', 'medium-risk', 'low-risk', 'survey-requested', 'meeting-scheduled', 'appointment-reminder'];
  
  return alerts.filter(alert => {
    const isRetentionAlert = 
      retentionAlertTypes.includes(alert.type) || 
      ['info', 'error'].includes(alert.type);
    
    const matchesSearch = 
      (alert.studentName && alert.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (alert.message && alert.message.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return isRetentionAlert && matchesSearch;
  });
};
