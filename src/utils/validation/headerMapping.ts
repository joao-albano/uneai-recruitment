
import { HeaderMap } from "./types";
import { HeaderMapping } from "./headerTypes";

// Define header mappings
export const headerMappings: HeaderMapping = {
  // Student headers (basic education)
  'nome': 'name',
  'registro': 'registrationNumber',
  'matricula': 'registrationNumber',
  'ra': 'registrationNumber',
  'turma': 'class',
  'segmento': 'segment',
  'nota': 'grade',
  'frequencia': 'attendance',
  'comportamento': 'behavior',
  'nome_responsavel': 'parentName',
  'contato_responsavel': 'parentContact',
  
  // Portuguese headers - alternative formats with underscores and capitalization
  'nome responsavel': 'parentName',
  'contato responsavel': 'parentContact',
  'nome_responsável': 'parentName',
  'contato_responsável': 'parentContact',
  'nome responsável': 'parentName',
  'contato responsável': 'parentContact',
  
  // Format with capitalization that matches the CSV
  'Nome_Responsavel': 'parentName', 
  'Contato_Responsavel': 'parentContact',
  'Registro': 'registrationNumber',
  'Matricula': 'registrationNumber',
  'Segmento': 'segment',
  'Comportamento': 'behavior',
  
  // English headers (fallback)
  'name': 'name',
  'registration': 'registrationNumber',
  'registration_number': 'registrationNumber',
  'class': 'class',
  'segment': 'segment',
  'grade': 'grade',
  'attendance': 'attendance',
  'behavior': 'behavior',
  'parent_name': 'parentName',
  'parent_contact': 'parentContact',
  
  // Lead headers (recruitment)
  'email': 'email',
  'telefone': 'phone',
  'phone': 'phone',
  'canal': 'channel',
  'curso': 'course',
  'serie': 'grade',
  'etapa': 'stage',
  'status': 'status',
  'data_contato': 'contactDate',
  'responsavel': 'responsible',
  'responsavel_atendimento': 'responsible',
  'filhos': 'children',
  'quantidade_filhos': 'children',
  'nome_filhos': 'childrenNames',
  'idade_filhos': 'childrenAges',
  'observacoes': 'observations',
  'obs': 'observations',
  'intenção_matrícula': 'enrollmentIntention',
  'intenção_matricula': 'enrollmentIntention',
  'intencao_matricula': 'enrollmentIntention',
  'melhor_horario_contato': 'contactTime',
  'horario_contato': 'contactTime',
  'cpf': 'cpf',
  'modalidade': 'modality',
  'período': 'period',
  'periodo': 'period',
  'campus': 'campus',
  
  // University student headers
  'cr': 'gradePoint',
  'semestre': 'semester',
  'disciplinas_pendentes': 'pendingCourses'
};

// Function to convert Excel column headers to our expected property names
export const mapHeadersToProperties = (headers: string[]): HeaderMap => {
  return headers.reduce((acc, header, index) => {
    const normalizedHeader = header.trim();
    // Try exact match first
    if (headerMappings[normalizedHeader]) {
      acc[index] = headerMappings[normalizedHeader];
    } else {
      // Try case-insensitive match
      const lowerHeader = normalizedHeader.toLowerCase();
      if (headerMappings[lowerHeader]) {
        acc[index] = headerMappings[lowerHeader];
      }
    }
    return acc;
  }, {} as Record<string, string>);
};
