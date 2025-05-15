import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not defined in your .env file');
}
if (!supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined in your .env file');
}

// Tipagem para o GenericSchema (opcional, mas bom para segurança de tipos com RLS)
// Se você tiver tipos gerados pelo Supabase CLI, pode usá-los aqui.
// type Database = import('../types/supabase').Database; // Exemplo se você tiver tipos gerados

// Por enquanto, usaremos any para o schema genérico
const supabase: SupabaseClient<any> = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    // autoRefreshToken: true, // Habilitado por padrão
    // persistSession: true, // Habilitado por padrão, útil para front-end, mas para service_role pode não ser necessário
    // detectSessionInUrl: true, // Útil para front-end com OAuth
  },
});

export default supabase; 
 
 
 
 
 
 
 
 
 