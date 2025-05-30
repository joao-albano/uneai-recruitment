
import { ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoutes";
import { ProductGuard } from "@/components/auth/ProductGuard";

// This would be implemented in the future
const FinanceDashboardPage = () => <div>Finance Dashboard Coming Soon</div>;
const InvoicesPage = () => <div>Invoices Page Coming Soon</div>;
const PaymentsPage = () => <div>Payments Page Coming Soon</div>;
const BillingPage = () => <div>Billing Page Coming Soon</div>;
const ReportsPage = () => <div>Finance Reports Coming Soon</div>;

interface RouteConfig {
  path: string;
  element: ReactNode;
}

export const financeRoutes: RouteConfig[] = [
  {
    path: "/finance/home",
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="finance" redirectTo="/hub">
          <FinanceDashboardPage />
        </ProductGuard>
      </ProtectedRoute>
    )
  },
  {
    path: "/finance",
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="finance" redirectTo="/hub">
          <FinanceDashboardPage />
        </ProductGuard>
      </ProtectedRoute>
    )
  },
  {
    path: "/finance/invoices",
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="finance" redirectTo="/hub">
          <InvoicesPage />
        </ProductGuard>
      </ProtectedRoute>
    )
  },
  {
    path: "/finance/payments",
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="finance" redirectTo="/hub">
          <PaymentsPage />
        </ProductGuard>
      </ProtectedRoute>
    )
  },
  {
    path: "/finance/billing",
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="finance" redirectTo="/hub">
          <BillingPage />
        </ProductGuard>
      </ProtectedRoute>
    )
  },
  {
    path: "/finance/reports",
    element: (
      <ProtectedRoute>
        <ProductGuard allowedProduct="finance" redirectTo="/hub">
          <ReportsPage />
        </ProductGuard>
      </ProtectedRoute>
    )
  }
];
