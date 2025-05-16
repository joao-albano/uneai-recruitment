# Sistema de Gestão de Captação - UNEAI

## Visão Geral
O sistema UNEAI é uma plataforma de gestão de captação de alunos para instituições de ensino superior. O sistema é dividido em vários módulos, sendo o módulo de recrutamento um dos principais componentes.

## Estrutura do Projeto
O projeto está organizado em uma arquitetura frontend/backend:

```
une-ai-captacao/
├── frontend/         # Aplicação React
├── backend/         # API REST
└── supabase/        # Funções Serverless
```

### Frontend
O frontend é construído usando React com TypeScript e utiliza várias bibliotecas modernas:

- **Components**: Organizados por funcionalidade
- **Context**: Gerenciamento de estado global
- **Hooks**: Lógica reutilizável
- **Services**: Comunicação com APIs
- **Types**: Definições de tipos TypeScript

### Módulo de Recrutamento
O módulo de recrutamento inclui várias funcionalidades:

1. **Gestão de Campus**
   - Cadastro de unidades/campus
   - Gerenciamento de cursos por unidade
   - Importação em massa
   - Integração com geolocalização

2. **Funil de Captação**
   - Configuração de etapas
   - Automação de movimentação
   - Análise de conversão
   - Sugestões por IA

3. **Gestão de Leads**
   - Cadastro e qualificação
   - Histórico de interações
   - Segmentação
   - Scoring

## Gestão de Campus

### Estrutura de Dados
O sistema utiliza duas tabelas principais no Supabase:

1. **recruitment.campuses**
   ```sql
   - id: uuid (PK)
   - name: text
   - address: text
   - city: text
   - state: text
   - zip_code: text
   - phone: text
   - organization_id: uuid (FK)
   - created_at: timestamptz
   - updated_at: timestamptz
   ```

2. **recruitment.courses**
   ```sql
   - id: uuid (PK)
   - campus_id: uuid (FK)
   - name: text
   - modalities: text[]
   - created_at: timestamptz
   - updated_at: timestamptz
   ```

### Funcionalidades

1. **Listagem de Campus**
   - Visualização em cards
   - Filtro por nome, cidade e estado
   - Indicadores de status

2. **Cadastro/Edição de Campus**
   - Formulário validado
   - Gestão de cursos integrada
   - Múltiplas modalidades por curso

3. **Importação em Massa**
   - Upload de arquivo CSV
   - Validação de dados
   - Processamento em lote

4. **Integração com Supabase**
   - Autenticação via RLS
   - Políticas de acesso por organização
   - Tempo real com Realtime

## Configuração do Ambiente

### Variáveis de Ambiente
O projeto utiliza as seguintes variáveis:

```env
SUPABASE_URL=https://[PROJECT_ID].supabase.co
SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
```

### Integração Supabase
O projeto utiliza o cliente Supabase para:
- Autenticação de usuários
- Armazenamento de dados
- Políticas de segurança (RLS)
- Funções em tempo real

## Fluxo de Dados

1. **Criação de Campus**
   ```mermaid
   sequenceDiagram
   participant U as Usuário
   participant F as Frontend
   participant S as Supabase
   
   U->>F: Preenche formulário
   F->>S: Insere campus
   S->>S: Valida dados
   S->>F: Retorna ID
   F->>S: Insere cursos
   S->>F: Confirma
   F->>U: Atualiza UI
   ```

2. **Listagem de Campus**
   ```mermaid
   sequenceDiagram
   participant F as Frontend
   participant S as Supabase
   participant R as RLS
   
   F->>S: Requisita campus
   S->>R: Verifica permissões
   R->>S: Filtra por org
   S->>F: Retorna dados
   F->>F: Renderiza lista
   ```

## Próximos Passos

1. **Implementação**
   - Integrar com Supabase
   - Implementar RLS
   - Adicionar validações
   - Melhorar UX

2. **Melhorias Futuras**
   - Cache de dados
   - Otimização de queries
   - Bulk operations
   - Exportação de dados 