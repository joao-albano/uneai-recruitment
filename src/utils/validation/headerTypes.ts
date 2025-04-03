
// Define product and institution types
export type ProductType = 'retention' | 'recruitment';
export type InstitutionType = 'school' | 'university';

// Format type for Excel template
export type ExcelFormat = {
  headers: string[];
  description: string;
};

// Column definition type
export type ColumnDefinition = {
  header: string;
  description: string;
  example: string;
  required: boolean;
  isKeyField?: boolean;
};

// Header mapping type
export type HeaderMapping = Record<string, string>;
