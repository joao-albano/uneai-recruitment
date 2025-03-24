
/**
 * Converts a price string to a numeric value
 * 
 * @param priceString Price string (e.g., "R$ 2.990,00/ano" or "$2,990.00/year")
 * @returns Numeric value of the price
 */
export const getPriceValue = (priceString: string): number => {
  const numericValue = priceString
    .replace(/[^\d.,]/g, '') // Remove all non-numeric characters except . and ,
    .replace(',', '.'); // Replace comma with dot for parsing
  
  return parseFloat(numericValue);
};
