
import { HeaderMap } from "./types";

// Function to convert Excel column headers to our expected property names
export const mapHeadersToProperties = (headers: string[]): HeaderMap => {
  const headerMap: Record<string, string> = {
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

  return headers.reduce((acc, header, index) => {
    const normalizedHeader = header.trim();
    // Try exact match first
    if (headerMap[normalizedHeader]) {
      acc[index] = headerMap[normalizedHeader];
    } else {
      // Try case-insensitive match
      const lowerHeader = normalizedHeader.toLowerCase();
      if (headerMap[lowerHeader]) {
        acc[index] = headerMap[lowerHeader];
      }
    }
    return acc;
  }, {} as Record<string, string>);
};

// Get required headers based on product type and institution type
export const getRequiredHeaders = (
  productType: 'retention' | 'recruitment' = 'retention', 
  institutionType: 'school' | 'university' = 'school'
): string[] => {
  if (productType === 'recruitment') {
    if (institutionType === 'school') {
      return ['nome', 'email', 'telefone', 'canal'];
    } else {
      return ['nome', 'email', 'telefone', 'canal', 'curso'];
    }
  } else {
    if (institutionType === 'school') {
      return ['nome', 'registro', 'turma', 'segmento'];
    } else {
      return ['nome', 'registro', 'curso', 'periodo', 'semestre'];
    }
  }
};

// Header validation function
export const validateHeaders = (
  headers: string[], 
  productType: 'retention' | 'recruitment' = 'retention',
  institutionType: 'school' | 'university' = 'school'
): boolean => {
  const requiredHeaders = getRequiredHeaders(productType, institutionType);
  
  // Create a more flexible header matching approach
  const normalizedHeaders = headers.map(h => h.toLowerCase().trim());
  
  return requiredHeaders.every(required => {
    // Check standard forms
    if (normalizedHeaders.includes(required)) return true;
    
    // Special case for 'registro' - also accept 'matricula' or 'ra'
    if (required === 'registro' && 
        (normalizedHeaders.includes('matricula') || normalizedHeaders.includes('ra'))) 
      return true;
    
    // Check English equivalents
    const englishEquivalent = 
      required === 'nome' ? 'name' :
      required === 'registro' ? 'registration' :
      required === 'turma' ? 'class' :
      required === 'segmento' ? 'segment' :
      required === 'nota' ? 'grade' :
      required === 'frequencia' ? 'attendance' :
      required === 'comportamento' ? 'behavior' :
      required === 'telefone' ? 'phone' :
      required === 'curso' ? 'course' :
      required === 'periodo' ? 'period' :
      required === 'canal' ? 'channel' :
      required;
    
    if (normalizedHeaders.includes(englishEquivalent)) return true;
    
    // Check capitalized versions
    const capitalizedVersion = required.charAt(0).toUpperCase() + required.slice(1);
    return normalizedHeaders.includes(capitalizedVersion);
  });
};

// Get the expected format of the Excel file based on product and institution type
export const getExcelFormat = (
  productType: 'retention' | 'recruitment' = 'retention',
  institutionType: 'school' | 'university' = 'school'
): { headers: string[]; description: string } => {
  if (productType === 'recruitment') {
    if (institutionType === 'school') {
      return {
        headers: [
          'Nome', 'Email', 'Telefone', 'Canal', 'Serie', 'Quantidade_Filhos',
          'Nome_Filhos', 'Idade_Filhos', 'Intenção_Matrícula', 'Melhor_Horario_Contato', 'Observacoes'
        ],
        description: 'O arquivo deve conter as colunas: Nome, Email, Telefone, Canal (origem), Série pretendida, ' +
          'Quantidade de Filhos, Nomes dos Filhos, Idades dos Filhos, Intenção de Matrícula, ' +
          'Melhor Horário para Contato, e Observações.'
      };
    } else {
      return {
        headers: [
          'Nome', 'Email', 'Telefone', 'CPF', 'Canal', 'Curso', 'Modalidade', 
          'Período', 'Campus', 'Intenção_Matrícula', 'Melhor_Horario_Contato', 'Observacoes'
        ],
        description: 'O arquivo deve conter as colunas: Nome, Email, Telefone, CPF, Canal (origem), ' +
          'Curso de interesse, Modalidade (presencial/EAD), Período, Campus, Intenção de Matrícula, ' +
          'Melhor Horário para Contato, e Observações.'
      };
    }
  } else {
    if (institutionType === 'school') {
      return {
        headers: [
          'Nome', 'Registro', 'Turma', 'Segmento', 'Nota', 'Frequencia', 'Comportamento',
          'Nome_Responsavel', 'Contato_Responsavel'
        ],
        description: 'O arquivo deve conter as colunas: Nome, Registro (número de matrícula), Turma, ' +
          'Segmento (Ensino Médio, Fundamental I, etc.), Nota (0-10), Frequência (0-100), Comportamento (0-10), ' +
          'Nome do Responsável, e Contato do Responsável (formato (99) 99999-9999)'
      };
    } else {
      return {
        headers: [
          'Nome', 'Registro', 'CPF', 'Curso', 'Periodo', 'Semestre', 'CR', 
          'Frequencia', 'Disciplinas_Pendentes', 'Email'
        ],
        description: 'O arquivo deve conter as colunas: Nome, Registro (número de matrícula), CPF, ' +
          'Curso, Período (matutino/vespertino/noturno), Semestre atual, CR (coeficiente de rendimento), ' +
          'Frequência (0-100), Disciplinas Pendentes, e Email do aluno.'
      };
    }
  }
};
