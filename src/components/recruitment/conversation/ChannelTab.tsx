
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
      className="flex-1 flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-md w-full text-center space-y-4 bg-muted/50 p-6 rounded-lg">
        <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
          {icon === 'mail' ? <Mail className="h-8 w-8 text-muted-foreground" /> : <Phone className="h-8 w-8 text-muted-foreground" />}
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button variant="outline">Configurar</Button>
      </div>
    </TabsContent>
  );
};

export default ChannelTab;
