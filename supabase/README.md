# Supabase Schema Documentation

This document outlines the database schema for the Une.AI Captação project, managed by Supabase.

## Conventions

*   **Primary Keys**: All tables use a `uuid` column named `id` as the primary key.
*   **Timestamps**:
    *   `created_at`: `timestamptz` with a default value of `now()`.
    *   `updated_at`: `timestamptz` with a default value of `now()`, automatically updated on row modification using a trigger.
*   **Foreign Keys**: Clearly indicated and link to the `id` of the referenced table.
*   **Naming**: Table and column names are in `snake_case`.

## ENUM Types

Before creating the tables that use them, the following ENUM types should be defined in PostgreSQL:

### 1. `lead_status`

This ENUM defines the possible statuses for a lead.

```sql
CREATE TYPE lead_status AS ENUM (
  -- TODO: Define actual status values here. Examples:
  'novo',
  'em_contato',
  'qualificado',
  'nao_qualificado',
  'convertido',
  'perdido'
);
```

### 2. `lead_stage`

This ENUM defines the possible stages of a lead in the funnel.

```sql
CREATE TYPE lead_stage AS ENUM (
  -- TODO: Define actual stage values here. Examples:
  'prospeccao',
  'qualificacao',
  'negociacao',
  'fechamento',
  'matriculado'
);
```

### 3. `schedule_status`

This ENUM defines the possible statuses for a schedule/appointment.

```sql
CREATE TYPE schedule_status AS ENUM (
  'pendente',
  'confirmado',
  'cancelado',
  'concluido',
  'nao_compareceu'
);
```

### 4. `schedule_type`

This ENUM defines the types of schedules/appointments.

```sql
CREATE TYPE schedule_type AS ENUM (
  -- TODO: Define actual schedule types here. Examples:
  'visita_campus',
  'entrevista_online',
  'ligacao_boas_vindas',
  'demonstracao_produto'
);
```

## Table Definitions

### Table: `organizations`

Stores information about organizations using the system.

| Column Name     | Data Type     | Constraints & Notes                                     |
|-----------------|---------------|---------------------------------------------------------|
| `id`            | `uuid`        | Primary Key, Default: `gen_random_uuid()`               |
| `name`          | `text`        | Not Null                                                |
| `is_main_org`   | `boolean`     | Default: `false`                                        |
| `created_at`    | `timestamptz` | Default: `now()`                                        |
| `updated_at`    | `timestamptz` | Default: `now()` (auto-updates on modification)         |
| `cnpj`          | `text`        | Unique (Consider adding a format validation)            |
| `address`       | `text`        |                                                         |
| `city`          | `text`        |                                                         |
| `state`         | `text`        |                                                         |
| `postal_code`   | `text`        |                                                         |
| `contact_phone` | `text`        |                                                         |
| `status`        | `text`        | (Consider if this should be an ENUM, e.g., `organization_status`) |

### Table: `leads`

Stores information about potential students (leads).

| Column Name               | Data Type     | Constraints & Notes                                                                    |
|---------------------------|---------------|----------------------------------------------------------------------------------------|
| `id`                      | `uuid`        | Primary Key, Default: `gen_random_uuid()`                                              |
| `name`                    | `varchar`     | Not Null                                                                               |
| `email`                   | `varchar`     | Unique, (Consider adding email format validation)                                      |
| `phone`                   | `varchar`     |                                                                                        |
| `course`                  | `varchar`     |                                                                                        |
| `channel`                 | `varchar`     | (Source of the lead, e.g., 'Website', 'Facebook', 'Indication')                        |
| `notes`                   | `varchar`     | General notes about the lead. Consider `text` if notes can be very long.               |
| `created_at`              | `timestamptz` | Default: `now()`                                                                       |
| `updated_at`              | `timestamptz` | Default: `now()` (auto-updates on modification)                                        |
| `organization_id`         | `uuid`        | Foreign Key to `organizations(id)`, Not Null                                           |
| `created_by`              | `uuid`        | Foreign Key to `auth.users(id)` (Supabase auth) or a custom `users` table. Not Null      |
| `campus`                  | `varchar`     |                                                                                        |
| `modality`                | `varchar`     | (e.g., 'Presencial', 'EAD', 'Híbrido')                                                 |
| `period`                  | `varchar`     | (e.g., 'Manhã', 'Tarde', 'Noite', 'Integral')                                          |
| `cpf`                     | `varchar`     | Unique (Consider encrypting or specific privacy measures)                              |
| `parent_cpf`              | `varchar`     | CPF of the parent/guardian (Consider encrypting or specific privacy measures)        |
| `cep`                     | `varchar`     | Postal code                                                                            |
| `student_phone`           | `varchar`     | (Originally `studant_phone`) Student's direct phone, if different.                   |
| `student_email`           | `varchar`     | (Originally `studant_email`) Student's direct email, if different.                   |
| `children`                | `jsonb`       | To store information about the lead's children, if applicable. Example: `[{"name": "Child Name", "age": 10}]` |
| `observations`            | `text`        | Detailed observations or history.                                                      |
| `enrollment_intention`    | `varchar`     | (e.g., 'Próximo semestre', 'Ano que vem', 'Ainda não sei')                            |
| `contact_time`            | `varchar`     | Preferred contact time (e.g., 'Manhã', 'Tarde', 'Qualquer horário')                    |
| `requires_children_info`  | `boolean`     | Default: `false`. Indicates if information about children is mandatory or relevant.  |
| `institution_type`        | `varchar`     | (e.g., 'Pública', 'Privada')                                                           |
| `status_leads`            | `lead_status` | Current status of the lead, using the `lead_status` ENUM type. Not Null.             |
| `etapa`                   | `lead_stage`  | Current stage of the lead in the funnel, using the `lead_stage` ENUM type. Not Null. |

