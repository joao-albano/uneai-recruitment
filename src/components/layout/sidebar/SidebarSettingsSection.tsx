
import React from 'react';
import SettingsNavItem from './settings/SettingsNavItem';
import SettingsLogoutButton from './settings/SettingsLogoutButton';

interface SidebarSettingsSectionProps {
  collapsed: boolean;
}

const SidebarSettingsSection: React.FC<SidebarSettingsSectionProps> = ({ collapsed }) => {
  return (
    <>
      <SettingsNavItem collapsed={collapsed} />
      <SettingsLogoutButton collapsed={collapsed} />
    </>
  );
};

export default SidebarSettingsSection;
