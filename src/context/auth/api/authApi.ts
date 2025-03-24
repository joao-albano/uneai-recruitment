
import { supabase } from '@/integrations/supabase/client';

/**
 * Login with email and password
 */
export const loginWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Login error:', error.message);
      
      // Provide more specific error for unconfirmed email
      if (error.message.includes('Email not confirmed')) {
        return { 
          success: false, 
          error: 'Email not confirmed. Please check your inbox for the confirmation email.' 
        };
      }
      
      return { success: false, error: error.message };
    }
    
    console.log('Login successful:', data);
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
    
    const { data, error } = await supabase.auth.signInWithPassword({
      phone: formattedPhone,
      password
    });
    
    if (error) {
      console.error('Phone login error:', error.message);
      return { success: false, error: error.message };
    }
    
    console.log('Phone login successful:', data);
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
    await supabase.auth.signOut();
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error during logout' 
    };
  }
};