### Table: `schedules`

Stores information about appointments or scheduled events related to leads.

| Column Name       | Data Type         | Constraints & Notes                                                                 |
|-------------------|-------------------|-------------------------------------------------------------------------------------|
| `id`              | `uuid`            | Primary Key, Default: `gen_random_uuid()`                                           |
| `lead_id`         | `uuid`            | Foreign Key to `leads(id)` ON DELETE CASCADE, Not Null                              |
| `organization_id` | `uuid`            | Foreign Key to `organizations(id)` ON DELETE CASCADE, Not Null (denormalized for queries) |
| `scheduled_at`    | `timestamptz`     | Date and time of the appointment, Not Null                                          |
| `status`          | `schedule_status` | Status of the schedule, using `schedule_status` ENUM. Not Null, Default: `'pendente'` |
| `type`            | `schedule_type`   | Type of schedule, using `schedule_type` ENUM.                                       |
| `title`           | `varchar(255)`    | Optional title for the schedule.                                                    |
| `description`     | `text`            | Optional description or details.                                                    |
| `assigned_to`     | `uuid`            | Foreign Key to `auth.users(id)` (user responsible for the appointment). Optional.   |
| `created_by`      | `uuid`            | Foreign Key to `auth.users(id)` (user who created the schedule). Not Null.          |
| `created_at`      | `timestamptz`     | Default: `now()`                                                                    |
| `updated_at`      | `timestamptz`     | Default: `now()` (auto-updates on modification)                                     |
| `notes`           | `text`            | Internal notes about the schedule.                                                  |

## Triggers

### Auto-update `updated_at` timestamp

A trigger function should be created to automatically update the `updated_at` column for all tables whenever a row is updated.

```sql
-- Function to update the updated_at column
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to 'organizations' table
CREATE TRIGGER set_timestamp_organizations
BEFORE UPDATE ON organizations
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Apply trigger to 'leads' table
CREATE TRIGGER set_timestamp_leads
BEFORE UPDATE ON leads
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Apply trigger to 'schedules' table
CREATE TRIGGER set_timestamp_schedules
BEFORE UPDATE ON schedules
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Remember to apply this trigger to any new tables with an updated_at column.
```

## Next Steps

1.  **Define ENUM Values**: Review and update the placeholder values in `lead_status`, `lead_stage`, `schedule_status`, and `schedule_type` ENUM types with the actual values required for the application.
2.  **Review Constraints**: Check if additional `UNIQUE` constraints, `CHECK` constraints (e.g., for CPF/CNPJ format, email format), or `NOT NULL` constraints are needed.
3.  **User Table**: Confirm the source for `leads.created_by` (e.g., `auth.users` or a custom `users` table) and ensure it exists.
4.  **Indexing**: Add indexes to columns frequently used in `WHERE` clauses or `JOIN` conditions to optimize query performance (e.g., `leads.email`, `leads.cpf`, `leads.organization_id`, `leads.status_leads`, `leads.etapa`). 
 
 
 
 