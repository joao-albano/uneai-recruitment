import { Request, Response, NextFunction } from 'express';
import * as DashboardService from '../services/dashboard.service';

export const getDashboardOverview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TODO: Extract organizationId and date filters from req.query
    // For now, let's assume a default organizationId or handle it later
    const organizationId = req.query.organizationId as string; // Example, needs validation
    const currentPeriodStart = req.query.currentPeriodStart as string | undefined;
    const currentPeriodEnd = req.query.currentPeriodEnd as string | undefined;
    const compareWithPrevious = req.query.compareWithPrevious !== 'false'; // Defaults to true

    if (!organizationId) {
      return res.status(400).json({ message: 'organizationId is required' });
    }

    const data = await DashboardService.fetchDashboardOverview(
      organizationId,
      currentPeriodStart ? new Date(currentPeriodStart) : undefined,
      currentPeriodEnd ? new Date(currentPeriodEnd) : undefined,
      compareWithPrevious
    );
    res.json(data);
  } catch (error) {
    next(error); // Pass errors to the global error handler
  }
}; 
 
 
 
 
 
 
 
 
 