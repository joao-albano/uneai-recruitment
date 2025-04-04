
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

const ChannelTab: React.FC<ChannelTabProps> = ({ value, icon, title, description }) => {
  return (
    <TabsContent value={value} className="flex-1 flex items-center justify-center">
      <div className="text-center p-4">
        {icon === 'mail' ? (
          <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        ) : (
          <Phone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        )}
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-muted-foreground">
          {description}
        </p>
        {icon === 'phone' && (
          <Button className="mt-4" variant="outline">
            <Phone className="h-4 w-4 mr-2" />
            Iniciar chamada (simulação)
          </Button>
        )}
      </div>
    </TabsContent>
  );
};

export default ChannelTab;
