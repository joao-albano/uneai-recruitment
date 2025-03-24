
import { renderHook, act } from '@testing-library/react-hooks';
import { useAuthState } from '../hooks/useAuthState';

describe('useAuthState', () => {
  test('should initialize with default values', () => {
    const { result } = renderHook(() => useAuthState());
    
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isAdmin).toBe(false);
    expect(result.current.isSuperAdmin).toBe(false);
    expect(result.current.userEmail).toBeNull();
    expect(result.current.currentUser).toBeNull();
    expect(result.current.currentOrganization).toBeNull();
    expect(result.current.session).toBeNull();
    expect(result.current.user).toBeNull();
  });
  
  test('state setters should update values correctly', () => {
    const { result } = renderHook(() => useAuthState());
    
    act(() => {
      result.current.setIsAuthenticated(true);
      result.current.setIsAdmin(true);
      result.current.setIsSuperAdmin(true);
      result.current.setUserEmail('test@example.com');
    });
    
    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.isAdmin).toBe(true);
    expect(result.current.isSuperAdmin).toBe(true);
    expect(result.current.userEmail).toBe('test@example.com');
  });
  
  test('should update user profile correctly', () => {
    const { result } = renderHook(() => useAuthState());
    const mockUserProfile = {
      name: 'Test User',
      email: 'test@example.com',
      role: 'admin',
      organizationId: '123'
    };
    
    act(() => {
      result.current.setCurrentUser(mockUserProfile);
    });
    
    expect(result.current.currentUser).toEqual(mockUserProfile);
  });
  
  test('should update organization correctly', () => {
    const { result } = renderHook(() => useAuthState());
    const mockOrganization = {
      id: '123',
      name: 'Test Org',
      isMainOrg: true
    };
    
    act(() => {
      result.current.setCurrentOrganization(mockOrganization);
    });
    
    expect(result.current.currentOrganization).toEqual(mockOrganization);
  });
});
