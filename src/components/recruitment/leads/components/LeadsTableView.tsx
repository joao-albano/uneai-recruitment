
import React from 'react';

interface LeadsTableViewProps {
  leads: any[];
}

const LeadsTableView: React.FC<LeadsTableViewProps> = ({ leads }) => {
  if (leads.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-muted-foreground">Nenhum lead encontrado</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-muted/50">
            <th className="p-3 text-left font-medium">Nome</th>
            <th className="p-3 text-left font-medium">Curso</th>
            <th className="p-3 text-left font-medium">Canal</th>
            <th className="p-3 text-left font-medium">Etapa</th>
            <th className="p-3 text-left font-medium">Status</th>
            <th className="p-3 text-left font-medium">Cadastrado em</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-b">
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.course}</td>
              <td className="p-3">{lead.channel}</td>
              <td className="p-3">{lead.stage}</td>
              <td className="p-3">
                <span 
                  className={`px-2 py-1 rounded text-xs text-white ${
                    lead.status === 'Novo' ? 'bg-green-500' : 
                    lead.status === 'Em Andamento' ? 'bg-blue-500' : 
                    lead.status === 'Aguardando' ? 'bg-amber-500' : 'bg-gray-500'
                  }`}
                >
                  {lead.status}
                </span>
              </td>
              <td className="p-3">{lead.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTableView;
