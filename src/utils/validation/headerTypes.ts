
// Product types
export type ProductType = 'recruitment' | 'retention';

// Institution types
export type InstitutionType = 'school' | 'university';

// Column definition interface
export interface ColumnDefinition {
  header: string;
  description: string;
  example: string;
  required: boolean;
  isKeyField?: boolean;
}

// Excel format interface
export interface ExcelFormat {
  headers: string[];
  description: string;
}
