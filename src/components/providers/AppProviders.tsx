
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/auth";
import { ProductProvider } from "@/context/product";
import { StudentsProvider } from "@/context/students/StudentsContext";
import { AlertsProvider } from "@/context/alerts/AlertsContext";
import { SchedulesProvider } from "@/context/schedules/SchedulesContext";
import { ReactNode } from "react";

interface AppProvidersProps {
  children: ReactNode;
}

// Criando uma instância do QueryClient
const queryClient = new QueryClient();

const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <ProductProvider>
            <StudentsProvider>
              <AlertsProvider>
                <SchedulesProvider>
                  <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    {children}
                  </TooltipProvider>
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
