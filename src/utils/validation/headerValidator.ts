
// Re-export the header validation functionality from the refactored modules
export { mapHeadersToProperties } from './headerMapping';
export { getRequiredHeaders, validateHeaders } from './headerRequirements';
export { getExcelFormat } from './templateFormat';
export { 
  ProductType, 
  InstitutionType, 
  ExcelFormat, 
  ColumnDefinition
} from './headerTypes';
