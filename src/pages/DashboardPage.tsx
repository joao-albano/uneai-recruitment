
import React from 'react';
import Layout from '@/components/layout/Layout';
import Dashboard from '@/components/dashboard/Dashboard';
import { useIsMobile } from '@/hooks/use-mobile';
import { StudentsProvider } from '@/context/students/StudentsContext';
import { AlertsProvider } from '@/context/alerts/AlertsContext';
import { SchedulesProvider } from '@/context/schedules/SchedulesContext';
import { UploadsProvider } from '@/context/uploads/UploadsContext';
import { SurveysProvider } from '@/context/surveys/SurveysContext';
import { WhatsAppProvider } from '@/context/whatsapp/WhatsAppContext';
import { AppStateProvider } from '@/context/app/AppStateContext';
import { DataProvider } from '@/context/DataContext';

const DashboardPage: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  
  return (
    <StudentsProvider>
      <AlertsProvider>
        <SchedulesProvider>
          <SurveysProvider>
            <UploadsProvider>
              <WhatsAppProvider>
                <AppStateProvider>
                  <DataProvider>
                    <Layout 
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                      sidebarCollapsed={sidebarCollapsed}
                      setSidebarCollapsed={setSidebarCollapsed}
                    >
                      <div className={`container mx-auto ${isMobile ? 'px-2' : 'px-4'} py-6`}>
                        <Dashboard />
                      </div>
                    </Layout>
                  </DataProvider>
                </AppStateProvider>
              </WhatsAppProvider>
            </UploadsProvider>
          </SurveysProvider>
        </SchedulesProvider>
      </AlertsProvider>
    </StudentsProvider>
  );
};

export default DashboardPage;
