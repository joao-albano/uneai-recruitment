
import { supabase } from '@/integrations/supabase/client';
import { Organization, UserProfile } from '../types';

/**
 * Fetches user profile and organization data from Supabase
 */
export const fetchUserProfile = async (userId: string) => {
  try {
    // Fetch user metadata from auth.users
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) {
      console.error('Error fetching user data:', userError);
      return null;
    }
    
    // Extract user metadata
    const userMetadata = userData.user?.user_metadata;
    const fullName = userMetadata?.full_name;
    const email = userMetadata?.email || userData.user?.email;
    
    console.log('User metadata:', userMetadata);
    console.log('User email being checked:', email);
    
    // Fetch profile from profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*, organizations(*)')
      .eq('id', userId)
      .single();
    
    if (profileError && profileError.code !== 'PGRST106') {
      console.error('Error fetching profile:', profileError);
      // Even if profile fetch fails, we can still return basic user data
    }
    
    console.log('Profile data from database:', profile);
    
    let organization: Organization | undefined;
    
    // Extract organization data from profile response
    if (profile?.organizations) {
      // Check if organizations is an array or object and extract data accordingly
      if (Array.isArray(profile.organizations)) {
        const org = profile.organizations[0];
        if (org) {
          organization = {
            id: org.id,
            name: org.name,
            isMainOrg: org.is_main_org
          };
        }
      } else if (profile.organizations && typeof profile.organizations === 'object') {
        // Handle the case where organizations is an object
        // Use type assertion to help TypeScript understand the shape
        type OrgData = { id: string; name: string; is_main_org: boolean };
        
        // First verify it's an object with the properties we need
        const orgData = profile.organizations as Record<string, unknown>;
        
        if (orgData && 
            'id' in orgData && 
            'name' in orgData && 
            'is_main_org' in orgData) {
          
          organization = {
            id: orgData.id as string,
            name: orgData.name as string,
            isMainOrg: orgData.is_main_org as boolean
          };
        }
      }
    }
    
    // Special case: hardcode paula.martins@une.cx as super admin always
    // This ensures this specific user always has super admin access
    const isSuperAdmin = email === 'paula.martins@une.cx' || Boolean(profile?.is_super_admin);
    const isAdmin = Boolean(profile?.is_admin) || isSuperAdmin;
    
    console.log('Is super admin check:', { 
      email, 
      isSuperAdmin, 
      profileIsSuperAdmin: Boolean(profile?.is_super_admin),
      isAdmin 
    });
    
    // Create user profile object
    const userProfile: UserProfile = {
      id: userId,
      name: fullName || profile?.email?.split('@')[0] || email?.split('@')[0] || '',
      email: email || profile?.email || '',
      role: isSuperAdmin ? 'superadmin' : (profile?.role || 'user'),
      organizationId: profile?.organization_id,
      organization: organization,
      isSuperAdmin: isSuperAdmin
    };
    
    console.log('Final user profile created:', userProfile);
    
    return {
      profile: userProfile,
      isAdmin: isAdmin,
      isSuperAdmin: isSuperAdmin,
      organization: organization || null
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};
