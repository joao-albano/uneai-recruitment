
import React, { useState, useEffect } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/auth';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';

const ProfilePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAdmin, userEmail, currentUser, currentOrganization, isSuperAdmin } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Create user object based on auth context data
  const user = {
    name: currentUser?.name || 'Usuário',
    email: currentUser?.email || userEmail || '',
    role: isSuperAdmin ? 'Super Admin' : 
          (currentUser?.role === 'superadmin' ? 'Super Admin' : 
          currentUser?.role === 'admin' ? 'Administrador' : 'Usuário'),
    initials: currentUser?.name ? 
      currentUser.name[0].toUpperCase() : 
      (currentUser?.email?.[0] || 'U').toUpperCase(),
    organization: currentOrganization?.name
  };
  
  // Debug user information
  useEffect(() => {
    console.log("Current user in profile:", currentUser);
    console.log("Is Super Admin:", isSuperAdmin);
    console.log("User role:", currentUser?.role);
    console.log("User object:", user);
  }, [currentUser, isSuperAdmin]);
  
  return (
    <DataProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={toggleSidebar} 
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
        
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
          
          <main className="flex-1 p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
              <p className="text-muted-foreground mt-1">
                Visualize e edite suas informações pessoais
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex flex-col gap-4 md:flex-row">
                <ProfileHeader 
                  name={user.name}
                  email={user.email}
                  role={user.role}
                  initials={user.initials}
                  organization={user.organization}
                />
              </div>

              <ProfileTabs user={user} isAdmin={isAdmin} isSuperAdmin={isSuperAdmin} />
            </div>
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default ProfilePage;
