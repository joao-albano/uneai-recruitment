const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('SUPABASE_URL is not defined in your .env file');
}
if (!supabaseServiceRoleKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined in your .env file');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    // autoRefreshToken: true,
    // persistSession: true,
    // detectSessionInUrl: true,
  },
});

module.exports = supabase; 
 
 
 
 
 
 
 
 