
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProduct } from '@/context/product';
import { useData } from '@/context/DataContext';

interface NotificationBellProps {
  unreadCount?: number;
}

const NotificationBell: React.FC<NotificationBellProps> = ({ unreadCount: propUnreadCount }) => {
  const { currentProduct } = useProduct();
  const [unreadCount, setUnreadCount] = useState(propUnreadCount || 0);
  const dataContext = useData();
  
  // If we have a data context, use it to get unread alerts count
  useEffect(() => {
    if (dataContext?.alerts) {
      const count = dataContext.alerts.filter(alert => !alert.read).length;
      setUnreadCount(count);
    } else if (propUnreadCount !== undefined) {
      setUnreadCount(propUnreadCount);
    }
  }, [dataContext?.alerts, propUnreadCount]);
  
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
