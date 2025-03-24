
import { loginWithEmail, loginWithPhone, logout } from '../api/authApi';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase client
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signOut: jest.fn()
    }
  }
}));

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  describe('loginWithEmail', () => {
    test('should return success when login is successful', async () => {
      // Mock successful login
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { user: { id: '123' } },
        error: null
      });
      
      const result = await loginWithEmail('test@example.com', 'password');
      
      expect(result).toEqual({ success: true });
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password'
      });
    });
    
    test('should return error when login fails', async () => {
      // Mock failed login
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: null,
        error: { message: 'Invalid credentials' }
      });
      
      const result = await loginWithEmail('test@example.com', 'wrong-password');
      
      expect(result).toEqual({ 
        success: false, 
        error: 'Invalid credentials' 
      });
    });
    
    test('should handle unconfirmed email error specially', async () => {
      // Mock unconfirmed email error
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: null,
        error: { message: 'Email not confirmed' }
      });
      
      const result = await loginWithEmail('unconfirmed@example.com', 'password');
      
      expect(result).toEqual({ 
        success: false, 
        error: 'Email not confirmed. Please check your inbox for the confirmation email.' 
      });
    });
  });
  
  describe('loginWithPhone', () => {
    test('should format phone number correctly', async () => {
      // Mock successful login
      (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
        data: { user: { id: '123' } },
        error: null
      });
      
      const result = await loginWithPhone('123456789', 'password');
      
      expect(result).toEqual({ success: true });
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        phone: '+55123456789',
        password: 'password'
      });
    });
  });
  
  describe('logout', () => {
    test('should return success when logout is successful', async () => {
      // Mock successful logout
      (supabase.auth.signOut as jest.Mock).mockResolvedValue({
        error: null
      });
      
      const result = await logout();
      
      expect(result).toEqual({ success: true });
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
    
    test('should return error when logout fails', async () => {
      // Mock failed logout
      (supabase.auth.signOut as jest.Mock).mockResolvedValue({
        error: { message: 'Failed to logout' }
      });
      
      const result = await logout();
      
      expect(result).toEqual({ 
        success: false, 
        error: 'Failed to logout' 
      });
    });
  });
});
