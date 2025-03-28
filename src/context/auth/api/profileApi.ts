
import { supabase } from '@/integrations/supabase/client';
import { Organization, UserProfile, UserRole } from '../types';

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
    
    // Fetch profile from profiles table (without joining organizations)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError && profileError.code !== 'PGRST106') {
      console.error('Error fetching profile:', profileError);
      // Even if profile fetch fails, we can still return basic user data
    }
    
    console.log('Profile data from database:', profile);
    
    let organization: Organization | undefined;
    
    // If profile has organization_id, fetch the organization separately
    if (profile?.organization_id) {
      console.log('Fetching organization with ID:', profile.organization_id);
      
      const { data: orgData, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', profile.organization_id)
        .single();
      
      if (orgError) {
        console.error('Error fetching organization:', orgError);
      } else if (orgData) {
        console.log('Organization data fetched:', orgData);
        
        // Set up organization data
        organization = {
          id: orgData.id,
          name: orgData.name,
          isMainOrg: orgData.is_main_org
        };
      }
    }
    
    // Special check for paula.martins@une.cx - ALWAYS make this user a super admin
    // This ensures this specific user always has super admin access
    const isSuperAdmin = (email === 'paula.martins@une.cx') || Boolean(profile?.is_super_admin);
    const isAdmin = Boolean(profile?.is_admin) || isSuperAdmin;
    
    console.log('Super admin check for', email, ':', { 
      isSuperAdmin, 
      profileIsSuperAdmin: Boolean(profile?.is_super_admin),
      isAdmin 
    });
    
    // Create user profile object with the correct UserRole type
    const userRole: UserRole = isSuperAdmin ? 'superadmin' : (profile?.role as UserRole || 'user');
    
    // Create user profile object
    const userProfile: UserProfile = {
      id: userId,
      name: fullName || profile?.email?.split('@')[0] || email?.split('@')[0] || '',
      email: email || profile?.email || '',
      role: userRole,
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
