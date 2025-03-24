
/**
 * Converts a price string to a numeric value
 * 
 * @param priceString Price string (e.g., "R$ 2.990,00/ano" or "$2,990.00/year")
 * @returns Numeric value of the price
 */
export const getPriceValue = (priceString: string): number => {
  if (!priceString || priceString.trim() === '') {
    return 0;
  }
  
  try {
    // Handle price strings with commas as decimal separators (Brazilian format)
    if (priceString.includes(',')) {
      const numericValue = priceString
        .replace(/[^\d,]/g, '') // Remove all non-numeric characters except comma
        .replace(',', '.'); // Replace comma with dot for parsing
      
      return parseFloat(numericValue) || 0;
    }
    
    // Handle price strings with dots as thousand separators (US format)
    const numericValue = priceString
      .replace(/[^\d.]/g, ''); // Remove all non-numeric characters except dot
    
    return parseFloat(numericValue) || 0;
  } catch (error) {
    console.error('Error parsing price value:', error);
    return 0;
  }
};

/**
 * Formats a numeric value as a currency string
 * 
 * @param value Numeric value
 * @param isPtBR Whether to format in Brazilian format
 * @returns Formatted currency string
 */
export const formatCurrency = (value: number, isPtBR: boolean): string => {
  return new Intl.NumberFormat(isPtBR ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: isPtBR ? 'BRL' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};
