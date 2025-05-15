# Une.AI Captação - Backend

Este documento descreve a arquitetura e os componentes do servidor backend para o sistema Une.AI Captação.

## Visão Geral

O backend é responsável por:
- Fornecer APIs para o frontend consumir.
- Gerenciar a lógica de negócios.
- Interagir com o banco de dados Supabase para persistência de dados.
- Lidar com autenticação e autorização de usuários.

## Tecnologias Propostas (Exemplo)

- **Runtime/Framework**: Node.js com Express.js (ou NestJS para uma estrutura mais opinativa)
- **Linguagem**: TypeScript
- **Banco de Dados**: Supabase (PostgreSQL)
- **Cliente Supabase**: `@supabase/supabase-js`
- **Variáveis de Ambiente**: `dotenv`

## Estrutura de Pastas Sugerida

```
backend/
├── src/
│   ├── api/
│   │   ├── routes/          # Definições de rotas da API (ex: dashboard.routes.ts)
│   │   ├── controllers/     # Controladores para lidar com requisições HTTP (ex: dashboard.controller.ts)
│   │   └── services/        # Lógica de negócios e interação com o DB (ex: dashboard.service.ts)
│   ├── config/            # Configurações (ex: inicialização do Supabase client, variáveis de ambiente)
│   ├── types/             # Definições de tipos TypeScript (ex: dashboard.types.ts, shared.types.ts)
│   ├── utils/             # Funções utilitárias (ex: dateUtils.ts, errorHandler.ts)
│   └── server.ts          # Ponto de entrada, configuração do servidor Express
├── .env.example         # Exemplo de arquivo de variáveis de ambiente
├── package.json
├── tsconfig.json
└── README.md            # Este arquivo
```

## Funcionalidade do Dashboard

O dashboard principal da tela de "Captação de Alunos" exibirá os seguintes indicadores chave:

1.  **Total de Leads**: Contagem total de registros na tabela `leads`.
2.  **Agendamentos**: Contagem total de registros na tabela `schedules` com status considerado "confirmado" ou "concluído".
3.  **Matrículas**: Contagem total de leads cujo `status_leads` ou `etapa` na tabela `leads` indica que foram convertidos/matriculados (ex: `etapa = 'matriculado'`).
4.  **Taxa de Conversão**: (`Matrículas` / `Total de Leads`) * 100.

Cada um desses indicadores também mostrará uma **variação percentual (%)** em relação a um período anterior.

### Endpoint da API para Dados do Dashboard

**`GET /api/dashboard/overview`**

Este endpoint fornecerá os dados agregados para os cartões de resumo do dashboard.

**Query Parameters:**

*   `organizationId` (uuid, obrigatório): ID da organização para filtrar os dados.
*   `currentPeriodStart` (string ISO date, opcional): Data de início do período atual. Se não fornecido, pode assumir um padrão (ex: início do mês atual).
*   `currentPeriodEnd` (string ISO date, opcional): Data de fim do período atual. Se não fornecido, pode assumir um padrão (ex: data atual).
*   `compareWithPrevious` (boolean, opcional, default: `true`): Indica se os dados de variação percentual (%) devem ser calculados e retornados.

**Resposta Esperada (Exemplo):**

```json
{
  "totalLeads": {
    "currentValue": 539,
    "percentageChange": 12.5 // comparado ao período anterior
  },
  "schedules": {
    "currentValue": 285,
    "percentageChange": 5.2
  },
  "enrollments": {
    "currentValue": 117,
    "percentageChange": 8.0
  },
  "conversionRate": {
    "currentValue": 21.7,
    "percentageChange": 2.4 // Variação da taxa em pontos percentuais ou percentual da taxa anterior
  },
  "currentPeriod": {
    "start": "2023-11-01T00:00:00.000Z",
    "end": "2023-11-30T23:59:59.999Z"
  },
  "previousPeriod": {
    "start": "2023-10-01T00:00:00.000Z",
    "end": "2023-10-31T23:59:59.999Z"
  }
}
```

### Lógica de Cálculo no Backend (`DashboardService`)

1.  **Períodos**: Determinar as datas de início e fim para o período atual e o período anterior (se `compareWithPrevious` for true). O período anterior terá a mesma duração do período atual, mas deslocado para trás.
    *   Ex: Se o período atual é de 1 a 30 de Novembro (30 dias), o anterior será de 2 a 31 de Outubro (30 dias).

2.  **Total de Leads**:
    *   `currentValue`: `COUNT(*)` from `leads` WHERE `organization_id = :organizationId` AND `created_at` BETWEEN `:currentPeriodStart` AND `:currentPeriodEnd`.
    *   `previousValue`: Mesma query, mas com datas do período anterior.
    *   `percentageChange`: `((currentValue - previousValue) / previousValue) * 100`. Tratar divisão por zero.

3.  **Agendamentos (Confirmados/Concluídos)**:
    *   `currentValue`: `COUNT(*)` from `schedules` WHERE `organization_id = :organizationId` AND `status` IN (`'confirmado'`, `'concluido'`) AND `scheduled_at` BETWEEN `:currentPeriodStart` AND `:currentPeriodEnd`.
    *   `previousValue`: Mesma query, mas com datas do período anterior.
    *   `percentageChange`: Calculado como acima.

4.  **Matrículas**:
    *   Definir qual campo e valor indicam uma matrícula (ex: `leads.etapa = 'matriculado'` ou `leads.status_leads = 'convertido'`).
    *   `currentValue`: `COUNT(*)` from `leads` WHERE `organization_id = :organizationId` AND `[campo_matricula] = '[valor_matricula]'` AND `updated_at` (ou uma coluna `enrolled_at` se existir) BETWEEN `:currentPeriodStart` AND `:currentPeriodEnd`.
    *   `previousValue`: Mesma query, mas com datas do período anterior.
    *   `percentageChange`: Calculado como acima.

