
import React from 'react';

const ChannelTableHeader: React.FC = () => {
  return (
    <thead className="bg-muted">
      <tr>
        <th className="px-4 py-3 text-left text-sm font-medium">Canal</th>
        <th className="px-4 py-3 text-center text-sm font-medium">Leads</th>
        <th className="px-4 py-3 text-center text-sm font-medium">% do Total</th>
        <th className="px-4 py-3 text-center text-sm font-medium">Taxa de Conversão</th>
        <th className="px-4 py-3 text-center text-sm font-medium">CPA</th>
        <th className="px-4 py-3 text-center text-sm font-medium">Tendência</th>
      </tr>
    </thead>
  );
};

export default ChannelTableHeader;
