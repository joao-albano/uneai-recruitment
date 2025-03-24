
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuthOperations } from '../useAuthOperations';
import { supabase } from '@/integrations/supabase/client';
import * as profileApi from '../api/profileApi';
import * as authApi from '../api/authApi';

// Mock dependencies
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
    }
  }
}));

jest.mock('../api/profileApi', () => ({
  fetchUserProfile: jest.fn()
}));

jest.mock('../api/authApi', () => ({
  loginWithEmail: jest.fn(),
  loginWithPhone: jest.fn(),
  logout: jest.fn()
}));

describe('useAuthOperations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default mocks
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: null }
    });
    
    (supabase.auth.onAuthStateChange as jest.Mock).mockReturnValue({
      data: { subscription: { unsubscribe: jest.fn() } }
    });
  });
  
  test('should initialize with unauthenticated state', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthOperations());
    
    await waitForNextUpdate();
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.currentUser).toBeNull();
  });
  
  test('should set authenticated state when session exists', async () => {
    const mockSession = {
      user: { id: '123', email: 'test@example.com' }
    };
    
    (supabase.auth.getSession as jest.Mock).mockResolvedValue({
      data: { session: mockSession }
    });
    
    (profileApi.fetchUserProfile as jest.Mock).mockResolvedValue({
      profile: { name: 'Test User', email: 'test@example.com' },
      isAdmin: true,
      isSuperAdmin: false,
      organization: { id: '123', name: 'Test Org' }
    });
    
    const { result, waitForNextUpdate } = renderHook(() => useAuthOperations());
    
    await waitForNextUpdate();
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.userEmail).toBe('test@example.com');
    expect(result.current.isAdmin).toBe(true);
    expect(result.current.isSuperAdmin).toBe(false);
    expect(result.current.currentUser).toEqual({ 
      name: 'Test User', 
      email: 'test@example.com' 
    });
  });
  
  test('should handle login correctly', async () => {
    (authApi.loginWithEmail as jest.Mock).mockResolvedValue({ success: true });
    
    const { result } = renderHook(() => useAuthOperations());
    
    const loginResult = await result.current.login('test@example.com', 'password');
    
    expect(loginResult).toEqual({ success: true });
    expect(authApi.loginWithEmail).toHaveBeenCalledWith('test@example.com', 'password');
  });
  
  test('should handle logout correctly', async () => {
    (authApi.logout as jest.Mock).mockResolvedValue({ success: true });
    
    const { result, waitForNextUpdate } = renderHook(() => useAuthOperations());
    
    await waitForNextUpdate();
    
    await act(async () => {
      await result.current.logout();
    });
    
    expect(authApi.logout).toHaveBeenCalled();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.currentUser).toBeNull();
  });
});
