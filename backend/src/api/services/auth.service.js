const supabase = require('../../config/supabaseClient');

/**
 * Serviço de autenticação para gerenciar usuários e login/cadastro
 */

/**
 * Cria uma nova conta de usuário e sua organização
 * @param {Object} userData - Dados do usuário
 * @param {Object} organizationData - Dados da organização
 * @returns {Object} - Retorna o usuário criado e a organização
 */
const register = async (userData, organizationData) => {
  try {
    // 1. Criar o usuário no Supabase Auth
    const { data: authUser, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (authError) {
      throw authError;
    }

    const userId = authUser.user.id;
    console.log(`Usuário criado no Auth com ID: ${userId}`);

    // 2. Criar a organização
    const { data: organization, error: orgError } = await supabase
      .from('organizations')
      .insert([
        {
          name: organizationData.name,
          is_main_org: false,
          cnpj: organizationData.cnpj,
          address: organizationData.address,
          city: organizationData.city,
          state: organizationData.state,
          postal_code: organizationData.postal_code,
          contact_phone: organizationData.contact_phone,
          status: 'active'
        }
      ])
      .select()
      .single();

    if (orgError) {
      // Se houver erro na criação da organização, tentar limpar o usuário criado
      console.error('Erro ao criar organização, tentando remover usuário:', orgError);
      // Note: O Supabase não oferece API para deletar usuários via JS Client
      // Você precisaria usar funções serverless ou admin APIs para isso
      throw orgError;
    }

    const organizationId = organization.id;
    console.log(`Organização criada com ID: ${organizationId}`);

    // 3. Criar o perfil do usuário com informações adicionais
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: userId, // Mesmo ID do auth.users
          email: userData.email,
          organization_id: organizationId,
          role: 'user',
          is_admin: false,
          is_super_admin: false,
          status: 'active',
          name: userData.name,
          // Adicione outros campos necessários aqui
        }
      ])
      .select()
      .single();

    if (profileError) {
      console.error('Erro ao criar perfil, tentando limpar os dados:', profileError);
      
      // Tentar remover a organização se o perfil falhar
      await supabase
        .from('organizations')
        .delete()
        .eq('id', organizationId);
        
      throw profileError;
    }

    console.log(`Perfil criado para o usuário ${userId}`);

    return {
      user: authUser.user,
      profile,
      organization
    };
  } catch (error) {
    console.error('Erro no processo de cadastro:', error);
    throw error;
  }
};

/**
 * Loga um usuário no sistema
 * @param {string} email 
 * @param {string} password 
 * @returns {Object} - Dados do usuário e token de sessão
 */
const login = async (email, password) => {
  try {
    // 1. Autenticar o usuário
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      throw authError;
    }

    // 2. Buscar o perfil do usuário com a organização
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        organizations:organization_id (*)
      `)
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      throw profileError;
    }

    // Verificar se o usuário está ativo
    if (profile.status !== 'active') {
      throw new Error('Usuário inativo ou bloqueado');
    }

    // Prepare os dados para retornar
    const userData = {
      id: authData.user.id,
      email: authData.user.email,
      profile: {
        name: profile.name,
        role: profile.role,
        is_admin: profile.is_admin,
        is_super_admin: profile.is_super_admin,
        status: profile.status,
      },
      organization: profile.organizations,
      accessToken: authData.session.access_token,
      refreshToken: authData.session.refresh_token,
    };

    return userData;
  } catch (error) {
    console.error('Erro no login:', error);
    throw error;
  }
};

/**
 * Verifica se um token de autenticação é válido
 * @param {string} token 
 * @returns {Object} - Dados do usuário se o token for válido
 */
const verifyToken = async (token) => {
  try {
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error) {
      throw error;
    }

    return data.user;
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    throw error;
  }
};

/**
 * Encerra a sessão do usuário
 * @returns {boolean} - true se o logout foi bem-sucedido
 */
const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    throw error;
  }
};

module.exports = {
  register,
  login,
  verifyToken,
  logout
}; 
 
 
 
 
 
 
 
 