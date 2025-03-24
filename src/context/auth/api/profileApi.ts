
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
    
    // Extract full name from metadata
    const fullName = userData.user?.user_metadata?.full_name;
    
    // Fetch profile from profiles table - fix the schema issue
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profileError) {
      console.error('Error fetching profile:', profileError);
      return null;
    }
    
    let organization: Organization | undefined;
    
    // If profile has organization_id, fetch organization details
    if (profile.organization_id) {
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
    
    // Create user profile object
    const userProfile: UserProfile = {
      name: fullName || profile.email.split('@')[0],
      email: profile.email,
      role: profile.role,
      organizationId: profile.organization_id,
      organization: organization,
      isSuperAdmin: profile.is_super_admin
    };
    
    return {
      profile: userProfile,
      isAdmin: profile.is_admin,
      isSuperAdmin: profile.is_super_admin,
      organization: organization || null
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};
