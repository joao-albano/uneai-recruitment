
import React from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChannelTabProps {
  value: string;
  icon: 'mail' | 'phone';
  title: string;
  description: string;
}

const ChannelTab: React.FC<ChannelTabProps> = ({
  value,
  icon,
  title,
  description
}) => {
  return (
    <TabsContent 
      value={value} 
      className="flex-1 flex flex-col items-center justify-center p-8"
    >
      <div className="flex flex-col items-center justify-center text-center max-w-md">
        <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
          {icon === 'mail' ? <Mail className="h-8 w-8 text-muted-foreground" /> : <Phone className="h-8 w-8 text-muted-foreground" />}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button>Configurar</Button>
      </div>
    </TabsContent>
  );
};

export default ChannelTab;
