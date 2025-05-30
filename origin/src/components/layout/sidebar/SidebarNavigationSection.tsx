
import React from 'react';
import { useProduct } from '@/context/product';

// Import the individual navigation link components
import CommonNavLinks from './navigation/CommonNavLinks';
import RetentionNavLinks from './navigation/RetentionNavLinks';
import RecruitmentNavLinks from './navigation/RecruitmentNavLinks';
import BillingNavLinks from './navigation/BillingNavLinks';
import SecretaryNavLinks from './navigation/SecretaryNavLinks';
import EmotionalNavLinks from './navigation/EmotionalNavLinks';
import SalesNavLinks from './navigation/SalesNavLinks';
import SchedulingNavLinks from './navigation/SchedulingNavLinks';
import PedagogicalNavLinks from './navigation/PedagogicalNavLinks';
import FinanceNavLinks from './navigation/FinanceNavLinks';

interface SidebarNavigationSectionProps {
  collapsed: boolean;
}

const SidebarNavigationSection: React.FC<SidebarNavigationSectionProps> = ({ collapsed }) => {
  const { currentProduct } = useProduct();
  
  console.log('SidebarNavigationSection - currentProduct:', currentProduct);
  
  return (
    <div className="py-2">
      <CommonNavLinks collapsed={collapsed} />
      
      {/* Links específicos para o produto de retenção */}
      {(currentProduct === 'retention') && (
        <RetentionNavLinks collapsed={collapsed} />
      )}
      
      {/* Links específicos para o produto de captação */}
      {currentProduct === 'recruitment' && (
        <RecruitmentNavLinks collapsed={collapsed} />
      )}
      
      {/* Links específicos para o produto de finanças */}
      {currentProduct === 'finance' && (
        <FinanceNavLinks collapsed={collapsed} />
      )}
      
      {/* Links para outros produtos - adicione conforme necessário */}
      {currentProduct === 'billing' && (
        <BillingNavLinks collapsed={collapsed} />
      )}
      
      {currentProduct === 'secretary' && (
        <SecretaryNavLinks collapsed={collapsed} />
      )}
      
      {currentProduct === 'emotional' && (
        <EmotionalNavLinks collapsed={collapsed} />
      )}
      
      {currentProduct === 'sales' && (
        <SalesNavLinks collapsed={collapsed} />
      )}
      
      {currentProduct === 'scheduling' && (
        <SchedulingNavLinks collapsed={collapsed} />
      )}
      
      {currentProduct === 'pedagogical' && (
        <PedagogicalNavLinks collapsed={collapsed} />
      )}
    </div>
  );
};

export default SidebarNavigationSection;
