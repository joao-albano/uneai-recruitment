
import React from 'react';
import { Home } from 'lucide-react';
import SidebarNavLink from '../SidebarNavLink';
import { useProduct } from '@/context/product';

interface CommonNavLinksProps {
  collapsed: boolean;
}

const CommonNavLinks: React.FC<CommonNavLinksProps> = ({ collapsed }) => {
  const { currentProduct } = useProduct();
  
  // Determinar o destino com base no produto atual
  const getHomeRoute = () => {
    if (currentProduct === 'recruitment') {
      return "/recruitment";
    }
    return "/home"; // Rota padrão para outros produtos (retenção, etc)
  };
  
  return (
    <SidebarNavLink 
      to={getHomeRoute()} 
      icon={Home} 
      label="Início" 
      collapsed={collapsed}
    />
  );
};

export default CommonNavLinks;
