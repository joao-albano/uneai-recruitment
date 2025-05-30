
import React from 'react';

interface ChannelColorIndicatorProps {
  color: string;
}

const ChannelColorIndicator: React.FC<ChannelColorIndicatorProps> = ({ color }) => {
  return (
    <div 
      className="h-3 w-3 rounded-full mr-2 flex-shrink-0" 
      style={{ backgroundColor: color }}
    />
  );
};

export default ChannelColorIndicator;
