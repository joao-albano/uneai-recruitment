// import { createClient } from '@supabase/supabase-js'; // Removido
import supabase from '../../config/supabaseClient'; // Importado

// TODO: Move Supabase client initialization to a central config file (e.g., src/config/supabaseClient.ts)
// and import it here. Ensure SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are loaded from .env
// const supabaseUrl = process.env.SUPABASE_URL!;
// const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// if (!supabaseUrl || !supabaseKey) {
//   throw new Error('Supabase URL and Key must be provided in .env');
// }
// const supabase = createClient(supabaseUrl, supabaseKey); // Removido

// Placeholder types - these should be defined more robustly, perhaps in src/types/
interface DashboardData {
  totalLeads: { currentValue: number; percentageChange: number | null };
  schedules: { currentValue: number; percentageChange: number | null };
  enrollments: { currentValue: number; percentageChange: number | null };
  conversionRate: { currentValue: number; percentageChange: number | null };
  currentPeriod: { start: string; end: string };
  previousPeriod?: { start: string; end: string };
}

// Helper function to calculate percentage change
const calculatePercentageChange = (current: number, previous: number): number | null => {
  if (previous === 0) {
    return current > 0 ? 100 : 0; // Or null if you prefer to indicate no valid comparison
  }
  return parseFloat((((current - previous) / previous) * 100).toFixed(1));
};

export const fetchDashboardOverview = async (
  organizationId: string,
  currentPeriodStart?: Date,
  currentPeriodEnd?: Date,
  compareWithPrevious: boolean = true
): Promise<DashboardData> => {
  // Default to current month if dates are not provided
  const today = new Date();
  const defaultStart = currentPeriodStart || new Date(today.getFullYear(), today.getMonth(), 1);
  const defaultEnd = currentPeriodEnd || new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);

  let previousPeriodStart: Date | undefined;
  let previousPeriodEnd: Date | undefined;

  if (compareWithPrevious) {
    const diffTime = defaultEnd.getTime() - defaultStart.getTime();
    previousPeriodEnd = new Date(defaultStart.getTime() - 1); // End of day before current period starts
    previousPeriodStart = new Date(previousPeriodEnd.getTime() - diffTime);
  }

  // --- Fetch data for Current Period ---
  const { data: leadsCurrent, error: leadsCurrentError } = await supabase
    .from('leads')
    .select('id', { count: 'exact' })
    .eq('organization_id', organizationId)
    .gte('created_at', defaultStart.toISOString())
    .lte('created_at', defaultEnd.toISOString());

  if (leadsCurrentError) throw leadsCurrentError;
  const totalLeadsCurrent = leadsCurrent?.length || 0;

  // TODO: Define 'matriculado' and 'confirmado/concluido' based on ENUMs
  const { data: enrollmentsCurrent, error: enrollmentsCurrentError } = await supabase
    .from('leads')
    .select('id', { count: 'exact' })
    .eq('organization_id', organizationId)
    .eq('etapa', 'matriculado') // Placeholder - use actual ENUM value
    .gte('updated_at', defaultStart.toISOString()) // Assuming updated_at reflects enrollment date
    .lte('updated_at', defaultEnd.toISOString());
  
  if (enrollmentsCurrentError) throw enrollmentsCurrentError;
  const totalEnrollmentsCurrent = enrollmentsCurrent?.length || 0;

  const { data: schedulesCurrent, error: schedulesCurrentError } = await supabase
    .from('schedules')
    .select('id', { count: 'exact' })
    .eq('organization_id', organizationId)
    .in('status', ['confirmado', 'concluido']) // Placeholder - use actual ENUM values
    .gte('scheduled_at', defaultStart.toISOString())
    .lte('scheduled_at', defaultEnd.toISOString());

  if (schedulesCurrentError) throw schedulesCurrentError;
  const totalSchedulesCurrent = schedulesCurrent?.length || 0;

  // --- Fetch data for Previous Period (if applicable) ---
  let totalLeadsPrevious = 0;
  let totalEnrollmentsPrevious = 0;
  let totalSchedulesPrevious = 0;

  if (compareWithPrevious && previousPeriodStart && previousPeriodEnd) {
    const { data: leadsPrev, error: leadsPrevError } = await supabase
      .from('leads')
      .select('id', { count: 'exact' })
      .eq('organization_id', organizationId)
      .gte('created_at', previousPeriodStart.toISOString())
      .lte('created_at', previousPeriodEnd.toISOString());
    if (leadsPrevError) throw leadsPrevError;
    totalLeadsPrevious = leadsPrev?.length || 0;

    const { data: enrollmentsPrev, error: enrollmentsPrevError } = await supabase
      .from('leads')
      .select('id', { count: 'exact' })
      .eq('organization_id', organizationId)
      .eq('etapa', 'matriculado') // Placeholder
      .gte('updated_at', previousPeriodStart.toISOString())
      .lte('updated_at', previousPeriodEnd.toISOString());
    if (enrollmentsPrevError) throw enrollmentsPrevError;
    totalEnrollmentsPrevious = enrollmentsPrev?.length || 0;

    const { data: schedulesPrev, error: schedulesPrevError } = await supabase
      .from('schedules')
      .select('id', { count: 'exact' })
      .eq('organization_id', organizationId)
      .in('status', ['confirmado', 'concluido']) // Placeholder
      .gte('scheduled_at', previousPeriodStart.toISOString())
      .lte('scheduled_at', previousPeriodEnd.toISOString());
    if (schedulesPrevError) throw schedulesPrevError;
    totalSchedulesPrevious = schedulesPrev?.length || 0;
  }

  // Calculate metrics
  const conversionRateCurrent = totalLeadsCurrent > 0 ? parseFloat(((totalEnrollmentsCurrent / totalLeadsCurrent) * 100).toFixed(1)) : 0;
  const conversionRatePrevious = totalLeadsPrevious > 0 ? parseFloat(((totalEnrollmentsPrevious / totalLeadsPrevious) * 100).toFixed(1)) : 0;

  return {
    totalLeads: {
      currentValue: totalLeadsCurrent,
      percentageChange: compareWithPrevious ? calculatePercentageChange(totalLeadsCurrent, totalLeadsPrevious) : null,
    },
    schedules: {
      currentValue: totalSchedulesCurrent,
      percentageChange: compareWithPrevious ? calculatePercentageChange(totalSchedulesCurrent, totalSchedulesPrevious) : null,
    },
    enrollments: {
      currentValue: totalEnrollmentsCurrent,
      percentageChange: compareWithPrevious ? calculatePercentageChange(totalEnrollmentsCurrent, totalEnrollmentsPrevious) : null,
    },
    conversionRate: {
      currentValue: conversionRateCurrent,
      // For rates, change can be absolute (points) or relative. Here, relative.
      percentageChange: compareWithPrevious ? calculatePercentageChange(conversionRateCurrent, conversionRatePrevious) : null,
    },
    currentPeriod: {
      start: defaultStart.toISOString(),
      end: defaultEnd.toISOString(),
    },
    previousPeriod: compareWithPrevious && previousPeriodStart && previousPeriodEnd ? {
      start: previousPeriodStart.toISOString(),
      end: previousPeriodEnd.toISOString(),
    } : undefined,
  };
}; 
 
 
 
 
 
 
 
 