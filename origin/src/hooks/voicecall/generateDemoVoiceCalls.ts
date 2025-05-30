
import { VoiceCall } from '@/types/voicecall';
import { v4 as uuidv4 } from 'uuid';

// Generate random call durations between 30 and 600 seconds
const getRandomDuration = () => {
  return Math.floor(Math.random() * 570) + 30;
};

// Generate random date in the past 30 days
const getRandomDate = () => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const randomTime = thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime());
  return new Date(randomTime);
};

// Get random status
const getRandomStatus = (): 'completed' | 'failed' | 'no-answer' | 'in-progress' => {
  const statuses: ('completed' | 'failed' | 'no-answer' | 'in-progress')[] = [
    'completed', 'completed', 'completed', 'failed', 'no-answer', 'in-progress'
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

export const generateDemoVoiceCalls = (): VoiceCall[] => {
  const demoStudents = [
    { id: 'student1', name: 'Ana Silva', parentName: 'Carlos Silva', parentContact: '11987654321' },
    { id: 'student2', name: 'Bruno Oliveira', parentName: 'Patrícia Oliveira', parentContact: '11976543210' },
    { id: 'student3', name: 'Carla Souza', parentName: 'Marcos Souza', parentContact: '11965432109' },
    { id: 'student4', name: 'Diego Santos', parentName: 'Cláudia Santos', parentContact: '11954321098' },
    { id: 'student5', name: 'Elena Costa', parentName: 'Ricardo Costa', parentContact: '11943210987' }
  ];

  const sampleTranscriptions = [
    "Olá, bom dia! Estou ligando para fazer uma breve pesquisa sobre o desempenho escolar de seu filho. Você poderia responder algumas perguntas rápidas?",
    "Bom dia, é da escola. Estamos fazendo uma pesquisa para entender melhor como podemos apoiar os alunos. Você teria um tempinho para responder algumas perguntas?",
    "Olá, estou entrando em contato para fazer algumas perguntas sobre a experiência do seu filho na escola. Esta pesquisa nos ajudará a melhorar nossos serviços educacionais.",
    "Boa tarde! Sou assistente da escola e estamos realizando uma pesquisa com os pais. Você poderia responder algumas perguntas sobre o ambiente escolar do seu filho?",
    "Olá! Estamos realizando uma pesquisa para avaliar a satisfação dos pais com a nossa escola. Você teria alguns minutos para responder algumas perguntas?"
  ];

  const sampleSummaries = [
    "Pai relatou que o aluno está enfrentando dificuldades em matemática mas está se adaptando bem socialmente.",
    "Mãe expressou preocupação com bullying e solicitou reunião com coordenador.",
    "Responsável informou que o aluno mudou recentemente de casa, o que pode estar afetando seu desempenho.",
    "Aluno tem apresentado bom desempenho, mas responsável mencionou dificuldades com transporte escolar.",
    "Pai informou que aluno está enfrentando problemas de saúde que podem estar impactando assiduidade."
  ];

  return Array.from({ length: 20 }, (_, index) => {
    const studentIndex = index % demoStudents.length;
    const student = demoStudents[studentIndex];
    const status = getRandomStatus();
    const createdAt = getRandomDate();
    
    // Only set duration for completed calls
    const duration = status === 'completed' ? getRandomDuration() : null;
    
    // Only set transcription and summary for completed calls
    const transcription = status === 'completed' 
      ? sampleTranscriptions[Math.floor(Math.random() * sampleTranscriptions.length)]
      : null;
      
    const summary = status === 'completed'
      ? sampleSummaries[Math.floor(Math.random() * sampleSummaries.length)]
      : null;
    
    return {
      id: uuidv4(),
      studentId: student.id,
      studentName: student.name,
      parentName: student.parentName,
      recipientNumber: student.parentContact,
      status,
      createdAt,
      duration,
      transcription,
      summary,
      // Answered time only for completed or in-progress calls
      answeredAt: (status === 'completed' || status === 'in-progress') 
        ? new Date(createdAt.getTime() + Math.random() * 20000) // 0-20 seconds after creation
        : null,
      // End time only for completed calls
      endedAt: status === 'completed' 
        ? new Date(createdAt.getTime() + (duration || 0) * 1000) 
        : null
    };
  });
};
