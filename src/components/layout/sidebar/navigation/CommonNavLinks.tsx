
import React from 'react';
import { Home } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';
import { useProduct } from '@/context/product';
import { useLocation } from 'react-router-dom';

interface CommonNavLinksProps {
  collapsed: boolean;
}

const CommonNavLinks: React.FC<CommonNavLinksProps> = ({ collapsed }) => {
  const { currentProduct } = useProduct();
  const location = useLocation();
  
  // Se estamos no produto recruitment, não mostrar o link Início comum
  if (currentProduct === 'recruitment') {
    return null;
  }
  
  // Determinar o destino com base no produto atual
  const getHomeRoute = () => {
    return "/home"; // Rota padrão para outros produtos (retenção, etc)
  };

  // Check if current route is the home route for the current product
  const isHomeActive = () => {
    return location.pathname === '/home';
  };
  
  return (
    <SidebarNavLink 
      to={getHomeRoute()} 
      icon={Home} 
      label="Início" 
      collapsed={collapsed}
      isActive={isHomeActive()}
    />
  );
};

export default CommonNavLinks;
