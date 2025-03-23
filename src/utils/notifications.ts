
import { StudentData, AlertItem } from '../types/data';

export const sendWhatsAppSurvey = (
  student: StudentData,
  addAlert: (alert: AlertItem) => void
): void => {
  if (!student || !student.parentContact) return;
  
  const message = `Olá ${student.parentName}, gostaríamos de fazer uma pesquisa sobre ${student.name}. Por favor, responda as seguintes perguntas:
  1. A família mudou de residência nos últimos 6 meses?
  2. O aluno relatou episódios de bullying ou tratamento inadequado?
  3. Como você avalia a integração social do aluno na escola? (1-5)
  4. Com que frequência o aluno enfrenta dificuldades para chegar à escola?
  5. Alguma observação adicional?`;
  
  console.log(`Simulando envio de WhatsApp para ${student.parentName}: ${student.parentContact}`);
  console.log(message);
  
  addAlert({
    id: `whatsapp-${Date.now()}`,
    studentId: student.id,
    studentName: student.name,
    studentClass: student.class,
    type: 'survey-requested',
    message: `Pesquisa diagnóstica enviada via WhatsApp para ${student.parentName} (${student.parentContact}).`,
    createdAt: new Date(),
    read: false,
    actionTaken: false,
  });
  
  setTimeout(() => {
    console.log(`Simulação: ${student.parentName} visualizou a mensagem.`);
  }, 3000);
};
