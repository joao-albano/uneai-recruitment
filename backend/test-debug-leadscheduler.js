// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();

const leadScheduler = require('./src/services/leadScheduler');

async function debugGetWhatsAppInstance() {
  console.log('\n🔧 DEBUG: getWhatsAppInstance\n');

  const organizationId = '156bc50a-a68c-499e-b0a4-67b66639e12a';
  
  try {
    console.log(`🔍 Buscando instância para organização: ${organizationId}`);
    
    // Chamar diretamente a função do leadScheduler
    const instance = await leadScheduler.getWhatsAppInstance(organizationId);
    
    if (instance) {
      console.log('✅ Instância encontrada:');
      console.log('   ID:', instance.id);
      console.log('   Instance Name:', instance.instance_name);
      console.log('   Instance ID:', instance.instance_id);
      console.log('   Status:', instance.status);
      console.log('   Created:', instance.created_at);
      console.log('   Updated:', instance.updated_at);
    } else {
      console.log('❌ Instância NÃO encontrada');
      console.log('🔧 Vamos investigar...');
      
      // Importar Supabase diretamente para testar
      const { createClient } = require('@supabase/supabase-js');
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      
      console.log('\n🔍 Testando consulta direta ao Supabase:');
      
      const { data: allInstances, error: allError } = await supabase
        .from('whatsapp_instances')
        .select('*');
        
      if (allError) {
        console.log('❌ Erro ao buscar todas as instâncias:', allError);
      } else {
        console.log(`📋 Total de instâncias no banco: ${allInstances.length}`);
        allInstances.forEach((inst, index) => {
          console.log(`   ${index + 1}. ${inst.instance_name} (${inst.status})`);
        });
      }
      
      const { data: orgInstances, error: orgError } = await supabase
        .from('whatsapp_instances')
        .select('*')
        .eq('organization_id', organizationId);
        
      if (orgError) {
        console.log('❌ Erro na consulta por organização:', orgError);
      } else {
        console.log(`\n📋 Instâncias da organização ${organizationId}: ${orgInstances.length}`);
        orgInstances.forEach((inst, index) => {
          console.log(`   ${index + 1}. ${inst.instance_name} - Status: ${inst.status}`);
        });
      }
      
      const { data: connectedInstances, error: connError } = await supabase
        .from('whatsapp_instances')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('status', 'connected');
        
      if (connError) {
        console.log('❌ Erro na consulta por status connected:', connError);
      } else {
        console.log(`\n📋 Instâncias conectadas da organização: ${connectedInstances.length}`);
        connectedInstances.forEach((inst, index) => {
          console.log(`   ${index + 1}. ${inst.instance_name} - Status: ${inst.status}`);
        });
      }
    }

  } catch (error) {
    console.error('💥 Erro no debug:', error);
  }
}

debugGetWhatsAppInstance(); 