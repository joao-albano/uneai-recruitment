
import { ProductType, InstitutionType, ExcelFormat, ColumnDefinition } from "./headerTypes";

// Get template column definitions based on product and institution type
export const getTemplateColumns = (
  productType: ProductType = 'retention',
  institutionType: InstitutionType = 'school'
): ColumnDefinition[] => {
  if (productType === 'recruitment') {
    if (institutionType === 'school') {
      return [
        { header: 'nome', description: 'Nome completo do lead', example: 'João da Silva', required: true },
        { header: 'email', description: 'Email do lead', example: 'joao@email.com', required: true, isKeyField: false },
        { header: 'telefone', description: 'Número de telefone do lead', example: '(11) 98765-4321', required: true, isKeyField: false },
        { header: 'ra', description: 'Número de registro/matrícula do aluno', example: '123456', required: true, isKeyField: true },
        { header: 'cpf', description: 'CPF do responsável', example: '123.456.789-00', required: false, isKeyField: false },
        { header: 'canal', description: 'Canal de origem (ex: Facebook, Instagram, Site)', example: 'Facebook', required: true },
        { header: 'serie', description: 'Série/ano pretendido', example: '9º ano', required: false },
        { header: 'quantidade_filhos', description: 'Número de filhos', example: '2', required: false },
        { header: 'nome_filhos', description: 'Nomes dos filhos (separados por vírgula)', example: 'Ana, Pedro', required: false },
        { header: 'idade_filhos', description: 'Idades dos filhos (separadas por vírgula)', example: '7, 10', required: false },
        { header: 'intenção_matrícula', description: 'Nível de intenção de matrícula', example: 'Alta', required: false },
        { header: 'melhor_horario_contato', description: 'Melhor horário para contato', example: 'Manhã', required: false },
        { header: 'observacoes', description: 'Observações gerais', example: 'Interessado no programa bilíngue', required: false }
      ];
    } else {
      return [
        { header: 'nome', description: 'Nome completo do lead', example: 'Maria Oliveira', required: true },
        { header: 'email', description: 'Email do lead', example: 'maria@email.com', required: true, isKeyField: true },
        { header: 'telefone', description: 'Número de telefone do lead', example: '(11) 98765-4321', required: true },
        { header: 'cpf', description: 'CPF do candidato', example: '123.456.789-00', required: false, isKeyField: true },
        { header: 'canal', description: 'Canal de origem (ex: Facebook, Instagram, Site)', example: 'Instagram', required: true },
        { header: 'curso', description: 'Curso de interesse', example: 'Engenharia Civil', required: true },
        { header: 'modalidade', description: 'Modalidade (Presencial, EAD, Híbrido)', example: 'Presencial', required: false },
        { header: 'período', description: 'Período de interesse', example: 'Noturno', required: false },
        { header: 'intenção_matrícula', description: 'Nível de intenção de matrícula', example: 'Média', required: false },
        { header: 'melhor_horario_contato', description: 'Melhor horário para contato', example: 'Tarde', required: false },
        { header: 'observacoes', description: 'Observações gerais', example: 'Interessado em bolsas', required: false }
      ];
    }
  } else {
    if (institutionType === 'school') {
      return [
        { header: 'nome', description: 'Nome completo do aluno', example: 'Carlos Santos', required: true },
        { header: 'registro', description: 'Número de matrícula do aluno', example: '54321', required: true, isKeyField: true },
        { header: 'turma', description: 'Turma do aluno (ex: 9A, 8B)', example: '9A', required: true },
        { header: 'segmento', description: 'Segmento escolar', example: 'ENSINO MÉDIO', required: true },
        { header: 'nota', description: 'Nota média do aluno (de 0 a 10)', example: '7.5', required: false },
        { header: 'frequencia', description: 'Porcentagem de presença (de 0 a 100)', example: '85', required: false },
        { header: 'comportamento', description: 'Avaliação de comportamento (de 0 a 10)', example: '9', required: false },
        { header: 'nome_responsavel', description: 'Nome do responsável pelo aluno', example: 'José Santos', required: false },
        { header: 'contato_responsavel', description: 'Número de telefone do responsável', example: '(11) 99876-5432', required: false }
      ];
    } else {
      return [
        { header: 'nome', description: 'Nome completo do aluno', example: 'Paula Costa', required: true },
        { header: 'registro', description: 'Número de matrícula do aluno', example: '20210015', required: true, isKeyField: false },
        { header: 'cpf', description: 'CPF do aluno', example: '987.654.321-00', required: false, isKeyField: true },
        { header: 'curso', description: 'Curso atual do aluno', example: 'Medicina', required: true },
        { header: 'periodo', description: 'Período de estudo', example: 'Integral', required: true },
        { header: 'semestre', description: 'Semestre atual do aluno', example: '5', required: true },
        { header: 'cr', description: 'Coeficiente de Rendimento (de 0 a 10)', example: '8.7', required: false },
        { header: 'frequencia', description: 'Porcentagem de presença (de 0 a 100)', example: '92', required: false },
        { header: 'email', description: 'Email do aluno', example: 'paula@universidade.edu', required: false, isKeyField: true }
      ];
    }
  }
};

// Get the expected format of the Excel file based on product and institution type
export const getExcelFormat = (
  productType: ProductType = 'retention',
  institutionType: InstitutionType = 'school'
): ExcelFormat => {
  const columns = getTemplateColumns(productType, institutionType);
  const headers = columns.map(col => col.header);
  let description = "";
  
  if (productType === 'recruitment') {
    if (institutionType === 'school') {
      description = 'O arquivo deve conter as colunas: Nome, Email, Telefone, Canal (origem), Série pretendida, ' +
        'Quantidade de Filhos, Nomes dos Filhos, Idades dos Filhos, Intenção de Matrícula, ' +
        'Melhor Horário para Contato, e Observações.';
    } else {
      description = 'O arquivo deve conter as colunas: Nome, Email, Telefone, CPF, Canal (origem), ' +
        'Curso de interesse, Modalidade (presencial/EAD), Período, Campus, Intenção de Matrícula, ' +
        'Melhor Horário para Contato, e Observações.';
    }
  } else {
    if (institutionType === 'school') {
      description = 'O arquivo deve conter as colunas: Nome, Registro (número de matrícula), Turma, ' +
        'Segmento (Ensino Médio, Fundamental I, etc.), Nota (0-10), Frequência (0-100), Comportamento (0-10), ' +
        'Nome do Responsável, e Contato do Responsável (formato (99) 99999-9999)';
    } else {
      description = 'O arquivo deve conter as colunas: Nome, Registro (número de matrícula), CPF, ' +
        'Curso, Período (matutino/vespertino/noturno), Semestre atual, CR (coeficiente de rendimento), ' +
        'Frequência (0-100), Disciplinas Pendentes, e Email do aluno.';
    }
  }
  
  return { headers, description };
};
