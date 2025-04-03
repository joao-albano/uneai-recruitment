
// Update imports to use the new file structure
import { ProductType, InstitutionType } from './headerTypes';
import { getTemplateColumns } from './templateFormat';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

// Just assuming this function exists based on the imports in other files
export { ProductType, InstitutionType } from './headerTypes';

// Function to generate template Excel file based on product and institution type
export const generateExcelTemplate = (productType: ProductType, institutionType: InstitutionType): ArrayBuffer => {
  const columns = getTemplateColumns(productType, institutionType);
  const headers = columns.map(col => col.header);
  const examples = columns.map(col => col.example);
  
  // Create workbook and worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet([headers, examples]);
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Template');
  
  // Generate ArrayBuffer
  return XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
};

// Function to download template
export const downloadTemplate = (productType: ProductType = 'retention', institutionType: InstitutionType = 'school'): void => {
  const templateData = generateExcelTemplate(productType, institutionType);
  const blob = new Blob([templateData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
  const filename = `template_${productType}_${institutionType}_${new Date().toISOString().slice(0, 10)}.xlsx`;
  saveAs(blob, filename);
};

// Function to get template format - used for documentation/display
export const getTemplateFormat = (productType: ProductType = 'retention', institutionType: InstitutionType = 'school') => {
  return getTemplateColumns(productType, institutionType);
};
