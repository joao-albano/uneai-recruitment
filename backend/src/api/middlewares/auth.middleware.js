const supabase = require('../../config/supabaseClient');

/**
 * Middleware para verificar se o usuário está autenticado
 * Verifica o token no cabeçalho e adiciona o usuário ao objeto req
 */
const authMiddleware = async (req, res, next) => {
  try {
    // Obter o token do cabeçalho Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token de autenticação não fornecido' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verificar o token com o Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ 
        message: 'Token inválido ou expirado',
        error: error ? error.message : 'Usuário não encontrado'
      });
    }
    
    // Buscar o perfil e a organização do usuário
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select(`
        *,
        organizations:organization_id (*)
      `)
      .eq('id', user.id)
      .single();
      
    if (profileError) {
      return res.status(500).json({ 
        message: 'Erro ao buscar o perfil do usuário',
        error: profileError.message 
      });
    }
    
    // Adicionar o usuário e seu perfil ao objeto request
    req.user = {
      id: user.id,
      email: user.email,
      profile: {
        name: profile.name,
        role: profile.role,
        is_admin: profile.is_admin,
        is_super_admin: profile.is_super_admin,
        status: profile.status,
      },
      organization: profile.organizations
    };
    
    // Seguir para o próximo middleware ou controlador
    next();
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    res.status(500).json({ 
      message: 'Erro ao autenticar usuário', 
      error: error.message 
    });
  }
};

module.exports = authMiddleware; 
 
 
 
 
 
 
 
 