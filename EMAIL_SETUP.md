# Configuração e Uso do Sistema de Email

Este guia explica como configurar e usar a funcionalidade de email integrada no sistema de conversas.

## 📧 Configuração SMTP

### 1. Acessar Configurações
1. Navegue para **Configurações** no menu lateral
2. Clique na aba **Email**

### 2. Configurar Servidor SMTP
Preencha os seguintes campos:

#### Configurações do Servidor
- **Servidor SMTP**: Endereço do servidor de email (ex: `smtp.gmail.com`)
- **Porta**: Porta do servidor (ex: `587` para TLS, `465` para SSL)
- **Conexão Segura**: Ative para SSL/TLS

#### Credenciais
- **Usuário**: Seu email de login
- **Senha**: Senha do email ou senha de aplicativo

> **Nota para Gmail**: Use uma [senha de aplicativo](https://support.google.com/accounts/answer/185833) em vez da senha normal.

#### Informações do Remetente
- **Nome do Remetente**: Nome que aparecerá nos emails (ex: "UNE AI")
- **Email do Remetente**: Email que será usado como remetente

### 3. Testar Configuração
1. Clique em **Testar Conexão** para verificar se as configurações estão corretas
2. Clique em **Enviar Email de Teste** para testar o envio real
3. Clique em **Salvar Configurações** para salvar

## 📩 Enviando Emails nas Conversas

### Via Botão de Email no Header
1. Abra uma conversa com um lead
2. Clique no botão **Email** no header (próximo aos controles de IA)
3. Preencha o formulário no modal:
   - **Para**: Email do destinatário (preenchido automaticamente se disponível)
   - **Assunto**: Assunto do email
   - **Mensagem**: Corpo do email
4. Clique em **Enviar Email**

### Via Aba de Email
1. Na conversa, clique na aba **Email**
2. Preencha o formulário de composição
3. Envie o email

## 🔧 Configurações por Organização

- Cada organização tem suas próprias configurações SMTP
- As configurações são armazenadas de forma segura no Supabase
- Múltiplos usuários da mesma organização compartilham as mesmas configurações

## 🔧 Backend (Nodemailer)

O sistema utiliza Nodemailer no backend para envio de emails:

### Rotas da API
- `POST /api/email/test-connection` - Testa conexão SMTP
- `POST /api/email/send-email` - Envia email

### Estrutura do Banco de Dados (Supabase)
Tabela `email_config`:
```sql
CREATE TABLE email_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id),
    smtp_host TEXT NOT NULL,
    smtp_port INTEGER NOT NULL,
    smtp_secure BOOLEAN NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    from_email TEXT NOT NULL,
    from_name TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Exemplos de Configuração

### Gmail
- **Servidor**: `smtp.gmail.com`
- **Porta**: `587`
- **Seguro**: ✅ Ativado
- **Usuário**: `seu-email@gmail.com`
- **Senha**: Senha de aplicativo

### Outlook/Hotmail
- **Servidor**: `smtp-mail.outlook.com`
- **Porta**: `587`
- **Seguro**: ✅ Ativado
- **Usuário**: `seu-email@outlook.com`
- **Senha**: Sua senha normal

### SMTP Personalizado
- **Servidor**: Consulte seu provedor
- **Porta**: Geralmente `587` ou `465`
- **Seguro**: Conforme especificação
- **Usuário**: Conforme especificação
- **Senha**: Conforme especificação

## ⚠️ Solução de Problemas

### Email não enviado
1. Verifique se as configurações SMTP estão corretas
2. Teste a conexão primeiro
3. Verifique se o email de destino está válido
4. Para Gmail, certifique-se de usar senha de aplicativo

### Erro de autenticação
1. Confirme usuário e senha
2. Para Gmail, ative autenticação de dois fatores e gere senha de aplicativo
3. Verifique se a conta não está bloqueada

### Emails indo para spam
1. Configure SPF/DKIM no seu domínio
2. Use um IP confiável
3. Evite conteúdo que pode ser marcado como spam

## 🔐 Segurança

- Senhas são armazenadas de forma segura no Supabase
- Conexões SMTP usam SSL/TLS
- Configurações são isoladas por organização
- Logs são mantidos para auditoria 