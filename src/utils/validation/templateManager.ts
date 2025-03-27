
import { getExcelFormat } from "./headerValidator";

// Function to download a template file
export const downloadTemplate = (): void => {
  const { headers } = getExcelFormat();
  
  // Create CSV content with proper UTF-8 encoding
  const csvContent = [
    // Headers row
    headers.join(','),
    // Example row with properly encoded text
    'João da Silva,12345,9A,ENSINO MÉDIO,7.5,85,8,"Maria da Silva","(11) 98765-4321"',
    // Empty row for user to fill - with proper labels
    'Nome do Aluno,Número de Matrícula,Turma,ENSINO MÉDIO,0.0,0,0,"Nome do Responsável","(99) 99999-9999"'
  ].join('\n');

  // Create a blob from the CSV content with UTF-8 encoding explicitly set
  const blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', 'modelo_alunos.csv');
  link.style.visibility = 'hidden';
  
  // Add to document, trigger download, and clean up
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
