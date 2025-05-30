# 🔧 Correção de Problemas de Autenticação

## 🚨 Sintomas do Problema

- **Usuário aparece como "user@escola.edu"** mas não está logado
- **Carregamento infinito** ao acessar páginas protegidas
- **Não redireciona para login** quando deveria
- **Estados inconsistentes** de autenticação

## 🛠️ Soluções Rápidas

### 1. **Auto-Fix Imediato**
```javascript
// No console do navegador (F12)
window.fixAuth()
```

### 2. **Limpeza Manual Completa**
```javascript
// No console do navegador (F12)
window.authDebug.clearAllAuthState()
```

### 3. **Painel de Debug Visual**
- Pressione **Ctrl+Shift+D** para abrir o painel de debug
- Clique em "🔧 Auto-Fix" para correção automática
- Use "🗑️ Limpar Tudo" se problema persistir

## 🔍 Diagnóstico Detalhado

### **Passo 1: Verificar Estado**
```javascript
// Verificar estado atual
window.authDebug.checkAuthState()
```

### **Passo 2: Detectar Conflitos**
```javascript
// Verificar conflitos de dados
window.authDebug.detectStateConflict()
```

### **Passo 3: Forçar Refresh**
```javascript
// Tentar atualizar sessão
window.authDebug.forceSessionRefresh()
```

## 🚀 Como Testar o Sistema

### **Teste 1: Acesso Normal**
1. Abra o navegador em modo anônimo
2. Acesse `http://localhost:5173`
3. Verifique se redireciona para `/login`
4. Faça login normalmente
5. Verifique se acessa páginas protegidas

### **Teste 2: Debug Panel**
1. Acesse qualquer página
2. Pressione **Ctrl+Shift+D**
3. Clique em "🔄 Atualizar"
4. Verifique se há conflitos detectados
5. Use "🔧 Auto-Fix" se necessário

### **Teste 3: Limpeza Forçada**
1. Simule problema: execute `localStorage.setItem('sb-invalid', 'bad-data')`
2. Pressione **Ctrl+Shift+D**
3. Clique em "🔧 Auto-Fix"
4. Verifique se problema foi corrigido

## 🎯 Comandos Úteis no Console

### **Debugging**
```javascript
// Estado completo da autenticação
window.authDebug.checkAuthState()

// Detectar problemas
window.authDebug.detectStateConflict()

// Ver informações do contexto
window.useAuth // (não funciona, usar painel visual)
```

### **Correções**
```javascript
// Auto-diagnóstico e correção
window.fixAuth()

// Limpeza completa
window.authDebug.clearAllAuthState()

// Forçar refresh da sessão
window.authDebug.forceSessionRefresh()

// Redirecionar para login com limpeza
window.authDebug.redirectToLoginWithCleanup()
```

## 🔧 Sistema de Auto-Correção

O sistema agora possui **auto-correção automática** que:

1. **Detecta problemas** automaticamente:
   - Dados corrompidos no localStorage
   - Sessões inválidas/expiradas
   - Conflitos de estado
   - Inconsistências entre sessão e usuário

2. **Corrige automaticamente**:
   - Limpa dados corrompidos
   - Atualiza sessões expiradas
   - Remove conflitos
   - Redireciona para login quando necessário

3. **Monitora continuamente**:
   - Verifica saúde a cada 30 segundos
   - Auto-repara quando detecta problemas
   - Logs detalhados no console

## 📊 Indicadores de Saúde

### **Verde ✅ - Sistema Saudável**
- Sessão válida
- Usuário autenticado corretamente
- Dados consistentes
- Sem conflitos

### **Amarelo ⚠️ - Atenção**
- Sessão próxima do vencimento
- Refresh automático em andamento
- Verificação de saúde detectou inconsistência menor

### **Vermelho ❌ - Problema**
- Sessão inválida/expirada
- Dados corrompidos
- Conflitos de estado
- Auto-correção necessária

## 🚑 Correção de Emergência

Se nada funcionar, execute esta sequência:

```javascript
// 1. Limpeza total
await window.authDebug.clearAllAuthState()

// 2. Aguardar 2 segundos
await new Promise(r => setTimeout(r, 2000))

// 3. Recarregar página
window.location.reload()
```

## 🔄 Processo de Auto-Fix

Quando executar `window.fixAuth()` ou usar o painel:

1. **Diagnóstico**: Verifica estado atual
2. **Detecção**: Identifica problemas específicos
3. **Correção**: Aplica soluções apropriadas
4. **Validação**: Confirma que problemas foram resolvidos
5. **Redirecionamento**: Se necessário, redireciona para login

## 📱 Problemas Comuns e Soluções

### **Problema**: "user@escola.edu" aparece mas não está logado
**Causa**: Dados de sessão corrompidos no localStorage
**Solução**: `window.fixAuth()`

### **Problema**: Carregamento infinito
**Causa**: ProtectedRoute travado em loop de verificação
**Solução**: Limpeza completa com `window.authDebug.clearAllAuthState()`

### **Problema**: Não redireciona para login
**Causa**: Estado de `isLoading` não atualizando
**Solução**: Auto-fix + recarregar página

### **Problema**: Sessão válida mas acesso negado
**Causa**: Inconsistência entre contexto e Supabase
**Solução**: `window.authDebug.forceSessionRefresh()`

## 🏥 Monitoramento

O sistema agora monitora automaticamente:
- **Saúde da sessão** a cada 30 segundos
- **Consistência de dados** continuamente
- **Conflitos de estado** em tempo real
- **Validade de tokens** a cada requisição

## 📞 Suporte

Se os problemas persistirem após todas as tentativas:

1. Abra o **Painel de Debug** (Ctrl+Shift+D)
2. Clique em "🔄 Atualizar" para capturar estado atual
3. Faça screenshot do painel
4. Copie logs do console (F12 → Console)
5. Reporte o problema com essas informações 