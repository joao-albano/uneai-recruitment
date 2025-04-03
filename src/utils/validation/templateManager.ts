
import * as FileSaver from 'file-saver';
import { ProductType } from '@/context/product/types';

export type InstitutionType = 'school' | 'university';
export type KeyFieldType = 'email' | 'phone' | 'registration' | 'cpf';

interface TemplateColumn {
  header: string;
  required: boolean;
  example: string;
  description: string;
  isKeyField?: boolean; // Mark if this column can be used as a unique key
}

// Templates específicos por produto e tipo de instituição
const templates: Record<ProductType, Record<InstitutionType, TemplateColumn[]>> = {
  recruitment: {
    // Template para escolas (educação básica)
    school: [
      { header: 'nome', required: true, example: 'Ana Carolina', description: 'Nome completo do lead' },
      { header: 'email', required: true, example: 'ana@email.com', description: 'Email para contato', isKeyField: true },
      { header: 'telefone', required: true, example: '(11) 98765-4321', description: 'Telefone para contato', isKeyField: true },
      { header: 'ra', required: false, example: '123456', description: 'Número de registro/matrícula do aluno', isKeyField: true },
      { header: 'cpf', required: false, example: '123.456.789-10', description: 'CPF do responsável', isKeyField: true },
      { header: 'canal', required: true, example: 'Instagram', description: 'Canal de origem (ex: Facebook, Instagram, Site)' },
      { header: 'serie', required: false, example: '1º Ano', description: 'Série/ano pretendido' },
      { header: 'etapa', required: false, example: 'Contato Inicial', description: 'Etapa atual no funil de captação' },
      { header: 'status', required: false, example: 'Interessado', description: 'Status atual do lead' },
      { header: 'data_contato', required: false, example: '01/06/2023', description: 'Data do último contato (formato DD/MM/AAAA)' },
      { header: 'responsavel_atendimento', required: false, example: 'Carlos Santos', description: 'Pessoa responsável pelo lead' },
      { header: 'quantidade_filhos', required: false, example: '2', description: 'Número de filhos' },
      { header: 'nome_filhos', required: false, example: 'Maria, João', description: 'Nomes dos filhos (separados por vírgula)' },
      { header: 'idade_filhos', required: false, example: '10, 8', description: 'Idades dos filhos (separados por vírgula)' },
      { header: 'intenção_matrícula', required: false, example: 'Alta', description: 'Nível de intenção de matrícula' },
      { header: 'melhor_horario_contato', required: false, example: 'Manhã', description: 'Melhor horário para contato' },
      { header: 'observacoes', required: false, example: 'Interessado em bolsa de estudos', description: 'Observações adicionais' }
    ],
    // Template para IES (ensino superior)
    university: [
      { header: 'nome', required: true, example: 'Carlos Oliveira', description: 'Nome completo do lead' },
      { header: 'email', required: true, example: 'carlos@email.com', description: 'Email para contato', isKeyField: true },
      { header: 'telefone', required: true, example: '(11) 98765-4321', description: 'Telefone para contato', isKeyField: true },
      { header: 'cpf', required: false, example: '123.456.789-10', description: 'CPF do candidato', isKeyField: true },
      { header: 'canal', required: true, example: 'Site', description: 'Canal de origem (ex: Facebook, Instagram, Site)' },
      { header: 'curso', required: true, example: 'Engenharia', description: 'Curso de interesse' },
      { header: 'modalidade', required: false, example: 'Presencial', description: 'Modalidade (Presencial, EAD, Híbrido)' },
      { header: 'período', required: false, example: 'Noturno', description: 'Período de interesse (Matutino, Vespertino, Noturno, Integral)' },
      { header: 'campus', required: false, example: 'Campus Central', description: 'Campus de interesse' },
      { header: 'etapa', required: false, example: 'Contato Inicial', description: 'Etapa atual no funil de captação' },
      { header: 'status', required: false, example: 'Interessado', description: 'Status atual do lead' },
      { header: 'data_contato', required: false, example: '01/06/2023', description: 'Data do último contato (formato DD/MM/AAAA)' },
      { header: 'responsavel_atendimento', required: false, example: 'Mariana Silva', description: 'Pessoa responsável pelo lead' },
      { header: 'intenção_matrícula', required: false, example: 'Alta', description: 'Nível de intenção de matrícula' },
      { header: 'melhor_horario_contato', required: false, example: 'Tarde', description: 'Melhor horário para contato' },
      { header: 'observacoes', required: false, example: 'Interessado em bolsa de estudos', description: 'Observações adicionais' }
    ]
  },
  retention: {
    // Template para escolas (educação básica)
    school: [
      { header: 'nome', required: true, example: 'João Silva', description: 'Nome completo do aluno' },
      { header: 'registro', required: true, example: '123456', description: 'Número de matrícula do aluno', isKeyField: true },
      { header: 'turma', required: true, example: '9A', description: 'Turma do aluno (ex: 9A, 8B)' },
      { header: 'segmento', required: true, example: 'ENSINO MÉDIO', description: 'Segmento escolar (ENSINO MÉDIO, FUNDAMENTAL I, etc.)' },
      { header: 'nota', required: false, example: '7.5', description: 'Nota média do aluno (de 0 a 10)' },
      { header: 'frequencia', required: false, example: '85', description: 'Porcentagem de presença (de 0 a 100)' },
      { header: 'comportamento', required: false, example: '8', description: 'Comportamento do aluno (de 0 a 10)' },
      { header: 'nome_responsavel', required: false, example: 'Maria da Silva', description: 'Nome do responsável pelo aluno' },
      { header: 'contato_responsavel', required: false, example: '(11) 98765-4321', description: 'Telefone do responsável no formato (XX) XXXXX-XXXX' }
    ],
    // Template para IES (ensino superior)
    university: [
      { header: 'nome', required: true, example: 'Ana Pereira', description: 'Nome completo do aluno' },
      { header: 'registro', required: true, example: '20230123', description: 'Número de matrícula do aluno', isKeyField: true },
      { header: 'cpf', required: false, example: '123.456.789-10', description: 'CPF do aluno', isKeyField: true },
      { header: 'curso', required: true, example: 'Administração', description: 'Curso atual do aluno' },
      { header: 'periodo', required: true, example: 'Noturno', description: 'Período de estudo (Manhã, Tarde, Noite)' },
      { header: 'semestre', required: true, example: '3', description: 'Semestre atual do aluno' },
      { header: 'cr', required: false, example: '8.5', description: 'Coeficiente de Rendimento (de 0 a 10)' },
      { header: 'frequencia', required: false, example: '85', description: 'Porcentagem de presença (de 0 a 100)' },
      { header: 'disciplinas_pendentes', required: false, example: '2', description: 'Número de disciplinas pendentes' },
      { header: 'contato', required: false, example: '(11) 98765-4321', description: 'Telefone para contato', isKeyField: true },
      { header: 'email', required: false, example: 'ana@email.com', description: 'Email do aluno', isKeyField: true },
      { header: 'observacoes', required: false, example: 'Aluno com dificuldade em cálculo', description: 'Observações adicionais' }
    ]
  }
};

