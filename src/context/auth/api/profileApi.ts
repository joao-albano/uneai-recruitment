
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
    console.log('User email to check:', email);
    
    // Fetch profile from profiles table
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
    
    // If profile has organization_id, fetch organization details
    if (profile?.organization_id) {
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .select('*')
        .eq('id', profile.organization_id)
        .single();
      
      if (orgError) {
        console.error('Error fetching organization:', orgError);
      } else if (org) {
        organization = {
          id: org.id,
          name: org.name,
          isMainOrg: org.is_main_org
        };
      }
    }
    
    // Determine if the user is a super admin based on email domain
    // This is a temporary solution while we fix the profile fetching
    const email_domain = email?.split('@')[1];
    const isSuperAdmin = email_domain === 'une.cx' || Boolean(profile?.is_super_admin);
    console.log('Is super admin:', isSuperAdmin);
    console.log('Role from database:', profile?.role);
    
    // Create user profile object with priority on DB role and super admin status
    const userProfile: UserProfile = {
      id: userId, // Add ID to user profile
      name: fullName || profile?.email?.split('@')[0] || email?.split('@')[0],
      email: email || profile?.email,
      role: isSuperAdmin ? 'superadmin' : (profile?.role || 'user'),
      organizationId: profile?.organization_id,
      organization: organization,
      isSuperAdmin: isSuperAdmin
    };
    
    console.log('Final user profile created:', userProfile);
    
    return {
      profile: userProfile,
      isAdmin: profile?.is_admin || isSuperAdmin || false,
      isSuperAdmin: isSuperAdmin || false,
      organization: organization || null
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};
