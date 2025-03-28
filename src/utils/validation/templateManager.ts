
import * as FileSaver from 'file-saver';
import { ProductType } from '@/context/product/types';

interface TemplateColumn {
  header: string;
  required: boolean;
  example: string;
}

// Templates específicos por produto
const templates = {
  retention: [
    { header: 'nome', required: true, example: 'João Silva' },
    { header: 'registro', required: true, example: '123456' },
    { header: 'turma', required: true, example: '9A' },
    { header: 'segmento', required: true, example: 'ENSINO MÉDIO' },
    { header: 'nota', required: false, example: '7.5' },
    { header: 'frequencia', required: false, example: '85' },
    { header: 'comportamento', required: false, example: '8' },
    { header: 'nome_responsavel', required: false, example: 'Maria da Silva' },
    { header: 'contato_responsavel', required: false, example: '(11) 98765-4321' }
  ],
  recruitment: [
    { header: 'nome', required: true, example: 'Ana Carolina' },
    { header: 'email', required: true, example: 'ana@email.com' },
    { header: 'telefone', required: true, example: '(11) 98765-4321' },
    { header: 'canal', required: true, example: 'Instagram' },
    { header: 'curso', required: false, example: 'Engenharia' },
    { header: 'serie', required: false, example: '1º Ano' },
    { header: 'etapa', required: false, example: 'Contato Inicial' },
    { header: 'status', required: false, example: 'Interessado' },
    { header: 'data_contato', required: false, example: '01/06/2023' },
    { header: 'responsavel', required: false, example: 'Carlos Santos' },
    { header: 'filhos', required: false, example: '2' },
    { header: 'observacoes', required: false, example: 'Interessado em bolsa de estudos' }
  ]
};

// Função para gerar o conteúdo CSV do template
const generateTemplateContent = (productType: ProductType = 'retention'): string => {
  // Seleciona o template adequado para o produto, com fallback para retenção
  const templateColumns = templates[productType] || templates.retention;
  
  // Cria o cabeçalho
  const headers = templateColumns.map(col => col.header);
  
  // Cria a linha de exemplo
  const exampleRow = templateColumns.map(col => col.example);
  
  // Combina as linhas em um CSV
  return [headers.join(','), exampleRow.join(',')].join('\n');
};

// Função principal para download do template
export const downloadTemplate = (productType: ProductType = 'retention'): void => {
  const fileContent = generateTemplateContent(productType);
  const fileName = `${productType === 'recruitment' ? 'leads' : 'alunos'}_template.csv`;
  
  // Cria um blob com o conteúdo CSV
  const blob = new Blob([fileContent], { type: 'text/csv;charset=utf-8' });
  
  // Faz o download do arquivo
  FileSaver.saveAs(blob, fileName);
};

// Exporta o formato do template para uso em validações
export const getTemplateFormat = (productType: ProductType = 'retention'): TemplateColumn[] => {
  return templates[productType] || templates.retention;
};
