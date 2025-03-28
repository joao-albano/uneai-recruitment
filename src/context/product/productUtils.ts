
import { ProductType, ProductSubscription } from './types';
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';

/**
 * Fetches user products from the database
 * @param userId The user ID to fetch products for
 * @param isSuperAdmin Whether the user is a super admin
 * @returns An object containing subscriptions and available products
 */
export const fetchUserProducts = async (
  userId: string, 
  isSuperAdmin: boolean
): Promise<{
  subscriptions: ProductSubscription[],
  availableProducts: ProductType[]
}> => {
  // For development/demo purposes, we'll return some mock data
  // In a real implementation, we would fetch this from the database
  
  // For super admins, return all products as available
  if (isSuperAdmin) {
    return {
      subscriptions: [
        createMockSubscription('retention'),
        createMockSubscription('billing'),
        createMockSubscription('sales'),
        createMockSubscription('scheduling'),
        createMockSubscription('recruitment'),
        createMockSubscription('secretary'),
        createMockSubscription('pedagogical')
      ],
      availableProducts: [
        'retention', 
        'billing', 
        'sales', 
        'scheduling', 
        'recruitment', 
        'secretary', 
        'pedagogical'
      ]
    };
  }
  
  // For regular users, fetch their products
  try {
    const { data, error } = await supabase
      .from('user_products')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true);
    
    if (error) {
      console.error('Error fetching user products:', error);
      return {
        subscriptions: [],
        availableProducts: []
      };
    }
    
    // Map the data to our product types
    const availableProducts = data.map(item => item.product_type as ProductType);
    const subscriptions = data.map(item => ({
      id: item.id,
      productType: item.product_type as ProductType,
      startDate: new Date(),
      status: 'active' as const
    }));
    
    return {
      subscriptions,
      availableProducts
    };
  } catch (error) {
    console.error('Error in fetchUserProducts:', error);
    return {
      subscriptions: [],
      availableProducts: []
    };
  }
};

/**
 * Creates a mock subscription for the given product type
 * @param productType The product type to create a subscription for
 * @returns A mock subscription
 */
export const createMockSubscription = (productType: ProductType): ProductSubscription => {
  return {
    id: uuidv4(),
    productType,
    startDate: new Date(),
    status: 'active'
  };
};
