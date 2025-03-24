
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
import { useTrialPeriod } from '@/hooks/useTrialPeriod';

interface HeaderProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, sidebarCollapsed }) => {
  const navigate = useNavigate();
  const { language, toggleLanguage } = useTheme();
  const { showBanner, isExpired } = useTrialPeriod();
  
  // This would come from your payment system in a real app
  const hasPendingInvoice = false;
  
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
      
      <AppLogo variant={sidebarCollapsed ? 'full' : 'icon'} />

      <div className="flex-1" />
      
      <div className="flex items-center gap-2">
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
        <NotificationBell />
        <UserMenu />
      </div>
    </header>
  );
};

export default Header;
