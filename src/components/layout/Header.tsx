
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import AppLogo from './header/AppLogo';
import PricingLink from './header/PricingLink';
import NotificationBell from './header/NotificationBell';
import UserMenu from './header/UserMenu';
import PaymentNotification from './header/PaymentNotification';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarCollapsed }) => {
  const { isAdmin, userEmail } = useAuth();
  
  // For demo purposes - we'll assume there's a pending invoice
  const hasPendingInvoice = true;
  const shouldShowPaymentButton = hasPendingInvoice && !isAdmin;
  
  let alerts = [];
  try {
    const dataContext = useData();
    alerts = dataContext.alerts || [];
  } catch (error) {
    console.log("DataProvider not available, using fallback for alerts");
  }
  
  const unreadAlerts = Array.isArray(alerts) ? alerts.filter(alert => !alert.read).length : 0;
  
  const user = {
    name: isAdmin ? 'Admin' : 'Usuário',
    email: userEmail || (isAdmin ? 'admin@escola.edu' : 'user@escola.edu'),
    role: isAdmin ? 'admin' : 'user',
    initials: isAdmin ? 'AD' : 'US'
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-6 backdrop-blur transition-all">
      <Button
        variant="ghost"
        size="icon"
        className="mr-2 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      
      <AppLogo visible={sidebarCollapsed || window.innerWidth < 1024} />
      
      <div className="ml-auto flex items-center gap-4">
        <PaymentNotification visible={shouldShowPaymentButton} />
        
        <PricingLink />
        
        <NotificationBell unreadCount={unreadAlerts} />
        
        <div className="h-8 w-px bg-border/50" />
        
        <UserMenu user={user} />
      </div>
    </header>
  );
};

export default Header;
