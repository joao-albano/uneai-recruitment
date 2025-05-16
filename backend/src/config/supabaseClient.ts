import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

// Tipagem para o GenericSchema (opcional, mas bom para segurança de tipos com RLS)
// Se você tiver tipos gerados pelo Supabase CLI, pode usá-los aqui.
// type Database = import('../types/supabase').Database; // Exemplo se você tiver tipos gerados

// Por enquanto, usaremos any para o schema genérico
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 
 
 
 
 
 
 
 
 
 