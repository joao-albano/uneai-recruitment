
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { ProductSubscription, ProductType } from './types';

export const fetchUserProducts = async (userId: string, isSuperAdmin: boolean): Promise<{
  subscriptions: ProductSubscription[],
  availableProducts: ProductType[]
}> => {
  console.log('Fetching user products with params:', { userId, isSuperAdmin });

  // Super admins have access to all products
  if (isSuperAdmin) {
    const allProductTypes: ProductType[] = [
      'retention', 
      'sales', 
      'scheduling', 
      'recruitment', 
      'secretary', 
      'pedagogical',
      'billing'
    ];
    
    console.log('User is super admin - providing access to all products:', allProductTypes);
    
    // Create simulated subscriptions for all products
    const subscriptions: ProductSubscription[] = allProductTypes.map(type => ({
      id: uuidv4(),
      productType: type,
      startDate: new Date(),
      status: 'active'
    }));
    
    return {
      subscriptions,
      availableProducts: allProductTypes
    };
  }
  
  // For regular users, fetch their subscriptions
  try {
    const { data: subscriptions, error } = await supabase
      .from('subscriptions')
      .select('id, status, trial_start_date, trial_end_date')
      .eq('user_id', userId);
    
    if (error) {
      console.error('Error fetching subscriptions:', error);
      throw error;
    }
    
    // Mock product types since we can't get them from the database yet
    const mockProductTypes: ProductType[] = ['retention', 'billing'];
    
    // Check if trial is expired for each subscription
    const now = new Date();
    
    const productSubscriptions: ProductSubscription[] = subscriptions?.map((sub, index) => {
      let status = sub.status;
      
      // If trial, check if expired
      if (status === 'trial' && sub.trial_end_date) {
        const trialEndDate = new Date(sub.trial_end_date);
        if (now > trialEndDate) {
          status = 'inactive'; // Trial expired
        }
      }
      
      // Assign a mock product type based on the index
      const productType = mockProductTypes[index % mockProductTypes.length];
      
      return {
        id: sub.id,
        productType: productType,
        startDate: sub.trial_start_date ? new Date(sub.trial_start_date) : new Date(),
        status: status as 'active' | 'inactive' | 'pending' | 'trial'
      };
    }) || [];
    
    // Set available products based on active or trial subscriptions
    const productTypes = productSubscriptions
      .filter(sub => sub.status === 'active' || sub.status === 'trial')
      .map(sub => sub.productType);
    
    console.log('Regular user products fetched:', { 
      subscriptions: productSubscriptions,
      availableProducts: productTypes 
    });
    
    return {
      subscriptions: productSubscriptions,
      availableProducts: productTypes
    };
  } catch (error) {
    console.error('Error fetching user products:', error);
    
    // Create mock data if there's an error
    const mockProducts: ProductType[] = ['retention', 'billing'];
    const mockSubscriptions: ProductSubscription[] = mockProducts.map(type => ({
      id: uuidv4(),
      productType: type,
      startDate: new Date(),
      status: 'trial'
    }));
    
    return {
      subscriptions: mockSubscriptions,
      availableProducts: mockProducts
    };
  }
};

export const createMockSubscription = (productType: ProductType): ProductSubscription => {
  return {
    id: uuidv4(),
    productType,
    startDate: new Date(),
    status: 'trial'
  };
};
