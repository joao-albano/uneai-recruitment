
/**
 * Login with email and password
 */
export const loginWithEmail = async (email: string, password: string) => {
  try {
    console.log('Mock login with:', { email, password });
    
    // Mock successful login (bypass Supabase for testing)
    // Simulate a small delay for better user experience
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return success response
    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error during login' 
    };
  }
};

/**
 * Login with phone number and password
 */
export const loginWithPhone = async (phone: string, password: string) => {
  try {
    // Format phone number to international format (add +55 for Brazil if not already present)
    const formattedPhone = phone.startsWith('+') ? phone : `+55${phone.replace(/\D/g, '')}`;
    
    console.log('Mock phone login with:', { phone: formattedPhone, password });
    
    // Mock successful login (bypass Supabase for testing)
    // Simulate a small delay for better user experience
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return success response
    return { success: true };
  } catch (error) {
    console.error('Phone login error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error during phone login' 
    };
  }
};

/**
 * Logout the current user
 */
export const logout = async () => {
  try {
    console.log('Mock logout');
    
    // Mock successful logout (bypass Supabase for testing)
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error during logout' 
    };
  }
};
