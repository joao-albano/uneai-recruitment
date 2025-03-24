
import React, { useState } from 'react';
import { DataProvider } from '@/context/DataContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/auth';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';

const ProfilePage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { isAdmin, userEmail } = useAuth();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const user = {
    name: isAdmin ? 'Admin' : 'Usuário',
    email: userEmail || (isAdmin ? 'admin@escola.edu' : 'user@escola.edu'),
    role: isAdmin ? 'admin' : 'user',
    initials: isAdmin ? 'AD' : 'US'
  };
  
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
                />
              </div>

              <ProfileTabs user={user} isAdmin={isAdmin} />
            </div>
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default ProfilePage;