// Função para gerar o conteúdo CSV do template
export const generateTemplateContent = (
  productType: ProductType = 'retention',
  institutionType: InstitutionType = 'school'
): string => {
  // Seleciona o template adequado para o produto e tipo de instituição
  const templateColumns = templates[productType][institutionType];
  
  // Cria o cabeçalho
  const headers = templateColumns.map(col => col.header);
  
  // Cria a linha de exemplo
  const exampleRow = templateColumns.map(col => col.example);
  
  // Combina as linhas em um CSV
  return [headers.join(','), exampleRow.join(',')].join('\n');
};

// Função principal para download do template
export const downloadTemplate = (
  productType: ProductType = 'retention',
  institutionType: InstitutionType = 'school'
): void => {
  const fileContent = generateTemplateContent(productType, institutionType);
  const fileName = `${productType === 'recruitment' ? 'leads' : 'alunos'}_${institutionType}_template.csv`;
  
  // Cria um blob com o conteúdo CSV
  const blob = new Blob([fileContent], { type: 'text/csv;charset=utf-8' });
  
  // Faz o download do arquivo
  FileSaver.saveAs(blob, fileName);
};

// Exporta o formato do template para uso em validações
export const getTemplateFormat = (
  productType: ProductType = 'retention',
  institutionType: InstitutionType = 'school'
): TemplateColumn[] => {
  return templates[productType][institutionType] || templates.retention.school;
};

// Retorna os campos que podem ser usados como chaves (campos únicos)
export const getKeyFields = (
  productType: ProductType = 'retention',
  institutionType: InstitutionType = 'school'
): TemplateColumn[] => {
  return templates[productType][institutionType].filter(col => col.isKeyField === true);
};

