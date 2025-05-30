
import { UploadRecord } from '@/types/data';

/**
 * Generate demo upload history records for demonstration purposes
 */
export function generateDemoUploadHistory(): Omit<UploadRecord, 'id'>[] {
  // Create demo upload records
  return [
    {
      filename: 'alunos_janeiro_2024.csv',
      uploadDate: new Date(2024, 0, 15, 10, 30), // 15 de Janeiro às 10:30
      recordCount: 145,
      status: 'success' as const,
      newCount: 145,
      updatedCount: 0
    },
    {
      filename: 'alunos_fevereiro_2024.csv',
      uploadDate: new Date(2024, 1, 12, 14, 15), // 12 de Fevereiro às 14:15
      recordCount: 150,
      status: 'success' as const,
      newCount: 15,
      updatedCount: 135
    },
    {
      filename: 'alunos_marco_2024_erro.xlsx',
      uploadDate: new Date(2024, 2, 5, 9, 45), // 5 de Março às 9:45
      recordCount: 0,
      status: 'error' as const,
      errorCount: 3
    },
    {
      filename: 'alunos_marco_2024_corrigido.xlsx',
      uploadDate: new Date(2024, 2, 5, 11, 20), // 5 de Março às 11:20
      recordCount: 152,
      status: 'success' as const,
      newCount: 12,
      updatedCount: 140
    },
    {
      filename: 'turma_especial.csv',
      uploadDate: new Date(2024, 2, 20, 16, 0), // 20 de Março às 16:00
      recordCount: 28,
      status: 'success' as const,
      newCount: 28,
      updatedCount: 0
    },
    {
      filename: 'abril_ensino_medio.csv',
      uploadDate: new Date(2024, 3, 10, 8, 50), // 10 de Abril às 8:50
      recordCount: 87,
      status: 'success' as const,
      newCount: 25, 
      updatedCount: 62
    }
  ];
}
