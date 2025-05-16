require('dotenv').config();
const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase URL Loaded:', supabaseUrl ? 'OK' : 'MISSING!');
console.log('Supabase Key Loaded:', supabaseKey ? 'OK (character count: ' + supabaseKey.length + ')' : 'MISSING!');

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase URL or Key is missing. Make sure .env file is configured correctly.');
  process.exit(1); // Exit if Supabase credentials are not found
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Import das rotas
const dashboardRoutes = require('./src/api/routes/dashboard.routes');
const authRoutes = require('./src/api/routes/auth.routes');
const webhookRoutes = require('./src/api/routes/webhook.routes');
const whatsappRoutes = require('./src/api/routes/whatsapp.routes');

// Basic route
app.get('/', (req, res) => {
  res.send('UNE AI Captação Backend is running!');
});

// Example Supabase query (optional - can be removed if not needed immediately)
app.get('/test-supabase', async (req, res) => {
  try {
    const { data, error } = await supabase.from('your_table_name').select('*').limit(1); // Replace 'your_table_name' with an actual table
    if (error) throw error;
    res.json({ message: 'Supabase connection successful!', data });
  } catch (error) {
    console.error('Error testing Supabase connection:', error);
    res.status(500).json({ message: 'Error connecting to Supabase', error: error.message });
  }
});

// --- Auth Routes ---
app.use('/api/auth', authRoutes);

// --- Dashboard Routes ---
app.use('/api/dashboard', dashboardRoutes);

// --- Webhook Routes ---
app.use('/webhook', webhookRoutes);

// --- WhatsApp Routes ---
app.use('/api/whatsapp', whatsappRoutes);

// --- Recruitment Metrics Endpoints ---
app.get('/api/recruitment/metrics/total-leads', async (req, res) => {
  const { organization_id /*, created_by */ } = req.query;

  if (!organization_id) {
    return res.status(400).json({ message: 'organization_id is a required query parameter.' });
  }
  // if (!organization_id || !created_by) {
  //   return res.status(400).json({ message: 'organization_id and created_by are required query parameters.' });
  // }

  console.log(`Attempting to fetch count from leads table for organization_id: ${organization_id}`);

  try {
    const { count, error } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', organization_id);
      // .eq('created_by', created_by);

    if (error) {
      console.error('Error fetching total leads (with organization_id filter):', error);
      throw error;
    }

    console.log(`Successfully fetched count for organization_id ${organization_id}:`, count);
    res.json({ totalLeads: count });
  } catch (error) {
    const errorMessage = error && error.message ? error.message : JSON.stringify(error);
    res.status(500).json({ message: 'Error fetching total leads', error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

module.exports = { app, supabase }; // Export app and supabase client for potential future use (e.g., in tests or other modules) 