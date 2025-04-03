
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProduct } from '@/context/product';

interface NotificationBellProps {
  unreadCount: number;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount }) => {
  const { currentProduct } = useProduct();
  
  // Show the component if we're in retention or recruitment products
  if (currentProduct !== 'retention' && currentProduct !== 'recruitment') {
    return null;
  }

  return (
    <Link to={currentProduct === 'recruitment' ? "/recruitment/alerts" : "/alerts"} className="relative">
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge 
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive p-0 text-[10px] text-destructive-foreground"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>
    </Link>
  );
};

export default NotificationBell;
