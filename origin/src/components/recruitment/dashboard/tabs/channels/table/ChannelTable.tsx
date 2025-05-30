
import React from 'react';
import { ChannelDataType } from '../types';
import ChannelTableHeader from './ChannelTableHeader';
import ChannelTableRow from './ChannelTableRow';

interface ChannelTableProps {
  channelData: ChannelDataType[];
}

const ChannelTable: React.FC<ChannelTableProps> = ({ channelData }) => {
  return (
    <div className="border rounded-md overflow-x-auto max-w-full">
      <table className="w-full">
        <ChannelTableHeader />
        <tbody className="divide-y">
          {channelData.map((item, index) => (
            <ChannelTableRow 
              key={index} 
              item={item} 
              index={index} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChannelTable;
