
/**
 * Utility functions for formatting and validating common data types
 */

/**
 * Formats a CNPJ string by removing non-numeric characters and adding proper formatting
 * @param cnpj The CNPJ to format
 * @returns Formatted CNPJ string
 */
export const formatCNPJ = (cnpj: string): string => {
  // Remove all non-numeric characters
  const numericOnly = cnpj.replace(/\D/g, '');
  
  // Format as XX.XXX.XXX/XXXX-XX if length is correct
  if (numericOnly.length === 14) {
    return numericOnly.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    );
  }
  
  // Return the cleaned numeric string if not enough digits
  return numericOnly;
};

/**
 * Validates if a CNPJ is properly formatted and potentially valid
 * @param cnpj The CNPJ to validate
 * @returns Boolean indicating if CNPJ is valid
 */
export const isValidCNPJ = (cnpj: string): boolean => {
  // Remove non-numeric characters
  const numericOnly = cnpj.replace(/\D/g, '');
  
  // Check if CNPJ has exactly 14 digits
  if (numericOnly.length !== 14) {
    return false;
  }
  
  // Reject known invalid repetitions
  if (/^(\d)\1+$/.test(numericOnly)) {
    return false;
  }
  
  // This is a basic validation, a complete CNPJ validation would include
  // calculating verification digits, but this handles most common cases
  return true;
};

/**
 * Normalizes a CNPJ for storage or comparison by removing all non-numeric characters
 * @param cnpj The CNPJ to normalize
 * @returns Normalized CNPJ string (numeric only)
 */
export const normalizeCNPJ = (cnpj: string): string => {
  return cnpj.replace(/\D/g, '');
};
