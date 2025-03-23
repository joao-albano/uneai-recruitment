
import { getExcelFormat } from "./headerValidator";

// Function to download a template file
export const downloadTemplate = (): void => {
  const { headers } = getExcelFormat();
  
  // Create CSV content
  const csvContent = [
    // Headers row
    headers.join(','),
    // Example row
    'João da Silva,9A,7.5,85,4,medium,"Acompanhamento semanal","Maria da Silva","(11) 98765-4321"',
    // Empty row for user to fill
    'Nome do Aluno,Turma,0.0,0,1,low,"Ações necessárias","Nome do Responsável","(99) 99999-9999"'
  ].join('\n');

  // Create a blob from the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
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
