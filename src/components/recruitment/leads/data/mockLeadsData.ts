
// Mock data for leads
export const mockLeadsData = [
  { id: 1, name: "João Silva", course: "Ensino Fundamental", children: 2, channel: "Site", stage: "Contato Inicial", status: "Novo", createdAt: "22/11/2023" },
  { id: 2, name: "Maria Santos", course: "Educação Infantil", children: 1, channel: "Facebook", stage: "Agendamento", status: "Em Andamento", createdAt: "21/11/2023" },
  { id: 3, name: "Pedro Oliveira", course: "Ensino Médio", children: 3, channel: "Indicação", stage: "Visita", status: "Aguardando", createdAt: "20/11/2023" },
  { id: 4, name: "Ana Rodrigues", course: "Ensino Fundamental", children: 2, channel: "Instagram", stage: "Matrícula", status: "Finalizado", createdAt: "19/11/2023" },
  { id: 5, name: "Lucas Martins", course: "Ensino Médio", children: 1, channel: "Google", stage: "Contato Inicial", status: "Novo", createdAt: "18/11/2023" },
];

// Function to group leads by stage
export const getLeadsByStage = () => {
  const stageGroups = {
    "Contato Inicial": mockLeadsData.filter(lead => lead.stage === "Contato Inicial"),
    "Agendamento": mockLeadsData.filter(lead => lead.stage === "Agendamento"),
    "Visita": mockLeadsData.filter(lead => lead.stage === "Visita"),
    "Matrícula": mockLeadsData.filter(lead => lead.stage === "Matrícula"),
  };
  
  return stageGroups;
};
