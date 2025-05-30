
import { commonRoutes } from "./common/commonRoutes";
import { retentionRoutes } from "./retention/retentionRoutes";
import { recruitmentRoutes } from "./recruitment/recruitmentRoutes";
import { financeRoutes } from "./finance/financeRoutes";

// Export all protected routes combined
export const protectedRoutes = [
  ...commonRoutes,
  ...retentionRoutes,
  ...recruitmentRoutes,
  ...financeRoutes
];
