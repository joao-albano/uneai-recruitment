
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/auth";
import { StudentsProvider } from "@/context/students/StudentsContext";
import { AlertsProvider } from "@/context/alerts/AlertsContext";
import { SchedulesProvider } from "@/context/schedules/SchedulesContext";
import { SurveysProvider } from "@/context/surveys/SurveysContext";
import { UploadsProvider } from "@/context/uploads/UploadsContext";
import { WhatsAppProvider } from "@/context/whatsapp/WhatsAppContext";
import { AppStateProvider } from "@/context/app/AppStateContext";
import { ReactNode } from "react";
import { ProductProvider } from "@/context/product";
import { DataProvider } from "@/context/DataContext";

interface AppProvidersProps {
  children: ReactNode;
}

// Create QueryClient instance
const queryClient = new QueryClient();

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          {/* 
            Since ProductProvider needs Router and is using useLocation,
            we're providing an initial null product here and will wrap
            the actual routes with another ProductProvider that has access to Router
          */}
          <ProductProvider initialProduct={null}>
            <StudentsProvider>
              <AlertsProvider>
                <SchedulesProvider>
                  <SurveysProvider>
                    <UploadsProvider>
                      <WhatsAppProvider>
                        <AppStateProvider>
                          <DataProvider>
                            <TooltipProvider>
                              <Toaster />
                              <Sonner />
                              {children}
                            </TooltipProvider>
                          </DataProvider>
                        </AppStateProvider>
                      </WhatsAppProvider>
                    </UploadsProvider>
                  </SurveysProvider>
                </SchedulesProvider>
              </AlertsProvider>
            </StudentsProvider>
          </ProductProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
