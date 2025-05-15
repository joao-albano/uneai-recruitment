const DashboardService = require('../services/dashboard.service');

const getDashboardOverview = async (req, res, next) => {
  try {
    const organizationId = req.query.organizationId;
    const currentPeriodStart = req.query.currentPeriodStart;
    const currentPeriodEnd = req.query.currentPeriodEnd;
    const compareWithPrevious = req.query.compareWithPrevious !== 'false';

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
    // next(error); // Você precisará de um error handler middleware configurado no seu app Express
    console.error('Error in getDashboardOverview:', error);
    res.status(500).json({ message: 'Error fetching dashboard overview', error: error.message });
  }
};

module.exports = { getDashboardOverview }; 
 
 
 
 
 
 
 
 