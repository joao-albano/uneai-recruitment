const AuthService = require('../services/auth.service');

/**
 * Registra um novo usuário e sua organização
 * @param {Request} req 
 * @param {Response} res 
 */
const register = async (req, res) => {
  try {
    const { 
      // Dados do usuário
      email, 
      password, 
      name,
      
      // Dados da organização
      organizationName,
      cnpj,
      address,
      city,
      state,
      postalCode,
      contactPhone,
      // Outros campos conforme necessário
    } = req.body;

    // Validação básica dos campos
    if (!email || !password || !name || !organizationName) {
      return res.status(400).json({ 
        message: 'Campos obrigatórios faltando', 
        requiredFields: ['email', 'password', 'name', 'organizationName'] 
      });
    }

    // Preparar dados para o serviço
    const userData = {
      email,
      password,
      name
    };

    const organizationData = {
      name: organizationName,
      cnpj,
      address,
      city,
      state,
      postal_code: postalCode,
      contact_phone: contactPhone
    };

    // Processar o registro
    const result = await AuthService.register(userData, organizationData);

    // Retornar resposta de sucesso (sem senha e tokens sensíveis)
    res.status(201).json({
      message: 'Usuário e organização criados com sucesso',
      userId: result.user.id,
      organizationId: result.organization.id,
      email: result.user.email
    });
  } catch (error) {
    console.error('Erro no controller register:', error);
    
    // Tratar erros específicos para mensagens mais claras ao cliente
    if (error.message.includes('duplicate key')) {
      return res.status(409).json({ message: 'Email já cadastrado' });
    }
    
    res.status(500).json({ 
      message: 'Erro ao registrar usuário', 
      error: error.message 
    });
  }
};

/**
 * Autentica um usuário no sistema
 * @param {Request} req 
 * @param {Response} res 
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ 
        message: 'Email e senha são obrigatórios' 
      });
    }

    const userData = await AuthService.login(email, password);

    // Retornar os dados do usuário logado
    res.json({
      message: 'Login realizado com sucesso',
      user: {
        id: userData.id,
        email: userData.email,
        profile: userData.profile,
        organization: userData.organization,
      },
      accessToken: userData.accessToken,
      refreshToken: userData.refreshToken
    });
  } catch (error) {
    console.error('Erro no controller login:', error);
    
    // Identificar erros comuns de login
    if (error.message.includes('Invalid login credentials')) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }
    
    if (error.message === 'Usuário inativo ou bloqueado') {
      return res.status(403).json({ message: error.message });
    }
    
    res.status(500).json({ 
      message: 'Erro ao fazer login', 
      error: error.message 
    });
  }
};

/**
 * Invalida a sessão do usuário
 * @param {Request} req 
 * @param {Response} res 
 */
const logout = async (req, res) => {
  try {
    await AuthService.logout();
    res.json({ message: 'Logout realizado com sucesso' });
  } catch (error) {
    console.error('Erro no controller logout:', error);
    res.status(500).json({ 
      message: 'Erro ao fazer logout', 
      error: error.message 
    });
  }
};

/**
 * Retorna os dados do usuário atualmente logado
 * @param {Request} req 
 * @param {Response} res 
 */
const getCurrentUser = async (req, res) => {
  try {
    // A implementação real dependeria do middleware de autenticação
    // que colocaria as informações do usuário em req.user
    if (!req.user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    res.json({ user: req.user });
  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    res.status(500).json({ 
      message: 'Erro ao obter dados do usuário', 
      error: error.message 
    });
  }
};

module.exports = {
  register,
  login,
  logout,
  getCurrentUser
}; 
 
 
 
 
 
 
 
 