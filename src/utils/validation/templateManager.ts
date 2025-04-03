
import { getTemplateColumns } from './templateFormat';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { ProductType, InstitutionType, ColumnDefinition } from './headerTypes';

// Re-export types
export type { ProductType, InstitutionType };

// Function to generate template Excel file based on product and institution type
export const generateExcelTemplate = (productType: ProductType, institutionType: InstitutionType) => {
  const columns = getTemplateColumns(productType, institutionType);
  const headers = columns.map(col => col.header);
  const examples = columns.map(col => col.example);
  
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([
    headers,
    examples
  ]);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  
  // Generate ArrayBuffer
  return XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
};

// Function to download template
export const downloadTemplate = (productType: ProductType = 'retention', institutionType: InstitutionType = 'school') => {
  const templateData = generateExcelTemplate(productType, institutionType);
  const blob = new Blob([templateData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const filename = `template_${productType}_${institutionType}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  saveAs(blob, filename);
};

// Function to get template format - used for documentation/display
export const getTemplateFormat = (productType: ProductType = 'retention', institutionType: InstitutionType = 'school') => {
  return getTemplateColumns(productType, institutionType);
};

// Function to get key fields based on product and institution type
export const getKeyFields = (productType: ProductType, institutionType: InstitutionType): ColumnDefinition[] => {
  const allColumns = getTemplateColumns(productType, institutionType);
  return allColumns.filter(column => column.isKeyField === true);
};
