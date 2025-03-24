
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserMenu from './header/UserMenu';
import NotificationBell from './header/NotificationBell';
import AppLogo from './header/AppLogo';
import { useTheme } from '@/context/ThemeContext';
import PricingLink from './header/PricingLink';
import PaymentNotification from './header/PaymentNotification';
import ProductHubLink from './header/ProductHubLink';
import { useTrialPeriod } from '@/hooks/useTrialPeriod';
import { useAuth } from '@/context/auth';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  toggleSidebar, 
  sidebarCollapsed 
}) => {
  const navigate = useNavigate();
  const { language, setLanguage } = useTheme();
  const { showBanner, isExpired } = useTrialPeriod();
  const { currentUser } = useAuth();
  
  // Mock unread count for notification bell
  const unreadCount = 3;
  
  // This would come from your payment system in a real app
  const hasPendingInvoice = false;
  
  // Create user data for UserMenu based on auth context data
  const user = {
    name: currentUser?.name || currentUser?.email?.split('@')[0] || 'Usuário',
    email: currentUser?.email || 'user@escola.edu',
    role: currentUser?.role || 'user',
    initials: (currentUser?.name?.[0] || currentUser?.email?.[0] || 'U').toUpperCase(),
  };
  
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <Button
        variant="outline"
        size="icon"
        className="mr-2 lg:hidden"
        onClick={toggleSidebar}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      
      <AppLogo visible={sidebarCollapsed} />

      <div className="flex-1" />
      
      <div className="flex items-center gap-2">
        {/* Adding button to return to ProductHub */}
        <ProductHubLink />
        
        {/* Show trial expiration notification */}
        {showBanner && isExpired && (
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1 border-red-300 text-red-700 hover:bg-red-50 hover:text-red-800"
            onClick={() => navigate('/pricing')}
          >
            {language === 'pt-BR' ? 'Período de Avaliação Expirado' : 'Trial Period Expired'}
          </Button>
        )}
        
        {/* Show payment notification */}
        <PaymentNotification visible={hasPendingInvoice} />
        
        <PricingLink />
        <NotificationBell unreadCount={unreadCount} />
        <UserMenu user={user} />
      </div>
    </header>
  );
};

export default Header;
