
import { StudentData } from "../../context/DataContext";
import { ValidationError } from "./types";

// Function to validate a row of student data
export const validateStudentData = (
  data: Partial<StudentData>,
  rowIndex: number
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Check required fields
  if (!data.name) {
    errors.push({
      row: rowIndex,
      column: 'nome',
      message: 'Nome do aluno é obrigatório'
    });
  }

  if (!data.class) {
    errors.push({
      row: rowIndex,
      column: 'turma',
      message: 'Turma é obrigatória'
    });
  }

  // Validate grade (should be 0-10)
  if (data.grade === undefined || data.grade === null) {
    errors.push({
      row: rowIndex,
      column: 'nota',
      message: 'Nota é obrigatória'
    });
  } else if (isNaN(data.grade) || data.grade < 0 || data.grade > 10) {
    errors.push({
      row: rowIndex,
      column: 'nota',
      message: 'Nota deve ser um número entre 0 e 10'
    });
  }

  // Validate attendance (should be 0-100%)
  if (data.attendance === undefined || data.attendance === null) {
    errors.push({
      row: rowIndex,
      column: 'frequencia',
      message: 'Frequência é obrigatória'
    });
  } else if (isNaN(data.attendance) || data.attendance < 0 || data.attendance > 100) {
    errors.push({
      row: rowIndex,
      column: 'frequencia',
      message: 'Frequência deve ser uma porcentagem entre 0 e 100'
    });
  }

  // Validate parent name if provided
  if (data.parentName !== undefined && typeof data.parentName !== 'string') {
    errors.push({
      row: rowIndex,
      column: 'nome_responsavel',
      message: 'Nome do responsável deve ser texto'
    });
  }

  // Validate parent contact if provided
  if (data.parentContact !== undefined) {
    // Support both formats: "(99) 99999-9999" and "(11) 98765-4321"
    const phonePatterns = [
      /^\(\d{2}\)\s\d{4,5}-\d{4}$/,  // (99) 99999-9999 format
      /^\(\d{2}\)\s\d{5}-\d{4}$/,    // (99) 99999-9999 format
      /^\(\d{2}\)\s\d{4}-\d{4}$/,    // (99) 9999-9999 format
      /^\(\d{2}\)\d{4,5}-\d{4}$/,    // (99)99999-9999 format without space
      /^\(\d{2}\)\d{4}-\d{4}$/       // (99)9999-9999 format without space
    ];
    
    const isValidFormat = typeof data.parentContact === 'string' && 
      phonePatterns.some(pattern => pattern.test(data.parentContact as string));
    
    if (!isValidFormat) {
      errors.push({
        row: rowIndex,
        column: 'contato_responsavel',
        message: 'Contato do responsável deve seguir o formato (99) 99999-9999 ou (99) 9999-9999'
      });
    }
  }

  return errors;
};
