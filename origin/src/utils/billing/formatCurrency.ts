
/**
 * Formats a number as currency in Brazilian Real (BRL) or other currency
 * 
 * @param value - The numeric value to format
 * @param isPtBR - Whether to format in Brazilian format (optional)
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, isPtBR: boolean = true): string => {
  return new Intl.NumberFormat(isPtBR ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: isPtBR ? 'BRL' : 'USD',
    minimumFractionDigits: 2
  }).format(value);
};
