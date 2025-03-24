
import { fetchUserProfile } from '../api/profileApi';
import { supabase } from '@/integrations/supabase/client';

// Mock Supabase client
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: jest.fn()
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    single: jest.fn()
  }
}));

describe('Profile API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('should fetch user profile successfully', async () => {
    // Mock user data
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: {
        user: {
          user_metadata: {
            full_name: 'Test User'
          }
        }
      },
      error: null
    });
    
    // Mock profile data
    (supabase.from as jest.Mock).mockImplementation((table) => {
      if (table === 'profiles') {
        return {
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: {
                  email: 'test@example.com',
                  role: 'user',
                  organization_id: '123',
                  is_admin: false,
                  is_super_admin: false
                },
                error: null
              })
            })
          })
        };
      } else if (table === 'organizations') {
        return {
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: {
                  id: '123',
                  name: 'Test Org',
                  is_main_org: true
                },
                error: null
              })
            })
          })
        };
      }
    });
    
    const result = await fetchUserProfile('123');
    
    expect(result).toEqual({
      profile: {
        name: 'Test User',
        email: 'test@example.com',
        role: 'user',
        organizationId: '123',
        organization: {
          id: '123',
          name: 'Test Org',
          isMainOrg: true
        },
        isSuperAdmin: false
      },
      isAdmin: false,
      isSuperAdmin: false,
      organization: {
        id: '123',
        name: 'Test Org',
        isMainOrg: true
      }
    });
  });
  
  test('should handle profile fetch error', async () => {
    // Mock user data error
    (supabase.auth.getUser as jest.Mock).mockResolvedValue({
      data: null,
      error: { message: 'User not found' }
    });
    
    const result = await fetchUserProfile('invalid-id');
    
    expect(result).toBeNull();
  });
});