5.  **Taxa de Conversão**:
    *   `currentRate`: (`currentEnrollmentsValue` / `currentTotalLeadsValue`) * 100. Tratar divisão por zero.
    *   `previousRate`: (`previousEnrollmentsValue` / `previousTotalLeadsValue`) * 100.
    *   `percentageChange`: `((currentRate - previousRate) / previousRate) * 100` ou `currentRate - previousRate` (pontos percentuais). Clarificar qual é o esperado.

### Considerações Adicionais

*   **Filtros por Dimensão**: A imagem do frontend sugere abas para "Canais", "Cursos", "Localidades". O endpoint `GET /api/dashboard/overview` pode ser estendido no futuro ou endpoints adicionais podem ser criados (ex: `GET /api/dashboard/by-channel`) para retornar dados agrupados por essas dimensões.
*   **Performance**: Para grandes volumes de dados, consultas diretas de agregação podem se tornar lentas. Considerar materialização de views, tabelas de resumo atualizadas periodicamente, ou otimizações de consulta no Supabase (PostgreSQL).
*   **Autenticação**: Todas as rotas da API devem ser protegidas e o `organizationId` deve, idealmente, ser inferido do usuário autenticado para garantir que ele só acesse dados de sua organização.

## Pré-requisitos

- Node.js (versão recomendada: >=18.x)
- npm

## Configuração e Execução

1.  **Verifique o arquivo `.env`**: Confirme se o arquivo `.env` na raiz da pasta `backend` contém as variáveis de ambiente necessárias, como:
    ```env
    PORT=3001
    SUPABASE_URL=SUA_SUPABASE_URL
    SUPABASE_SERVICE_ROLE_KEY=SUA_SUPABASE_SERVICE_KEY
    ```
    Os valores `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` devem ser suas credenciais reais do Supabase.

2.  **Instale/Verifique as Dependências**:
    Se você acabou de clonar o projeto ou precisa garantir que todas as dependências estão instaladas, execute:
    ```bash
    npm install
    # ou yarn install
    ```

3.  **Executando o Servidor**:
    Para iniciar o servidor em modo de desenvolvimento (com reinício automático em alterações, se configurado no seu `package.json`):
```bash
npm run dev
    # ou yarn dev
```
    Para iniciar o servidor em modo de produção (conforme configurado no seu `package.json`):
```bash
npm start
    # ou yarn start
```
    O servidor estará disponível em `http://localhost:PORT` (onde PORT é o valor definido em seu arquivo `.env`).

## Próximos Passos para o Dashboard

1.  **Confirmar Stack Tecnológica**: Embora o README sugira Node.js/Express/TypeScript, confirme se esta é a stack existente ou desejada. As instruções subsequentes assumirão essa stack.
2.  **Definir Valores dos ENUMs**: No arquivo `supabase/README.md`, atualize os valores de exemplo nos tipos ENUM (`lead_status`, `lead_stage`, `schedule_status`, `schedule_type`) com os valores reais que seu sistema utilizará.
3.  **Estruturar Módulos do Dashboard**:
    *   Dentro de `backend/src/api/`, crie as pastas `controllers`, `services`, e `routes` se ainda não existirem.
    *   Crie os arquivos para o dashboard:
        *   `backend/src/api/controllers/dashboard.controller.ts`
        *   `backend/src/api/services/dashboard.service.ts`
        *   `backend/src/api/routes/dashboard.routes.ts`
4.  **Implementar Cliente Supabase**: Em `backend/src/config/`, crie ou verifique a configuração do cliente Supabase para interagir com seu banco de dados. Deverá usar as variáveis `SUPABASE_URL` e `SUPABASE_SERVICE_ROLE_KEY` do `.env`.
5.  **Desenvolver `DashboardService`**: Implemente a lógica de negócios em `dashboard.service.ts` para buscar e calcular os indicadores do dashboard conforme detalhado anteriormente (Total de Leads, Agendamentos, Matrículas, Taxa de Conversão, e suas variações percentuais).
6.  **Desenvolver `DashboardController`**: Em `dashboard.controller.ts`, crie a função que receberá as requisições HTTP, chamará o `DashboardService`, e retornará a resposta formatada.
7.  **Definir Rotas**: Em `dashboard.routes.ts`, configure a rota `GET /api/dashboard/overview` para usar o `DashboardController`.
8.  **Integrar Rotas no Servidor Principal**: No seu arquivo principal do servidor (provavelmente `backend/src/server.ts`), importe e use as rotas do dashboard.
9.  **Testes**: Escreva testes para garantir a corretude da lógica do dashboard.

## Endpoints da API

### Métricas de Recrutamento

#### `GET /api/recruitment/metrics/total-leads`

Recupera o número total de leads para uma organização e usuário específicos.

**Parâmetros de Query:**

- `organization_id` (obrigatório): O ID da organização.
- `created_by` (obrigatório): O ID do usuário que criou os leads.

**Resposta de Sucesso (200 OK):**

```json
{
  "totalLeads": 125
}
```

**Respostas de Erro:**

- **400 Bad Request:** Se `organization_id` ou `created_by` não forem fornecidos.
  ```json
  {
    "message": "organization_id and created_by are required query parameters."
  }
  ```
- **500 Internal Server Error:** Se ocorrer um erro ao buscar os dados no Supabase.
  ```json
  {
    "message": "Error fetching total leads",
    "error": "Detalhes do erro do Supabase"
  }