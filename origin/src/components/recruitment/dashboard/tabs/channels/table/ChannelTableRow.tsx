
import React from 'react';
import { ChannelDataType } from '../types';
import ChannelColorIndicator from './ChannelColorIndicator';
import TrendBadge from './TrendBadge';

interface ChannelTableRowProps {
  item: ChannelDataType;
  index: number;
}

const ChannelTableRow: React.FC<ChannelTableRowProps> = ({ item, index }) => {
  // Calcular valor do CPA de forma consistente (antes era aleatório)
  const cpaValue = 50 + (item.count % 100);
  
  return (
    <tr className={index % 2 === 0 ? 'bg-white dark:bg-slate-950' : 'bg-muted/30'}>
      <td className="px-4 py-3 text-sm font-medium flex items-center">
        <ChannelColorIndicator color={item.color} />
        {item.name}
      </td>
      <td className="px-4 py-3 text-sm text-center">{item.count}</td>
      <td className="px-4 py-3 text-sm text-center">{item.percentage}%</td>
      <td className="px-4 py-3 text-sm text-center">{item.conversion}%</td>
      <td className="px-4 py-3 text-sm text-center">R$ {cpaValue.toFixed(2)}</td>
      <td className="px-4 py-3 text-sm text-center">
        <TrendBadge index={index} />
      </td>
    </tr>
  );
};

export default ChannelTableRow;
