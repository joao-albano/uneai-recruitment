
import React from 'react';
import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip } from 'recharts';

// Dados fictícios para o funil de captação
const funnelData = [
  { name: 'Leads Gerados', value: 539, fill: '#4F46E5' },
  { name: 'Contatos Realizados', value: 425, fill: '#8B5CF6' },
  { name: 'Agendamento', value: 285, fill: '#EC4899' },
  { name: 'Visita', value: 182, fill: '#F59E0B' },
  { name: 'Matrícula', value: 117, fill: '#22C55E' },
];

const FunnelChartComponent: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <FunnelChart width={730} height={250}>
        <Tooltip formatter={(value) => [`${value} leads`, 'Quantidade']} />
        <Funnel
          dataKey="value"
          data={funnelData}
          isAnimationActive
        >
          {/* Labels externos para nome do estágio (à esquerda) */}
          <LabelList 
            position="left"
            fill="#374151"
            stroke="none"
            dataKey="name"
            fontSize={12}
            fontWeight="bold"
            offset={10}
          />
          
          {/* Labels internos para valores (centralizados) */}
          <LabelList
            position="center"
            fill="#ffffff"
            stroke="none"
            dataKey="value"
            fontSize={16}
            fontWeight="bold"
          />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
};

export default FunnelChartComponent;
