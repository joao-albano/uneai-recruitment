import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  // Buscar campanhas ativas
  const { data: campaigns, error: campaignsError } = await supabase
    .from("campaigns")
    .select("id")
    .eq("status", "active");

  if (campaignsError) {
    return new Response(`Erro ao buscar campanhas: ${campaignsError.message}`, { status: 500 });
  }

  let totalLeadsAtualizados = 0;

  for (const campaign of campaigns ?? []) {
    // Buscar leads pendentes para cada campanha
    const { data: leads, error: leadsError } = await supabase
      .from("leads")
      .select("id")
      .eq("status", "pendente");

    if (leadsError) continue;

    const leadIds = (leads ?? []).map(lead => lead.id);
    if (leadIds.length === 0) continue;

    // Atualizar status dos leads para valores corretos do sistema
    const { error: updateError } = await supabase
      .from("leads")
      .update({ 
        status: "NOVO",
        status_leads: "NOVO", 
        etapa: "CONTATO",
        updated_at: new Date().toISOString()
      })
      .in("id", leadIds);

    if (!updateError) {
      totalLeadsAtualizados += leadIds.length;
    }
  }

  return new Response(`Verificação concluída. Campanhas ativas: ${campaigns?.length || 0}. Leads atualizados: ${totalLeadsAtualizados}`, { status: 200 });
}); 