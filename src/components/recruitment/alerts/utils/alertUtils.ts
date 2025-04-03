
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
    default:
      return alert.studentName;
  }
};

export const getDefaultAlertMessage = (alert: Alert): string => {
  switch(alert.type) {
    case 'lead-opportunity':
      return `Detectado interesse de ${alert.studentName} com alta probabilidade de conversão`;
    case 'stage-change':
      return `${alert.studentName} avançou para uma nova etapa do funil de captação`;
    case 'campaign-performance':
      return 'Uma campanha está performando acima do esperado';
    case 'lead-assigned':
      return `${alert.studentName} foi designado para você acompanhar`;
    default:
      return 'Alerta do sistema';
  }
};

export const filterRecruitmentAlerts = (alerts: Alert[], searchTerm: string) => {
  // Filter alerts relevant to recruitment
  const recruitmentAlertTypes = ['lead-opportunity', 'stage-change', 'campaign-performance', 'lead-assigned'];
  
  return alerts.filter(alert => {
    // Include alerts of recruitment specific types or general alerts like 'info' or 'error'
    const isRecruitmentAlert = recruitmentAlertTypes.includes(alert.type) || ['info', 'error'].includes(alert.type);
    
    const matchesSearch = 
      alert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alert.message && alert.message.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return isRecruitmentAlert && matchesSearch;
  });
};
