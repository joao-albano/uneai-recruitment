
import { StudentData } from "../../context/DataContext";
import { ValidationError } from "./types";
import { SchoolSegment } from "@/types/data";

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

  // For recruitment with school type, require either email or cpf, and RA becomes optional
  const isSchoolRecruitment = true; // We assume this is for recruitment with school type
  
  if (isSchoolRecruitment) {
    // Either parent email or CPF is required for basic education in recruitment product
    const hasParentEmail = !!data.parentEmail;
    const hasParentCPF = !!data.parentCPF;
    
    if (!hasParentEmail && !hasParentCPF) {
      errors.push({
        row: rowIndex,
        column: 'email_responsavel/cpf_responsavel',
        message: 'É necessário fornecer pelo menos um Email OU CPF do responsável'
      });
    }
    
    // Registration number is now optional for basic education
    // No validation error for missing registration number
  } else {
    // For retention product, registration is still required
    if (!data.registrationNumber) {
      errors.push({
        row: rowIndex,
        column: 'registro',
        message: 'Número de registro/matrícula é obrigatório'
      });
    }
  }

  if (!data.class) {
    errors.push({
      row: rowIndex,
      column: 'turma',
      message: 'Turma é obrigatória'
    });
  }

  // Validate segment
  if (!data.segment) {
    errors.push({
      row: rowIndex,
      column: 'segmento',
      message: 'Segmento escolar é obrigatório'
    });
  } else {
    const validSegments: SchoolSegment[] = [
      'ENSINO MÉDIO', 
      'ENSINO FUNDAMENTAL I', 
      'ENSINO FUNDAMENTAL II', 
      'EDUCAÇÃO INFANTIL'
    ];
    
    if (!validSegments.includes(data.segment as SchoolSegment)) {
      errors.push({
        row: rowIndex,
        column: 'segmento',
        message: 'Segmento escolar inválido. Deve ser um dos valores: ENSINO MÉDIO, ENSINO FUNDAMENTAL I, ENSINO FUNDAMENTAL II, EDUCAÇÃO INFANTIL'
      });
    }
  }

  // Validate grade (should be 0-10) - não obrigatório
  if (data.grade !== undefined && data.grade !== null) {
    if (isNaN(data.grade) || data.grade < 0 || data.grade > 10) {
      errors.push({
        row: rowIndex,
        column: 'nota',
        message: 'Nota deve ser um número entre 0 e 10'
      });
    }
  }

  // Validate attendance (should be 0-100%) - não obrigatório
  if (data.attendance !== undefined && data.attendance !== null) {
    if (isNaN(data.attendance) || data.attendance < 0 || data.attendance > 100) {
      errors.push({
        row: rowIndex,
        column: 'frequencia',
        message: 'Frequência deve ser uma porcentagem entre 0 e 100'
      });
    }
  }

  // Validate behavior (should be 0-10) - não obrigatório
  if (data.behavior !== undefined && data.behavior !== null) {
    if (isNaN(data.behavior) || data.behavior < 0 || data.behavior > 10) {
      errors.push({
        row: rowIndex,
        column: 'comportamento',
        message: 'Comportamento deve ser um número entre 0 e 10'
      });
    }
  }

  // Validate parent email if provided
  if (data.parentEmail !== undefined && typeof data.parentEmail === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.parentEmail)) {
      errors.push({
        row: rowIndex,
        column: 'email_responsavel',
        message: 'Email do responsável deve ser um email válido'
      });
    }
  }

  // Validate parent CPF if provided
  if (data.parentCPF !== undefined && typeof data.parentCPF === 'string') {
    // Basic CPF format validation (more complex validation could be added)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/;
    if (!cpfRegex.test(data.parentCPF)) {
      errors.push({
        row: rowIndex,
        column: 'cpf_responsavel',
        message: 'CPF do responsável deve seguir o formato 123.456.789-00 ou apenas números'
      });
    }
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
