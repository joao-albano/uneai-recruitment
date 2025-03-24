
import { v4 as uuidv4 } from 'uuid';
import { WhatsAppMessage } from '@/types/whatsapp';

export const generateDemoMessages = (): WhatsAppMessage[] => {
  return [
    {
      id: uuidv4(),
      studentId: '1',
      studentName: 'Ana Silva',
      parentName: 'Roberto Silva',
      to: '(11) 98765-4321',
      recipientNumber: '(11) 98765-4321',
      message: 'Olá Sr. Roberto, gostaríamos de informar que Ana teve uma melhora significativa em Matemática este mês. Continue incentivando os estudos em casa!',
      status: 'read',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      updatedAt: new Date(Date.now() - 2.9 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '5',
      studentName: 'Elena Costa',
      parentName: 'Fernando Costa',
      to: '(11) 99123-8765',
      recipientNumber: '(11) 99123-8765',
      message: 'Sr. Fernando, notamos que Elena faltou às últimas 3 aulas de Português. Podemos agendar uma reunião para discutir sua frequência?',
      status: 'delivered',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      updatedAt: new Date(Date.now() - 1.8 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '3',
      studentName: 'Carla Oliveira',
      parentName: 'Paulo Oliveira',
      to: '(11) 99876-5432',
      recipientNumber: '(11) 99876-5432',
      message: 'Sr. Paulo, gostaríamos de sua autorização para incluir Carla no programa de reforço escolar às terças e quintas após o horário regular. Por favor, responda sim ou não.',
      status: 'sent',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: uuidv4(),
      studentId: '2',
      studentName: 'Bruno Santos',
      parentName: 'Marta Santos',
      to: '(11) 91234-5678',
      recipientNumber: '(11) 91234-5678',
      message: 'Sra. Marta, lembramos que amanhã teremos reunião de pais e mestres às 18h. Sua presença é muito importante para discutirmos o progresso de Bruno.',
      status: 'read',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      updatedAt: new Date(Date.now() - 3.7 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '7',
      studentName: 'Gabriela Lima',
      parentName: 'Ricardo Lima',
      to: '(11) 96543-2109',
      recipientNumber: '(11) 96543-2109',
      message: 'Sr. Ricardo, a feira de ciências será realizada na próxima sexta-feira. Gabriela está com o projeto bem avançado, mas precisa finalizar alguns detalhes. Pode auxiliá-la?',
      status: 'delivered',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      updatedAt: new Date(Date.now() - 4.8 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '8',
      studentName: 'Henrique Alves',
      parentName: 'Cristina Alves',
      to: '(11) 95432-1098',
      recipientNumber: '(11) 95432-1098',
      message: 'Sra. Cristina, Henrique foi selecionado para representar a escola na Olimpíada de Matemática! Precisamos de sua autorização até amanhã.',
      status: 'failed',
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      updatedAt: new Date(Date.now() - 5.9 * 24 * 60 * 60 * 1000),
      errorMessage: 'Número de telefone inválido ou não disponível'
    },
    {
      id: uuidv4(),
      studentId: '4',
      studentName: 'Daniel Pereira',
      parentName: 'Luisa Pereira',
      to: '(11) 98123-4567',
      recipientNumber: '(11) 98123-4567',
      message: 'Sra. Luisa, parabenizamos Daniel pelo excelente desempenho na avaliação de História. Continue incentivando seu interesse pela disciplina!',
      status: 'read',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      updatedAt: new Date(Date.now() - 6.8 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '1',
      studentName: 'Ana Silva',
      parentName: 'Roberto Silva',
      to: '(11) 98765-4321',
      recipientNumber: '(11) 98765-4321',
      message: 'Sr. Roberto, lembramos que Ana tem uma avaliação de recuperação de Matemática na próxima semana. Por favor, certifique-se de que ela esteja preparada.',
      status: 'delivered',
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 7.9 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '5',
      studentName: 'Elena Costa',
      parentName: 'Fernando Costa',
      to: '(11) 99123-8765',
      recipientNumber: '(11) 99123-8765',
      message: 'Sr. Fernando, Elena está com dificuldades em entregar as tarefas de casa. Podemos conversar sobre como estabelecer uma rotina de estudos?',
      status: 'read',
      createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 8.8 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '6',
      studentName: 'Felipe Martins',
      parentName: 'Joana Martins',
      to: '(11) 97654-3210',
      recipientNumber: '(11) 97654-3210',
      message: 'Sra. Joana, o Felipe tem demonstrado grande talento para música. Sugerimos considerar as aulas extracurriculares de música oferecidas pela escola.',
      status: 'sent',
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    },
    {
      id: uuidv4(),
      studentId: '2',
      studentName: 'Bruno Santos',
      parentName: 'Marta Santos',
      to: '(11) 91234-5678',
      recipientNumber: '(11) 91234-5678',
      message: 'Sra. Marta, Bruno esqueceu seu livro de ciências na escola hoje. Ele precisará dele para a tarefa de casa.',
      status: 'read',
      createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 10.9 * 24 * 60 * 60 * 1000)
    },
    {
      id: uuidv4(),
      studentId: '3',
      studentName: 'Carla Oliveira',
      parentName: 'Paulo Oliveira',
      to: '(11) 99876-5432',
      recipientNumber: '(11) 99876-5432',
      message: 'Sr. Paulo, a apresentação do projeto de ciências da Carla foi excelente! Ela demonstrou grande conhecimento e criatividade.',
      status: 'failed',
      createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 11.9 * 24 * 60 * 60 * 1000),
      errorMessage: 'Falha na entrega da mensagem'
    }
  ];
};
