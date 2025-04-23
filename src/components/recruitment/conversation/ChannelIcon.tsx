
import React from 'react';
import { Mail, Phone } from 'lucide-react';

interface ChannelIconProps {
  icon: 'mail' | 'phone';
}

const ChannelIcon: React.FC<ChannelIconProps> = ({ icon }) => {
  return (
    <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
      {icon === 'mail' ? (
        <Mail className="h-8 w-8 text-muted-foreground" />
      ) : (
        <Phone className="h-8 w-8 text-muted-foreground" />
      )}
    </div>
  );
};

export default ChannelIcon;
