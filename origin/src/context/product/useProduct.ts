
import { useContext } from 'react';
import { ProductContext } from './ProductProvider';
import { ProductContextType } from './types';

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};
