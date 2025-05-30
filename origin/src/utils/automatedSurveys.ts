
import { StudentData, AlertItem } from '@/types/data';
import { calculateRiskLevel } from './riskCalculator';
import { sendWhatsAppSurvey } from './notifications';
import { WhatsAppConfig } from './whatsappIntegration';
import { WhatsAppMessage } from '@/types/whatsapp';

// Threshold de risco para envio automático de pesquisas
const HIGH_RISK_THRESHOLD = 'high';
const DAYS_BEFORE_RESEND = 14; // Evita reenvio frequente para o mesmo aluno

// Registro de envios para evitar duplicação
let lastSentSurveys: Record<string, Date> = {};

// Carrega o histórico de envios do localStorage para persistência
const loadSentHistory = (): void => {
  try {
    const saved = localStorage.getItem('lastSentAutoSurveys');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Converte strings de data de volta para objetos Date
      Object.keys(parsed).forEach(key => {
        parsed[key] = new Date(parsed[key]);
      });
      lastSentSurveys = parsed;
    }
  } catch (error) {
    console.error('Erro ao carregar histórico de envios automáticos:', error);
  }
};

// Salva histórico de envios no localStorage
const saveSentHistory = (): void => {
  try {
    localStorage.setItem('lastSentAutoSurveys', JSON.stringify(lastSentSurveys));
  } catch (error) {
    console.error('Erro ao salvar histórico de envios automáticos:', error);
  }
};

// Verifica quais alunos necessitam de envio automático de pesquisa
export const processStudentsForAutomatedSurveys = (
  students: StudentData[],
  addAlert: (alert: AlertItem) => void,
  addWhatsAppMessage: (message: WhatsAppMessage) => void,
  whatsAppConfig: WhatsAppConfig
): void => {
  // Carrega histórico de envios anteriores
  loadSentHistory();
  
  // Filtra os alunos que precisam de envio de pesquisa
  const studentsForSurvey = students.filter(student => {
    // Verifica se o aluno tem alto risco
    const { riskLevel } = calculateRiskLevel(student);
    
    // Verifica se tem contato do responsável
    const hasParentContact = !!student.parentContact;
    
    // Verifica se já enviou pesquisa recentemente
    const lastSent = lastSentSurveys[student.id];
    const canSendAgain = !lastSent || 
      (new Date().getTime() - lastSent.getTime()) > (DAYS_BEFORE_RESEND * 24 * 60 * 60 * 1000);
    
    return riskLevel === HIGH_RISK_THRESHOLD && hasParentContact && canSendAgain;
  });
  
  // Envia pesquisas e registra
  studentsForSurvey.forEach(student => {
    // Registra o envio para evitar duplicação
    lastSentSurveys[student.id] = new Date();
    
    // Envia a pesquisa via WhatsApp
    sendWhatsAppSurvey(student, addAlert, addWhatsAppMessage, whatsAppConfig);
    
    // Adiciona alerta específico de envio automatizado pela IA
    addAlert({
      id: `auto-survey-${Date.now()}-${student.id}`,
      studentId: student.id,
      studentName: student.name,
      studentClass: student.class,
      type: 'high-risk',
      message: `A IA enviou automaticamente uma pesquisa via WhatsApp para ${student.parentName} devido ao alto risco de evasão detectado.`,
      createdAt: new Date(),
      read: false,
      actionTaken: false,
    });
  });
  
  // Salva histórico atualizado
  saveSentHistory();
  
  // Registra na console quantas pesquisas foram enviadas
  if (studentsForSurvey.length > 0) {
    console.log(`A IA enviou automaticamente ${studentsForSurvey.length} pesquisas para alunos de alto risco.`);
  }
};
